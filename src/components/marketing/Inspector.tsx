import { Section, SectionHeading } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

const frames = [
  { dir: 'out', method: 'initialize', detail: 'protocolVersion 2025-06-18 · clientInfo inspector/1.4', ms: 11 },
  { dir: 'in', method: 'initialize result', detail: 'capabilities.tools · serverInfo billing-ledger@2.4.1', ms: 18 },
  { dir: 'out', method: 'tools/list', detail: 'cursor null', ms: 6 },
  { dir: 'in', method: 'tools/list result', detail: '3 tools · list_invoices, get_subscription, summarize_payouts', ms: 12 },
  { dir: 'out', method: 'tools/call', detail: 'list_invoices { customerId: "cus_9f21", cursor: null }', ms: 4 },
  { dir: 'in', method: 'tools/call result', detail: 'content[1] · 24 invoices · 4.1 KB', ms: 118 },
];

export function Inspector() {
  return (
    <Section id="inspector">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 min-w-0 lg:order-1">
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line bg-elevated/50 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </span>
              <span className="ml-2 font-mono text-xs text-faint">inspector · billing-ledger</span>
            </div>

            <ul className="divide-y divide-line">
              {frames.map((f, i) => (
                <li key={i} className="flex min-w-0 items-baseline gap-3 px-4 py-2.5 font-mono text-xs">
                  <span
                    className={f.dir === 'out' ? 'text-brand' : 'text-ok'}
                    aria-label={f.dir === 'out' ? 'request' : 'response'}
                  >
                    {f.dir === 'out' ? '→' : '←'}
                  </span>
                  <span className="shrink-0 font-medium text-ink">{f.method}</span>
                  <span className="min-w-0 flex-1 truncate text-muted">{f.detail}</span>
                  <span className="shrink-0 text-faint">{f.ms}ms</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3">
              <Badge>handshake 29ms</Badge>
              <Badge>6 frames</Badge>
              <Badge className="border-ok/40 text-ok">no errors</Badge>
            </div>
          </div>
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Inspector"
            title="Watch the protocol, not the guesswork"
            description="Every frame between client and server is captured and replayable. When a tool call misbehaves, you see the exact arguments the model sent and the exact payload your server returned — then re-run it with one click."
          />
          <ul className="mt-8 space-y-3">
            {[
              'Call any tool with hand-written or model-generated arguments',
              'Replay a failed call straight from its trace',
              'Diff a response between two deployed versions',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand">
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
