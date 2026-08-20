import type { PlatformPage } from "./platform";

/** Standalone product pages, rendered with the same template as /platform/*. */
export const productPages: Record<string, PlatformPage> = {
  vibe: {
    slug: "vibe",
    navTitle: "Vibe",
    badge: "vibe",
    title: "Describe it. Watch it scaffold.",
    subtitle:
      "Say what your MCP app should do in plain language and watch the server, the tool schemas and the interactive views build themselves — then take the code and keep going.",
    primaryCta: { label: "Start vibecoding", href: "/signup" },
    secondaryCta: { label: "See an example", href: "/templates" },
    wash: "from-lime-100 via-emerald-100 to-zinc-200 dark:from-lime-950 dark:via-emerald-950 dark:to-zinc-900",
    stepsTitle: "From a sentence to a deployed server",
    steps: [
      { title: "Describe", desc: "Say what the app should do." },
      { title: "Scaffold", desc: "Tools, schemas and views generated." },
      { title: "Preview", desc: "Try it in the Inspector instantly." },
      { title: "Deploy", desc: "Ship it from the same screen." },
    ],
    features: [
      {
        title: "Real code, not a black box",
        desc: "Everything it generates is ordinary SDK code in your repository. Read it, edit it, or throw it away.",
        visual: "build",
      },
      {
        title: "Views included",
        desc: "Interactive widgets are scaffolded alongside the tools that feed them, wired up and ready to render.",
        visual: "iterate",
      },
      {
        title: "Deploy from the prompt",
        desc: "The same session that generated the server can ship it to a live endpoint.",
        visual: "deploy",
      },
    ],
    gridTitle: "What it can build",
    grid: [
      { title: "Data tools", desc: "Query a database behind a typed schema." },
      { title: "API wrappers", desc: "Wrap an existing service as MCP tools." },
      { title: "Chart widgets", desc: "Interactive views rendered inline." },
      { title: "Workflows", desc: "Multi-step tools an agent can chain." },
    ],
    ctaTitle: "Build your first MCP app by describing it",
  },
  sdk: {
    slug: "sdk",
    navTitle: "mcpfy SDK",
    badge: "open source",
    title: "The fullstack MCP framework",
    subtitle:
      "One open-source SDK for TypeScript and Python: build MCP Apps for ChatGPT and Claude, MCP Servers for agents, and the clients that talk to them — with typed tools and native views.",
    primaryCta: { label: "Read the docs", href: "/docs" },
    secondaryCta: { label: "View on GitHub", href: "/docs" },
    wash: "from-sky-100 via-blue-100 to-zinc-200 dark:from-sky-950 dark:via-blue-950 dark:to-zinc-900",
    stepsTitle: "Everything the protocol needs, in one package",
    steps: [
      { title: "Scaffold", desc: "One command to a working server." },
      { title: "Define", desc: "Typed tools, resources and prompts." },
      { title: "Bind", desc: "Attach views directly to tools." },
      { title: "Test", desc: "Inspector and evals built in." },
    ],
    features: [
      {
        title: "Typed tools",
        desc: "Schemas are the contract with the model. Define them once and get validation, docs and client types for free.",
        visual: "build",
      },
      {
        title: "Native views",
        desc: "Bind a component straight to a tool and it renders inside the host client, with full state.",
        visual: "iterate",
      },
      {
        title: "Servers, clients and agents",
        desc: "The same package builds the server, the client that calls it, and an agent that orchestrates both.",
        visual: "monitor",
      },
    ],
    gridTitle: "TypeScript and Python, first class",
    grid: [
      { title: "Type-safe", desc: "End-to-end types from schema to client." },
      { title: "Framework friendly", desc: "Drop into Express, FastAPI or Hono." },
      { title: "MIT licensed", desc: "Open from day one, no lock-in." },
      { title: "Self-hostable", desc: "Run it anywhere, cloud optional." },
    ],
    ctaTitle: "Start building with the open SDK",
  },
  inspector: {
    slug: "inspector",
    navTitle: "Inspector",
    badge: "inspector",
    title: "See exactly what the model saw",
    subtitle:
      "An open-source debugger for MCP servers: invoke tools, read raw JSON-RPC, browse resources, test prompts and preview widgets — hosted, local, or self-hosted with Docker.",
    primaryCta: { label: "Open the Inspector", href: "/signup" },
    secondaryCta: { label: "Run it locally", href: "/docs" },
    wash: "from-indigo-100 via-slate-100 to-zinc-200 dark:from-indigo-950 dark:via-slate-900 dark:to-zinc-900",
    stepsTitle: "A real debugger for a real protocol",
    steps: [
      { title: "Connect", desc: "Point it at any MCP endpoint." },
      { title: "Call", desc: "Invoke tools with real arguments." },
      { title: "Read", desc: "Every frame, in and out." },
      { title: "Fix", desc: "Replay the call after each change." },
    ],
    features: [
      {
        title: "Protocol-level logging",
        desc: "Timestamped JSON-RPC frames you can expand, copy and diff between runs.",
        visual: "iterate",
      },
      {
        title: "Widget preview",
        desc: "Render interactive views exactly as the host client will, with host APIs emulated.",
        visual: "build",
      },
      {
        title: "Runs anywhere",
        desc: "Use it hosted, from the CLI against localhost, or self-hosted behind your own network.",
        visual: "deploy",
      },
    ],
    gridTitle: "Everything you need to debug MCP",
    grid: [
      { title: "Tool testing", desc: "Arbitrary arguments, instant results." },
      { title: "Resource browsing", desc: "Inspect what you actually expose." },
      { title: "Prompt testing", desc: "Exercise prompts in isolation." },
      { title: "Open source", desc: "MIT licensed and self-hostable." },
    ],
    ctaTitle: "Debug your MCP server properly",
  },
  cloud: {
    slug: "cloud",
    navTitle: "Cloud",
    badge: "mcpfy cloud",
    title: "The platform for everything after the code",
    subtitle:
      "Deploy from GitHub in minutes, watch every tool call with MCP-native analytics, and ship your server to any AI client — one pipeline covering the whole MCP lifecycle.",
    primaryCta: { label: "Start deploying", href: "/signup" },
    secondaryCta: { label: "See pricing", href: "/pricing" },
    wash: "from-zinc-100 via-sky-100 to-zinc-200 dark:from-zinc-900 dark:via-sky-950 dark:to-zinc-900",
    stepsTitle: "One pipeline, end to end",
    steps: [
      { title: "Deploy", desc: "GitHub-native builds in seconds." },
      { title: "Test", desc: "Cross-client suites gate the merge." },
      { title: "Observe", desc: "MCP-native analytics and replay." },
      { title: "Publish", desc: "Checks and a submission pack." },
    ],
    features: [
      {
        title: "Deploys that feel like web apps",
        desc: "Connect a repository once and every push ships. Watch each build move through cloning, analysis, build, deploy and health checks live \u2014 then promote, redeploy or roll back from the same table.",
        visual: "deploy",
      },
      {
        title: "A live endpoint for every branch",
        desc: "Every branch gets its own MCP URL, so a reviewer can point a real client at the change before it merges. Watch paths and branch allow lists keep monorepos from deploying on every commit.",
        visual: "build",
      },
      {
        title: "Confidence before release",
        desc: "Suites describe scenarios, prompts and expected behaviour, then run your tools across clients and models with a model judge scoring every combination \u2014 so a regression in one client never reaches production.",
        visual: "iterate",
      },
      {
        title: "Visibility after release",
        desc: "Every request through the gateway, refreshed in seconds: status, client, method and duration, with volume, latency and error-rate charts and optional payload capture when you need the full body.",
        visual: "monitor",
      },
      {
        title: "Replay the whole conversation",
        desc: "Sessions group every interaction into one timeline \u2014 initialization, tool listing, calls and errors \u2014 classified by goal and outcome, filterable by client, country and tool activity, and deep-linkable from any analytics card.",
        visual: "publish",
      },
    ],
    capabilityGroupsTitle: "Everything mcpfy Cloud handles for you",
    capabilityGroupsSubtitle:
      "The full surface area of the platform, grouped the way you actually work through it.",
    capabilityGroups: [
      {
        name: "Build & deploy",
        items: [
          {
            title: "Creating servers",
            desc: "Start from a template, scaffold with the SDK, or connect a repository you already have.",
          },
          {
            title: "Connect an existing server",
            desc: "Already hosted somewhere else? Point mcpfy at the endpoint and keep the analytics, testing and publishing.",
          },
          {
            title: "Deployments",
            desc: "Cloning, analysing, building, deploying and health checks \u2014 each step streamed live, with build and runtime logs per deploy.",
          },
          {
            title: "Build & runtimes",
            desc: "Node and Python detected from your lockfile, or any Dockerfile. npm, pnpm, yarn and bun are picked up automatically.",
          },
          {
            title: "Environment variables",
            desc: "Per-environment secrets, pasted straight from a .env file, scoped so previews never touch production credentials.",
          },
          {
            title: "Domains",
            desc: "A free slug URL out of the box, custom domains by CNAME, and TLS certificates provisioned on verification.",
          },
          {
            title: "Server settings",
            desc: "Override build and start commands, set watch paths for monorepos, restrict which branches deploy, and hold on CI.",
          },
        ],
      },
      {
        name: "Monitoring",
        items: [
          {
            title: "Usage & traffic",
            desc: "Request volume, latency percentiles and error rate over time, with related failures grouped into single issues.",
          },
          {
            title: "Sessions",
            desc: "Browse and replay whole conversations, with goals and outcomes classified for you and manual overrides when they are wrong.",
          },
          {
            title: "Gateway requests",
            desc: "The raw event stream: status, session, client, method and duration, filterable and refreshed every few seconds.",
          },
          {
            title: "Runtime logs",
            desc: "stdout and stderr streamed from the running deployment, searchable and scoped to the environment you are viewing.",
          },
        ],
      },
      {
        name: "Testing",
        items: [
          {
            title: "Test suites",
            desc: "Scenarios and expected behaviour, executed across MCP clients and LLM models with pass or fail recorded per combination.",
          },
          {
            title: "Model-judged results",
            desc: "A judge scores each response, so you catch the client- or model-specific regressions a status code would miss.",
          },
          {
            title: "Run history",
            desc: "Every run kept, so you can see exactly which change broke which tool in which client.",
          },
        ],
      },
      {
        name: "Distribution",
        items: [
          {
            title: "Connecting clients",
            desc: "One-click setup for Cursor, VS Code, Claude Desktop and Code, and the CLI agents \u2014 or copy the config for anything else.",
          },
          {
            title: "Public chat",
            desc: "Turn the server into something anyone can try from a browser, with no MCP client installed.",
          },
          {
            title: "Branding & SEO",
            desc: "Custom title, description, starter questions and an OG image, with a search preview before you share the link.",
          },
        ],
      },
      {
        name: "Publish",
        items: [
          {
            title: "Publish checks",
            desc: "An audit of protocol compliance, initialization, tool schemas, error handling and metadata, scored by category.",
          },
          {
            title: "End-to-end checks",
            desc: "Your server exercised live inside ChatGPT and Claude, confirming tools actually run and widgets actually render.",
          },
          {
            title: "Guided fixes",
            desc: "Every failure comes with how to fix it \u2014 copy the prompt, or let the GitHub integration open the change for you.",
          },
          {
            title: "Submission pack",
            desc: "Listing copy, per-tool justifications, reviewer test cases, screenshots and a demo video, generated for the directories.",
          },
        ],
      },
      {
        name: "Organisation",
        items: [
          {
            title: "Team",
            desc: "Invite the people who ship with you and keep every server under one organisation.",
          },
          {
            title: "Roles & permissions",
            desc: "Decide who can deploy, who can change secrets and who can only read the analytics.",
          },
          {
            title: "GitHub integration",
            desc: "Install the app once. Webhooks handle the pushes, the checks and the branch previews from there.",
          },
          {
            title: "API keys & authentication",
            desc: "Bearer-token API keys for the REST API, CLI login for your terminal, and OAuth for the servers that need it.",
          },
          {
            title: "Billing & plans",
            desc: "Usage-based pricing with per-plan limits on projects, requests, retention and seats.",
          },
        ],
      },
    ],
    gridTitle: "Built for MCP traffic, not generic HTTP",
    grid: [
      { title: "Builds", desc: "TypeScript, Python or a Dockerfile." },
      { title: "Previews", desc: "A live endpoint per branch." },
      { title: "Auth", desc: "OAuth 2.1, API keys and bearer tokens." },
      { title: "Scale", desc: "Multi-region, cold-start prevention." },
      { title: "Retention", desc: "Up to unlimited analytics history." },
      { title: "Rollback", desc: "Promote any past deploy in one click." },
      { title: "Payloads", desc: "Optional full request and response capture." },
      { title: "Notifications", desc: "Email on failed deploys, by default." },
    ],
    ctaTitle: "Ship your MCP server on mcpfy Cloud",
  },
};

export function getProductPage(slug: string) {
  return productPages[slug];
}
