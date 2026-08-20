import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const tokens = [
  { name: 'ci-deploy', scope: 'deploy', created: 'Jul 3, 2026', lastUsed: '2 hours ago', prefix: 'mcpfy_dep_7f2…' },
  { name: 'billing-readonly', scope: 'list_invoices, get_subscription', created: 'Jun 18, 2026', lastUsed: '4 minutes ago', prefix: 'mcpfy_tok_a91…' },
  { name: 'local-dev', scope: 'all tools', created: 'May 2, 2026', lastUsed: '9 days ago', prefix: 'mcpfy_tok_3c8…' },
];

const members = [
  { name: 'Priya Raman', email: 'priya@example.com', role: 'Owner' },
  { name: 'Marco Silva', email: 'marco@example.com', role: 'Admin' },
  { name: 'Dana Okonkwo', email: 'dana@example.com', role: 'Developer' },
  { name: 'Sam Whitfield', email: 'sam@example.com', role: 'Developer' },
];

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted">Organization, access tokens and team.</p>

      <section className="mt-8 card p-6">
        <h2 className="text-sm font-semibold text-ink">Organization</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-faint">Name</span>
            <input
              defaultValue="Acme Engineering"
              className="focus-ring w-full rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-faint">Slug</span>
            <input
              defaultValue="acme"
              className="focus-ring w-full rounded-lg border border-line bg-elevated px-3 py-2 font-mono text-sm text-ink"
            />
          </label>
        </div>
        <div className="mt-5">
          <Button size="sm">Save changes</Button>
        </div>
      </section>

      <section className="mt-6 card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-ink">Access tokens</h2>
            <p className="mt-0.5 text-xs text-faint">Scope every token to the minimum it needs.</p>
          </div>
          <Button variant="secondary" size="sm">Create token</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">Access tokens for this organization</caption>
            <thead>
              <tr className="border-b border-line text-left">
                <th scope="col" className="px-5 py-2.5 font-medium text-faint">Name</th>
                <th scope="col" className="px-5 py-2.5 font-medium text-faint">Token</th>
                <th scope="col" className="px-5 py-2.5 font-medium text-faint">Scope</th>
                <th scope="col" className="px-5 py-2.5 font-medium text-faint">Last used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tokens.map((t) => (
                <tr key={t.name}>
                  <th scope="row" className="px-5 py-3 text-left font-normal text-ink">{t.name}</th>
                  <td className="px-5 py-3"><code className="font-mono text-xs text-faint">{t.prefix}</code></td>
                  <td className="px-5 py-3"><Badge>{t.scope}</Badge></td>
                  <td className="px-5 py-3 text-muted">{t.lastUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
          <h2 className="text-sm font-semibold text-ink">Team</h2>
          <Button variant="secondary" size="sm">Invite member</Button>
        </div>
        <ul className="divide-y divide-line">
          {members.map((m) => (
            <li key={m.email} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-elevated text-xs font-medium text-brand"
                  aria-hidden="true"
                >
                  {m.name.split(' ').map((p) => p[0]).join('')}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{m.name}</p>
                  <p className="truncate text-xs text-faint">{m.email}</p>
                </div>
              </div>
              <Badge>{m.role}</Badge>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
