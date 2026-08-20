import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { StatTile } from '@/components/ui/StatTile';
import { BarList, AreaChart } from '@/components/ui/Chart';
import { servers, getServer, trafficSeries } from '@/lib/data';
import { formatNumber, formatLatency, formatRelativeTime, cn } from '@/lib/utils';

const NOW = new Date('2026-08-20T09:45:00Z');

export function generateStaticParams() {
  return servers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const server = getServer(slug);
  return { title: server ? server.name : 'Server not found' };
}

const deployTone = {
  ready: 'text-ok',
  building: 'text-brand',
  error: 'text-danger',
} as const;

export default async function ServerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const server = getServer(slug);
  if (!server) notFound();

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5 text-sm">
        <Link href="/dashboard/servers" className="focus-ring rounded text-muted hover:text-ink">
          Servers
        </Link>
        <span className="mx-2 text-faint" aria-hidden="true">/</span>
        <span className="text-ink">{server.name}</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{server.name}</h1>
            <StatusBadge status={server.status} />
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{server.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>v{server.version}</Badge>
            <Badge>{server.runtime}</Badge>
            <Badge>{server.transport}</Badge>
            <Badge>{server.region}</Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 overflow-x-auto rounded-xl border border-line bg-surface px-4 py-3">
        <span className="shrink-0 text-xs text-faint">Endpoint</span>
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-ink">{server.url}</code>
        {server.connectors.length > 0 && (
          <div className="flex shrink-0 gap-1.5">
            {server.connectors.map((c) => (
              <Badge key={c} className="border-brand/40 text-brand">{c}</Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Calls (30d)" value={formatNumber(server.calls30d)} />
        <StatTile label="p95 latency" value={formatLatency(server.p95Ms)} />
        <StatTile
          label="Error rate"
          value={`${server.errorRate}%`}
          delta={
            server.errorRate > 2
              ? { value: 'above budget', direction: 'up', good: false }
              : undefined
          }
        />
        <StatTile label="Uptime" value={`${server.uptime}%`} hint="rolling 30 days" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="card p-6">
          <h2 className="text-sm font-semibold text-ink">Tool calls</h2>
          <p className="mt-0.5 text-xs text-faint">Daily, this server</p>
          <div className="mt-5">
            <AreaChart
              points={trafficSeries.map((p) => ({
                label: p.t,
                value: Math.round(p.calls * (server.calls30d / 353660)),
              }))}
              title={`Daily tool calls for ${server.name}`}
              format="number"
            />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-sm font-semibold text-ink">Calls by tool</h2>
          <p className="mt-0.5 mb-5 text-xs text-faint">Last 30 days</p>
          <BarList
            items={server.tools.map((t) => ({
              label: t.name,
              value: t.calls30d,
              hint: formatLatency(t.p95Ms),
            }))}
            format="number"
          />
        </section>
      </div>

      <section className="mt-6 card overflow-hidden">
        <div className="border-b border-line px-5 py-3">
          <h2 className="text-sm font-semibold text-ink">Tools</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <caption className="sr-only">Tools exposed by {server.name}</caption>
            <thead>
              <tr className="border-b border-line text-left">
                <th scope="col" className="px-5 py-2.5 font-medium text-faint">Tool</th>
                <th scope="col" className="px-5 py-2.5 font-medium text-faint">Description</th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium text-faint">Calls</th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium text-faint">p95</th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium text-faint">Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {server.tools.map((t) => (
                <tr key={t.name}>
                  <th scope="row" className="px-5 py-3 text-left font-mono text-xs font-normal text-ink">{t.name}</th>
                  <td className="px-5 py-3 text-muted">{t.description}</td>
                  <td className="px-5 py-3 text-right text-muted">{formatNumber(t.calls30d)}</td>
                  <td className="px-5 py-3 text-right text-muted">{formatLatency(t.p95Ms)}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={t.errorRate > 2 ? 'text-danger' : 'text-muted'}>{t.errorRate}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 card overflow-hidden">
        <div className="border-b border-line px-5 py-3">
          <h2 className="text-sm font-semibold text-ink">Deployments</h2>
        </div>
        <ul className="divide-y divide-line">
          {server.deployments.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <code className="font-mono text-xs text-brand">{d.sha}</code>
                  <span className={cn('text-xs font-medium capitalize', deployTone[d.status])}>{d.status}</span>
                </div>
                <p className="mt-1 truncate text-sm text-muted">{d.message}</p>
              </div>
              <div className="shrink-0 text-right text-xs text-faint">
                <p>{d.author}</p>
                <p className="mt-0.5">
                  {formatRelativeTime(d.createdAt, NOW)}
                  {d.durationSec > 0 && ` · ${d.durationSec}s`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
