/**
 * All marketing copy lives here so pages stay layout-only.
 * Testimonials are illustrative personas, not real endorsements.
 */

export type MenuItem = {
  title: string;
  desc: string;
  href: string;
  icon: string;
  /** Tailwind gradient classes for the item's thumbnail tile. */
  tile: string;
};

/** Left group of the Platform mega-menu. */
export const platformCloud: MenuItem[] = [
  {
    title: "MCP Hosting",
    desc: "Deploy MCP apps and servers to production.",
    href: "/platform/hosting",
    icon: "cloud",
    tile: "from-sky-100 to-blue-200 dark:from-sky-500/25 dark:to-blue-500/10",
  },
  {
    title: "Cross-client testing",
    desc: "Run the same checks across ChatGPT, Claude, and more.",
    href: "/platform/cross-client-testing",
    icon: "flask",
    tile: "from-fuchsia-100 to-pink-200 dark:from-fuchsia-500/25 dark:to-pink-500/10",
  },
  {
    title: "Publishing checks",
    desc: "Audit your MCP app against Apps Store and Connector requirements.",
    href: "/platform/publishing-checks",
    icon: "checks",
    tile: "from-amber-100 to-orange-200 dark:from-amber-500/25 dark:to-orange-500/10",
  },
  {
    title: "Cloud Inspector",
    desc: "Trace, replay, and debug MCP traffic in production.",
    href: "/platform/cloud-inspector",
    icon: "search",
    tile: "from-slate-100 to-indigo-200 dark:from-slate-500/25 dark:to-indigo-500/10",
  },
  {
    title: "Public chat",
    desc: "Embeddable chat surfaces for your product.",
    href: "/platform/public-chat",
    icon: "chat",
    tile: "from-rose-100 to-pink-200 dark:from-rose-500/25 dark:to-pink-500/10",
  },
  {
    title: "Analytics",
    desc: "Usage, latency, and reliability in one place.",
    href: "/platform/analytics",
    icon: "chart",
    tile: "from-teal-100 to-emerald-200 dark:from-teal-500/25 dark:to-emerald-500/10",
  },
  {
    title: "Vibe",
    desc: "Create MCP apps with natural language.",
    href: "/vibe",
    icon: "sparkles",
    tile: "from-lime-100 to-stone-200 dark:from-lime-500/20 dark:to-stone-500/10",
  },
];

/** Right group of the Platform mega-menu. */
export const platformOpenSource = [
  {
    title: `${"mcpfy"} SDK`,
    desc: "Open-source full-stack SDK for MCP. Build MCP Apps, Servers, clients, and agents in TypeScript or Python.",
    href: "/sdk",
    tags: ["TS", "PY"],
  },
  {
    title: `${"mcpfy"} Inspector`,
    desc: "Debug and inspect your MCP servers in real-time.",
    href: "/inspector",
    tags: [],
  },
];

/** Solutions mega-menu — a divided grid of two feature cells. */
export const solutionsMenu = [
  {
    title: "MCP Apps",
    desc: "Build MCP Apps for ChatGPT and other chat clients.",
    href: "/docs",
  },
  {
    title: "MCP Servers",
    desc: "Deploy and manage MCP servers at scale.",
    href: "/docs",
  },
];

export const navLinks = [
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
];

/* ---------------------------------- hero --------------------------------- */

export const trustedLogos = [
  "Northwind", "Aperture", "Cogent", "Lumen Labs", "Brightpath",
  "Sundial", "Meridian", "Ironclad", "Blue Harbor", "Kestrel",
];

/* -------------------------------- surfaces -------------------------------- */

export const surfaceGroups = [
  {
    label: "AI Chats",
    items: ["ChatGPT", "Claude", "Gemini Enterprise", "Copilot 365", "CopilotKit"],
  },
  {
    label: "Coding agents",
    items: ["Codex", "Claude Code", "Cursor", "VS Code"],
  },
  {
    label: "Internal agents",
    items: ["OpenAI Agents", "Claude Agent SDK", "Mastra", "LangChain", "Vercel AI SDK"],
  },
];

