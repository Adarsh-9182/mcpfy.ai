import { cn } from '@/lib/utils';
import type { ServerStatus } from '@/lib/types';

const statusStyles: Record<ServerStatus, string> = {
  live: 'border-ok/40 bg-ok/10 text-ok',
  building: 'border-brand/40 bg-brand/10 text-brand',
  degraded: 'border-warn/40 bg-warn/10 text-warn',
  paused: 'border-line bg-elevated text-muted',
  failed: 'border-danger/40 bg-danger/10 text-danger',
};

const statusLabels: Record<ServerStatus, string> = {
  live: 'Live',
  building: 'Building',
  degraded: 'Degraded',
  paused: 'Paused',
  failed: 'Failed',
};

export function StatusBadge({ status }: { status: ServerStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === 'live' && (
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-current" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {statusLabels[status]}
    </span>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
