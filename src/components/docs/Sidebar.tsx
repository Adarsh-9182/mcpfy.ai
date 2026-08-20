'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docs, docSections } from '@/lib/docs';
import { cn } from '@/lib/utils';

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="text-sm">
      <Link
        href="/docs"
        className={cn(
          'focus-ring block rounded-lg px-3 py-1.5 transition-colors',
          pathname === '/docs' ? 'bg-elevated font-medium text-ink' : 'text-muted hover:text-ink',
        )}
      >
        Overview
      </Link>

      {docSections.map((section) => (
        <div key={section} className="mt-6">
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-faint">{section}</h2>
          <ul className="mt-2 space-y-0.5">
            {docs
              .filter((d) => d.section === section)
              .map((doc) => {
                const href = `/docs/${doc.slug}`;
                const active = pathname === href;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'focus-ring block rounded-lg px-3 py-1.5 transition-colors',
                        active ? 'bg-elevated font-medium text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
