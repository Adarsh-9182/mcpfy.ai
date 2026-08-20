'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface CodeTab {
  label: string;
  language: string;
  code: string;
}

export function CodeBlock({ tabs, className }: { tabs: CodeTab[]; className?: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = tabs[active];

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-surface', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-elevated/50 px-2 py-1.5">
        <div role="tablist" aria-label="Code examples" className="flex gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'focus-ring whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                i === active ? 'bg-surface text-ink' : 'text-faint hover:text-muted',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="focus-ring shrink-0 rounded-lg px-2.5 py-1.5 text-xs text-faint transition-colors hover:text-ink"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code className="font-mono text-muted">{current.code}</code>
      </pre>
    </div>
  );
}
