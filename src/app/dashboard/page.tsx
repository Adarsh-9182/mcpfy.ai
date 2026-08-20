import Link from 'next/link';
import { AreaChart } from '@/components/ui/Chart';
import { StatTile } from '@/components/ui/StatTile';
import { StatusBadge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { servers, trafficSeries, recentLogs } from '@/lib/data';
import { formatNumber, formatLatency, formatRelativeTime, cn } from '@/lib/utils';

const levelTone = { info: 'text-faint', warn: 'text-warn', error: 'text-danger' } as const;
const NOW = new Date('2026-08-20T09:45:00Z');

export default function DashboardOverviewPage() {
  const totalCalls = servers.reduce((sum, s) => sum + s.calls30d, 0);
  const live = servers.filter((s) => s.status === 'live').length;
  const weightedP95 = Math.round(
    servers.reduce((sum, s) => sum + s.p95Ms * s.calls30d, 0) / totalCalls,
  );
  const weightedErrors =
    Math.round(
      (servers.reduce((sum, s) => sum + s.errorRate * s.calls30d, 0) / totalCalls) * 100,
    ) / 100;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-muted">Last 30 days across {servers.length} servers.</p>
        </div>
        <ButtonLink href="/dashboard/servers" size="sm">
          New server
        </ButtonLink>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Tool calls"
          value={formatNumber(totalCalls)}
          delta={{ value: '24.6%', direction: 'up', good: true }}
          hint="vs previous 30 days"
        />
        <StatTile
          label="p95 latency"
          value={formatLatency(weightedP95)}
          delta={{ value: '18ms', direction: 'down', good: true }}
          hint="traffic-weighted"
        />
        <StatTile
          label="Error rate"
          value={`${weightedErrors}%`}
          delta={{ value: '0.1pp', direction: 'up', good: false }}
          hint="tools/call failures"
        />
        <StatTile label="Live servers" value={`${live} / ${servers.length}`} hint="1 building, 1 paused" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="card p-6">
          <h2 className="text-sm font-semibold text-ink">Tool calls</h2>
          <p className="mt-0.5 text-xs text-faint">Daily, all servers</p>
          <div className="mt-5">
            <AreaChart
              points={trafficSeries.map((p) => ({ label: p.t, value: p.calls }))}
              title="Daily tool calls across all servers"
              format="number"
            />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-sm font-semibold text-ink">p95 latency</h2>
          <p className="mt-0.5 text-xs text-faint">Daily, all servers</p>
          <div className="mt-5">
            <AreaChart
              points={trafficSeries.map((p) => ({ label: p.t, value: p.p95 }))}
              title="Daily p95 latency across all servers"
              format="latency"
              height={172}
            />
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <h2 className="text-sm font-semibold text-ink">Servers</h2>
            <Link href="/dashboard/servers" className="focus-ring rounded text-xs text-brand hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {servers.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link
                  href={`/dashboard/servers/${s.slug}`}
                  className="focus-ring flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-elevated/50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{s.name}</p>
                    <p className="mt-0.5 truncate font-mono text-xs text-faint">{s.slug}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="hidden text-xs text-muted sm:block">{formatNumber(s.calls30d)} calls</span>
                    <StatusBadge status={s.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <h2 className="text-sm font-semibold text-ink">Recent activity</h2>
            <span className="chip">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" aria-hidden="true" />
              live
            </span>
          </div>
          <ul className="divide-y divide-line font-mono text-xs">
            {recentLogs.map((log) => (
              <li key={log.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-2.5">
                <span className="text-faint">{formatRelativeTime(log.at, NOW)}</span>
                <span className={cn('w-9 shrink-0 font-semibold uppercase', levelTone[log.level])}>{log.level}</span>
                <span className="min-w-0 flex-1 truncate text-muted">{log.message}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
