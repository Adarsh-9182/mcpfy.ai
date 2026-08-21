import { Band, Slug } from "./frame";
import { Display, Em, Lede, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { stats } from "@/lib/content";

/**
 * The open-source record, set as a masthead figure block: the numbers run in
 * the display serif at headline size, with their sources underneath.
 */
export function Stats() {
  return (
    <Band index="05" label="in the open">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
        <Reveal>
          <Display size="lg" className="max-w-[14ch]">
            Built in the <Em>open</Em>, from the first commit.
          </Display>
        </Reveal>
        <Reveal delay={0.06}>
          <Lede>
            One of the most adopted open-source MCP frameworks. The SDK, the
            Inspector and the templates are all public — read them before you
            trust them.
          </Lede>
        </Reveal>
      </div>

      <dl className="rule-grid mt-16 grid md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.08}>
            <div className="rule-cell h-full px-5 py-9 md:px-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="display block text-[52px] tabular-nums leading-none md:text-[64px]">
                  {s.value}
                </span>
                <Slug className="mt-5 block">{s.label}</Slug>
                <span className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {(s.tags ?? [s.cta]).filter(Boolean).map((t) => (
                    <ArrowLink key={t} href="/docs" tone="muted">
                      {t}
                    </ArrowLink>
                  ))}
                </span>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Band>
  );
}
