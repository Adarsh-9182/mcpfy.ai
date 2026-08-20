import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { quickstart, alternatives } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Quick start: the exact commands that take you from nothing to a deployed
 * server, in both supported languages.
 */
export function Quickstart() {
  return (
    <FrameSection>
      <div className="py-16 md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Quick start
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-base text-muted-foreground md:text-lg">
            Scaffold a server, run it locally, and put it on a public MCP URL.
            Three commands, either language.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {quickstart.map((track, i) => (
            <Reveal key={track.lang} delay={i * 0.08}>
              <div className="h-full rounded-xl border bg-card/40 p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {track.lang}
                </h3>
                <ol className="mt-6 space-y-5">
                  {track.steps.map((step, si) => (
                    <li key={step.cmd}>
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          0{si + 1}
                        </span>
                        <span className="text-[14px] font-medium">
                          {step.label}
                        </span>
                      </div>
                      <pre className="mt-2 overflow-x-auto rounded-lg border bg-background/60 px-4 py-3">
                        <code className="font-mono text-[13px]">{step.cmd}</code>
                      </pre>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </FrameSection>
  );
}

/** The case for the SDK, grouped by what you are actually doing. */
export function Alternatives() {
  return (
    <FrameSection>
      <div className="py-16 md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl">
            Why {site.name} over the alternatives
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {alternatives.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.08}>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {group.name}
                </h3>
                <ul className="mt-6 space-y-4 border-t border-border/60 pt-6">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </FrameSection>
  );
}
