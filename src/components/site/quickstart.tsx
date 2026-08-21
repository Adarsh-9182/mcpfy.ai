import { Band, Slug } from "./frame";
import { Display, Em, Lede } from "./section";
import { Reveal } from "./reveal";
import { quickstart, alternatives } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Quick start: the exact commands that take you from nothing to a deployed
 * server, in both supported languages, set as two shell transcripts.
 */
export function Quickstart() {
  return (
    <Band index="07" label="quick start">
      <Reveal>
        <Display size="lg" className="max-w-[16ch]">
          Three commands. Either <Em>language</Em>.
        </Display>
        <Lede className="mt-7">
          Scaffold a server, run it against a real client, and put it on a
          public MCP URL. Nothing else to install.
        </Lede>
      </Reveal>

      <div className="rule-grid mt-14 grid lg:grid-cols-2">
        {quickstart.map((track, i) => (
          <Reveal key={track.lang} delay={i * 0.08}>
            <div className="rule-cell h-full bg-card">
              <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
                <Slug className="text-signal">{track.lang}</Slug>
                <span className="font-mono text-[10.5px] text-muted-foreground">
                  {track.steps.length} steps
                </span>
              </div>

              <ol className="bg-ruled px-4 py-4 font-mono text-[12.5px] leading-[2.05]">
                {track.steps.map((step, si) => (
                  <li key={step.cmd} className="pb-3 last:pb-0">
                    <p className="text-muted-foreground">
                      # {String(si + 1).padStart(2, "0")} — {step.label}
                    </p>
                    <p className="flex gap-2">
                      <span className="shrink-0 text-signal">$</span>
                      <span className="min-w-0 break-all text-foreground">
                        {step.cmd}
                      </span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/** The case for the SDK, grouped by what you are actually doing. */
export function Alternatives() {
  return (
    <Band index="04" label="the case">
      <Reveal>
        <Display size="lg" className="max-w-[18ch]">
          Why teams pick {site.name} over the <Em>alternatives</Em>.
        </Display>
      </Reveal>

      <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {alternatives.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.08}>
            <div>
              <div className="flex items-center gap-4 border-b border-rule-strong/25 pb-3">
                <span className="font-mono text-[10.5px] text-signal">
                  0{i + 1}
                </span>
                <Slug className="text-foreground">{group.name}</Slug>
              </div>
              <ul>
                {group.points.map((point) => (
                  <li
                    key={point}
                    className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 border-b border-rule py-4 text-[15px] leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden className="font-mono text-[12px] text-signal">
                      →
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
