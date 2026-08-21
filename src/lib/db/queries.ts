import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type {
  Deployment,
  McpServer,
  Member,
  Organization,
  Runtime,
  ServerStatus,
} from "@/lib/dashboard";

/**
 * Reads for the signed-in product surface.
 *
 * Row level security does the scoping, so none of these filter by user — the
 * database only ever returns rows from organizations the caller belongs to.
 * Each is wrapped in React's `cache` so a page that needs the organization in
 * three places still costs one round trip.
 */

type OrganizationRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  plan: string;
  credits_used: number;
  credits_included: number;
};

type ServerRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ServerStatus;
  runtime: Runtime;
  repo: string | null;
  branch: string;
  url: string | null;
  region: string;
  created_at: string;
};

type DeploymentRow = {
  id: string;
  sha: string;
  message: string;
  branch: string;
  environment: "production" | "preview";
  status: ServerStatus;
  author: string;
  duration: string;
  url: string | null;
  created_at: string;
};

export type OrganizationRecord = Organization & { id: string; logoUrl: string | null };

function toOrganization(row: OrganizationRow): OrganizationRecord {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    logoUrl: row.logo_url,
    plan: row.plan,
    creditsUsed: Number(row.credits_used),
    creditsIncluded: Number(row.credits_included),
  };
}

/** Relative time, in the shorthand the tables use. */
export function since(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(ms / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

export const getOrganizations = cache(async (): Promise<OrganizationRecord[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("organizations")
    .select("id, name, slug, description, logo_url, plan, credits_used, credits_included")
    .order("created_at", { ascending: true });

  return (data ?? []).map(toOrganization);
});

/**
 * The organization the dashboard is currently showing. There is no switcher
 * state yet, so it is simply the caller's first one — every account has at
 * least one, created by a trigger when the account is.
 */
export const getCurrentOrganization = cache(async () => {
  const [first] = await getOrganizations();
  return first ?? null;
});

function toServer(row: ServerRow, deployments: Deployment[]): McpServer {
  const latest = deployments[0];
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    status: row.status,
    runtime: row.runtime,
    repo: row.repo ?? "",
    branch: row.branch,
    url: row.url ?? "",
    region: row.region,
    // No telemetry pipeline yet, so a server reports nothing rather than
    // inventing numbers that would read as real traffic.
    toolCalls30d: 0,
    errorRate: 0,
    p95: 0,
    sessions30d: 0,
    lastDeployed: latest ? latest.createdAt : "never",
    tools: [],
    deployments,
  };
}

function toDeployment(row: DeploymentRow): Deployment {
  return {
    id: row.id,
    sha: row.sha,
    message: row.message,
    branch: row.branch,
    environment: row.environment,
    status: row.status,
    author: row.author,
    duration: row.duration,
    createdAt: since(row.created_at),
    url: row.url ?? "",
  };
}

export const getServers = cache(async (): Promise<McpServer[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("servers")
    .select(
      "id, slug, name, description, status, runtime, repo, branch, url, region, created_at, deployments (id, sha, message, branch, environment, status, author, duration, url, created_at)",
    )
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "deployments", ascending: false });

  return (data ?? []).map((row) => {
    const { deployments = [], ...server } = row as ServerRow & {
      deployments: DeploymentRow[];
    };
    return toServer(server, deployments.map(toDeployment));
  });
});

export const getServerBySlug = cache(async (slug: string) => {
  const servers = await getServers();
  return servers.find((s) => s.slug === slug) ?? null;
});

export const getDeploymentById = cache(async (slug: string, id: string) => {
  const server = await getServerBySlug(slug);
  const deployment = server?.deployments.find((d) => d.id === id);
  if (!server || !deployment) return null;
  return { server, deployment };
});

/* --------------------------------- members -------------------------------- */

type MemberRow = {
  user_id: string;
  role: string;
  created_at: string;
};

const roleLabels: Record<string, Member["role"]> = {
  owner: "Owner",
  admin: "Admin",
  developer: "Developer",
  viewer: "Viewer",
};

export const getTeam = cache(async (): Promise<Member[]> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("organization_members")
    .select("user_id, role, created_at")
    .order("created_at", { ascending: true });

  return ((data ?? []) as MemberRow[]).map((row) => {
    const isYou = row.user_id === user?.id;
    const meta = (user?.user_metadata ?? {}) as Record<string, string>;
    return {
      // Only the caller's own profile is readable from the client; teammates
      // show as their role until a profiles table carries names.
      name: isYou
        ? meta.full_name || meta.name || meta.user_name || user?.email || "You"
        : "Member",
      email: isYou ? (user?.email ?? "") : "",
      role: roleLabels[row.role] ?? "Viewer",
      status: "active",
      added: since(row.created_at),
      lastActivity: isYou ? "just now" : null,
      you: isYou,
    };
  });
});
