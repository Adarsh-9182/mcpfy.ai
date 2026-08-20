import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { StageVisual } from "./stage-visual";
import { LogoCloud } from "./logo-cloud";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { type PlatformPage } from "@/lib/platform";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Shared marketing template used by every platform and product page. */
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
      {/* hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 top-px z-0 bg-linear-to-br",
            page.wash,
          )}
        />
        <div className="relative z-10 px-4 py-6 md:px-6 lg:px-12">
          <div className="flex flex-col items-center gap-6 rounded-2xl border bg-background/80 px-4 py-14 text-center backdrop-blur-md md:py-24">
            <span className="rounded-full border bg-background px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {page.badge}
            </span>
            <h1 className="max-w-2xl px-4 text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              {page.subtitle}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <ShimmerButton asChild>
                <Link href={page.primaryCta.href}>{page.primaryCta.label}</Link>
              </ShimmerButton>
              <Link
                href={page.secondaryCta.href}
                className="inline-flex h-[50px] items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[15px] font-medium text-zinc-900 transition-opacity hover:opacity-90"
              >
                {page.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LogoCloud label="Our open source tools are used by developers at top companies" />

      {/* four steps */}
      <FrameSection>
        <div className="py-16 md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl">
              {page.stepsTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid divide-y divide-border/60 md:grid-cols-4 md:divide-x md:divide-y-0">
            {page.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="px-0 py-6 md:px-6 md:py-0">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-[17px] font-medium">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FrameSection>

      {/* alternating feature sections */}
      {page.features.map((f, i) => (
        <FrameSection key={f.title}>
          <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <div>
                <h2 className="max-w-md text-3xl font-medium tracking-tight md:text-4xl">
                  {f.title}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className={cn(i % 2 === 1 && "lg:order-1")}>
              <StageVisual id={f.visual} />
            </Reveal>
          </div>
        </FrameSection>
      ))}

      {/* grouped capability matrix */}
      {page.capabilityGroups && page.capabilityGroups.length > 0 && (
        <FrameSection>
          <div className="py-16 md:py-24">
            <Reveal>
              <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl">
                {page.capabilityGroupsTitle ?? "Everything in the platform"}
              </h2>
            </Reveal>
            {page.capabilityGroupsSubtitle && (
              <Reveal delay={0.06}>
                <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-base text-muted-foreground">
                  {page.capabilityGroupsSubtitle}
                </p>
              </Reveal>
            )}
            <div className="mt-14 flex flex-col gap-12">
              {page.capabilityGroups.map((group, gi) => (
                <Reveal key={group.name} delay={gi * 0.04}>
                  <div className="grid gap-6 border-t border-border/60 pt-8 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-12">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {group.name}
                    </h3>
                    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                      {group.items.map((item) => (
                        <div key={item.title}>
                          <h4 className="text-[15px] font-medium">{item.title}</h4>
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
          </div>
        </FrameSection>
      )}

      {/* capability grid */}
      <FrameSection>
        <div className="py-16 md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl">
              {page.gridTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.grid.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <div className="h-full rounded-xl border bg-card/40 p-6">
                  <h3 className="text-[15px] font-medium">{g.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FrameSection>

      {/* page CTA */}
      <FrameSection>
        <div className="flex flex-col items-center gap-6 py-16 text-center md:py-24">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
              {page.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <ShimmerButton asChild>
                <Link href="/signup">Start deploying</Link>
              </ShimmerButton>
              <Link
                href="/book-call"
                className="inline-flex h-[50px] items-center justify-center rounded-full border bg-background px-6 text-[15px] font-medium transition-colors hover:bg-accent"
              >
                Book a call
              </Link>
            </div>
          </Reveal>
        </div>
      </FrameSection>

      {/* cross-links */}
      <FrameSection>
        <div className="py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              {relatedTitle}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={o.href}
                  className="group flex h-full flex-col rounded-xl border bg-card/40 p-6 transition-colors hover:bg-card"
                >
                  <h3 className="text-[15px] font-medium">{o.navTitle}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                    {o.subtitle.split(".")[0]}.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium">
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-[13px] text-muted-foreground">
            Everything on {site.name} Cloud shares one pipeline.
          </p>
        </div>
      </FrameSection>
    </>
  );
}
