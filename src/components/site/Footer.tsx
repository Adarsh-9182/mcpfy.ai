import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

const groups = [
  {
    title: 'Platform',
    links: [
      { href: '/#platform', label: 'Deploy' },
      { href: '/#inspector', label: 'Inspector' },
      { href: '/#observability', label: 'Observability' },
      { href: '/#publish', label: 'Publishing' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { href: '/docs', label: 'Documentation' },
      { href: '/docs/quickstart', label: 'Quickstart' },
      { href: '/docs/cli', label: 'CLI reference' },
      { href: '/docs/transports', label: 'Transports' },
      { href: '/changelog', label: 'Changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs/observability', label: 'Tracing guide' },
      { href: '/docs/auth', label: 'Auth & scopes' },
      { href: '/docs/publishing', label: 'Publish a connector' },
      { href: '/dashboard', label: 'Dashboard' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Ship MCP servers your assistants can actually depend on — deploy, inspect,
              trace and publish from one place.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="focus-ring rounded text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} mcpfy.ai — an independent MCP deployment platform.
          </p>
          <div className="flex items-center gap-2 text-xs text-faint">
            <span className="flex h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
