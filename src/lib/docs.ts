export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'code'; language: string; code: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'steps'; items: string[] }
  | { kind: 'note'; tone: 'info' | 'warn'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] };

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  section: string;
  blocks: Block[];
}

export const docs: DocPage[] = [
  {
    slug: 'quickstart',
    title: 'Quickstart',
    description: 'Deploy your first MCP server in under five minutes.',
    section: 'Getting started',
    blocks: [
      { kind: 'p', text: 'This guide takes a local MCP server and puts it behind a traced, health-checked HTTPS endpoint. You need Node 20+ or Python 3.11+ and a mcpfy account.' },
      { kind: 'h2', text: 'Install the CLI' },
      { kind: 'code', language: 'bash', code: 'npm install -g mcpfy\nmcpfy login' },
      { kind: 'p', text: 'The login command opens a browser to authorize the CLI and writes a token to ~/.mcpfy/config.json.' },
      { kind: 'h2', text: 'Create a server' },
      { kind: 'p', text: 'Scaffold a project with a single tool. The template ships with schema validation and structured logging already wired up.' },
      { kind: 'code', language: 'bash', code: 'mcpfy init billing-ledger --runtime node\ncd billing-ledger' },
      { kind: 'h2', text: 'Define a tool' },
      { kind: 'code', language: 'ts', code: `import { defineServer, tool } from '@mcpfy/sdk';
import { z } from 'zod';

export default defineServer({
  name: 'billing-ledger',
  version: '0.1.0',
  tools: [
    tool({
      name: 'list_invoices',
      description: 'Page through invoices for a customer.',
      input: z.object({ customerId: z.string() }),
      async handler({ customerId }, ctx) {
        ctx.log.info('listing invoices', { customerId });
        return { invoices: await db.invoices.byCustomer(customerId) };
      },
    }),
  ],
});` },
      { kind: 'note', tone: 'info', text: 'Descriptions are read by the model, not just by humans. A precise description measurably reduces wrong-tool selection.' },
      { kind: 'h2', text: 'Run it locally' },
      { kind: 'code', language: 'bash', code: 'mcpfy dev\n\n  ▸ billing-ledger listening on http://localhost:8787/mcp\n  ▸ inspector at http://localhost:8787/__inspect' },
      { kind: 'h2', text: 'Deploy' },
      { kind: 'code', language: 'bash', code: 'mcpfy deploy' },
      { kind: 'p', text: 'The build bundles your tools, type-checks every schema and runs a synthetic initialize → tools/list handshake. If the handshake fails, the release is not promoted and your previous version keeps serving.' },
      { kind: 'h2', text: 'Connect an assistant' },
      { kind: 'steps', items: [
        'Copy the server URL from the deploy output.',
        'In your assistant, add a custom MCP connector pointing at that URL.',
        'Approve the scopes the server requests.',
        'Ask the assistant to call one of your tools and watch the trace land in the dashboard.',
      ] },
    ],
  },
  {
    slug: 'cli',
    title: 'CLI reference',
    description: 'Every mcpfy command, its flags and what it does.',
    section: 'Reference',
    blocks: [
      { kind: 'p', text: 'The CLI is the primary interface to the platform. Every dashboard action has a command equivalent so the whole workflow scripts cleanly in CI.' },
      { kind: 'h2', text: 'Commands' },
      { kind: 'table', head: ['Command', 'What it does'], rows: [
        ['mcpfy login', 'Authorize the CLI against your account.'],
        ['mcpfy init <name>', 'Scaffold a new server project.'],
        ['mcpfy dev', 'Run the server locally with the inspector attached.'],
        ['mcpfy deploy', 'Build, verify and promote a release.'],
        ['mcpfy logs <server>', 'Tail structured logs.'],
        ['mcpfy trace <id>', 'Print a single trace with tool timings.'],
        ['mcpfy rollback <server>', 'Promote the previous ready deployment.'],
        ['mcpfy tokens', 'Create, list and revoke scoped tokens.'],
      ] },
      { kind: 'h2', text: 'Common flags' },
      { kind: 'list', items: [
        '--env <name> — target a named environment (production, preview, or your own).',
        '--json — machine-readable output for CI pipelines.',
        '--region <code> — pin the deploy to a region such as iad1 or fra1.',
        '--yes — skip interactive confirmation prompts.',
      ] },
      { kind: 'h2', text: 'Deploying from CI' },
      { kind: 'code', language: 'yaml', code: `- name: Deploy MCP server
  run: npx mcpfy deploy --yes --json
  env:
    MCPFY_TOKEN: \${{ secrets.MCPFY_TOKEN }}` },
      { kind: 'note', tone: 'warn', text: 'Use a deploy-scoped token in CI. A personal token carries your full account permissions.' },
    ],
  },
  {
    slug: 'transports',
    title: 'Transports',
    description: 'Streamable HTTP, SSE and stdio — when to use each.',
    section: 'Core concepts',
    blocks: [
      { kind: 'p', text: 'MCP is transport-agnostic. mcpfy supports the three transports in common use and will serve whichever your server declares.' },
      { kind: 'h2', text: 'Streamable HTTP' },
      { kind: 'p', text: 'The default and the right choice for almost every hosted server. A single endpoint handles requests and streams responses, which survives load balancers and scales horizontally without sticky sessions.' },
      { kind: 'h2', text: 'Server-sent events' },
      { kind: 'p', text: 'Supported for compatibility with older clients. SSE requires session affinity, so throughput per instance is lower. Prefer streamable HTTP for new work.' },
      { kind: 'h2', text: 'stdio' },
      { kind: 'p', text: 'For servers that run next to the client rather than in the cloud — a local developer tool, for instance. mcpfy can still build, version and distribute a stdio server even though it does not host the process.' },
      { kind: 'table', head: ['Transport', 'Hosted', 'Session affinity', 'Best for'], rows: [
        ['streamable-http', 'Yes', 'Not required', 'Production servers'],
        ['sse', 'Yes', 'Required', 'Legacy clients'],
        ['stdio', 'No', 'N/A', 'Local tools'],
      ] },
    ],
  },
  {
    slug: 'auth',
    title: 'Auth & scopes',
    description: 'Token scoping, per-tool policies and write confirmation.',
    section: 'Core concepts',
    blocks: [
      { kind: 'p', text: 'An MCP server usually reaches real systems, so authorization is the part worth getting right before you publish anything.' },
      { kind: 'h2', text: 'Scoped tokens' },
      { kind: 'p', text: 'Tokens can be restricted to a subset of tools. A token that may only read is physically unable to call a write tool, regardless of what the model asks for.' },
      { kind: 'code', language: 'bash', code: `mcpfy tokens create \\
  --server billing-ledger \\
  --allow list_invoices,get_subscription \\
  --rate 60/min` },
      { kind: 'h2', text: 'Per-tool policies' },
      { kind: 'list', items: [
        'rate — requests per minute, per token.',
        'confirm — require explicit user approval before the tool executes.',
        'audit — write every call to the audit log with full arguments.',
        'disabled — keep the tool deployed but refuse calls.',
      ] },
      { kind: 'h2', text: 'Confirming writes' },
      { kind: 'p', text: 'Mark any tool that mutates state with confirm. The server returns a confirmation challenge instead of executing, and the assistant must surface it to the user before the call proceeds.' },
      { kind: 'code', language: 'ts', code: `tool({
  name: 'create_ticket',
  policy: { confirm: true, audit: true },
  // ...
})` },
      { kind: 'note', tone: 'warn', text: 'Treat tool arguments as untrusted input. They are produced by a model that may be reasoning over content you do not control.' },
    ],
  },
  {
    slug: 'observability',
    title: 'Tracing & logs',
    description: 'Spans, structured logs and how to debug a slow tool call.',
    section: 'Operating',
    blocks: [
      { kind: 'p', text: 'Every tools/call produces a span. The span records the arguments, the result size, downstream HTTP timings and the final status.' },
      { kind: 'h2', text: 'Reading a trace' },
      { kind: 'steps', items: [
        'Open the server in the dashboard and pick the Traces tab.',
        'Filter by tool name or status to isolate the failing calls.',
        'Expand a span to see arguments and downstream timings.',
        'Use Replay to re-run the exact call against the current deployment.',
      ] },
      { kind: 'h2', text: 'Structured logging' },
      { kind: 'code', language: 'ts', code: `ctx.log.info('cache miss', { key, ageMs });
ctx.log.error('upstream failed', { status: res.status });` },
      { kind: 'p', text: 'Log fields are indexed, so you can filter on them directly rather than grepping message text.' },
      { kind: 'h2', text: 'Debugging latency' },
      { kind: 'list', items: [
        'Compare p95 against p50 — a wide gap usually means an unbounded downstream call.',
        'Check the result size; oversized payloads slow the model down as much as the network.',
        'Look for tools with a high call count and a small result — those are candidates for caching.',
      ] },
    ],
  },
  {
    slug: 'publishing',
    title: 'Publishing a connector',
    description: 'Promote a verified server to assistant directories.',
    section: 'Operating',
    blocks: [
      { kind: 'p', text: 'Publishing turns a deployed server into an entry users can install from an assistant directory. The same build serves every target.' },
      { kind: 'h2', text: 'Requirements' },
      { kind: 'list', items: [
        'A production deployment in the ready state.',
        'A description and icon for every tool.',
        'A privacy policy URL and a support contact.',
        'Passing the automated review checks.',
      ] },
      { kind: 'h2', text: 'Publish' },
      { kind: 'code', language: 'bash', code: 'mcpfy publish billing-ledger --target claude,chatgpt' },
      { kind: 'h2', text: 'Staged rollout' },
      { kind: 'p', text: 'New versions roll out to a percentage of installs first. If the error rate on the new version exceeds its budget, the rollout halts automatically and holds at the last healthy version.' },
      { kind: 'note', tone: 'info', text: 'Version your tool schemas additively. Removing a field is a breaking change for every assistant that already learned your tool.' },
    ],
  },
];

export function getDoc(slug: string): DocPage | undefined {
  return docs.find((d) => d.slug === slug);
}

export const docSections = Array.from(new Set(docs.map((d) => d.section)));
