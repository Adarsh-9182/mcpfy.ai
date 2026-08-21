import Link from "next/link";
import { GitBranch, KeyRound, Lock, Server } from "lucide-react";
import { Band, Slug } from "./frame";
import { Display, Lede, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { StageVisual } from "./stage-visual";
import { LogoCloud } from "./logo-cloud";
import { type PlatformPage } from "@/lib/platform";
import { site } from "@/lib/site";

const gridIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  server: Server,
  git: GitBranch,
  lock: Lock,
  key: KeyRound,
};

/**
 * The shared template behind every platform and product page. It runs the same
 * indexed-band document as the homepage, so a product page reads as a chapter
 * of the same publication rather than a separate landing page.
 */
export function ProductPage({
  page,
  related,
  relatedTitle = "Explore the rest of the platform",
}: {
  page: PlatformPage;
  related: { slug: string; navTitle: string; subtitle: string; href: string }[];
  relatedTitle?: string;
}) {
  return (
    <>
      {/* masthead */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-paper" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen"
        />

        <div className="container-page relative">
          <div className="flex items-center gap-4 border-b border-rule py-4">
            <Slug className="text-signal">{page.badge}</Slug>
            <span aria-hidden className="h-px flex-1 bg-rule" />
            <Slug>{site.name} platform</Slug>
          </div>

          <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <Display as="h1" size="xl" className="max-w-[14ch]">
              {page.title}
            </Display>
            <div className="lg:pb-3">
              <Lede>{page.subtitle}</Lede>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={page.primaryCta.href}
                  className="group inline-flex h-12 items-center gap-3 bg-foreground px-7 text-[14px] font-medium tracking-tight text-background transition-colors hover:bg-signal"
                >
                  {page.primaryCta.label}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <ArrowLink href={page.secondaryCta.href} tone="muted">
                  {page.secondaryCta.label}
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoCloud label="Our open source tools are used by developers at top companies" />

      {/* how it runs */}
      <Band index="01" label="how it runs">
        <Reveal>
          <Display size="lg" className="max-w-[16ch]">
            {page.stepsTitle}
          </Display>
        </Reveal>
        <ol className="rule-grid mt-12 grid md:grid-cols-4">
          {page.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <li className="rule-cell h-full px-5 py-6">
                <span className="font-mono text-[10.5px] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[16px] font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Band>

      {/* feature spreads */}
      {page.features.map((f, i) => (
        <Band key={f.title} index={`02.${i + 1}`} label="feature">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-14">
            <Reveal>
              <div>
                <Display size="md" className="max-w-[15ch]">
                  {f.title}
                </Display>
                <Lede className="mt-6">{f.desc}</Lede>
                {f.bullets && (
                  <ul className="mt-9 border-t border-rule">
                    {f.bullets.map((b) => (
                      <li
                        key={b}
                        className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 border-b border-rule py-4 text-[15px] leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-px font-mono text-[12px] text-signal"
                        >
                          ✓
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <StageVisual id={f.visual} />
            </Reveal>
          </div>
        </Band>
      ))}

      {/* grouped capability matrix */}
      {page.capabilityGroups && page.capabilityGroups.length > 0 && (
        <Band index="03" label="capabilities">
          <Reveal>
            <Display size="lg" className="max-w-[16ch]">
              {page.capabilityGroupsTitle ?? "Everything in the platform"}
            </Display>
            {page.capabilityGroupsSubtitle && (
              <Lede className="mt-7">{page.capabilityGroupsSubtitle}</Lede>
            )}
          </Reveal>

          <div className="mt-14 flex flex-col">
            {page.capabilityGroups.map((group, gi) => (
              <Reveal key={group.name} delay={gi * 0.04}>
                <div className="grid gap-6 border-t border-rule py-9 lg:grid-cols-[minmax(0,12rem)_1fr] lg:gap-12">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10.5px] text-signal">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <Slug className="text-foreground">{group.name}</Slug>
                  </div>
                  <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((item) => (
                      <div key={item.title}>
                        <h4 className="text-[15px] font-medium tracking-tight">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Band>
      )}

      {/* framework support */}
      {page.frameworks && (
        <Band index="04" label="frameworks">
          <Reveal>
            <Display size="md" className="max-w-[18ch]">
              {page.frameworks.title}
            </Display>
            <Lede className="mt-6">{page.frameworks.desc}</Lede>
          </Reveal>

          <div className="rule-grid mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {page.frameworks.items.map((name, i) => (
              <Reveal key={name} delay={(i % 4) * 0.05}>
                <div className="rule-cell flex h-full items-center gap-3 px-5 py-7">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium tracking-tight">
                    {name}
                  </span>
                </div>
              </Reveal>
            ))}
            <div className="rule-cell flex h-full items-center bg-hatch px-5 py-7 text-[13.5px] leading-snug text-muted-foreground">
              {page.frameworks.note}
            </div>
          </div>

          {page.frameworks.link && (
            <Reveal>
              <div className="mt-9">
                <ArrowLink href={page.frameworks.link.href}>
                  {page.frameworks.link.label}
                </ArrowLink>
              </div>
            </Reveal>
          )}
        </Band>
      )}

      {/* capability grid + stats */}
      <Band index="05" label="in the box">
        {page.gridTitle && (
          <Reveal>
            <Display size="md" className="mb-12 max-w-[18ch]">
              {page.gridTitle}
            </Display>
          </Reveal>
        )}
        <div className="rule-grid grid sm:grid-cols-2 lg:grid-cols-4">
          {page.grid.map((g, i) => {
            const Icon = g.icon ? gridIcons[g.icon] : undefined;
            return (
              <Reveal key={g.title} delay={i * 0.06}>
                <div className="rule-cell h-full px-5 py-7">
                  {Icon ? (
                    <Icon className="mb-4 size-[18px] text-signal" />
                  ) : (
                    <span className="mb-4 block font-mono text-[10.5px] text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <h3 className="text-[15px] font-medium tracking-tight">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {page.stats && (
          <dl className="rule-grid -mt-px grid sm:grid-cols-3">
            {page.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="rule-cell h-full px-5 py-7">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-[38px] leading-none tabular-nums">
                      {s.value}
                    </span>
                    <Slug className="mt-3 block">{s.label}</Slug>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        )}
      </Band>

      {/* page CTA */}
      <Band index="06" label="begin">
        <div className="bg-foreground px-6 py-14 text-background md:px-12 md:py-16">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[34px] md:text-[48px]">
              {page.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/signup"
                className="group inline-flex h-12 items-center gap-3 bg-background px-7 text-[14px] font-medium tracking-tight text-foreground transition-colors hover:bg-signal hover:text-signal-foreground"
              >
                Start deploying
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100"
              >
                <span className="border-b border-current pb-0.5">
                  Book a call
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* cross-links */}
      <Band index="07" label="elsewhere">
        <Reveal>
          <Display size="md" className="max-w-[18ch]">
            {relatedTitle}
          </Display>
        </Reveal>
        <div className="rule-grid mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
          {related.map((o, i) => (
            <Reveal key={o.slug} delay={(i % 3) * 0.06}>
              <Link
                href={o.href}
                className="rule-cell group flex h-full flex-col px-5 py-7 transition-colors hover:bg-accent"
              >
                <span className="font-mono text-[10.5px] text-muted-foreground transition-colors group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[16px] font-medium tracking-tight">
                  {o.navTitle}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                  {o.subtitle.split(".")[0]}.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em]">
                  <span className="border-b border-rule pb-0.5 group-hover:border-signal group-hover:text-signal">
                    Learn more
                  </span>
                  <span
                    aria-hidden
                    className="text-signal transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 border-t border-rule pt-5">
          <Slug>everything on {site.name} cloud shares one pipeline</Slug>
        </p>
      </Band>
    </>
  );
}
