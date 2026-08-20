"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  monthly: number | null;
  credits: string;
  requests: string;
  blurb: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

const YEARLY_DISCOUNT = 0.17;

const tiers: Tier[] = [
  {
    name: "Free",
    monthly: 0,
    credits: "$5 included monthly",
    requests: "30k requests / month",
    blurb: "Everything you need to ship your first MCP server.",
    cta: "Start for free",
    features: [
      "2 projects",
      "7 days analytics retention",
      "1 team member",
      "Deploy from GitHub organization",
      "Publishing checklist",
      "Community support",
    ],
  },
  {
    name: "Hobby",
    monthly: 25,
    credits: "$30 included, then pay-as-you-go",
    requests: "300k requests / month",
    blurb: "For side projects heading to the marketplaces.",
    cta: "Get started",
    featured: true,
    features: [
      "5 projects",
      "30 days analytics retention",
      "3 team members",
      "Preview deployments",
      "Deploy from GitHub organization",
      "Cold-start prevention",
      "End-to-end checks",
      "Test suites",
      "Public chat",
      "Submission pack",
      "Email support",
    ],
  },
  {
    name: "Startup",
    monthly: 250,
    credits: "$300 included, then pay-as-you-go",
    requests: "3M requests / month",
    blurb: "For teams running MCP in production.",
    cta: "Get started",
    features: [
      "Unlimited projects",
      "1 year analytics retention",
      "10 team members",
      "Preview deployments",
      "Deploy from GitHub organization",
      "Cold-start prevention",
      "Auto + US, EU and APAC regions",
      "End-to-end checks",
      "Test suites",
      "Public chat",
      "Submission pack",
      "Dedicated Slack channel",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    credits: "From $1,000/month",
    requests: "Unlimited requests",
    blurb: "Procurement, compliance and scale.",
    cta: "Contact sales",
    features: [
      "Unlimited projects",
      "Unlimited analytics retention",
      "Unlimited team members",
      "Preview deployments",
      "Deploy from GitHub organization",
      "Cold-start prevention",
      "All regions",
      "End-to-end checks",
      "Test suites",
      "Public chat",
      "Submission pack",
      "Priority support",
    ],
  },
];

const metered = [
  { label: "Tool-call requests", price: "$0.10", unit: "per 1,000" },
  { label: "Eval runs", price: "$1.00", unit: "per run" },
  { label: "Publishing checklist", price: "$0.10", unit: "per run" },
  { label: "End-to-end checks", price: "$2.00", unit: "per check" },
  { label: "Submission pack", price: "$5.00", unit: "per generation" },
  { label: "Build minutes", price: "$0.07", unit: "per minute" },
  { label: "Bandwidth", price: "$0.15", unit: "per GB egress" },
  { label: "LLM tokens", price: "$5.00", unit: "per 1M output" },
];

export function PricingTables() {
  const [yearly, setYearly] = React.useState(false);

  const priceFor = (tier: Tier) => {
    if (tier.monthly === null) return "Custom";
    if (tier.monthly === 0) return "$0";
    const value = yearly
      ? Math.round(tier.monthly * (1 - YEARLY_DISCOUNT))
      : tier.monthly;
    return `$${value}`;
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm transition-colors",
              !yearly ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Monthly
          </span>
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
            aria-label="Toggle yearly billing"
          />
          <span
            className={cn(
              "text-sm transition-colors",
              yearly ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Yearly
          </span>
          <span className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            Save 17%
          </span>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-xl border bg-card/40 p-6",
                tier.featured && "border-foreground/25 bg-card shadow-[var(--drop)]",
              )}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{tier.name}</h2>
                {tier.featured && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">
                  {priceFor(tier)}
                </span>
                {tier.monthly !== null && (
                  <span className="text-sm text-muted-foreground">/mo</span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {tier.credits}
              </p>
              <p className="mt-1 text-[13px] font-medium text-foreground">
                {tier.requests}
              </p>
              {/* Two lines of 13px/leading-relaxed measure 42.25px; reserve 44px so
                  every tier's CTA lands on the same baseline. */}
              <p className="mt-3 min-h-11 text-[13px] leading-relaxed text-muted-foreground">
                {tier.blurb}
              </p>

              <Button
                asChild
                className="mt-6 w-full"
                variant={tier.featured ? "default" : "outline"}
              >
                <Link href={tier.monthly === null ? "/contact" : "/docs"}>
                  {tier.cta}
                </Link>
              </Button>

              <ul className="mt-7 space-y-3 border-t pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px]">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border bg-card/40 p-6">
          <h2 className="text-base font-semibold">Usage-based pricing</h2>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            Metered on top of your plan credits. Discovery traffic is never billed.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metered.map((m) => (
              <div key={m.label} className="rounded-lg border bg-background/60 p-4">
                <dt className="text-[13px] text-muted-foreground">{m.label}</dt>
                <dd className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-semibold tabular-nums">
                    {m.price}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{m.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
