'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: 'Overview', icon: 'M3 10h6V3H3zM11 21h6v-7h-6zM3 21h6v-7H3zM11 10h6V3h-6z' },
  { href: '/dashboard/servers', label: 'Servers', icon: 'M4 6h16v5H4zM4 14h16v5H4zM7.5 8.5h.01M7.5 16.5h.01' },
  { href: '/dashboard/playground', label: 'Inspector', icon: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: 'M4 19V11M9 19V5M14 19v-6M19 19V8' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2v.2a2 2 0 11-4 0v-.1a1.7 1.7 0 00-3-1.2l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00-1.2-2.9H3a2 2 0 110-4h.1A1.7 1.7 0 004.3 7l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 002.9-1.2V3a2 2 0 114 0v.1a1.7 1.7 0 002.9 1.2l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 001.2 2.9H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-6">
      <Logo href="/" />

      <nav aria-label="Dashboard" className="flex-1">
        <ul className="space-y-1">
          {items.map((item) => {
            const active =
              item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active ? 'bg-elevated font-medium text-ink' : 'text-muted hover:bg-elevated/60 hover:text-ink',
                  )}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                    <path d={item.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-xs font-medium text-ink">Free plan</p>
        <p className="mt-1 text-xs text-faint">32.4k of 50k calls used</p>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded bg-elevated">
          <div className="h-full rounded bg-brand" style={{ width: '65%' }} />
        </div>
        <Link
          href="/pricing"
          className="focus-ring mt-3 block rounded text-xs font-medium text-brand hover:underline"
        >
          Upgrade to Pro →
        </Link>
      </div>
    </div>
  );
}