/* ------------------------------- lifecycle -------------------------------- */

export type LifecycleStage = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  cards: { title: string; desc: string; cta?: string }[];
};

export const lifecycle: LifecycleStage[] = [
  {
    id: "build",
    kicker: "build",
    title: "Start from an SDK, a skill, or a vibe.",
    body: "Scaffold with the mcpfy SDK. Install a skill into your coding agent. Or describe your app and watch it scaffold. Already writing MCP servers? Drop your existing code in unchanged.",
    cards: [
      { title: "SDK", desc: "Scaffold in one command.", cta: "Read the docs" },
      { title: "Skill", desc: "Install the skill for your coding agent.", cta: "Get the skill" },
      { title: "Vibe", desc: "Vibe code your MCP App.", cta: "Try Vibe" },
    ],
  },
  {
    id: "deploy",
    kicker: "deploy",
    title: "One push. Live in seconds.",
    body: "Connect your repo once. Every push auto-deploys to mcpfy Cloud. No YAML. No Dockerfile archaeology.",
    cards: [
      { title: "GitHub App", desc: "Connect once. Every push auto-deploys to mcpfy Cloud.", cta: "Connect" },
      { title: "Preview per branch", desc: "A live, unique URL for every pull request." },
      { title: "Custom domains", desc: "Ship your app under your own domain. SSL handled." },
    ],
  },
  {
    id: "publish",
    kicker: "publish",
    title: "Derisk your path to the marketplaces.",
    body: "Get your app in front of users in ChatGPT and Claude. Submission assets generated for you. Share an embedded chat anywhere you already have an audience.",
    cards: [
      { title: "Marketplace checklists", desc: "Know when you're ready to submit." },
      { title: "Submission assets", desc: "Logo, copy, and screenshots generated for you." },
      { title: "Embedded chat", desc: "Automatic shareable chat for your MCP server." },
    ],
  },
  {
    id: "iterate",
    kicker: "iterate",
    title: "Preview it before a user sees it.",
    body: "Cloud Inspector runs your MCP server against real clients. Fire tool calls, inspect JSON-RPC, swap models — no local setup.",
    cards: [
      { title: "Cloud Inspector", desc: "Debug from any browser.", cta: "Open Inspector" },
      { title: "Model swap", desc: "Test the same call against GPT, Claude, Gemini." },
      { title: "Automatic evals", desc: "Across every model and client.", cta: "Try Evals" },
    ],
  },
  {
    id: "monitor",
    kicker: "monitor",
    title: "Don't go blind in production.",
    body: "See how people actually use your MCP app. Analytics, session replay, and observability built in — so you catch regressions before users report them.",
    cards: [
      { title: "Analytics", desc: "Traffic, tool-call volume, and latency at a glance." },
      { title: "Session tracking", desc: "Replay a user's conversation end-to-end." },
      { title: "Observability", desc: "Traces, error rates, and alerts on regressions." },
    ],
  },
];

/* ------------------------------ testimonials ------------------------------ */

export type Testimonial = { body: string; name: string; handle: string };

