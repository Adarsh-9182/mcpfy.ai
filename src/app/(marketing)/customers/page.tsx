import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Em } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { FinalCta } from "@/components/site/final-cta";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customers",
  description: `Teams shipping MCP apps and servers on ${site.name}.`,
};

const stories = [
  {
    company: "Northwind",
    industry: "Logistics",
    quote:
      "We moved our internal freight-tracking agent onto MCP in a week. Preview deployments per branch meant ops could try changes before they shipped.",
    person: "Amara Osei, Staff Engineer",
    metric: "12 → 2 days",
    metricLabel: "release cycle",
  },
  {
    company: "Aperture",
    industry: "Analytics",
    quote:
      "Cross-client testing caught three regressions that only showed up in one client. That used to be a support ticket two weeks later.",
    person: "Rahul Mehta, Head of Platform",
    metric: "98.7%",
    metricLabel: "tool-call success",
  },
  {
    company: "Lumen Labs",
    industry: "Developer tools",
    quote:
      "The submission pack got us through marketplace review on the first attempt. The publishing checks are the reason.",
    person: "Sofia Marchetti, Founder",
    metric: "1st",
    metricLabel: "submission accepted",
  },
];

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="customers"
        meta="who ships on mcpfy"
        title={
          <>
            Teams building on{" "}
            <Em>{site.name}</Em>
          </>
        }
        subtitle="From solo developers to platform teams, these are the people shipping MCP to production."
      />

      <Section className="border-t-0">
        <div className="rule-grid grid lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.company} delay={i * 0.08} className="rule-cell">
              <article className="flex h-full flex-col px-6 py-8">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="display text-[26px]">{s.company}</p>
                  <span className="slug">{s.industry}</span>
                </div>

                <blockquote className="display mt-7 flex-1 text-[19px] leading-[1.35]">
                  <span aria-hidden className="mr-1 text-signal">
                    “
                  </span>
                  {s.quote}
                </blockquote>
                <p className="mt-5 font-mono text-[11.5px] text-muted-foreground">
                  {s.person}
                </p>

                <div className="mt-7 border-t border-rule pt-5">
                  <p className="display text-[38px] leading-none tabular-nums">
                    {s.metric}
                  </p>
                  <p className="slug mt-3">{s.metricLabel}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start gap-4 border-l-2 border-signal bg-signal-soft/40 px-7 py-9">
            <span className="slug text-signal">open call</span>
            <h2 className="display max-w-[16ch] text-[30px] md:text-[36px]">
              Want your team on this page?
            </h2>
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
              Tell us what you are building and we will help you get it in front
              of users.
            </p>
            <Button asChild size="lg" className="mt-2">
              <Link href="/contact">
                Book a call <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
