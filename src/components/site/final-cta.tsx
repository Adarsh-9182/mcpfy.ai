import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { GithubIcon } from "./icons";

function Pill({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 w-fit self-start items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

const templates = [
  { prompt: "Chart the monthly sales data", name: "Chart Builder" },
  { prompt: "Draw the user signup flow", name: "Diagram Builder" },
];

export function FinalCta() {
  return (
    <FrameSection className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 top-px z-0 bg-hero-wash dark:opacity-60"
      />
      <div className="relative z-10 py-6">
        <div className="rounded-2xl border bg-background/80 p-6 backdrop-blur-md md:p-10">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              Begin your MCP journey in the fastest way
            </h2>
          </Reveal>

          <div className="mt-12 grid divide-y divide-border/60 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* From a Git repository */}
            <Reveal>
              <div className="flex h-full flex-col gap-5 px-0 pb-8 md:px-6 md:pb-0">
                <div>
                  <p className="text-[17px] font-medium">From a Git repository</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Already have an MCP server on GitHub? Deploy it with one click.
                  </p>
                </div>
                <div className="flex-1 rounded-lg border bg-card p-3">
                  {["mcpfy/chart-server", "mcpfy/postgres-mcp", "acme/internal-tools"].map(
                    (repo) => (
                      <div
                        key={repo}
                        className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-accent"
                      >
                        <GithubIcon className="size-4 shrink-0" />
                        <span className="truncate font-mono text-[11px]">{repo}</span>
                        <span className="ml-auto rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                          Import
                        </span>
                      </div>
                    ),
                  )}
                </div>
                <Pill href="/docs">Connect GitHub</Pill>
              </div>
            </Reveal>

            {/* Vibecode */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col gap-5 px-0 py-8 md:px-6 md:py-0">
                <div>
                  <p className="text-[17px] font-medium">Vibecode your MCP App</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Describe what you want. Watch your MCP server and widgets
                    scaffold in front of you.
                  </p>
                </div>
                <div className="relative flex-1 rounded-lg border bg-card p-3">
                  <p className="text-[13px] text-muted-foreground">
                    Make me an MCP server for my Postgres database
                  </p>
                  <span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-foreground text-background">
                    <ArrowUp className="size-4" />
                  </span>
                </div>
                <Pill href="/docs">Start vibecoding</Pill>
              </div>
            </Reveal>

            {/* From a template */}
            <Reveal delay={0.16}>
              <div className="flex h-full flex-col gap-5 px-0 pt-8 md:px-6 md:pt-0">
                <div>
                  <p className="text-[17px] font-medium">From a template</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Pick one of our templates and start from a known-good scaffold.
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3">
                  {templates.map((t) => (
                    <div
                      key={t.name}
                      className="overflow-hidden rounded-lg border bg-card"
                    >
                      <p className="border-b px-2 py-1.5 text-center text-[10px] text-muted-foreground">
                        {t.prompt}
                      </p>
                      <div className="flex h-20 items-end gap-1 p-2">
                        {[30, 45, 38, 62, 55, 78, 70].map((h, i) => (
                          <span
                            key={i}
                            className="flex-1 rounded-sm bg-foreground/15"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <p className="border-t px-2 py-1.5 text-[11px] font-medium">
                        {t.name}
                      </p>
                    </div>
                  ))}
                </div>
                <Pill href="/templates">Browse templates</Pill>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </FrameSection>
  );
}
