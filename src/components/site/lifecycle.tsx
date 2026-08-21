import { Band, Slug } from "./frame";
import { Display, Em, Lede, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { StageVisual } from "./stage-visual";
import { lifecycle } from "@/lib/content";

/**
 * The lifecycle reads as chapters of one document: a shared `03` index, a
 * decimal per stage, and the same chapter head over each spread.
 */
export function Lifecycle() {
  return (
    <>
      <Band index="03" label="lifecycle">
        <Reveal>
          <Display size="lg" className="max-w-[16ch]">
            From first commit to <Em>production</Em>, without leaving the
            platform.
          </Display>
          <Lede className="mt-7">
            Five stages, one pipeline. Nothing here needs a second vendor, a
            CI plugin or a weekend of YAML.
          </Lede>

          <ol className="rule-grid mt-12 grid sm:grid-cols-3 lg:grid-cols-5">
            {lifecycle.map((stage, i) => (
              <li
                key={stage.id}
                className="rule-cell flex items-baseline gap-2.5 px-4 py-4"
              >
                <span className="font-mono text-[10.5px] text-signal">
                  03.{i + 1}
                </span>
                <span className="font-mono text-[11.5px] uppercase tracking-[0.14em]">
                  {stage.kicker}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Band>

      {lifecycle.map((stage, i) => (
        <Band key={stage.id} index={`03.${i + 1}`} label={stage.kicker}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-14">
            <Reveal>
              <div>
                <Display size="md" className="max-w-[15ch]">
                  {stage.title}
                </Display>
                <Lede className="mt-6">{stage.body}</Lede>

                <dl className="mt-10 border-t border-rule">
                  {stage.cards.map((card) => (
                    <div
                      key={card.title}
                      className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt>
                        <Slug className="text-foreground">{card.title}</Slug>
                      </dt>
                      <dd className="text-[14.5px] leading-relaxed text-muted-foreground">
                        {card.desc}
                        {card.cta && (
                          <span className="mt-2.5 block">
                            <ArrowLink
                              href={card.cta.href}
                              tone="signal"
                              external={card.cta.href.startsWith("http")}
                            >
                              {card.cta.label}
                            </ArrowLink>
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <StageVisual id={stage.id} />
            </Reveal>
          </div>
        </Band>
      ))}
    </>
  );
}
