import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { server } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { StatusDot } from "@/components/dashboard/status-dot";

export default async function DashboardPage() {
  const { organization } = await requireSession();

  const servers = await db
    .select()
    .from(server)
    .where(eq(server.organizationId, organization.id))
    .orderBy(desc(server.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] text-muted-foreground">
          {servers.length === 0
            ? "No servers yet."
            : `${servers.length} server${servers.length === 1 ? "" : "s"}`}
        </p>
        <Link
          href="/dashboard/servers/new"
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors hover:bg-accent"
        >
          <Plus className="size-3.5" />
          New server
        </Link>
      </div>

      {servers.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed bg-card/20 px-6 py-16 text-center">
          <h2 className="text-[17px] font-medium">Deploy your first server</h2>
          <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            Connect a repository and every push ships, with a live MCP URL for
            every branch.
          </p>
          <Link
            href="/dashboard/servers/new"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors hover:bg-accent"
          >
            <Plus className="size-3.5" />
            New server
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y rounded-xl border bg-card/20">
          {servers.map((s) => (
            <li key={s.id}>
              <Link
                href={`/dashboard/servers/${s.id}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-accent/40"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <StatusDot status={s.status} />
                    <span className="truncate text-[15px] font-medium">
                      {s.name}
                    </span>
                  </div>
                  <p className="mt-1 truncate font-mono text-[12px] text-muted-foreground">
                    {s.slug}.run.mcpfy.ai
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:inline">
                    {s.runtime}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
