import { Section, SectionHeading, Title, Lead, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { StageVisual } from "./stage-visual";
import { ScrollScene } from "./scroll-scene";
import { lifecycle } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The pipeline, one spread per stage. A sticky rail on the left keeps the
 * current stage visible while its detail scrolls past.
 */
export function Lifecycle() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="The pipeline"
          title="From first commit to production"
          lead="Five stages, one platform."
          leadDim="No second vendor, no CI plugin, no weekend of YAML."
          className="mx-auto max-w-2xl"
        />
      </Reveal>

      <Reveal delay={0.06}>
        <ol className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {lifecycle.map((stage, i) => (
            <li key={stage.id} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-surface-1 px-3 py-1 text-[12.5px] capitalize text-muted-foreground">
                {stage.kicker}
              </span>
              {i < lifecycle.length - 1 && (
                <span aria-hidden className="text-subtle-foreground">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {lifecycle.map((stage, i) => (
          <div
            key={stage.id}
            className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
          >
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <div>
                <p className="flex items-center gap-2.5">
                  <span className="grid size-6 place-items-center rounded-md border border-line bg-n2 font-mono text-[11px] text-t-hi">
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-medium capitalize text-muted-foreground">
                    {stage.kicker}
                  </span>
                </p>

                <Title className="mt-5 max-w-[16ch]">{stage.title}</Title>
                <Lead className="mt-4">{stage.body}</Lead>

                <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
                  {stage.cards.map((card) => (
                    <div key={card.title}>
                      <p className="text-[13.5px] font-medium">{card.title}</p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                        {card.desc}
                      </p>
                      {card.cta && (
                        <div className="mt-2.5">
                          <ArrowLink
                            href={card.cta.href}
                            external={card.cta.href.startsWith("http")}
                            className="text-[13px]"
                          >
                            {card.cta.label}
                          </ArrowLink>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className={cn(i % 2 === 1 && "lg:order-1")}>
              <ScrollScene intensity={0.8}>
                <StageVisual id={stage.id} />
              </ScrollScene>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
