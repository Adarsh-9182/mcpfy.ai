import { ExternalLink } from "lucide-react";
import { ChangePlan } from "@/components/dashboard/change-plan";
import { UsageBreakdown } from "@/components/dashboard/usage-breakdown";
import { Pill } from "@/components/dashboard/ui";
import { organization, usageBreakdown } from "@/lib/dashboard";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  const { creditsUsed, creditsIncluded, plan } = organization;
  const remaining = Math.max(creditsIncluded - creditsUsed, 0);
  const pct = Math.min((creditsUsed / creditsIncluded) * 100, 100);
  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <>
      <div>
        <h1 className="text-[24px] font-semibold tracking-tight">Billing</h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Manage your organization subscription and usage.
        </p>
      </div>

      <section className="rounded-xl border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Current plan
            </p>
            <p className="mt-2 flex items-center gap-3">
              <span className="text-[26px] font-semibold leading-none tracking-tight">
                {plan}
              </span>
              <Pill tone="success">Active</Pill>
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors hover:bg-accent"
          >
            <ExternalLink className="size-4" />
            Manage subscription
          </button>
        </div>

        <div className="mt-6 rounded-xl border p-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Credits
            </p>
            <p className="text-[13px] text-muted-foreground tabular-nums">
              {money(creditsUsed)} used
            </p>
          </div>

          <p className="mt-2 text-[15px]">
            <span className="text-[22px] font-semibold tracking-tight tabular-nums">
              {money(remaining)}
            </span>{" "}
            <span className="text-muted-foreground">
              of {money(creditsIncluded)} remaining
            </span>
          </p>

          <div
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Credits used"
            className="relative mt-4 h-2 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-foreground/70"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-2.5 flex justify-between text-[12px] text-muted-foreground tabular-nums">
            <span>{money(creditsUsed)} used</span>
            <span>Included {money(creditsIncluded)}</span>
          </div>
        </div>

        <div className="mt-5">
          <UsageBreakdown rows={usageBreakdown} />
        </div>
      </section>

      <ChangePlan currentPlan={plan} />
    </>
  );
}
