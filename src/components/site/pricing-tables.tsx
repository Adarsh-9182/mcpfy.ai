"use client";

import * as React from "react";
import Link from "next/link";
import { Slug } from "./frame";
import { cn } from "@/lib/utils";
import { metered, priceFor, tiers } from "@/lib/plans";

/** Mono segmented control — the site has no pill switches. */
function BillingToggle({
  yearly,
  onChange,
}: {
  yearly: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex items-stretch border border-rule">
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
            "slug px-4 py-2.5 transition-colors",
            yearly === opt.value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
      <span className="flex items-center border-l border-rule px-3">
        <Slug className="text-signal">save 17%</Slug>
      </span>
    </div>
  );
}

export function PricingTables() {
  const [yearly, setYearly] = React.useState(false);

  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-5 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <Slug className="text-signal">rate card</Slug>
            <span aria-hidden className="hidden h-px w-16 bg-rule sm:block" />
          </div>
          <BillingToggle yearly={yearly} onChange={setYearly} />
        </div>

        {/* the plans, as columns of one ruled table */}
        <div className="rule-grid grid lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={cn(
                "rule-cell flex flex-col px-5 py-7",
                tier.featured && "bg-card",
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "-mt-7 mb-6 h-0.5",
                  tier.featured ? "bg-signal" : "bg-transparent",
                )}
              />

              <div className="flex items-baseline justify-between gap-2">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[10.5px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-[26px]">{tier.name}</h2>
                </span>
                {tier.featured && <Slug className="text-signal">popular</Slug>}
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="display text-[44px] leading-none tabular-nums">
                  {priceFor(tier, yearly)}
                </span>
                {tier.monthly !== null && (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    /mo
                  </span>
                )}
              </div>

              <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-muted-foreground">
                {tier.credits}
              </p>
              <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-foreground">
                {tier.requests}
              </p>

              {/* Two lines of 13.5px/relaxed measure ~44px; reserve it so every
                  tier's CTA lands on the same baseline. */}
              <p className="mt-4 min-h-11 text-[13.5px] leading-relaxed text-muted-foreground">
                {tier.blurb}
              </p>

              <Link
                href={tier.monthly === null ? "/contact" : "/docs"}
                className={cn(
                  "group mt-6 inline-flex h-11 items-center justify-between gap-2 px-4 slug transition-colors",
                  tier.featured
                    ? "bg-foreground text-background hover:bg-signal hover:text-signal-foreground"
                    : "border border-rule-strong/30 hover:border-signal hover:text-signal",
                )}
              >
                {tier.cta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <ul className="mt-7 border-t border-rule">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="grid grid-cols-[1rem_minmax(0,1fr)] gap-2 border-b border-rule-soft py-3 text-[13.5px] leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-px font-mono text-[11px] text-signal"
                    >
                      ✓
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* metered add-ons */}
        <div className="mt-16 border border-rule">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
            <Slug className="text-foreground">usage-based pricing</Slug>
            <Slug className="normal-case tracking-normal">
              Metered on top of plan credits. Discovery traffic is never billed.
            </Slug>
          </div>
          <dl className="rule-grid grid sm:grid-cols-2 lg:grid-cols-3">
            {metered.map((m) => (
              <div key={m.label} className="rule-cell px-5 py-6">
                <dt>
                  <Slug>{m.label}</Slug>
                </dt>
                <dd className="mt-3 flex items-baseline gap-1.5">
                  <span className="display text-[30px] leading-none tabular-nums">
                    {m.price}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
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
