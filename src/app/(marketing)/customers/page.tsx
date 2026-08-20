import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
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
        title={
          <>
            Teams building on{" "}
            <span className="font-serif italic font-normal">{site.name}</span>
          </>
        }
        subtitle="From solo developers to platform teams, these are the people shipping MCP to production."
      />

      <Section className="border-t-0">
        <div className="grid gap-4 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.company} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-xl border bg-card/40 p-7">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold tracking-tight">
                    {s.company}
                  </p>
                  <span className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.industry}
                  </span>
                </div>

                <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  “{s.quote}”
                </blockquote>
                <p className="mt-4 text-[13px] text-muted-foreground">
                  {s.person}
                </p>

                <div className="mt-6 border-t pt-5">
                  <p className="text-3xl font-semibold tracking-tight tabular-nums">
                    {s.metric}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {s.metricLabel}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border bg-card/40 p-10 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight">
              Want your team here?
            </h2>
            <p className="max-w-lg text-balance-pretty text-muted-foreground">
              Tell us what you are building and we will help you get it in front
              of users.
            </p>
            <Button asChild size="lg" className="mt-3">
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
