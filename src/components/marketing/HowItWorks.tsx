import { Section, SectionHeading } from '@/components/ui/Section';

const steps = [
  {
    n: '01',
    title: 'Connect your repo',
    body: 'Import from Git or run npx mcpfy deploy locally. Node, Python and edge runtimes are detected automatically.',
  },
  {
    n: '02',
    title: 'Build and verify',
    body: 'Schemas are type-checked, tools are enumerated, and a synthetic initialize → tools/list handshake gates the release.',
  },
  {
    n: '03',
    title: 'Test in the inspector',
    body: 'Call tools with real arguments against the preview URL before a single assistant ever sees them.',
  },
  {
    n: '04',
    title: 'Publish and watch',
    body: 'Promote to production, publish to connector directories, and trace every call that lands.',
  },
];

export function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Workflow"
        title="Repo to traced endpoint in four steps"
        description="The same pipeline runs on every push, so a deploy is boring by the time it reaches production."
      />

      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.n} className="relative card p-6">
            <span className="font-mono text-xs text-brand">{s.n}</span>
            <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            {i < steps.length - 1 && (
              <span
                className="absolute -right-3 top-1/2 hidden h-px w-6 bg-line lg:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
