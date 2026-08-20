"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { deployment, server } from "@/db/schema";
import { requireSession } from "@/lib/session";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export type ActionState = { error?: string };

export async function createServer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { organization } = await requireSession();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give the server a name." };

  const repoUrl = String(formData.get("repoUrl") ?? "").trim();
  const runtime = String(formData.get("runtime") ?? "node");
  const productionBranch =
    String(formData.get("productionBranch") ?? "").trim() || "main";

  // Slugs are the public endpoint, so they have to be unique platform-wide.
  const base = slugify(name) || "server";
  let slug = base;
  for (let attempt = 0; attempt < 5; attempt++) {
    const [taken] = await db
      .select({ id: server.id })
      .from(server)
      .where(eq(server.slug, slug))
      .limit(1);
    if (!taken) break;
    slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const id = randomUUID();
  await db.insert(server).values({
    id,
    organizationId: organization.id,
    name,
    slug,
    repoUrl: repoUrl || null,
    runtime,
    productionBranch,
    status: repoUrl ? "queued" : "draft",
  });

  // A repository-backed server gets a first deployment record straight away,
  // so the detail page has the pipeline to show.
  if (repoUrl) {
    await db.insert(deployment).values({
      id: randomUUID(),
      serverId: id,
      environment: "production",
      branch: productionBranch,
      status: "queued",
      isActive: true,
    });
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/servers/${id}`);
}

export async function deleteServer(formData: FormData) {
  const { organization } = await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await db
    .delete(server)
    .where(and(eq(server.id, id), eq(server.organizationId, organization.id)));

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
