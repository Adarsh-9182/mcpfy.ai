import { BarChart, PageHeader, Panel, StatCard } from "@/components/dashboard/ui";
import { clientBreakdown, orgStats, trafficSeries } from "@/lib/dashboard";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="MCP-native traffic across every server in this organization."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orgStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <Panel title="Tool calls" description="Daily volume, last 30 days">
        <div className="p-5">
          <BarChart data={trafficSeries} />
        </div>
      </Panel>

      <Panel title="By client" description="Discovery traffic like tools/list is excluded">
        <ul className="divide-y divide-border/60">
          {clientBreakdown.map((c) => (
            <li key={c.client} className="flex items-center gap-4 px-5 py-3.5">
              <span className="w-32 shrink-0 text-[14px]">{c.client}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-foreground/60"
                  style={{ width: `${c.share}%` }}
                />
              </span>
              <span className="w-12 shrink-0 text-right text-[13px] tabular-nums text-muted-foreground">
                {c.share}%
              </span>
              <span className="w-20 shrink-0 text-right text-[13px] tabular-nums">
                {c.calls}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
