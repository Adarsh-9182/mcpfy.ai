import { PageHeader, Panel, StatCard } from "@/components/dashboard/ui";
import { organization } from "@/lib/dashboard";

export const metadata = { title: "Billing & plans" };

const usage = [
  { item: "Tool-call requests", qty: "192,412", rate: "$0.10 / 1k", amount: "$19.24" },
  { item: "Eval runs", qty: "34", rate: "$1.00 each", amount: "$34.00" },
  { item: "E2E checks", qty: "6", rate: "$2.00 each", amount: "$12.00" },
  { item: "Discovery traffic", qty: "84,120", rate: "not billed", amount: "$0.00" },
];

export default function BillingPage() {
  return (
    <>
      <PageHeader
        title="Billing & plans"
        description={`${organization.name} is on the ${organization.plan} plan.`}
        action={
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Change plan
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Current plan" value={organization.plan} hint="billed monthly" />
        <StatCard
          label="Usage credits"
          value={`$${organization.creditsUsed}`}
          hint={`of $${organization.creditsIncluded} included`}
        />
        <StatCard label="Next invoice" value="$65.24" hint="on 1 Sep 2026" />
      </div>

      <Panel title="This period" description="1 Aug – 20 Aug 2026">
        <table className="w-full text-[14px]">
          <tbody className="divide-y divide-border/60">
            {usage.map((u) => (
              <tr key={u.item}>
                <td className="px-5 py-3.5">{u.item}</td>
                <td className="px-5 py-3.5 text-right tabular-nums text-muted-foreground">
                  {u.qty}
                </td>
                <td className="px-5 py-3.5 text-right text-muted-foreground">
                  {u.rate}
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums">{u.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
