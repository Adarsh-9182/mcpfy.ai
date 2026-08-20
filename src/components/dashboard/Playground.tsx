'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { McpServer } from '@/lib/types';

interface Frame {
  id: number;
  dir: 'out' | 'in';
  method: string;
  detail: string;
  ms: number;
  status: 'ok' | 'error';
}

export function Playground({ servers }: { servers: McpServer[] }) {
  const [serverSlug, setServerSlug] = useState(servers[0]?.slug ?? '');
  const server = useMemo(
    () => servers.find((s) => s.slug === serverSlug) ?? servers[0],
    [servers, serverSlug],
  );

  const [toolName, setToolName] = useState(server?.tools[0]?.name ?? '');
  const [args, setArgs] = useState('{\n  "customerId": "cus_9f21"\n}');
  const [frames, setFrames] = useState<Frame[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tool = server?.tools.find((t) => t.name === toolName) ?? server?.tools[0];

  function onServerChange(slug: string) {
    setServerSlug(slug);
    const next = servers.find((s) => s.slug === slug);
    setToolName(next?.tools[0]?.name ?? '');
    setFrames([]);
    setError(null);
  }

  function run() {
    setError(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(args);
    } catch {
      setError('Arguments must be valid JSON.');
      return;
    }

    if (!server || !tool) return;

    setRunning(true);
    setFrames([]);

    const keys = Object.keys(parsed as Record<string, unknown>);
    const preview = keys.length ? `{ ${keys.slice(0, 3).join(', ')} }` : '{}';

    const script: Array<Omit<Frame, 'id'>> = [
      { dir: 'out', method: 'initialize', detail: 'protocolVersion 2025-06-18', ms: 11, status: 'ok' },
      { dir: 'in', method: 'initialize result', detail: `${server.name}@${server.version}`, ms: 18, status: 'ok' },
      { dir: 'out', method: 'tools/list', detail: 'cursor null', ms: 6, status: 'ok' },
      { dir: 'in', method: 'tools/list result', detail: `${server.tools.length} tools`, ms: 12, status: 'ok' },
      { dir: 'out', method: 'tools/call', detail: `${tool.name} ${preview}`, ms: 4, status: 'ok' },
      {
        dir: 'in',
        method: 'tools/call result',
        detail: `content[1] · ${tool.p95Ms}ms · ${(tool.calls30d % 900) / 100 + 1.2}KB`,
        ms: tool.p95Ms,
        status: 'ok',
      },
    ];

    script.forEach((frame, i) => {
      window.setTimeout(() => {
        setFrames((prev) => [...prev, { ...frame, id: i }]);
        if (i === script.length - 1) setRunning(false);
      }, 140 * (i + 1));
    });
  }

  if (!server || !tool) {
    return <p className="text-sm text-muted">No servers available.</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <section className="card p-5">
        <h2 className="text-sm font-semibold text-ink">Request</h2>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-xs font-medium text-faint">Server</span>
          <select
            value={serverSlug}
            onChange={(e) => onServerChange(e.target.value)}
            className="focus-ring w-full rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink"
          >
            {servers.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-medium text-faint">Tool</span>
          <select
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="focus-ring w-full rounded-lg border border-line bg-elevated px-3 py-2 font-mono text-sm text-ink"
          >
            {server.tools.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <p className="mt-2 text-xs leading-relaxed text-muted">{tool.description}</p>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-medium text-faint">Arguments (JSON)</span>
          <textarea
            value={args}
            onChange={(e) => setArgs(e.target.value)}
            rows={7}
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'args-error' : undefined}
            className="focus-ring w-full resize-y rounded-lg border border-line bg-elevated px-3 py-2 font-mono text-xs text-ink"
          />
        </label>

        {error && (
          <p id="args-error" role="alert" className="mt-2 text-xs text-danger">
            {error}
          </p>
        )}

        <Button onClick={run} disabled={running} className="mt-4 w-full">
          {running ? 'Running…' : 'Run tool call'}
        </Button>
      </section>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="text-sm font-semibold text-ink">Protocol frames</h2>
          {frames.length > 0 && !running && (
            <div className="flex gap-1.5">
              <Badge>{frames.length} frames</Badge>
              <Badge className="border-ok/40 text-ok">no errors</Badge>
            </div>
          )}
        </div>

        {frames.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-faint">
            Run a tool call to see the frames exchanged with the server.
          </p>
        ) : (
          <ul className="divide-y divide-line" aria-live="polite">
            {frames.map((f) => (
              <li key={f.id} className="flex items-baseline gap-3 px-5 py-2.5 font-mono text-xs animate-fade-up">
                <span
                  className={f.dir === 'out' ? 'text-brand' : 'text-ok'}
                  aria-label={f.dir === 'out' ? 'request' : 'response'}
                >
                  {f.dir === 'out' ? '→' : '←'}
                </span>
                <span className="shrink-0 font-medium text-ink">{f.method}</span>
                <span className={cn('min-w-0 flex-1 truncate', f.status === 'error' ? 'text-danger' : 'text-muted')}>
                  {f.detail}
                </span>
                <span className="shrink-0 text-faint">{f.ms}ms</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
