/**
 * Mock data for the signed-in product surface. Every dashboard screen reads
 * from here, so swapping in a real backend later means replacing these
 * accessors rather than touching the UI.
 */

export type ServerStatus = "ready" | "building" | "error" | "paused";
export type Runtime = "typescript" | "python" | "docker";

export type Deployment = {
  id: string;
  sha: string;
  message: string;
  branch: string;
  environment: "production" | "preview";
  status: ServerStatus;
  author: string;
  duration: string;
  createdAt: string;
  url: string;
};

export type McpServer = {
  slug: string;
  name: string;
  description: string;
  status: ServerStatus;
  runtime: Runtime;
  repo: string;
  branch: string;
  url: string;
  region: string;
  toolCalls30d: number;
  errorRate: number;
  p95: number;
  sessions30d: number;
  lastDeployed: string;
  tools: { name: string; calls: number; p95: number; errorRate: number }[];
  deployments: Deployment[];
};

export type Organization = {
  name: string;
  slug: string;
  plan: string;
  description: string;
  creditsUsed: number;
  creditsIncluded: number;
};

export const organization: Organization = {
  name: "Acme Labs",
  slug: "acme-labs",
  plan: "Hobby",
  description: "MCP servers powering the Acme support and billing agents.",
  creditsUsed: 18.4,
  creditsIncluded: 25,
};

/** Every org the signed-in user belongs to, for the topbar switcher. */
export const organizations: Organization[] = [
  organization,
  {
    name: "Nutritiscan",
    slug: "nutritiscan",
    plan: "Free",
    description: "",
    creditsUsed: 0,
    creditsIncluded: 5,
  },
  {
    name: "Personal",
    slug: "personal",
    plan: "Free",
    description: "",
    creditsUsed: 1.2,
    creditsIncluded: 5,
  },
];

export const servers: McpServer[] = [
  {
    slug: "orders-mcp",
    name: "orders-mcp",
    description: "Order lookup and fulfilment tools for the support agent.",
    status: "ready",
    runtime: "typescript",
    repo: "acme-labs/orders-mcp",
    branch: "main",
    url: "orders-mcp.run.mcpfy.ai/mcp",
    region: "iad1",
    toolCalls30d: 128_430,
    errorRate: 0.4,
    p95: 210,
    sessions30d: 8_921,
    lastDeployed: "2h ago",
    tools: [
      { name: "search_orders", calls: 61_204, p95: 180, errorRate: 0.2 },
      { name: "get_order", calls: 44_910, p95: 120, errorRate: 0.1 },
      { name: "refund_order", calls: 14_882, p95: 640, errorRate: 1.9 },
      { name: "track_shipment", calls: 7_434, p95: 310, errorRate: 0.6 },
    ],
    deployments: [
      {
        id: "dpl_9f2a",
        sha: "a91c4de",
        message: "Add refund_order idempotency key",
        branch: "main",
        environment: "production",
        status: "ready",
        author: "priya",
        duration: "41s",
        createdAt: "2h ago",
        url: "orders-mcp.run.mcpfy.ai/mcp",
      },
      {
        id: "dpl_7c1b",
        sha: "3e8b902",
        message: "Widen search_orders date filter",
        branch: "feat/date-filter",
        environment: "preview",
        status: "ready",
        author: "arjun",
        duration: "38s",
        createdAt: "6h ago",
        url: "orders-mcp--br-feat-date-filter.run.mcpfy.ai/mcp",
      },
      {
        id: "dpl_5aa0",
        sha: "77d1f4c",
        message: "Bump SDK to 1.4.2",
        branch: "main",
        environment: "production",
        status: "ready",
        author: "priya",
        duration: "44s",
        createdAt: "yesterday",
        url: "orders-mcp.run.mcpfy.ai/mcp",
      },
    ],
  },
  {
    slug: "docs-search",
    name: "docs-search",
    description: "Semantic search over the public documentation corpus.",
    status: "building",
    runtime: "python",
    repo: "acme-labs/docs-search",
    branch: "main",
    url: "docs-search.run.mcpfy.ai/mcp",
    region: "fra1",
    toolCalls30d: 54_112,
    errorRate: 1.2,
    p95: 480,
    sessions30d: 3_204,
    lastDeployed: "building now",
    tools: [
      { name: "search_docs", calls: 41_880, p95: 420, errorRate: 0.9 },
      { name: "get_page", calls: 12_232, p95: 260, errorRate: 0.3 },
    ],
    deployments: [
      {
        id: "dpl_2b77",
        sha: "c0d4471",
        message: "Reindex with new embedding model",
        branch: "main",
        environment: "production",
        status: "building",
        author: "sam",
        duration: "—",
        createdAt: "just now",
        url: "docs-search.run.mcpfy.ai/mcp",
      },
      {
        id: "dpl_1f30",
        sha: "9ab77e1",
        message: "Cache page fetches for 5m",
        branch: "main",
        environment: "production",
        status: "ready",
        author: "sam",
        duration: "1m 12s",
        createdAt: "3d ago",
        url: "docs-search.run.mcpfy.ai/mcp",
      },
    ],
  },
  {
    slug: "billing-connector",
    name: "billing-connector",
    description: "Claude connector for invoices, plans and usage records.",
    status: "error",
    runtime: "docker",
    repo: "acme-labs/billing-connector",
    branch: "main",
    url: "billing-connector.run.mcpfy.ai/mcp",
    region: "iad1",
    toolCalls30d: 9_870,
    errorRate: 7.8,
    p95: 1_240,
    sessions30d: 612,
    lastDeployed: "4d ago",
    tools: [
      { name: "list_invoices", calls: 6_140, p95: 890, errorRate: 4.1 },
      { name: "get_usage", calls: 3_730, p95: 1_610, errorRate: 13.9 },
    ],
    deployments: [
      {
        id: "dpl_0e12",
        sha: "51ff2ac",
        message: "Switch to slim base image",
        branch: "main",
        environment: "production",
        status: "error",
        author: "arjun",
        duration: "2m 04s",
        createdAt: "4d ago",
        url: "billing-connector.run.mcpfy.ai/mcp",
      },
    ],
  },
];

