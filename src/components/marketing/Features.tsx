import { Section, SectionHeading } from '@/components/ui/Section';

const features = [
  {
    title: 'Zero-config deploys',
    body: 'Point mcpfy at a repo and it detects your runtime, bundles your tools, validates every schema and ships a health-checked endpoint.',
    icon: 'M4 12h5l2-5 3 10 2-5h4',
  },
  {
    title: 'Schema-aware builds',
    body: 'Tool inputs are type-checked at build time. A malformed schema fails the deploy instead of surfacing as a confusing model error later.',
    icon: 'M5 7l3 3-3 3M11 15h5',
  },
  {
    title: 'Built-in inspector',
    body: 'Call any tool with real arguments, replay a failed request from a trace and watch the raw protocol frames as they stream.',
    icon: 'M9 17A8 8 0 109 1a8 8 0 000 16zM19 19l-4.5-4.5',
  },
  {
    title: 'Tool-level tracing',
    body: 'Every tools/call emits a span with arguments, result size and downstream timings — so a slow assistant becomes a solvable question.',
    icon: 'M3 17V9m5 8V4m5 13v-6m5 6V7',
  },
  {
    title: 'Scoped auth',
    body: 'Issue tokens restricted to specific tools, add per-tool rate limits and require explicit confirmation before any write executes.',
    icon: 'M6 9V6a4 4 0 118 0v3M5 9h10v8H5z',
  },
  {
    title: 'One-click publishing',
    body: 'Promote a verified server straight into assistant connector directories, with versioning and staged rollout built in.',
    icon: 'M10 3v10M6 7l4-4 4 4M4 15v2h12v-2',
  },
];

export function Features() {
  return (
    <Section id="platform">
      <SectionHeading
        eyebrow="Platform"
        title="Everything an MCP server needs after 'hello world'"
        description="The gap between a working prototype and something an assistant can rely on is operational. mcpfy closes it."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="group bg-surface p-7 transition-colors hover:bg-elevated">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-elevated text-brand transition-colors group-hover:border-brand/40">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d={f.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-5 text-base font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
