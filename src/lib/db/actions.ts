"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentOrganization } from "./queries";

/** Turn a name or URL into a slug that can live in a hostname. */
function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export type ActionState = { error: string | null };

export async function createServer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const org = await getCurrentOrganization();
  if (!org) return { error: "No organization found for this account." };

  const rawName = String(formData.get("name") ?? "").trim();
  const repo = String(formData.get("repo") ?? "").trim();
  const runtime = String(formData.get("runtime") ?? "typescript");

  if (!rawName) return { error: "Give the server a name." };

  const slug = slugify(rawName);
  if (!slug) return { error: "That name has no characters a URL can use." };

  const supabase = await createClient();
  const { error } = await supabase.from("servers").insert({
    organization_id: org.id,
    slug,
    name: rawName,
    description: String(formData.get("description") ?? "").trim(),
    runtime,
    repo: repo || null,
    status: "building",
    url: `${slug}.run.mcpfy.ai/mcp`,
  });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "A server with that name already exists here."
          : error.message,
    };
  }

  revalidatePath("/dashboard", "layout");
  redirect(`/dashboard/servers/${slug}`);
}

/**
 * Attach a server that is already hosted somewhere else. Only the URL is
 * known, so the name is derived from its host.
 */
export async function connectServer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const org = await getCurrentOrganization();
  if (!org) return { error: "No organization found for this account." };

  const raw = String(formData.get("url") ?? "").trim();
  if (!raw) return { error: "Paste the URL of your MCP server." };

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { error: "That does not look like a URL." };
  }

  const slug = slugify(parsed.hostname);
  const supabase = await createClient();
  const { error } = await supabase.from("servers").insert({
    organization_id: org.id,
    slug,
    name: parsed.hostname,
    description: "Connected by URL — hosted elsewhere.",
    runtime: "typescript",
    status: "ready",
    url: `${parsed.host}${parsed.pathname}`.replace(/\/$/, ""),
  });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "That server is already connected."
          : error.message,
    };
  }

  revalidatePath("/dashboard", "layout");
  redirect(`/dashboard/servers/${slug}`);
}

export async function updateOrganization(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const org = await getCurrentOrganization();
  if (!org) return { error: "No organization found for this account." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "An organization needs a name." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("organizations")
    .update({
      name,
      description: String(formData.get("description") ?? "").trim(),
    })
    .eq("id", org.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard", "layout");
  return { error: null };
}

export async function deleteServer(slug: string) {
  const org = await getCurrentOrganization();
  if (!org) return;

  const supabase = await createClient();
  await supabase
    .from("servers")
    .delete()
    .eq("organization_id", org.id)
    .eq("slug", slug);

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/servers");
}
