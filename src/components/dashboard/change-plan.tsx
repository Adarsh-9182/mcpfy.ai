"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { priceFor, tiers } from "@/lib/plans";
import { Pill } from "./ui";

/** Plan grid with the monthly/yearly segmented control from the billing screen. */
export function ChangePlan({ currentPlan }: { currentPlan: string }) {
  const [yearly, setYearly] = useState(true);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-semibold tracking-tight">
            Change plan
          </h2>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            Upgrade or downgrade at any time. Prorated changes apply immediately.
          </p>
        </div>

        <div
          role="group"
          aria-label="Billing period"
          className="flex items-center gap-1 rounded-lg border border-dashed p-1"
        >
          {([false, true] as const).map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setYearly(v)}
              aria-pressed={yearly === v}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[14px] transition-colors",
                yearly === v
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v ? "Yearly" : "Monthly"}
              {v && (
                <span className="text-[12px] text-emerald-600 dark:text-emerald-400">
                  -17%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-4">
        {tiers.map((tier) => {
          const current = tier.name === currentPlan;
          return (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-xl border p-6",
                current && "border-foreground/25 bg-card",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-medium">{tier.name}</h3>
                {current && <Pill tone="success">Current</Pill>}
              </div>

              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-[30px] font-semibold leading-none tracking-tight nums-tabular">
                  {priceFor(tier, yearly)}
                </span>
                {tier.monthly !== null && (
                  <span className="text-[14px] text-muted-foreground">/mo</span>
                )}
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px]">
                    <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {!current && (
                <Link
                  href={tier.monthly === null ? "/contact" : "#"}
                  className={cn(
                    "mt-6 inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-medium transition-colors",
                    tier.monthly === null
                      ? "border hover:bg-accent"
                      : "bg-foreground text-background hover:opacity-90",
                  )}
                >
                  {tier.monthly === null ? "Contact sales" : `Switch to ${tier.name}`}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