export const testimonials: Testimonial[] = [
  { body: "Been meaning to try mcpfy — started a ChatGPT app today and wasn't sure it was the right use case. Turns out it very much is.", name: "Priya Raman", handle: "@priyabuilds" },
  { body: "Solid addition to the MCP client ecosystem. The Inspector alone saved me an afternoon.", name: "Tomas Lindqvist", handle: "@tlindqvist" },
  { body: "Infra isn't just plumbing, it's distribution. Whoever owns the rails agents use to talk to the outside world ends up with real leverage.", name: "Dana Whitfield", handle: "@danawhit" },
  { body: "Easily the smoothest Python path for building an agent-facing MCP server. I can iterate from the CLI and test against a real agent in seconds — most tooling assumes you're only ever in a chat client.", name: "Marcus Oyelaran", handle: "@moyelaran" },
  { body: "The open way to connect any model to any MCP server and build agents with real tool access, without getting locked into one vendor's client.", name: "Elena Sokolova", handle: "@esokolova" },
  { body: "Shipped our internal MCP server to production before standup finished. git push, done. 🚀", name: "Reuben Adeyemi", handle: "@reubendev" },
  { body: "Widget support landing on the open spec matters — the whole community benefits when compatibility is the default instead of an afterthought.", name: "Ines Ferreira", handle: "@inesferreira" },
  { body: "mcpfy is really onto something here.", name: "Darren Cole", handle: "@dcole" },
  { body: "Open-source dev tools and infrastructure for MCP, helping teams build and deploy custom agents fast. Exactly the layer that was missing.", name: "Hana Kobayashi", handle: "@hanakb" },
  { body: "Great to see mcpfy shipping in the open. We're running a hack night with them next week to put it through its paces 😉", name: "Philipp Braun", handle: "@pbraun" },
  { body: "MCP evals are finally a first-class thing and not a pile of bash scripts I maintain alone 👀", name: "Jeffrey Nwosu", handle: "@jeffnwosu" },
  { body: "Launched! Open infrastructure for MCP agents — spin up and aggregate servers behind a single endpoint with zero friction.", name: "Clara Bennett", handle: "@clarabee" },
  { body: "Sharp execution. They've stripped deployment and aggregation down to one endpoint. Data teams and internal dashboards could slot this in and cut weeks off agent builds.", name: "Victor Tran", handle: "@vtran" },
  { body: "Just found this: an open library that connects any LLM to MCP tools for custom agents, with browsing, search and file access working out of the box.", name: "Aisha Mahmood", handle: "@aishamah" },
  { body: "Code mode in the client is a great call. Define which servers the agent can use, flip it on, and the agent discovers tools and executes against them as plain modules.", name: "Pietro Zullo", handle: "@pzullo" },
];

/* ---------------------------------- stats --------------------------------- */

export const stats = [
  { value: "9M+", label: "SDK downloads across Python and TypeScript.", tags: ["Python", "TypeScript"] },
  { value: "10k+", label: "GitHub stars. Open-source since day one.", cta: "Contribute" },
  { value: "<60s", label: "From git push to live MCP App or Server.", cta: "Deploy" },
];

/* ----------------------------------- faq ---------------------------------- */

