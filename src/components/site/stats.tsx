import { Section, SectionHeading, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="Open source"
            title="Built in the open, from the first commit"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-[16px] leading-[1.6] text-muted-foreground md:text-[17px]">
            <span className="text-foreground">
              One of the most adopted open-source MCP frameworks.
            </span>{" "}
            The SDK, the Inspector and every template are public — read them
            before you trust them.
          </p>
        </Reveal>
      </div>

      <dl className="mt-14 grid gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.07}>
            <div className="card-surface h-full rounded-xl p-6">
              <dt className="text-[13px] text-muted-foreground">{s.label}</dt>
              <dd>
                <p className="mt-3 text-[44px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                  {s.value}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {(s.tags ?? [s.cta]).filter(Boolean).map((t) => (
                    <ArrowLink key={t} href="/docs" className="text-[13px]">
                      {t}
                    </ArrowLink>
                  ))}
                </div>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