export function getServer(slug: string) {
  return servers.find((s) => s.slug === slug);
}

export function getDeployment(serverSlug: string, id: string) {
  const server = getServer(serverSlug);
  const deployment = server?.deployments.find((d) => d.id === id);
  if (!server || !deployment) return undefined;
  return { server, deployment };
}

/* ------------------------------ build details ----------------------------- */

export type StepStatus = "done" | "running" | "failed" | "skipped";
export type BuildStep = { name: string; status: StepStatus; duration: string };
export type LogLine = {
  n: number;
  at: string;
  level: "info" | "warn" | "error";
  step: string;
  msg: string;
};

const installCommand: Record<Runtime, string> = {
  typescript: "npm ci",
  python: "uv sync --frozen",
  docker: "docker build -f Dockerfile .",
};

/** Build pipeline for one deployment, shaped by how far it got. */
export function buildSteps(deployment: Deployment): BuildStep[] {
  const names = ["Queued", "Clone", "Install", "Build", "Deploy", "Health check"];

  if (deployment.status === "building") {
    const durations = ["1s", "3s", "18s", "", "", ""];
    return names.map((name, i) => ({
      name,
      status: i < 3 ? "done" : i === 3 ? "running" : "skipped",
      duration: durations[i] || "—",
    }));
  }

  if (deployment.status === "error") {
    const durations = ["1s", "4s", "1m 52s", "7s", "", ""];
    return names.map((name, i) => ({
      name,
      status: i < 3 ? "done" : i === 3 ? "failed" : "skipped",
      duration: durations[i] || "—",
    }));
  }

  const durations = ["1s", "3s", "21s", "9s", "5s", "2s"];
  return names.map((name, i) => ({
    name,
    status: "done" as StepStatus,
    duration: durations[i],
  }));
}

