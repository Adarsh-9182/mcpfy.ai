import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          align="center"
          className="mx-auto"
          title={
            <>
              Built in the <span className="font-serif italic font-normal">open</span>.
            </>
          }
          subtitle="One of the most adopted open-source MCP frameworks. Open from day one."
        />
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-xl border bg-card/40 p-8">
              <p className="text-5xl font-semibold tracking-tight tabular-nums">
                {s.value}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
              {s.tags && (
                <div className="mt-5 flex gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {s.cta && (
                <Link
                  href="/docs"
                  className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70"
                >
                  {s.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
