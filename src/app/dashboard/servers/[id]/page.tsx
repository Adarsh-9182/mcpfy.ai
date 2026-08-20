import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { deployment, envVariable, server } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { deleteServer } from "@/app/dashboard/actions";
import { StatusDot } from "@/components/dashboard/status-dot";

export default async function ServerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { organization } = await requireSession();

  const [record] = await db
    .select()
    .from(server)
    .where(and(eq(server.id, id), eq(server.organizationId, organization.id)))
    .limit(1);

  if (!record) notFound();

  const [deployments, variables] = await Promise.all([
    db
      .select()
      .from(deployment)
      .where(eq(deployment.serverId, record.id))
      .orderBy(desc(deployment.createdAt))
      .limit(10),
    db.select().from(envVariable).where(eq(envVariable.serverId, record.id)),
  ]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All servers
      </Link>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <StatusDot status={record.status} />
            <h2 className="text-xl font-medium tracking-tight">{record.name}</h2>
          </div>
          <p className="mt-1.5 font-mono text-[13px] text-muted-foreground">
            https://{record.slug}.run.mcpfy.ai/mcp
          </p>
        </div>
        <form action={deleteServer}>
          <input type="hidden" name="id" value={record.id} />
          <button
            type="submit"
            className="rounded-full border px-3.5 py-1.5 text-[13px] font-medium text-destructive transition-colors hover:bg-destructive/5"
          >
            Delete
          </button>
        </form>
      </div>

      <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Runtime", value: record.runtime },
          { label: "Branch", value: record.productionBranch },
          { label: "Status", value: record.status },
          {
            label: "Repository",
            value: record.repoUrl ? record.repoUrl.split("/").slice(-2).join("/") : "Not connected",
          },
        ].map((cell) => (
          <div key={cell.label} className="bg-background px-5 py-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {cell.label}
            </dt>
            <dd className="mt-1.5 truncate text-[14px]">{cell.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-10">
        <h3 className="text-[15px] font-medium">Deployments</h3>
        {deployments.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed px-5 py-8 text-center text-[14px] text-muted-foreground">
            No deployments yet. Connect a repository to trigger the first build.
          </p>
        ) : (
          <ul className="mt-3 divide-y rounded-xl border bg-card/20">
            {deployments.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <StatusDot status={d.status} />
                  <span className="truncate font-mono text-[13px]">
                    {d.branch}
                  </span>
                  {d.isActive && (
                    <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                      active
                    </span>
                  )}
                </div>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {d.environment}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h3 className="text-[15px] font-medium">Environment variables</h3>
        {variables.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed px-5 py-8 text-center text-[14px] text-muted-foreground">
            None set. Variables apply on the next deployment.
          </p>
        ) : (
          <ul className="mt-3 divide-y rounded-xl border bg-card/20">
            {variables.map((v) => (
              <li
                key={v.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5 font-mono text-[13px]"
              >
                <span className="truncate">{v.key}</span>
                <span className="shrink-0 text-muted-foreground">
                  {v.environment}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
