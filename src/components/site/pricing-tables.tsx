"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { metered, priceFor, tiers } from "@/lib/plans";

export function PricingTables() {
  const [yearly, setYearly] = React.useState(false);

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
                  {priceFor(tier, yearly)}
                </span>
                {tier.monthly !== null && (
                  <span className="text-sm text-muted-foreground">/mo</span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {tier.credits}
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
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
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
