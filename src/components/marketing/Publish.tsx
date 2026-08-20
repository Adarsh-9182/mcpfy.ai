import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

const targets = [
  {
    name: 'Claude connectors',
    body: 'Ship a verified connector with scoped permissions and a review-ready manifest.',
    badge: 'Verified',
  },
  {
    name: 'ChatGPT apps',
    body: 'Publish the same server as an app entry — one build, both directories.',
    badge: 'Supported',
  },
  {
    name: 'Private workspaces',
    body: 'Keep a server internal and share it with your org behind SSO only.',
    badge: 'SSO',
  },
];

export function Publish() {
  return (
    <Section id="publish">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Distribution"
            title="Publish once, reach every assistant"
            description="MCP is a shared protocol, so a server you ship on mcpfy works anywhere the protocol is spoken. Promote it to the directories that matter without maintaining separate builds."
          />
          <div className="mt-8">
            <ButtonLink href="/docs/publishing" variant="secondary">
              Publishing guide
            </ButtonLink>
          </div>
        </div>

        <ul className="space-y-4">
          {targets.map((t) => (
            <li key={t.name} className="card flex items-start gap-4 p-5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-brand">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-ink">{t.name}</h3>
                  <span className="chip py-0.5 text-[11px]">{t.badge}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
