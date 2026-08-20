import Link from 'next/link';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { servers } from '@/lib/data';
import { formatNumber, formatLatency, formatRelativeTime } from '@/lib/utils';

const NOW = new Date('2026-08-20T09:45:00Z');

export default function ServersPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Servers</h1>
          <p className="mt-1 text-sm text-muted">{servers.length} servers across 3 regions.</p>
        </div>
        <ButtonLink href="/docs/quickstart" size="sm">
          Deploy a server
        </ButtonLink>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <caption className="sr-only">Deployed MCP servers with traffic and health</caption>
          <thead>
            <tr className="border-b border-line bg-elevated/50 text-left">
              <th scope="col" className="px-5 py-3 font-medium text-faint">Server</th>
              <th scope="col" className="px-5 py-3 font-medium text-faint">Status</th>
              <th scope="col" className="px-5 py-3 font-medium text-faint">Runtime</th>
              <th scope="col" className="px-5 py-3 text-right font-medium text-faint">Calls (30d)</th>
              <th scope="col" className="px-5 py-3 text-right font-medium text-faint">p95</th>
              <th scope="col" className="px-5 py-3 text-right font-medium text-faint">Errors</th>
              <th scope="col" className="px-5 py-3 text-right font-medium text-faint">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {servers.map((s) => (
              <tr key={s.id} className="bg-surface transition-colors hover:bg-elevated/40">
                <th scope="row" className="px-5 py-4 text-left font-normal">
                  <Link href={`/dashboard/servers/${s.slug}`} className="focus-ring block rounded">
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="mt-0.5 block font-mono text-xs text-faint">{s.slug}</span>
                  </Link>
                </th>
                <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>{s.runtime}</Badge>
                    <Badge>{s.region}</Badge>
                  </div>
                </td>
                <td className="px-5 py-4 text-right text-muted">{formatNumber(s.calls30d)}</td>
                <td className="px-5 py-4 text-right text-muted">{formatLatency(s.p95Ms)}</td>
                <td className="px-5 py-4 text-right">
                  <span className={s.errorRate > 2 ? 'text-danger' : 'text-muted'}>{s.errorRate}%</span>
                </td>
                <td className="px-5 py-4 text-right text-faint">{formatRelativeTime(s.updatedAt, NOW)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
