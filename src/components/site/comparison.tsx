import { Check, Minus } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { comparisonRows } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The "build it by hand, or use the platform" table. Two columns of the same
 * jobs, so the cost of doing it yourself is visible row by row.
 */
export function Comparison() {
  return (
    <FrameSection>
      <div className="py-16 md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Build by hand. Or with{" "}
            <span className="font-serif italic font-normal">{site.name}</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-base text-muted-foreground md:text-lg">
            Every MCP server needs the same things around it. The only question
            is how much of it you write yourself.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="w-[18%] py-4 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted-foreground">
                    The job
                  </th>
                  <th className="w-[41%] px-6 py-4 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted-foreground">
                    Without {site.name}
                  </th>
                  <th className="w-[41%] py-4 pl-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-foreground">
                    With {site.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.job} className="border-b border-border/60">
                    <th
                      scope="row"
                      className="py-5 pr-6 align-top text-[15px] font-medium"
                    >
                      {row.job}
                    </th>
                    <td className="px-6 py-5 align-top">
                      <span className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
                        <Minus className="mt-1 size-3.5 shrink-0" />
                        {row.byHand}
                      </span>
                    </td>
                    <td className="py-5 pl-6 align-top">
                      <span className="flex gap-2.5 text-[14px] leading-relaxed">
                        <Check className="mt-1 size-3.5 shrink-0" />
                        {row.withUs}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </FrameSection>
  );
}
