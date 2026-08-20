import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function StatTile({
  label,
  value,
  delta,
  hint,
  children,
}: {
  label: string;
  value: string;
  delta?: { value: string; direction: 'up' | 'down' | 'flat'; good?: boolean };
  hint?: string;
  children?: ReactNode;
}) {
  const tone =
    delta?.direction === 'flat'
      ? 'text-muted'
      : delta?.good
        ? 'text-ok'
        : 'text-danger';

  return (
    <div className="card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-faint">{label}</p>
      <div className="mt-2 flex items-baseline gap-2.5">
        <span className="text-2xl font-semibold tracking-tight text-ink">{value}</span>
        {delta && (
          <span className={cn('flex items-center gap-1 text-xs font-medium', tone)}>
            <span aria-hidden="true">
              {delta.direction === 'up' ? '▲' : delta.direction === 'down' ? '▼' : '—'}
            </span>
            {delta.value}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-faint">{hint}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
