import { Band, Slug } from "./frame";
import { Display, Em, Lede, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { surfaceGroups } from "@/lib/content";

/**
 * The distribution picture, drawn as a routing table: one build on the left,
 * every client it lands in on the right, with the status of each connection.
 */
function RoutingTable() {
  const routes = [
    { client: "chatgpt.com/apps", kind: "MCP App", state: "live" },
    { client: "claude.ai/connectors", kind: "MCP App", state: "live" },
    { client: "gemini enterprise", kind: "MCP Server", state: "live" },
    { client: "cursor · windsurf", kind: "MCP Server", state: "live" },
    { client: "your agent runtime", kind: "MCP Server", state: "live" },
    { client: "copilot 365", kind: "MCP App", state: "beta" },
  ];

  return (
    <div className="border border-rule bg-card">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <Slug>routing table</Slug>
        <span className="font-mono text-[11px] text-muted-foreground">
          1 build → {routes.length} surfaces
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] items-stretch">
        {/* the single source node, spanning every row */}
        <div className="flex flex-col items-center justify-center border-r border-rule bg-hatch px-4 py-6">
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
            acme-mcp
          </span>
        </div>

        <ul>
          {routes.map((r) => (
            <li
              key={r.client}
              className="group flex items-center gap-3 border-b border-rule-soft px-4 py-3 last:border-b-0"
            >
              <span aria-hidden className="font-mono text-[11px] text-signal">
                └→
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[12.5px]">
                {r.client}
              </span>
              <span className="hidden shrink-0 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground sm:block">
                {r.kind}
              </span>
              <span
                className={
                  "shrink-0 border px-1.5 py-px font-mono text-[9.5px] uppercase tracking-wider " +
                  (r.state === "live"
                    ? "border-pine/40 text-pine"
                    : "border-rule text-muted-foreground")
                }
              >
                {r.state}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Surfaces() {
  return (
    <Band index="01" label="surfaces">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-16">
        <Reveal>
          <div>
            <Display size="lg" className="max-w-[16ch]">
              Write it once. Ship it <Em>everywhere</Em> people already work.
            </Display>
            <Lede className="mt-7">
              The same codebase becomes a ChatGPT app, a Claude connector and a
              plain MCP endpoint for your own agents. No forks, no per-client
              rewrites.
            </Lede>

            <dl className="mt-12">
              {surfaceGroups.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 border-t border-rule py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt>
                    <Slug>{group.label}</Slug>
                  </dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[15px] text-foreground/85 transition-colors hover:text-signal"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-rule pt-8">
              <ArrowLink href="/docs">Start building</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-28">
          <RoutingTable />
        </Reveal>
      </div>
    </Band>
  );
}
