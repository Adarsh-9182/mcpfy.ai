import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { Section, Title, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { GithubIcon } from "./icons";

const repos = ["mcpfy/chart-server", "mcpfy/postgres-mcp", "acme/internal-tools"];

const routes = [
  {
    title: "From a Git repository",
    desc: "Point us at a repo. Every push builds, checks and ships itself.",
    cta: { label: "Connect GitHub", href: "/docs" },
  },
  {
    title: "From a prompt",
    desc: "Describe what you want and watch the tools and widgets scaffold.",
    cta: { label: "Start vibecoding", href: "/vibe" },
  },
  {
    title: "From a template",
    desc: "Start on a known-good scaffold — charts, diagrams, databases.",
    cta: { label: "Browse templates", href: "/templates" },
  },
];

function Mock({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="rounded-lg border border-border bg-background/50">
        {repos.map((repo) => (
          <div
            key={repo}
            className="flex items-center gap-2 border-b border-border/60 px-3 py-2 last:border-b-0"
          >
            <GithubIcon className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {repo}
            </span>
            <span className="ml-auto rounded border border-border px-1.5 py-px text-[10px] text-subtle-foreground">
              Import
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (i === 1) {
    return (
      <div className="relative rounded-lg border border-border bg-background/50 p-3">
        <p className="pr-8 text-[12.5px] leading-relaxed text-muted-foreground">
          Make me an MCP server for my Postgres database
          <span aria-hidden className="animate-caret ml-0.5 text-t-hi">
            ▍
          </span>
        </p>
        <span className="absolute bottom-2.5 right-2.5 grid size-6 place-items-center rounded-md bg-t-hi text-canvas">
          <ArrowUp className="size-3.5" />
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: "Chart Builder", bars: [30, 52, 38, 68, 55, 80] },
        { name: "Diagram Builder", bars: [62, 40, 74, 48, 66, 35] },
      ].map((t) => (
        <div
          key={t.name}
          className="overflow-hidden rounded-lg border border-border bg-background/50"
        >
          <div className="flex h-14 items-end gap-1 p-2">
            {t.bars.map((h, bi) => (
              <span
                key={bi}
                className="flex-1 rounded-sm bg-t-hi/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="border-t border-border/60 px-2 py-1.5 text-[10.5px] text-muted-foreground">
            {t.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FinalCta() {
  return (
    <Section className="border-t border-border">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 hero-glow opacity-80"
        />

        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1/80 px-3 py-1 text-[12.5px] text-muted-foreground backdrop-blur">
                <Sparkles className="size-3 text-t-mid" />
                Three ways in
              </span>
              <Title as="h2" size="lg" className="mt-5">
                Ship your first MCP server today
              </Title>
              <p className="mx-auto mt-4 max-w-lg text-[16px] leading-[1.6] text-muted-foreground">
                Start from the code you already have, a prompt, or a template.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-[14.5px] font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start deploying
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface-1 px-5 text-[14.5px] font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
                >
                  Book a call
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {routes.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07}>
                <div className="card-surface flex h-full flex-col gap-4 rounded-xl p-5">
                  <div>
                    <p className="text-[14px] font-medium">{r.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      {r.desc}
                    </p>
                  </div>
                  <div className="flex-1">
                    <Mock i={i} />
                  </div>
                  <ArrowLink href={r.cta.href} className="text-[13px]">
                    {r.cta.label}
                  </ArrowLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
