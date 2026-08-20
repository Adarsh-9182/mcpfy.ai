'use client';

import { useMemo, useState } from 'react';
import { cn, formatNumber, formatLatency } from '@/lib/utils';

export interface ChartPoint {
  label: string;
  value: number;
}

/**
 * Formatters are named rather than passed as functions: these components run on
 * the client, and functions are not serializable across the server boundary.
 */
export type FormatKind = 'plain' | 'number' | 'latency' | 'percent';

const formatters: Record<FormatKind, (v: number) => string> = {
  plain: (v) => String(v),
  number: formatNumber,
  latency: formatLatency,
  percent: (v) => `${v}%`,
};

/**
 * Single-series area chart. One measure per chart by design — two measures of
 * different scale get two charts, never a second y-axis.
 */
export function AreaChart({
  points,
  title,
  format = 'plain',
  className,
  height = 200,
}: {
  points: ChartPoint[];
  title: string;
  format?: FormatKind;
  className?: string;
  height?: number;
}) {
  const fmt = formatters[format];
  const [hover, setHover] = useState<number | null>(null);
  const id = useMemo(() => `area-${Math.random().toString(36).slice(2, 9)}`, []);

  const W = 720;
  const H = height;
  const padX = 8;
  const padY = 14;

  const { max, min, coords } = useMemo(() => {
    const values = points.map((p) => p.value);
    const rawMax = Math.max(...values);
    const rawMin = Math.min(...values);
    const span = rawMax - rawMin || 1;
    const max = rawMax + span * 0.15;
    const min = Math.max(0, rawMin - span * 0.25);
    const coords = points.map((p, i) => {
      const x = padX + (i / Math.max(1, points.length - 1)) * (W - padX * 2);
      const y = H - padY - ((p.value - min) / (max - min || 1)) * (H - padY * 2);
      return { x, y };
    });
    return { max, min, coords };
  }, [points, H]);

  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(' ');
  const area = `${line} L${coords[coords.length - 1].x.toFixed(2)},${H - padY} L${coords[0].x.toFixed(2)},${H - padY} Z`;
  const active = hover === null ? null : points[hover];

  return (
    <figure className={cn('relative', className)}>
      <figcaption className="sr-only">{title}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height }}
        role="img"
        aria-label={`${title}. ${points.length} points, from ${fmt(points[0].value)} to ${fmt(points[points.length - 1].value)}.`}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--brand))" stopOpacity="0.30" />
            <stop offset="100%" stopColor="rgb(var(--brand))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* recessive gridlines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={padX}
            x2={W - padX}
            y1={padY + f * (H - padY * 2)}
            y2={padY + f * (H - padY * 2)}
            stroke="rgb(var(--line))"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.55"
          />
        ))}

        <path d={area} fill={`url(#${id})`} />
        <path d={line} fill="none" stroke="rgb(var(--brand))" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {active && hover !== null && (
          <>
            <line
              x1={coords[hover].x}
              x2={coords[hover].x}
              y1={padY}
              y2={H - padY}
              stroke="rgb(var(--brand))"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* 2px surface ring keeps the marker legible over the fill */}
            <circle cx={coords[hover].x} cy={coords[hover].y} r="5" fill="rgb(var(--brand))" stroke="rgb(var(--surface))" strokeWidth="2" />
          </>
        )}

        {/* hit targets, wider than the marks */}
        {coords.map((c, i) => (
          <rect
            key={i}
            x={c.x - (W - padX * 2) / points.length / 2}
            y={0}
            width={(W - padX * 2) / points.length}
            height={H}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}
      </svg>

      {active && hover !== null && (
        <div
          className="pointer-events-none absolute top-1 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-elevated px-2.5 py-1.5 text-xs shadow-lg"
          style={{ left: `${(coords[hover].x / W) * 100}%` }}
        >
          <span className="font-medium text-ink">{fmt(active.value)}</span>
          <span className="ml-2 text-faint">{active.label}</span>
        </div>
      )}
    </figure>
  );
}

export function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const W = 120;
  const H = 32;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const d = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * W;
      const y = H - 2 - ((v - min) / (max - min || 1)) * (H - 4);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn('h-8 w-full', className)} aria-hidden="true">
      <path d={d} fill="none" stroke="rgb(var(--brand))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </svg>
  );
}

/** Horizontal magnitude bars — single series, 4px rounded data-ends. */
export function BarList({
  items,
  format = 'plain',
}: {
  items: Array<{ label: string; value: number; hint?: string }>;
  format?: FormatKind;
}) {
  const fmt = formatters[format];
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-4">
            <span className="truncate font-mono text-xs text-ink">{item.label}</span>
            <span className="shrink-0 text-xs text-muted">
              {fmt(item.value)}
              {item.hint && <span className="ml-2 text-faint">{item.hint}</span>}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded bg-elevated">
            <div
              className="h-full rounded bg-brand"
              style={{ width: `${Math.max(3, (item.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