/** Build log for one deployment. Realistic enough to design the viewer against. */
export function buildLog(server: McpServer, deployment: Deployment): LogLine[] {
  const install = installCommand[server.runtime];
  const base: Omit<LogLine, "n">[] = [
    { at: "12:01:02.114", level: "info", step: "Queued", msg: `Build queued for ${deployment.sha} on ${deployment.branch}` },
    { at: "12:01:03.006", level: "info", step: "Clone", msg: `Cloning ${server.repo} (depth 1, branch ${deployment.branch})` },
    { at: "12:01:06.482", level: "info", step: "Clone", msg: `HEAD is now at ${deployment.sha} ${deployment.message}` },
    { at: "12:01:06.910", level: "info", step: "Install", msg: `Detected ${server.runtime} project — running ${install}` },
    { at: "12:01:19.774", level: "warn", step: "Install", msg: "2 packages are looking for funding" },
    { at: "12:01:27.301", level: "info", step: "Install", msg: "Dependencies installed" },
  ];

  if (deployment.status === "error") {
    const lines: Omit<LogLine, "n">[] = [
      ...base,
      { at: "12:01:27.590", level: "info", step: "Build", msg: "Building MCP server bundle" },
      { at: "12:01:33.884", level: "error", step: "Build", msg: "Error: Cannot find module '@mcpfy/runtime' imported from src/index.ts" },
      { at: "12:01:33.902", level: "error", step: "Build", msg: "    at packageResolve (node:internal/modules/esm/resolve:892:9)" },
      { at: "12:01:34.117", level: "error", step: "Build", msg: "Build failed with exit code 1" },
      { at: "12:01:34.220", level: "info", step: "Build", msg: "Previous production deployment left serving traffic" },
    ];
    return lines.map((l, i) => ({ ...l, n: i + 1 }));
  }

  if (deployment.status === "building") {
    const lines: Omit<LogLine, "n">[] = [
      ...base,
      { at: "12:01:27.590", level: "info", step: "Build", msg: "Building MCP server bundle" },
      { at: "12:01:31.205", level: "info", step: "Build", msg: "Collecting tool schemas" },
    ];
    return lines.map((l, i) => ({ ...l, n: i + 1 }));
  }

  const lines: Omit<LogLine, "n">[] = [
    ...base,
    { at: "12:01:27.590", level: "info", step: "Build", msg: "Building MCP server bundle" },
    { at: "12:01:33.418", level: "info", step: "Build", msg: `Registered ${server.tools.length} tools, 2 resources, 1 prompt` },
    { at: "12:01:36.902", level: "info", step: "Deploy", msg: `Uploading build output (${server.runtime === "docker" ? "image" : "bundle"})` },
    { at: "12:01:41.663", level: "info", step: "Deploy", msg: `Assigned ${deployment.url}` },
    { at: "12:01:43.201", level: "info", step: "Health check", msg: "initialize handshake ok (protocol 2025-06-18)" },
    { at: "12:01:43.884", level: "info", step: "Health check", msg: "tools/list returned in 24ms" },
    { at: "12:01:44.010", level: "info", step: "Health check", msg: "Deployment is live" },
  ];
  return lines.map((l, i) => ({ ...l, n: i + 1 }));
}

/* ------------------------------- org summary ------------------------------ */

export const orgStats = [
  { label: "Tool calls", value: "192,412", delta: "+12.4%", hint: "last 30 days" },
  { label: "Sessions", value: "12,737", delta: "+8.1%", hint: "last 30 days" },
  { label: "Error rate", value: "1.4%", delta: "+0.6pp", hint: "last 30 days" },
  { label: "p95 latency", value: "310ms", delta: "-24ms", hint: "last 30 days" },
];

export const needsAttention = [
  {
    title: "billing-connector failed to build",
    detail: "Deployment dpl_0e12 exited with code 1 during the install step.",
    severity: "error" as const,
    href: "/dashboard/servers/billing-connector/deployments",
    action: "View logs",
  },
  {
    title: "get_usage error rate is 13.9%",
    detail: "Above the 5% threshold for the last 24 hours across ChatGPT clients.",
    severity: "error" as const,
    href: "/dashboard/servers/billing-connector/analytics",
    action: "Inspect tool",
  },
  {
    title: "orders-mcp has 3 unresolved publish checks",
    detail: "Security and metadata checks must pass before submitting to the store.",
    severity: "warning" as const,
    href: "/dashboard/servers/orders-mcp/publish-checks",
    action: "Review checks",
  },
];

/* ------------------------------ traffic chart ----------------------------- */

/** Daily tool-call volume for the last 30 days, oldest first. */
export const trafficSeries = [
  2100, 2380, 2210, 2640, 3010, 2870, 2450, 2790, 3320, 3580, 3410, 3900, 4120,
  3870, 3640, 4210, 4480, 4310, 4720, 5010, 4880, 4560, 5240, 5610, 5480, 5930,
  6210, 6040, 6480, 6910,
];