export const faq = [
  {
    q: "What is mcpfy?",
    a: "mcpfy is a platform for deploying, testing, observing, and publishing MCP servers and MCP apps. It's built around an open-source SDK for TypeScript and Python and an open-source MCP Inspector. Deploys run from GitHub, the CLI, or mcpfy's own MCP server, and the platform covers the lifecycle after deploy: cross-client testing, MCP-native analytics, and publishing checks for the ChatGPT Apps Store and Claude Connectors.",
  },
  {
    q: "How fast can I deploy an MCP server on mcpfy?",
    a: "Under 60 seconds from git push to a live MCP endpoint. Connect the GitHub App once and every push deploys automatically, or run npx mcpfy deploy from the CLI. An agent can also drive deployments through mcpfy's official MCP server.",
  },
  {
    q: "Which languages and frameworks does mcpfy support?",
    a: "TypeScript and Python are first-class through the mcpfy SDKs, with presets for other popular MCP frameworks, plus a Dockerfile option for anything else. You can also connect an MCP server hosted elsewhere by URL and use testing, analytics, and publish checks without moving your hosting.",
  },
  {
    q: "How do I test an MCP server across different AI clients?",
    a: "mcpfy test suites exercise your deployed server's tools across clients and swap models between GPT, Claude, and Gemini, with model-judged pass/fail results per client and model. Suites can gate CI, so a regression in any client blocks the merge. The embedded Cloud Inspector also lets you invoke tools, browse resources, and preview widgets against real clients with no local setup.",
  },
  {
    q: "What is the MCP Inspector?",
    a: "The Inspector is an open-source tool for debugging MCP servers: tool testing, resource browsing, prompt testing, real-time JSON-RPC logging, and widget preview. Run it hosted, locally via the CLI, or self-hosted with Docker. Inside the mcpfy dashboard, the Cloud Inspector runs against your deployed server directly.",
  },
  {
    q: "What analytics do I get for my MCP server?",
    a: "Tool calls, sessions, error rates with issue triage, and p50/p95/p99 latency per tool, resource, and prompt. Traffic breaks down by client, client version, protocol version, and country. Session replay shows the full timeline of each session, and an internal-traffic toggle excludes dashboard and inspector calls from production numbers.",
  },
  {
    q: "How does authentication work for MCP servers on mcpfy?",
    a: "OAuth ships with documented providers including Auth0, Better Auth, Clerk, Keycloak, Supabase, and WorkOS, plus support for any custom provider that supports dynamic client registration. Your tools receive verified user context on every call. Clients connect with OAuth 2.1 with PKCE or bearer tokens.",
  },
  {
    q: "How do I publish an MCP app to the ChatGPT Apps Store or Claude Connectors?",
    a: "mcpfy runs six categories of publishing checks mapped to store requirements: protocol and discovery, tool conformance, security and policy, metadata and configuration, domain/TLS/CSP, and assets. Each failed check comes with fix guidance and an autofix flow. End-to-end checks then run your server live inside ChatGPT and Claude to verify tool calls and widget rendering, and a generated submission pack produces listing copy, tool justifications, and reviewer test cases.",
  },
  {
    q: "Do pull requests get preview deployments?",
    a: "Yes. Every branch gets its own MCP URL, so reviewers can point a real client at the change before merge. Available on Hobby and above.",
  },
  {
    q: "Is the mcpfy SDK open source?",
    a: "Yes. The SDKs for TypeScript and Python — servers, clients, and agents — and the MCP Inspector are open source under the MIT license. The mcpfy cloud platform builds on them.",
  },
  {
    q: "How much does mcpfy cost?",
    a: "The Free plan is $0 and includes $5/month in usage credits. Hobby is $25/month and adds preview deployments, end-to-end checks, and the submission pack. Startup is $250/month with all regions, and Enterprise is custom. Usage is metered ($0.10 per 1k tool-call requests, $1 per eval run, $2 per end-to-end check); discovery traffic like tools/list is never billed.",
  },
  {
    q: "Can I use mcpfy without hosting my server there?",
    a: "Yes. Connect an existing remote MCP server by URL and get the chat interface, test suites, publish checks, and the submission pack against it. Hosting on mcpfy adds deploys from GitHub, preview environments, and gateway-level analytics.",
  },
];

/* --------------------------------- footer --------------------------------- */

export const footerColumns = [
  {
    title: "Pages",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Developers", href: "/developers" },
      { label: "Templates", href: "/templates" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/blog" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "MCP Hosting", href: "/platform/hosting" },
      { label: "Cross-client testing", href: "/platform/cross-client-testing" },
      { label: "Publishing checks", href: "/platform/publishing-checks" },
      { label: "Submission pack", href: "/platform/submission-pack" },
      { label: "Cloud Inspector", href: "/platform/cloud-inspector" },
      { label: "Public chat", href: "/platform/public-chat" },
      { label: "Analytics", href: "/platform/analytics" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "mcpfy SDK", href: "/sdk" },
      { label: "Vibecode MCP Apps", href: "/vibe" },
      { label: "Inspector", href: "/inspector" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "GitHub", href: "https://github.com/mcpfy" },
      { label: "LinkedIn", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Product Hunt", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Trust Center", href: "/legal/trust" },
    ],
  },
];

/* -------------------------------- templates ------------------------------- */

export type Template = {
  name: string;
  desc: string;
  tags: string[];
  category: string;
};

