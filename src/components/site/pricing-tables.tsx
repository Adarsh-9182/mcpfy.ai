"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { metered, priceFor, tiers } from "@/lib/plans";

function BillingToggle({
  yearly,
  onChange,
}: {
  yearly: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="inline-flex rounded-lg border border-border bg-surface-1 p-0.5">
        {[
          { label: "Monthly", value: false },
          { label: "Yearly", value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={yearly === opt.value}
            className={cn(
              "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
              yearly === opt.value
                ? "bg-surface-3 text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <span className="rounded-full border border-live/25 bg-live/10 px-2.5 py-1 text-[12px] font-medium text-live">
        Save 17%
      </span>
    </div>
  );
}

export function PricingTables() {
  const [yearly, setYearly] = React.useState(false);

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="flex justify-center">
          <BillingToggle yearly={yearly} onChange={setYearly} />
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-xl border border-border bg-surface-1 p-6",
                tier.featured &&
                  "border-brand/40 bg-brand-soft shadow-panel",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[15px] font-semibold">{tier.name}</h2>
                {tier.featured && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11.5px] font-medium text-white">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-[38px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                  {priceFor(tier, yearly)}
                </span>
                {tier.monthly !== null && (
                  <span className="text-[13px] text-muted-foreground">/mo</span>
                )}
              </div>

              <p className="mt-4 text-[13px] text-muted-foreground">
                {tier.credits}
              </p>
              <p className="mt-1 text-[13px] font-medium">{tier.requests}</p>

              {/* Two lines of 13px/relaxed measure ~42px; reserve it so every
                  tier's CTA lands on the same baseline. */}
              <p className="mt-3 min-h-11 text-[13px] leading-relaxed text-muted-foreground">
                {tier.blurb}
              </p>

              <Link
                href={tier.monthly === null ? "/contact" : "/docs"}
                className={cn(
                  "mt-6 inline-flex h-10 items-center justify-center rounded-lg text-[14px] font-medium transition-colors",
                  tier.featured
                    ? "bg-brand text-white hover:bg-brand-hi"
                    : "border border-border bg-surface-1 hover:border-border-strong hover:bg-surface-2",
                )}
              >
                {tier.cta}
              </Link>

              <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px]">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-border bg-surface-1 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[15px] font-semibold">Usage-based pricing</h2>
            <p className="text-[13px] text-muted-foreground">
              Metered on top of plan credits. Discovery traffic is never billed.
            </p>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metered.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border bg-background/50 p-4"
              >
                <dt className="text-[13px] text-muted-foreground">{m.label}</dt>
                <dd className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[24px] font-semibold tabular-nums tracking-[-0.03em]">
                    {m.price}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {m.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
