import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <>
      <FrameSection>
        <div className="py-16 text-center md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              Built in the open.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              One of the most adopted open-source MCP frameworks. Open from day one.
            </p>
          </Reveal>
        </div>
      </FrameSection>

      <FrameSection flush>
        <div className="grid divide-y divide-border/60 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div className="px-6 py-12 md:px-8">
                <p className="text-5xl font-medium tracking-tight tabular-nums md:text-6xl">
                  {s.value}
                </p>
                <p className="mt-4 text-[15px] text-muted-foreground">{s.label}</p>
                <div className="mt-5 flex gap-5">
                  {(s.tags ?? [s.cta]).filter(Boolean).map((t) => (
                    <Link
                      key={t}
                      href="/docs"
                      className="group inline-flex items-center gap-1 text-[14px]"
                    >
                      <span className="underline underline-offset-2 decoration-border group-hover:decoration-foreground">
                        {t}
                      </span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </FrameSection>
    </>
  );
}
