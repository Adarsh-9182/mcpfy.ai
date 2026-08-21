import Link from "next/link";
import { Band } from "./frame";
import { Reveal } from "./reveal";
import { GithubIcon } from "./icons";

/**
 * The closer inverts the page: an ink slab with the three ways in, numbered
 * like everything else. Colours are expressed against `background` so the
 * panel flips correctly in dark mode.
 */
const routes = [
  {
    n: "01",
    title: "From a Git repository",
    desc: "Already have an MCP server on GitHub? Point us at the repo and every push deploys itself.",
    cta: { label: "Connect GitHub", href: "/docs" },
    kind: "repos" as const,
  },
  {
    n: "02",
    title: "From a prompt",
    desc: "Describe what you want. Watch the server, the tools and the widgets scaffold in front of you.",
    cta: { label: "Start vibecoding", href: "/vibe" },
    kind: "prompt" as const,
  },
  {
    n: "03",
    title: "From a template",
    desc: "Start on a known-good scaffold — charts, diagrams, databases, internal tools.",
    cta: { label: "Browse templates", href: "/templates" },
    kind: "templates" as const,
  },
];

const repos = ["mcpfy/chart-server", "mcpfy/postgres-mcp", "acme/internal-tools"];

function Mock({ kind }: { kind: "repos" | "prompt" | "templates" }) {
  if (kind === "repos") {
    return (
      <div className="border border-background/20">
        {repos.map((repo) => (
          <div
            key={repo}
            className="flex items-center gap-2.5 border-b border-background/12 px-3 py-2.5 last:border-b-0"
          >
            <GithubIcon className="size-3.5 shrink-0 opacity-60" />
            <span className="truncate font-mono text-[11px]">{repo}</span>
            <span className="ml-auto font-mono text-[9.5px] uppercase tracking-wider opacity-60">
              import
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "prompt") {
    return (
      <div className="border border-background/20 px-3 py-3">
        <p className="font-mono text-[11.5px] leading-relaxed opacity-80">
          make me an MCP server for my Postgres database
          <span aria-hidden className="animate-caret ml-1 opacity-100">
            ▍
          </span>
        </p>
        <p className="mt-4 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider opacity-60">
          <span aria-hidden>⏎</span> send to build
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: "Chart Builder", bars: [30, 52, 38, 68, 55, 80] },
        { name: "Diagram Builder", bars: [62, 40, 74, 48, 66, 35] },
      ].map((t) => (
        <div key={t.name} className="border border-background/20">
          <div className="flex h-16 items-end gap-1 p-2">
            {t.bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 bg-background/25"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="border-t border-background/12 px-2 py-1.5 font-mono text-[9.5px] uppercase tracking-wider">
            {t.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FinalCta() {
  return (
    <Band index="10" label="begin">
      <div className="bg-foreground text-background">
        <div className="px-6 py-14 md:px-12 md:py-20">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[40px] md:text-[56px] lg:text-[64px]">
              Three ways in. Pick the one you already{" "}
              <em className="italic opacity-70">have</em>.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-background/20 md:grid-cols-3">
            {routes.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-6 bg-foreground px-0 py-8 md:px-7 md:py-2">
                  <div>
                    <span className="font-mono text-[10.5px] tracking-[0.16em] opacity-60">
                      {r.n}
                    </span>
                    <p className="mt-3 text-[18px] font-medium tracking-tight">
                      {r.title}
                    </p>
                    <p className="mt-2.5 text-[14px] leading-relaxed opacity-70">
                      {r.desc}
                    </p>
                  </div>

                  <div className="flex-1">
                    <Mock kind={r.kind} />
                  </div>

                  <Link
                    href={r.cta.href}
                    className="group inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                  >
                    <span className="border-b border-current pb-0.5">
                      {r.cta.label}
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-background/20 pt-8">
            <Link
              href="/signup"
              className="group inline-flex h-12 items-center gap-3 bg-background px-7 text-[14px] font-medium tracking-tight text-foreground transition-colors hover:bg-signal hover:text-signal-foreground"
            >
              Start deploying
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100"
            >
              <span className="border-b border-current pb-0.5">Book a call</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Band>
  );
}
