import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Mono, PageHeader, StatusBadge } from "@/components/dashboard/ui";
import { servers } from "@/lib/dashboard";

const runtimeLabel = {
  typescript: "TypeScript",
  python: "Python",
  docker: "Dockerfile",
} as const;

export const metadata = { title: "Servers" };

export default function ServersPage() {
  return (
    <>
      <PageHeader
        title="Servers"
        description="MCP servers and apps deployed in this organization."
        action={
          <Link
            href="/dashboard/servers/new"
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            New server
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {servers.map((s) => (
          <Link
            key={s.slug}
            href={`/dashboard/servers/${s.slug}`}
            className="group rounded-xl border bg-card/40 p-5 transition-colors hover:bg-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-[15px] font-medium">{s.name}</h2>
                <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">
                  {s.description}
                </p>
              </div>
              <StatusBadge status={s.status} />
            </div>

            <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <GitBranch className="size-3.5" />
              <Mono>
                {s.repo}#{s.branch}
              </Mono>
            </p>

            <p className="mt-1.5 inline-flex items-center gap-1 text-[13px] text-muted-foreground">
              <Mono>{s.url}</Mono>
              <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </p>

            <dl className="mt-5 grid grid-cols-3 gap-3 border-t pt-4 text-[13px]">
              <div>
                <dt className="text-muted-foreground">Calls</dt>
                <dd className="mt-0.5 tabular-nums">
                  {s.toolCalls30d.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Errors</dt>
                <dd className="mt-0.5 tabular-nums">{s.errorRate}%</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Runtime</dt>
                <dd className="mt-0.5">{runtimeLabel[s.runtime]}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </>
  );
}
