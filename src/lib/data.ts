import type { LogLine, McpServer, TimePoint } from './types';

export const servers: McpServer[] = [
  {
    id: 'srv_stripe_ledger',
    name: 'Billing Ledger',
    slug: 'billing-ledger',
    description: 'Read-only access to invoices, subscriptions and payout history.',
    status: 'live',
    runtime: 'node',
    transport: 'streamable-http',
    region: 'iad1',
    url: 'https://billing-ledger.mcpfy.app/mcp',
    version: '2.4.1',
    updatedAt: '2026-08-20T08:12:00.000Z',
    calls30d: 184320,
    p95Ms: 142,
    errorRate: 0.4,
    uptime: 99.98,
    connectors: ['Claude', 'ChatGPT'],
    tools: [
      { name: 'list_invoices', description: 'Page through invoices for a customer.', calls30d: 82140, p95Ms: 120, errorRate: 0.2 },
      { name: 'get_subscription', description: 'Fetch a single subscription by id.', calls30d: 61220, p95Ms: 98, errorRate: 0.1 },
      { name: 'summarize_payouts', description: 'Aggregate payouts across a date range.', calls30d: 40960, p95Ms: 260, errorRate: 1.1 },
    ],
    deployments: [
      { id: 'dpl_9f21', sha: 'a41c9de', message: 'Cache payout aggregation for 60s', author: 'priya', status: 'ready', createdAt: '2026-08-20T08:12:00.000Z', durationSec: 46 },
      { id: 'dpl_9f20', sha: '77b2e10', message: 'Add cursor pagination to list_invoices', author: 'marco', status: 'ready', createdAt: '2026-08-19T16:40:00.000Z', durationSec: 52 },
      { id: 'dpl_9f19', sha: '1de8845', message: 'Bump mcp sdk to 2.3', author: 'priya', status: 'error', createdAt: '2026-08-19T11:02:00.000Z', durationSec: 38 },
    ],
  },
  {
    id: 'srv_docs_search',
    name: 'Docs Search',
    slug: 'docs-search',
    description: 'Hybrid semantic search across product documentation and changelogs.',
    status: 'live',
    runtime: 'python',
    transport: 'streamable-http',
    region: 'sfo1',
    url: 'https://docs-search.mcpfy.app/mcp',
    version: '1.9.0',
    updatedAt: '2026-08-19T21:30:00.000Z',
    calls30d: 96410,
    p95Ms: 310,
    errorRate: 0.9,
    uptime: 99.94,
    connectors: ['Claude'],
    tools: [
      { name: 'search_docs', description: 'Hybrid BM25 + vector search over docs.', calls30d: 71200, p95Ms: 280, errorRate: 0.7 },
      { name: 'get_page', description: 'Return a rendered doc page as markdown.', calls30d: 25210, p95Ms: 140, errorRate: 1.4 },
    ],
    deployments: [
      { id: 'dpl_7c88', sha: 'e93f2a1', message: 'Rerank with cross-encoder', author: 'sam', status: 'ready', createdAt: '2026-08-19T21:30:00.000Z', durationSec: 71 },
      { id: 'dpl_7c87', sha: 'c10b7f4', message: 'Index changelog entries', author: 'sam', status: 'ready', createdAt: '2026-08-17T09:15:00.000Z', durationSec: 64 },
    ],
  },
  {
    id: 'srv_warehouse',
    name: 'Warehouse SQL',
    slug: 'warehouse-sql',
    description: 'Guarded analytical queries against the read replica with row limits.',
    status: 'degraded',
    runtime: 'node',
    transport: 'sse',
    region: 'fra1',
    url: 'https://warehouse-sql.mcpfy.app/mcp',
    version: '0.8.3',
    updatedAt: '2026-08-20T06:55:00.000Z',
    calls30d: 41870,
    p95Ms: 890,
    errorRate: 4.7,
    uptime: 98.71,
    connectors: ['ChatGPT'],
    tools: [
      { name: 'run_query', description: 'Execute a read-only SQL statement.', calls30d: 31240, p95Ms: 940, errorRate: 5.9 },
      { name: 'describe_table', description: 'Return the schema for a table.', calls30d: 10630, p95Ms: 210, errorRate: 0.6 },
    ],
    deployments: [
      { id: 'dpl_4a12', sha: '5b7c332', message: 'Raise statement timeout to 30s', author: 'dana', status: 'ready', createdAt: '2026-08-20T06:55:00.000Z', durationSec: 44 },
      { id: 'dpl_4a11', sha: '9ee4c08', message: 'Add query cost guard', author: 'dana', status: 'ready', createdAt: '2026-08-18T13:20:00.000Z', durationSec: 49 },
    ],
  },
  {
    id: 'srv_tickets',
    name: 'Support Tickets',
    slug: 'support-tickets',
    description: 'Create, search and triage support tickets with scoped write access.',
    status: 'building',
    runtime: 'edge',
    transport: 'streamable-http',
    region: 'global',
    url: 'https://support-tickets.mcpfy.app/mcp',
    version: '3.0.0-rc.2',
    updatedAt: '2026-08-20T09:41:00.000Z',
    calls30d: 22940,
    p95Ms: 88,
    errorRate: 0.3,
    uptime: 99.99,
    connectors: ['Claude', 'ChatGPT'],
    tools: [
      { name: 'search_tickets', description: 'Full-text search over open tickets.', calls30d: 14120, p95Ms: 76, errorRate: 0.2 },
      { name: 'create_ticket', description: 'Open a ticket on behalf of a user.', calls30d: 6210, p95Ms: 104, errorRate: 0.5 },
      { name: 'assign_ticket', description: 'Route a ticket to a queue or owner.', calls30d: 2610, p95Ms: 92, errorRate: 0.3 },
    ],
    deployments: [
      { id: 'dpl_2b45', sha: 'f0a1cc7', message: 'Move to edge runtime', author: 'marco', status: 'building', createdAt: '2026-08-20T09:41:00.000Z', durationSec: 0 },
      { id: 'dpl_2b44', sha: '3c9d551', message: 'Scope write tokens per queue', author: 'priya', status: 'ready', createdAt: '2026-08-16T10:05:00.000Z', durationSec: 41 },
    ],
  },
  {
    id: 'srv_crm',
    name: 'CRM Bridge',
    slug: 'crm-bridge',
    description: 'Unified contact and pipeline access across CRM providers.',
    status: 'paused',
    runtime: 'node',
    transport: 'stdio',
    region: 'iad1',
    url: 'https://crm-bridge.mcpfy.app/mcp',
    version: '1.2.7',
    updatedAt: '2026-08-11T15:00:00.000Z',
    calls30d: 8120,
    p95Ms: 168,
    errorRate: 1.2,
    uptime: 99.5,
    connectors: [],
    tools: [
      { name: 'find_contact', description: 'Look up a contact by email or domain.', calls30d: 5410, p95Ms: 150, errorRate: 0.9 },
      { name: 'list_deals', description: 'List pipeline deals for an account.', calls30d: 2710, p95Ms: 190, errorRate: 1.8 },
    ],
    deployments: [
      { id: 'dpl_1188', sha: 'bb31a09', message: 'Pause scheduled syncs', author: 'dana', status: 'ready', createdAt: '2026-08-11T15:00:00.000Z', durationSec: 35 },
    ],
  },
];

