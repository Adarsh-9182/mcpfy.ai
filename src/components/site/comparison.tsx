import * as React from "react";
import { Check, X } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { comparisonRows } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Build-it-yourself against the platform, row by row. The platform column is
 * lifted onto a raised, edge-lit surface so it wins the eye on material
 * rather than on colour.
 */
export function Comparison() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="What you skip"
          title="Every MCP server needs the same scaffolding"
          lead="Seven jobs stand between a working tool and something people can install."
          leadDim="You can write all of them, or none of them."
          className="mx-auto max-w-2xl"
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 overflow-x-auto">
          {/* One grid so the job label and both answers always share a row. */}
          <div className="grid min-w-[44rem] grid-cols-[minmax(0,0.85fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
            <span />
            <p className="px-5 pb-3 text-sm font-medium text-t-mid">
              By hand
            </p>
            <p className="px-5 pb-3 text-sm font-medium text-t-hi">
              With {site.name}
            </p>

            {comparisonRows.map((row, i) => {
              const first = i === 0;
              const last = i === comparisonRows.length - 1;
              return (
                <React.Fragment key={row.job}>
                  <div className="flex items-center py-5 pr-6 text-h4">
                    {row.job}
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-3 border-x border-border px-5 py-5",
                      first && "rounded-t-xl border-t",
                      last && "rounded-b-xl border-b",
                      !last && "border-b border-b-border/60",
                    )}
                  >
                    <X className="size-3.5 shrink-0 text-subtle-foreground" />
                    <span className="text-sm text-t-mid">
                      {row.byHand}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "surface-2 edge-lit flex items-center gap-3 border-x px-5 py-5",
                      first && "rounded-t-xl border-t",
                      last && "rounded-b-xl border-b",
                      !last && "border-b border-b-border/60",
                    )}
                  >
                    <Check className="size-3.5 shrink-0 text-t-hi" />
                    <span className="text-sm text-t-hi/90">
                      {row.withUs}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