export const clientBreakdown = [
  { client: "ChatGPT", share: 41, calls: "78,889" },
  { client: "Claude", share: 33, calls: "63,496" },
  { client: "Cursor", share: 14, calls: "26,938" },
  { client: "Claude Code", share: 8, calls: "15,393" },
  { client: "Other", share: 4, calls: "7,696" },
];

/* -------------------------------- sessions -------------------------------- */

export const sessions = [
  { id: "ses_8f21", client: "ChatGPT", country: "US", calls: 14, duration: "4m 12s", started: "12m ago", status: "ok" },
  { id: "ses_7d09", client: "Claude", country: "IN", calls: 6, duration: "1m 48s", started: "31m ago", status: "ok" },
  { id: "ses_6b55", client: "Cursor", country: "DE", calls: 22, duration: "9m 03s", started: "1h ago", status: "error" },
  { id: "ses_5a31", client: "ChatGPT", country: "GB", calls: 3, duration: "0m 41s", started: "2h ago", status: "ok" },
  { id: "ses_4c88", client: "Claude Code", country: "US", calls: 31, duration: "12m 27s", started: "3h ago", status: "ok" },
];

export const gatewayRequests = [
  { id: "req_a10", method: "tools/call", tool: "search_orders", status: 200, ms: 174, client: "ChatGPT", at: "12:04:11" },
  { id: "req_a09", method: "tools/list", tool: "—", status: 200, ms: 22, client: "ChatGPT", at: "12:04:09" },
  { id: "req_a08", method: "tools/call", tool: "refund_order", status: 500, ms: 1_812, client: "Claude", at: "12:03:52" },
  { id: "req_a07", method: "resources/read", tool: "order://1182", status: 200, ms: 96, client: "Claude", at: "12:03:44" },
  { id: "req_a06", method: "tools/call", tool: "get_order", status: 200, ms: 118, client: "Cursor", at: "12:03:31" },
];

export const runtimeLogs = [
  { level: "info", at: "12:04:11.208", msg: "tools/call search_orders ok in 174ms" },
  { level: "info", at: "12:04:09.881", msg: "tools/list -> 4 tools" },
  { level: "error", at: "12:03:52.117", msg: "refund_order: upstream timeout after 1800ms" },
  { level: "warn", at: "12:03:51.004", msg: "refund_order: retry 1/2" },
  { level: "info", at: "12:03:44.620", msg: "resources/read order://1182 ok in 96ms" },
  { level: "info", at: "12:03:31.442", msg: "tools/call get_order ok in 118ms" },
];

/* ------------------------------ config screens ---------------------------- */

export const envVars = [
  { key: "DATABASE_URL", environments: "Production, Preview", updated: "2d ago" },
  { key: "STRIPE_SECRET_KEY", environments: "Production", updated: "2d ago" },
  { key: "OPENAI_API_KEY", environments: "Production, Preview", updated: "9d ago" },
  { key: "LOG_LEVEL", environments: "Preview", updated: "9d ago" },
];

export const domains = [
  { domain: "mcp.acme.com", type: "Custom", status: "Active", tls: "Auto-renewing" },
  { domain: "orders-mcp.run.mcpfy.ai", type: "System", status: "Active", tls: "Managed" },
];

export const publishChecks = [
  { category: "Protocol & discovery", passed: 6, total: 6 },
  { category: "Tool conformance", passed: 8, total: 9 },
  { category: "Security & policy", passed: 5, total: 7 },
  { category: "Metadata & configuration", passed: 4, total: 5 },
  { category: "Domain, TLS & CSP", passed: 4, total: 4 },
  { category: "Assets", passed: 3, total: 3 },
];

export const testSuites = [
  { name: "Order lookup happy path", clients: "ChatGPT, Claude", models: "GPT, Claude, Gemini", result: "passing", ran: "2h ago" },
  { name: "Refund guardrails", clients: "ChatGPT", models: "GPT, Claude", result: "failing", ran: "2h ago" },
  { name: "Docs retrieval quality", clients: "Claude", models: "Claude", result: "passing", ran: "1d ago" },
];

export type MemberStatus = "active" | "invited";

export type Member = {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Developer" | "Viewer";
  status: MemberStatus;
  added: string;
  lastActivity: string | null;
  you?: boolean;
};