export const templateCategories = [
  "All",
  "Starters",
  "Authentication",
  "Examples",
  "Frameworks",
];

export const templates: Template[] = [
  { name: "Starter", desc: "A minimal server with tools, prompts, resources and automatic widget registration.", tags: ["TypeScript"], category: "Starters" },
  { name: "Python Starter", desc: "The same minimal scaffold, built on the Python SDK with typed tool schemas.", tags: ["Python"], category: "Starters" },
  { name: "Widgets Starter", desc: "Bind React views directly to tools and render interactive widgets in chat.", tags: ["TypeScript", "React"], category: "Starters" },

  { name: "Supabase OAuth", desc: "MCP server with OAuth authentication backed by Supabase Auth.", tags: ["Auth", "Supabase"], category: "Authentication" },
  { name: "Clerk OAuth", desc: "Drop-in Clerk authentication with verified user context on every tool call.", tags: ["Auth", "Clerk"], category: "Authentication" },
  { name: "WorkOS SSO", desc: "Enterprise SSO and directory sync for MCP servers behind a corporate IdP.", tags: ["Auth", "WorkOS"], category: "Authentication" },
  { name: "Auth0", desc: "OAuth 2.1 with PKCE using Auth0 as the identity provider.", tags: ["Auth", "Auth0"], category: "Authentication" },
  { name: "Better Auth", desc: "Self-hosted auth with dynamic client registration support.", tags: ["Auth"], category: "Authentication" },

  { name: "Chart Builder", desc: "Turn a table of numbers into an interactive chart widget rendered inline.", tags: ["Widgets"], category: "Examples" },
  { name: "Diagram Builder", desc: "Describe a flow in plain language and render it as an editable diagram.", tags: ["Widgets"], category: "Examples" },
  { name: "Postgres Explorer", desc: "Safe, read-only SQL access with schema introspection and row limits.", tags: ["Database"], category: "Examples" },
  { name: "GitHub Assistant", desc: "Issues, pull requests and code search exposed as typed tools.", tags: ["API"], category: "Examples" },
  { name: "Web Search", desc: "Search and fetch with content extraction and citation-ready output.", tags: ["API"], category: "Examples" },
  { name: "Stripe Billing", desc: "Query subscriptions, invoices and customers with scoped credentials.", tags: ["API"], category: "Examples" },
  { name: "Notion Workspace", desc: "Read and write pages and databases from any MCP client.", tags: ["API"], category: "Examples" },
  { name: "Linear Issues", desc: "Triage, create and update issues directly from your coding agent.", tags: ["API"], category: "Examples" },
  { name: "Filesystem", desc: "Sandboxed file read/write with configurable allowlists.", tags: ["Local"], category: "Examples" },
  { name: "Slack Digest", desc: "Summarise channels and post back on a schedule.", tags: ["API"], category: "Examples" },
  { name: "Vector Search", desc: "Embed, index and query documents with a pluggable vector store.", tags: ["RAG"], category: "Examples" },
  { name: "Calendar", desc: "Availability lookup and event creation across providers.", tags: ["API"], category: "Examples" },

  { name: "MCP TypeScript SDK", desc: "Reference server built on the official @modelcontextprotocol/sdk.", tags: ["TypeScript"], category: "Frameworks" },
  { name: "FastMCP", desc: "A FastMCP server deployed unchanged, with analytics and checks layered on.", tags: ["Python"], category: "Frameworks" },
  { name: "Express", desc: "Mount an MCP endpoint inside an existing Express application.", tags: ["Node"], category: "Frameworks" },
  { name: "FastAPI", desc: "Serve MCP alongside your existing FastAPI routes.", tags: ["Python"], category: "Frameworks" },
  { name: "Hono", desc: "Lightweight edge-ready MCP server on Hono.", tags: ["Edge"], category: "Frameworks" },
  { name: "Docker", desc: "Bring any language or runtime with a plain Dockerfile.", tags: ["Docker"], category: "Frameworks" },
];
