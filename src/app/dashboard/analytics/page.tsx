import { AreaChart, BarList } from '@/components/ui/Chart';
import { StatTile } from '@/components/ui/StatTile';
import { servers, trafficSeries } from '@/lib/data';
import { formatNumber, formatLatency, percent } from '@/lib/utils';

export default function AnalyticsPage() {
  const totalCalls = trafficSeries.reduce((s, p) => s + p.calls, 0);
  const totalErrors = trafficSeries.reduce((s, p) => s + p.errors, 0);
  const peak = trafficSeries.reduce((a, b) => (b.calls > a.calls ? b : a));

  const allTools = servers
    .flatMap((s) => s.tools.map((t) => ({ ...t, server: s.name })))
    .sort((a, b) => b.calls30d - a.calls30d)
    .slice(0, 8);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
      <p className="mt-1 text-sm text-muted">Last 30 days across all servers.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Total calls" value={formatNumber(totalCalls)} delta={{ value: '24.6%', direction: 'up', good: true }} />
        <StatTile label="Failed calls" value={formatNumber(totalErrors)} hint={`${percent(totalErrors, totalCalls)}% of traffic`} />
        <StatTile label="Peak day" value={formatNumber(peak.calls)} hint={peak.t} />
        <StatTile label="Servers reporting" value={String(servers.length)} hint="3 regions" />
      </div>

      <div className="mt-6 grid gap-6">
        <section className="card p-6">
          <h2 className="text-sm font-semibold text-ink">Tool calls</h2>
          <p className="mt-0.5 text-xs text-faint">Daily volume</p>
          <div className="mt-5">
            <AreaChart
              points={trafficSeries.map((p) => ({ label: p.t, value: p.calls }))}
              title="Daily tool call volume"
              format="number"
              height={220}
            />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="card p-6">
            <h2 className="text-sm font-semibold text-ink">Failed calls</h2>
            <p className="mt-0.5 text-xs text-faint">Daily count — plotted separately, not on a second axis</p>
            <div className="mt-5">
              <AreaChart
                points={trafficSeries.map((p) => ({ label: p.t, value: p.errors }))}
                title="Daily failed tool calls"
                format="number"
                height={180}
              />
            </div>
          </section>

          <section className="card p-6">
            <h2 className="text-sm font-semibold text-ink">p95 latency</h2>
            <p className="mt-0.5 text-xs text-faint">Daily</p>
            <div className="mt-5">
              <AreaChart
                points={trafficSeries.map((p) => ({ label: p.t, value: p.p95 }))}
                title="Daily p95 latency"
                format="latency"
                height={180}
              />
            </div>
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="card p-6">
            <h2 className="text-sm font-semibold text-ink">Busiest tools</h2>
            <p className="mt-0.5 mb-5 text-xs text-faint">By call volume, last 30 days</p>
            <BarList
              items={allTools.map((t) => ({ label: t.name, value: t.calls30d, hint: formatLatency(t.p95Ms) }))}
              format="number"
            />
          </section>

          <section className="card p-6">
            <h2 className="text-sm font-semibold text-ink">Traffic by server</h2>
            <p className="mt-0.5 mb-5 text-xs text-faint">Share of total calls</p>
            <BarList
              items={servers.map((s) => ({
                label: s.slug,
                value: s.calls30d,
                hint: `${percent(s.calls30d, servers.reduce((a, b) => a + b.calls30d, 0))}%`,
              }))}
              format="number"
            />
          </section>
        </div>
      </div>
    </>
  );
}
