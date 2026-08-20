import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { StageVisual } from "./stage-visual";
import { lifecycle } from "@/lib/content";
import { cn } from "@/lib/utils";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </span>
  );
}

export function Lifecycle() {
  return (
    <>
      <FrameSection>
        <div className="py-16 text-center md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              From first commit to production.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Every step of the MCP lifecycle. No extra tools.
            </p>
          </Reveal>
        </div>
      </FrameSection>

      {lifecycle.map((stage, i) => (
        <FrameSection key={stage.id}>
          <div
            className={cn(
              "grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16",
            )}
          >
            {/* copy column — alternates side on large screens */}
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <div>
                <Kicker>{stage.kicker}</Kicker>
                <h3 className="mt-5 max-w-md text-3xl font-medium tracking-tight md:text-4xl">
                  {stage.title}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {stage.body}
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-3">
                  {stage.cards.map((card) => (
                    <div key={card.title}>
                      <p className="text-[15px] font-medium">{card.title}</p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                        {card.desc}
                      </p>
                      {card.cta && (
                        <Link
                          href="/docs"
                          className="group mt-3 inline-flex items-center gap-1.5 text-[14px]"
                        >
                          <span className="underline underline-offset-2 decoration-border group-hover:decoration-foreground">
                            {card.cta}
                          </span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.1}
              className={cn(i % 2 === 1 && "lg:order-1")}
            >
              <StageVisual id={stage.id} />
            </Reveal>
          </div>
        </FrameSection>
      ))}
    </>
  );
}
