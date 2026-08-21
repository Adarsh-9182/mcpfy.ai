import { Band, Slug } from "./frame";
import { Display, Em, Lede } from "./section";
import { Reveal } from "./reveal";
import { comparisonRows } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The ledger: every job an MCP server needs around it, costed twice. The
 * platform column is the one with the surface and the signal rule; the
 * hand-rolled column is hatched, the way a struck line is on paper.
 */
export function Comparison() {
  return (
    <Band index="02" label="the ledger">
      <Reveal>
        <Display size="lg" className="max-w-[18ch]">
          Every MCP server needs the same scaffolding. The question is who{" "}
          <Em>writes</Em> it.
        </Display>
        <Lede className="mt-7">
          Seven jobs stand between a working tool and a product people can
          actually install. Here is the bill for each one.
        </Lede>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[22%] border-b border-rule-strong/25 pb-3 pr-6">
                  <Slug>the job</Slug>
                </th>
                <th className="w-[39%] border-b border-rule-strong/25 px-6 pb-3">
                  <Slug>by hand</Slug>
                </th>
                <th className="w-[39%] border-b-2 border-signal px-6 pb-3">
                  <Slug className="text-signal">with {site.name}</Slug>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.job} className="group align-top">
                  <th
                    scope="row"
                    className="border-b border-rule py-6 pr-6 text-left"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[10.5px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-[21px] md:text-[24px]">
                        {row.job}
                      </span>
                    </span>
                  </th>

                  <td className="border-b border-rule px-6 py-6">
                    <span className="flex gap-3 text-[14.5px] leading-relaxed text-muted-foreground">
                      <span
                        aria-hidden
                        className="mt-[3px] h-3 w-3 shrink-0 bg-hatch"
                      />
                      {row.byHand}
                    </span>
                  </td>

                  <td className="border-b border-rule bg-signal-soft/40 px-6 py-6 transition-colors group-hover:bg-signal-soft">
                    <span className="flex gap-3 text-[14.5px] leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-px shrink-0 font-mono text-[13px] text-signal"
                      >
                        ✓
                      </span>
                      {row.withUs}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Band>
  );
}
