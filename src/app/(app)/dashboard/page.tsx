import Link from "next/link";
import { AlertTriangle, ArrowRight, GitBranch } from "lucide-react";
import {
  BarChart,
  Mono,
  Panel,
  StatCard,
  StatusBadge,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  PageHeader,
} from "@/components/dashboard/ui";
import {
  needsAttention,
  orgStats,
  organization,
  servers,
  trafficSeries,
} from "@/lib/dashboard";
import { cn } from "@/lib/utils";

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title={organization.name}
        description="Everything you have deployed on mcpfy Cloud, at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orgStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {needsAttention.length > 0 && (
        <Panel title="Needs attention" description="Issues across your organization">
          <ul className="divide-y divide-border/60">
            {needsAttention.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5 px-5 py-4">
                <AlertTriangle
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    item.severity === "error"
                      ? "text-red-500"
                      : "text-amber-500",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium">{item.title}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium hover:underline"
                >
                  {item.action}
                  <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel
        title="Tool calls"
        description="Last 30 days across all servers"
        className="p-5"
      >
        <div className="px-5 pb-5 pt-5">
          <BarChart data={trafficSeries} />
        </div>
      </Panel>

      <Panel
        title="Servers"
        action={
          <Link
            href="/dashboard/servers"
            className="text-[13px] font-medium hover:underline"
          >
            View all
          </Link>
        }
      >
        <Table>
          <Thead>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Repository</Th>
            <Th className="text-right">Tool calls</Th>
            <Th className="text-right">p95</Th>
            <Th>Last deploy</Th>
          </Thead>
          <Tbody>
            {servers.map((s) => (
              <tr key={s.slug} className="transition-colors hover:bg-accent/40">
                <Td>
                  <Link
                    href={`/dashboard/servers/${s.slug}`}
                    className="font-medium hover:underline"
                  >
                    {s.name}
                  </Link>
                </Td>
                <Td>
                  <StatusBadge status={s.status} />
                </Td>
                <Td className="text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <GitBranch className="size-3.5" />
                    <Mono>{s.repo}</Mono>
                  </span>
                </Td>
                <Td className="text-right tabular-nums">
                  {s.toolCalls30d.toLocaleString()}
                </Td>
                <Td className="text-right tabular-nums">{s.p95}ms</Td>
                <Td className="text-muted-foreground">{s.lastDeployed}</Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </Panel>
    </>
  );
}
