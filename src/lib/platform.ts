export type PlatformPage = {
  slug: string;
  navTitle: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Accent classes for the page's hero gradient wash. */
  wash: string;
  stepsTitle: string;
  steps: { title: string; desc: string }[];
  features: { title: string; desc: string; visual: string }[];
  gridTitle: string;
  grid: { title: string; desc: string }[];
  ctaTitle: string;
};

export const platformPages: PlatformPage[] = [
  {
    slug: "hosting",
    navTitle: "MCP Hosting",
    badge: "mcpfy cloud",
    title: "Host MCP servers like you ship web apps",
    subtitle:
      "GitHub-native builds, preview URLs per branch, production endpoints with TLS and custom domains, and instant rollback — purpose-built for MCP traffic and the clients that connect to it.",
    primaryCta: { label: "Deploy your first server", href: "/signup" },
    secondaryCta: { label: "Book a demo", href: "/book-call" },
    wash: "from-slate-200 via-indigo-100 to-zinc-200 dark:from-slate-800 dark:via-indigo-950 dark:to-zinc-900",
    stepsTitle: "The fastest way from code to distribution",
    steps: [
      { title: "Connect GitHub", desc: "Install the app once and pick a repository." },
      { title: "Deploy", desc: "Every push builds and ships automatically." },
      { title: "Run checks", desc: "Cross-client tests gate the merge." },
      { title: "Publish", desc: "Ship to the marketplaces from the same pipeline." },
    ],
    features: [
      {
        title: "Branch previews",
        desc: "Every pull request gets its own live MCP URL, so a reviewer can point a real client at the change before it merges.",
        visual: "deploy",
      },
      {
        title: "Logs",
        desc: "Structured request and tool-call logs streamed live, searchable by client, tool and status.",
        visual: "monitor",
      },
      {
        title: "Environments & secrets",
        desc: "Per-environment configuration with encrypted secrets, injected at runtime and never written to the build.",
        visual: "publish",
      },
    ],
    gridTitle: "Deploy the stack you already use",
    grid: [
      { title: "Managed runtime", desc: "TypeScript, Python, or any Dockerfile." },
      { title: "Branch previews", desc: "A unique MCP endpoint per pull request." },
      { title: "Domains & TLS", desc: "Custom domains with certificates handled." },
      { title: "Environments & secrets", desc: "Scoped config for every stage." },
    ],
    ctaTitle: "Ready to host your MCP on mcpfy Cloud?",
  },
  {
    slug: "cross-client-testing",
    navTitle: "Cross-client testing",
    badge: "testing",
    title: "Run the same checks across every client",
    subtitle:
      "Your server behaves differently in ChatGPT than it does in Claude or Cursor. Test suites exercise every tool across clients and models, with model-judged pass/fail per combination.",
    primaryCta: { label: "Run your first suite", href: "/signup" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
    wash: "from-fuchsia-100 via-pink-100 to-zinc-200 dark:from-fuchsia-950 dark:via-pink-950 dark:to-zinc-900",
    stepsTitle: "From a flaky tool call to a green pipeline",
    steps: [
      { title: "Describe", desc: "Write a suite in plain language." },
      { title: "Fan out", desc: "Run it across clients and models." },
      { title: "Judge", desc: "Model-graded pass/fail per combination." },
      { title: "Gate", desc: "Block the merge on any regression." },
    ],
    features: [
      {
        title: "Every client, every run",
        desc: "ChatGPT, Claude, Cursor, VS Code and custom clients exercised from one suite definition.",
        visual: "iterate",
      },
      {
        title: "Model swap",
        desc: "Hold the suite constant and vary the model to see exactly which combinations drift.",
        visual: "build",
      },
      {
        title: "CI gating",
        desc: "Suites run on every pull request and fail the check when any client regresses.",
        visual: "deploy",
      },
    ],
    gridTitle: "Built for how MCP actually breaks",
    grid: [
      { title: "Schema drift", desc: "Catch tool signatures that changed shape." },
      { title: "Client quirks", desc: "Per-client conformance, not a single mock." },
      { title: "Latency budgets", desc: "Fail on slow tools before users feel it." },
      { title: "Deterministic reruns", desc: "Replay any failed case exactly." },
    ],
    ctaTitle: "Stop shipping regressions to one client at a time",
  },
  {
    slug: "publishing-checks",
    navTitle: "Publishing checks",
    badge: "publishing",
    title: "Know you're ready before you submit",
    subtitle:
      "Six categories of checks mapped to marketplace requirements, each failure with fix guidance and an autofix flow, plus live end-to-end runs inside the real clients.",
    primaryCta: { label: "Check my app", href: "/signup" },
    secondaryCta: { label: "See the checklist", href: "/docs" },
    wash: "from-amber-100 via-orange-100 to-zinc-200 dark:from-amber-950 dark:via-orange-950 dark:to-zinc-900",
    stepsTitle: "From first build to an accepted listing",
    steps: [
      { title: "Audit", desc: "Run all six check categories." },
      { title: "Fix", desc: "Apply guided fixes or autofix." },
      { title: "Verify", desc: "End-to-end runs in real clients." },
      { title: "Submit", desc: "Ship with a generated submission pack." },
    ],
    features: [
      {
        title: "Six check categories",
        desc: "Protocol and discovery, tool conformance, security and policy, metadata, domain/TLS/CSP, and assets.",
        visual: "publish",
      },
      {
        title: "End-to-end verification",
        desc: "Your server runs live inside ChatGPT and Claude to confirm tool calls and widget rendering.",
        visual: "iterate",
      },
      {
        title: "Submission pack",
        desc: "Listing copy, tool justifications, screenshots and reviewer test cases, generated for you.",
        visual: "build",
      },
    ],
    gridTitle: "Everything reviewers look for",
    grid: [
      { title: "Protocol & discovery", desc: "Correct handshakes and capability lists." },
      { title: "Tool conformance", desc: "Schemas that match real behaviour." },
      { title: "Security & policy", desc: "Scopes, consent and data handling." },
      { title: "Assets & metadata", desc: "Icons, copy and configuration." },
    ],
    ctaTitle: "Get through review on the first attempt",
  },
  {
    slug: "cloud-inspector",
    navTitle: "Cloud Inspector",
    badge: "inspector",
    title: "Debug MCP traffic from any browser",
    subtitle:
      "Fire tool calls at your deployed server, read raw JSON-RPC frames, browse resources and preview widgets — against real clients, with no local setup.",
    primaryCta: { label: "Open Inspector", href: "/signup" },
    secondaryCta: { label: "Self-host it", href: "/docs" },
    wash: "from-slate-100 via-indigo-100 to-zinc-200 dark:from-slate-900 dark:via-indigo-950 dark:to-zinc-900",
    stepsTitle: "See exactly what the model saw",
    steps: [
      { title: "Attach", desc: "Point the Inspector at any deployment." },
      { title: "Invoke", desc: "Call tools with real arguments." },
      { title: "Inspect", desc: "Read the raw protocol frames." },
      { title: "Replay", desc: "Re-run any call after a fix." },
    ],
    features: [
      {
        title: "Live JSON-RPC",
        desc: "Every frame in and out, timestamped and expandable, so protocol bugs stop being guesswork.",
        visual: "iterate",
      },
      {
        title: "Widget preview",
        desc: "Render your interactive views exactly as the host client will, before a user ever sees them.",
        visual: "build",
      },
      {
        title: "Session replay",
        desc: "Walk a real user's conversation end to end and re-run the exact call that failed.",
        visual: "monitor",
      },
    ],
    gridTitle: "The debugger MCP was missing",
    grid: [
      { title: "Tool testing", desc: "Invoke with arbitrary arguments." },
      { title: "Resource browsing", desc: "Inspect everything you expose." },
      { title: "Prompt testing", desc: "Exercise prompts in isolation." },
      { title: "Zero setup", desc: "Runs hosted, local or self-hosted." },
    ],
    ctaTitle: "Stop debugging MCP with print statements",
  },
  {
    slug: "public-chat",
    navTitle: "Public chat",
    badge: "distribution",
    title: "Give your MCP server a front door",
    subtitle:
      "Every deployment gets a shareable chat surface you can embed anywhere you already have an audience — no client install, no configuration.",
    primaryCta: { label: "Create a chat", href: "/signup" },
    secondaryCta: { label: "See an example", href: "/docs" },
    wash: "from-rose-100 via-pink-100 to-zinc-200 dark:from-rose-950 dark:via-pink-950 dark:to-zinc-900",
    stepsTitle: "From endpoint to audience",
    steps: [
      { title: "Deploy", desc: "Ship your server as usual." },
      { title: "Enable", desc: "Turn on the public chat surface." },
      { title: "Brand", desc: "Set a name, icon and welcome copy." },
      { title: "Share", desc: "Embed it or send the link." },
    ],
    features: [
      {
        title: "Embeddable anywhere",
        desc: "A single script tag drops the chat into your docs, marketing site or dashboard.",
        visual: "build",
      },
      {
        title: "Your domain",
        desc: "Serve the chat from your own subdomain with TLS handled for you.",
        visual: "deploy",
      },
      {
        title: "Measured like everything else",
        desc: "Chat sessions flow into the same analytics as every other client.",
        visual: "monitor",
      },
    ],
    gridTitle: "A real surface, not a demo",
    grid: [
      { title: "Auth optional", desc: "Public, or gated behind your provider." },
      { title: "Rate limited", desc: "Sensible defaults you can tune." },
      { title: "Widget ready", desc: "Interactive views render inline." },
      { title: "Themed", desc: "Light and dark, matched to your brand." },
    ],
    ctaTitle: "Put your MCP server in front of real users",
  },
  {
    slug: "analytics",
    navTitle: "Analytics",
    badge: "observability",
    title: "MCP-native analytics, not page views",
    subtitle:
      "Tool calls, sessions, error rates and latency percentiles broken down by client, client version, protocol version and country — with discovery traffic excluded by default.",
    primaryCta: { label: "See your traffic", href: "/signup" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
    wash: "from-teal-100 via-emerald-100 to-zinc-200 dark:from-teal-950 dark:via-emerald-950 dark:to-zinc-900",
    stepsTitle: "Understand how your server is actually used",
    steps: [
      { title: "Measure", desc: "Every call captured at the gateway." },
      { title: "Segment", desc: "Split by client, version and region." },
      { title: "Diagnose", desc: "Trace errors to a single session." },
      { title: "Alert", desc: "Get told before users complain." },
    ],
    features: [
      {
        title: "Per-tool latency",
        desc: "p50, p95 and p99 for every tool, resource and prompt, so you know which one is slow.",
        visual: "monitor",
      },
      {
        title: "Session replay",
        desc: "The full timeline of a conversation, including the arguments each tool received.",
        visual: "iterate",
      },
      {
        title: "Issue triage",
        desc: "Errors grouped into issues with first-seen, last-seen and affected clients.",
        visual: "publish",
      },
    ],
    gridTitle: "Numbers that mean something for MCP",
    grid: [
      { title: "Tool-call volume", desc: "What the models actually reach for." },
      { title: "Client breakdown", desc: "Which hosts your users are on." },
      { title: "Error rates", desc: "Grouped, deduplicated and triaged." },
      { title: "Internal traffic", desc: "Dashboard calls excluded by default." },
    ],
    ctaTitle: "Stop guessing how your MCP server behaves",
  },
  {
    slug: "submission-pack",
    navTitle: "Submission pack",
    badge: "publishing",
    title: "Everything a marketplace asks for, generated",
    subtitle:
      "Listing copy, tool justifications, screenshots, icons and reviewer test cases assembled from your actual deployment — so submission is a review, not a writing project.",
    primaryCta: { label: "Generate a pack", href: "/signup" },
    secondaryCta: { label: "See what's included", href: "/docs" },
    wash: "from-violet-100 via-purple-100 to-zinc-200 dark:from-violet-950 dark:via-purple-950 dark:to-zinc-900",
    stepsTitle: "From working server to submitted listing",
    steps: [
      { title: "Scan", desc: "We read your tools and metadata." },
      { title: "Draft", desc: "Copy and justifications generated." },
      { title: "Capture", desc: "Screenshots taken from real runs." },
      { title: "Export", desc: "Download or submit directly." },
    ],
    features: [
      {
        title: "Tool justifications",
        desc: "A written rationale for every tool and scope, in the form reviewers expect.",
        visual: "publish",
      },
      {
        title: "Real screenshots",
        desc: "Captured from your server running live inside the target client, not mocked.",
        visual: "iterate",
      },
      {
        title: "Reviewer test cases",
        desc: "Step-by-step cases a human reviewer can follow to exercise your app.",
        visual: "build",
      },
    ],
    gridTitle: "What lands in the pack",
    grid: [
      { title: "Listing copy", desc: "Name, summary and long description." },
      { title: "Assets", desc: "Icons and screenshots at every size." },
      { title: "Justifications", desc: "Per-tool and per-scope rationale." },
      { title: "Test cases", desc: "Reproducible reviewer walkthroughs." },
    ],
    ctaTitle: "Turn submission into a formality",
  },
];

export function getPlatformPage(slug: string) {
  return platformPages.find((p) => p.slug === slug);
}
