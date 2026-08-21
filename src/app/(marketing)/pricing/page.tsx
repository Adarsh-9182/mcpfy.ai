import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { PricingTables } from "@/components/site/pricing-tables";
import { Faq } from "@/components/site/faq";
import { site } from "@/lib/site";
import { Em } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Simple, usage-based pricing for ${site.name}. Start free, scale as your MCP apps grow.`,
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="pricing"
        meta="usage-based · start free"
        title={
          <>
            Pricing that scales with{" "}
            <Em>your app</Em>
          </>
        }
        subtitle={
          <>
            Start free. Pay for what you use. Discovery traffic like{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">
              tools/list
            </code>{" "}
            is never billed.
          </>
        }
      />
      <PricingTables />
      <Faq />
    </>
  );
}
