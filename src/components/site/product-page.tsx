import Link from "next/link";
import { Check, GitBranch, KeyRound, Lock, Server } from "lucide-react";
import {
  Section,
  SectionHeading,
  Title,
  Lead,
  Eyebrow,
  ArrowLink,
} from "./section";
import { Reveal } from "./reveal";
import { StageVisual } from "./stage-visual";
import { LogoCloud } from "./logo-cloud";
import { ProductShot } from "./product-shot";
import { type PlatformPage } from "@/lib/platform";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const gridIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  server: Server,
  git: GitBranch,
  lock: Lock,
  key: KeyRound,
};

/** Shared template behind every platform and product page. */
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px] hero-glow"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-dots opacity-40 mask-radial"
        />

        <div className="container-page relative pt-16 md:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{page.badge}</Eyebrow>
            <Title as="h1" size="lg" className="mx-auto mt-4 max-w-[18ch]">
              {page.title}
            </Title>
            <Lead className="mx-auto mt-5 text-center">{page.subtitle}</Lead>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={page.primaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-[14.5px] font-medium text-background transition-opacity hover:opacity-90"
              >
                {page.primaryCta.label}
              </Link>
              <Link
                href={page.secondaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface-1 px-5 text-[14.5px] font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
              >
                {page.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative mt-14">
            <ProductShot className="mx-auto max-w-[1000px]" />
          </div>
        </div>
      </section>

      <LogoCloud label="Our open source tools are used by developers at top companies" />

      {/* how it runs */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How it runs"
            title={page.stepsTitle}
            className="mx-auto max-w-2xl"
          />
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {page.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <li className="card-surface h-full rounded-xl p-5">
                <span className="grid size-6 place-items-center rounded-md border border-line bg-n2 font-mono text-[11px] text-t-hi">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[15px] font-medium">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* feature spreads */}
      <Section className="border-t border-border">
        <div className="flex flex-col gap-20 md:gap-28">
          {page.features.map((f, i) => (
            <div
              key={f.title}
              className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <div>
                  <Title className="max-w-[16ch]">{f.title}</Title>
                  <Lead className="mt-4">{f.desc}</Lead>
                  {f.bullets && (
                    <ul className="mt-6 flex flex-col gap-3">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-t-mid" />
                          <span className="text-[14.5px] leading-relaxed text-muted-foreground">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.08} className={cn(i % 2 === 1 && "lg:order-1")}>
                <StageVisual id={f.visual} />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* grouped capability matrix */}
      {page.capabilityGroups && page.capabilityGroups.length > 0 && (
        <Section className="border-t border-border">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Capabilities"
              title={page.capabilityGroupsTitle ?? "Everything in the platform"}
              lead={page.capabilityGroupsSubtitle}
              className="mx-auto max-w-2xl"
            />
          </Reveal>

          <div className="mt-14 flex flex-col gap-12">
            {page.capabilityGroups.map((group, gi) => (
              <Reveal key={group.name} delay={gi * 0.04}>
                <div className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-12">
                  <h3 className="text-[14px] font-medium text-muted-foreground">
                    {group.name}
                  </h3>
                  <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((item) => (
                      <div key={item.title}>
                        <h4 className="text-[14.5px] font-medium">{item.title}</h4>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* frameworks */}
      {page.frameworks && (
        <Section className="border-t border-border">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Frameworks"
              title={page.frameworks.title}
              lead={page.frameworks.desc}
              className="mx-auto max-w-2xl"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {page.frameworks.items.map((name, i) => (
              <Reveal key={name} delay={(i % 4) * 0.04}>
                <div className="card-surface flex h-full items-center justify-center rounded-lg px-4 py-6 text-center text-[14px] font-medium">
                  {name}
                </div>
              </Reveal>
            ))}
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border px-4 py-6 text-center text-[13px] text-muted-foreground">
              {page.frameworks.note}
            </div>
          </div>

          {page.frameworks.link && (
            <Reveal>
              <div className="mt-8 flex justify-center">
                <ArrowLink href={page.frameworks.link.href}>
                  {page.frameworks.link.label}
                </ArrowLink>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* capability grid + stats */}
      <Section className="border-t border-border">
        {page.gridTitle && (
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="In the box"
              title={page.gridTitle}
              className="mx-auto mb-12 max-w-2xl"
            />
          </Reveal>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.grid.map((g, i) => {
            const Icon = g.icon ? gridIcons[g.icon] : undefined;
            return (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="card-surface h-full rounded-xl p-5">
                  {Icon ? (
                    <span className="grid size-8 place-items-center rounded-[var(--r-1)] border border-line bg-n2 text-t-hi">
                      <Icon className="size-4" />
                    </span>
                  ) : (
                    <span className="grid size-8 place-items-center rounded-[var(--r-1)] border border-line bg-n2 font-mono text-[11px] text-t-hi">
                      {i + 1}
                    </span>
                  )}
                  <h3 className="mt-4 text-[14.5px] font-medium">{g.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {page.stats && (
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            {page.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="card-surface h-full rounded-xl p-5">
                  <dt className="text-[13px] text-muted-foreground">{s.label}</dt>
                  <dd className="mt-2.5 text-[32px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                    {s.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        )}
      </Section>

      {/* page CTA */}
      <Section className="border-t border-border">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1 px-6 py-14 text-center md:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-56 hero-glow opacity-80"
          />
          <div className="relative">
            <Reveal>
              <Title as="h2" size="lg" className="mx-auto max-w-[20ch]">
                {page.ctaTitle}
              </Title>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-[14.5px] font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start deploying
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface-1 px-5 text-[14.5px] font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
                >
                  Book a call
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* cross-links */}
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading title={relatedTitle} />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((o, i) => (
            <Reveal key={o.slug} delay={(i % 3) * 0.05}>
              <Link
                href={o.href}
                className="card-surface group flex h-full flex-col rounded-xl p-5 transition-colors hover:border-border-strong"
              >
                <h3 className="text-[14.5px] font-medium">{o.navTitle}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  {o.subtitle.split(".")[0]}.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-t-hi">
                  Learn more
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-[13px] text-subtle-foreground">
          Everything on {site.name} Cloud shares one pipeline.
        </p>
      </Section>
    </>
  );
}