export const team: Member[] = [
  { name: "Priya Nair", email: "priya@acme.com", role: "Owner", status: "active", added: "Jan 2026", lastActivity: "12m ago", you: true },
  { name: "Arjun Mehta", email: "arjun@acme.com", role: "Admin", status: "active", added: "Feb 2026", lastActivity: "3h ago" },
  { name: "Sam Okafor", email: "sam@acme.com", role: "Developer", status: "active", added: "Apr 2026", lastActivity: "yesterday" },
  { name: "Lena Fischer", email: "lena@acme.com", role: "Viewer", status: "invited", added: "Jun 2026", lastActivity: null },
];

export const roles = [
  { role: "Owner", can: "Everything, including billing and deleting the organization." },
  { role: "Admin", can: "Manage servers, domains, secrets and members." },
  { role: "Developer", can: "Deploy, run tests and read logs and analytics." },
  { role: "Viewer", can: "Read-only access to analytics and deployments." },
] as const;

export type ApiKey = {
  name: string;
  prefix: string;
  status: "active" | "expired";
  expires: string;
  created: string;
  lastUsed: string | null;
};

export const apiKeys: ApiKey[] = [
  { name: "CI deploys", prefix: "mcpfy_sk_live_9f2a", status: "active", expires: "Never", created: "Feb 2026", lastUsed: "2h ago" },
  { name: "Local CLI", prefix: "mcpfy_sk_live_31bd", status: "active", expires: "1 Mar 2027", created: "Mar 2026", lastUsed: "yesterday" },
];

/* -------------------------- dashboard home summary ------------------------- */

/** The three headline counters on the dashboard home. */
export const homeStats = [
  { label: "Servers", value: servers.length.toLocaleString(), icon: "server" as const },
  { label: "Tool Calls", value: "192,412", icon: "tool" as const },
  { label: "Sessions", value: "12,737", icon: "chat" as const },
];

/** Product changelog surfaced in the "Latest Updates" panel. */
export const changelog = [
  {
    date: "AUG 2026",
    title: "GitHub repository access status on Integrations",
    body: "The Integrations page now shows when a GitHub App installation loses repository access, lists affected servers, and lets you recheck access after restoring permissions on GitHub.",
  },
  {
    date: "AUG 2026",
    title: "Inspector Chat default model updated",
    body: "The dashboard Inspector and Chat tabs now default to the newest reasoning model. Earlier models are still available in the model picker.",
  },
  {
    date: "JUL 2026",
    title: "Preview deployments for every pull request",
    body: "Opening a pull request against a connected repository now builds an isolated preview URL with its own logs, sessions and analytics.",
  },
];

/* ------------------------------- new server ------------------------------- */

export const starterTemplates = [
  {
    name: "Starter",
    description:
      "A minimal template with everything you need to get started. Tools, prompts, resources, and automatic UI widget registration.",
    repo: "mcpfy/template-starter",
  },
  {
    name: "MCP Apps",
    description:
      "Build MCP Apps with interactive widgets. A cute fruit shop demo template to showcase advanced widget features.",
    repo: "mcpfy/template-mcp-apps",
  },
  {
    name: "Blank",
    description:
      "Start from scratch. A clean slate to build your server or MCP app the way you like it.",
    repo: "mcpfy/template-blank",
  },
];

/* -------------------------------- billing --------------------------------- */

/** Line items behind the credit meter, shown in the collapsible breakdown. */
export const usageBreakdown = [
  { item: "Tool-call requests", qty: "192,412", rate: "$0.10 / 1k", amount: "$19.24" },
  { item: "Eval runs", qty: "34", rate: "$1.00 each", amount: "$34.00" },
  { item: "E2E checks", qty: "6", rate: "$2.00 each", amount: "$12.00" },
  { item: "Discovery traffic", qty: "84,120", rate: "not billed", amount: "$0.00" },
];

/* ------------------------------ integrations ------------------------------ */

export type GithubInstallation = {
  account: string;
  type: "User" | "Organization";
  repositories: number;
  status: "connected" | "needs-attention";
  detail?: string;
};

export const githubInstallations: GithubInstallation[] = [
  {
    account: "acme-labs",
    type: "Organization",
    repositories: 14,
    status: "connected",
  },
  {
    account: "priya-nair",
    type: "User",
    repositories: 3,
    status: "needs-attention",
    detail: "Lost access to 1 repository used by billing-connector.",
  },
];
