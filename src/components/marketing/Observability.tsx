import { Section, SectionHeading } from '@/components/ui/Section';
import { AreaChart } from '@/components/ui/Chart';
import { StatTile } from '@/components/ui/StatTile';
import { trafficSeries, recentLogs } from '@/lib/data';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const levelTone = {
  info: 'text-faint',
  warn: 'text-warn',
  error: 'text-danger',
} as const;

export function Observability() {
  const points = trafficSeries.map((p) => ({ label: p.t, value: p.calls }));

  return (
    <Section id="observability">
      <SectionHeading
        eyebrow="Observability"
        title="Know exactly why a tool call was slow"
        description="Traces, logs and metrics are wired in from the first deploy — not an integration you bolt on after an incident."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="card p-6">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-ink">Tool calls</h3>
              <p className="mt-0.5 text-xs text-faint">Last 30 days, all servers</p>
            </div>
            <span className="text-sm font-medium text-ok">▲ 24.6%</span>
          </div>
          <AreaChart points={points} title="Tool calls over the last 30 days" format="number" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatTile label="p95 latency" value="142ms" delta={{ value: '18ms', direction: 'down', good: true }} hint="across live servers" />
          <StatTile label="Error rate" value="0.62%" delta={{ value: '0.1pp', direction: 'up', good: false }} hint="4xx + 5xx on tools/call" />
        </div>
      </div>

      <div className="mt-6 card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h3 className="text-sm font-semibold text-ink">Live log stream</h3>
          <span className="chip">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" aria-hidden="true" />
            streaming
          </span>
        </div>
        <ul className="divide-y divide-line font-mono text-xs">
          {recentLogs.map((log) => (
            <li key={log.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-2.5">
              <span className="text-faint">{formatRelativeTime(log.at, new Date('2026-08-20T09:45:00Z'))}</span>
              <span className={cn('w-10 shrink-0 font-semibold uppercase', levelTone[log.level])}>{log.level}</span>
              <span className="text-brand">{log.server}</span>
              <span className="min-w-0 flex-1 text-muted">{log.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
