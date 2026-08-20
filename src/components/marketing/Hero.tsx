import { ButtonLink } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';

const deployTabs = [
  {
    label: 'TypeScript',
    language: 'ts',
    code: `import { defineServer, tool } from '@mcpfy/sdk';
import { z } from 'zod';

export default defineServer({
  name: 'billing-ledger',
  version: '2.4.1',
  tools: [
    tool({
      name: 'list_invoices',
      description: 'Page through invoices for a customer.',
      input: z.object({
        customerId: z.string(),
        cursor: z.string().optional(),
      }),
      async handler({ customerId, cursor }, ctx) {
        ctx.log.info('listing invoices', { customerId });
        return ctx.db.invoices.page({ customerId, cursor });
      },
    }),
  ],
});`,
  },
  {
    label: 'Python',
    language: 'py',
    code: `from mcpfy import Server, tool
from pydantic import BaseModel

server = Server(name="billing-ledger", version="2.4.1")

class ListInvoices(BaseModel):
    customer_id: str
    cursor: str | None = None

@server.tool(description="Page through invoices for a customer.")
async def list_invoices(args: ListInvoices, ctx):
    ctx.log.info("listing invoices", customer_id=args.customer_id)
    return await ctx.db.invoices.page(
        customer_id=args.customer_id,
        cursor=args.cursor,
    )`,
  },
  {
    label: 'Deploy',
    language: 'bash',
    code: `$ npx mcpfy deploy

  ✓ Detected TypeScript server  billing-ledger@2.4.1
  ✓ Bundled 3 tools             list_invoices, get_subscription, summarize_payouts
  ✓ Type-checked schemas        0 errors
  ✓ Uploaded 1.2 MB             iad1
  ✓ Health check passed         initialize → tools/list in 84ms

  Live  https://billing-ledger.mcpfy.app/mcp
  Trace https://mcpfy.ai/dashboard/servers/billing-ledger`,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] glow" aria-hidden="true" />

      <div className="shell relative pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="/changelog"
            className="focus-ring chip mx-auto hover:border-brand/50 hover:text-ink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Edge runtime is live — sub-100ms cold starts
          </a>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            The platform for
            <span className="text-brand"> MCP servers</span> in production
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Build, deploy, test and observe Model Context Protocol servers — then publish
            them to Claude and ChatGPT. One command from repo to a live, traced endpoint.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/dashboard" size="lg">
              Deploy your first server
            </ButtonLink>
            <ButtonLink href="/docs/quickstart" variant="secondary" size="lg">
              Read the quickstart
            </ButtonLink>
          </div>

          <p className="mt-4 font-mono text-xs text-faint">
            npx mcpfy deploy — no credit card, 3 servers free
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <CodeBlock tabs={deployTabs} className="shadow-2xl shadow-black/40" />
        </div>
      </div>
    </section>
  );
}