export function getServer(slug: string): McpServer | undefined {
  return servers.find((s) => s.slug === slug);
}

export const trafficSeries: TimePoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = new Date(Date.UTC(2026, 6, 22 + i));
  const wave = Math.sin(i / 3.1) * 2200;
  const drift = i * 260;
  const calls = Math.round(9800 + wave + drift);
  return {
    t: day.toISOString().slice(0, 10),
    calls,
    errors: Math.round(calls * (0.004 + (i % 7 === 3 ? 0.021 : 0.002))),
    p95: Math.round(150 + Math.sin(i / 2.3) * 40 + (i % 9 === 5 ? 180 : 0)),
  };
});

export const recentLogs: LogLine[] = [
  { id: 'log_1', at: '2026-08-20T09:44:12.000Z', level: 'info', server: 'billing-ledger', message: 'tools/call list_invoices customer=cus_9f21 → 200 in 118ms' },
  { id: 'log_2', at: '2026-08-20T09:43:58.000Z', level: 'warn', server: 'warehouse-sql', message: 'run_query exceeded soft cost budget (est. 4.2M rows scanned)' },
  { id: 'log_3', at: '2026-08-20T09:43:31.000Z', level: 'error', server: 'warehouse-sql', message: 'run_query failed: statement timeout after 30000ms' },
  { id: 'log_4', at: '2026-08-20T09:42:47.000Z', level: 'info', server: 'docs-search', message: 'search_docs q="rate limits" → 8 results in 262ms' },
  { id: 'log_5', at: '2026-08-20T09:41:02.000Z', level: 'info', server: 'support-tickets', message: 'build started for f0a1cc7 (edge runtime)' },
  { id: 'log_6', at: '2026-08-20T09:40:19.000Z', level: 'info', server: 'billing-ledger', message: 'tools/list → 3 tools in 12ms' },
  { id: 'log_7', at: '2026-08-20T09:39:55.000Z', level: 'warn', server: 'docs-search', message: 'get_page cache miss ratio above 40% over 5m window' },
];

export const changelog = [
  {
    version: '2026.08',
    date: '2026-08-18',
    title: 'Edge runtime for MCP servers',
    body: 'Deploy servers to the edge runtime for sub-100ms cold starts. Opt in per server from the deploy settings tab.',
    tags: ['runtime', 'performance'],
  },
  {
    version: '2026.07',
    date: '2026-07-29',
    title: 'Tool-level tracing',
    body: 'Every tools/call now emits a span with arguments, result size and downstream HTTP timings. Filter traces by tool name and status.',
    tags: ['observability'],
  },
  {
    version: '2026.07',
    date: '2026-07-11',
    title: 'One-click connector publishing',
    body: 'Publish a verified server straight to assistant connector directories without leaving the dashboard.',
    tags: ['publishing'],
  },
  {
    version: '2026.06',
    date: '2026-06-24',
    title: 'Scoped tokens and per-tool policies',
    body: 'Restrict which tools a token may call, add per-tool rate limits and require confirmation for write operations.',
    tags: ['security'],
  },
];
