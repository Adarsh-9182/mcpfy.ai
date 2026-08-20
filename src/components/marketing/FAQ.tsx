'use client';

import { useState } from 'react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'What exactly is an MCP server?',
    a: 'Model Context Protocol is an open standard for exposing tools, resources and prompts to AI assistants. An MCP server is the process that implements it — mcpfy hosts that process, keeps it healthy and gives you visibility into every call it serves.',
  },
  {
    q: 'Do I have to rewrite my server to deploy here?',
    a: 'No. Any server that speaks MCP over streamable HTTP, SSE or stdio deploys as-is. Our SDK is optional sugar for schema validation and structured logging — it is not a requirement.',
  },
  {
    q: 'How does authentication work?',
    a: 'Servers can require OAuth or bearer tokens. Tokens are scoped to individual tools, support per-tool rate limits, and can be configured to require explicit confirmation before any write-capable tool executes.',
  },
  {
    q: 'Can I run this on my own infrastructure?',
    a: 'Yes. Enterprise plans include a self-hosted control plane that runs inside your VPC, with the same CLI, inspector and tracing against your own compute.',
  },
  {
    q: 'What happens when a deploy breaks?',
    a: 'Builds are gated by a synthetic protocol handshake. If initialize or tools/list fails, the release never promotes and the previous version keeps serving. Rollback is one click and preserves the trace history.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'By tool calls served, not by seat. Free covers three servers and 50k calls a month, which is enough to run real internal tooling before you pay anything.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeading eyebrow="FAQ" title="Questions worth answering up front" />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="focus-ring flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-elevated/50"
                >
                  <span className="text-sm font-medium text-ink">{item.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={cn('shrink-0 text-faint transition-transform', isOpen && 'rotate-45')}
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </h3>
              {isOpen && (
                <div id={`faq-panel-${i}`} className="px-6 pb-5">
                  <p className="max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
