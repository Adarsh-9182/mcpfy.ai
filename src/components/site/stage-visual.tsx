import * as React from "react";
import { Check, GitBranch, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The mock surfaces beside each lifecycle stage. Same rules as the hero shot:
 * real UI chrome, real syntax colours, status carried by colour rather than
 * by a label.
 */

const shell = "card-surface overflow-hidden rounded-xl";
const bar =
  "flex items-center justify-between gap-2 border-b border-border bg-surface-2/60 px-3 py-2 text-[11px] text-muted-foreground";

function Dots() {
  return (
    <span className="flex gap-1">
      {["bg-fail/50", "bg-warn/50", "bg-live/50"].map((c) => (
        <span key={c} className={cn("size-2 rounded-full", c)} />
      ))}
    </span>
  );
}

function Bars({ w = [92, 74, 58] }: { w?: number[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {w.map((width, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full bg-foreground/10"
          style={{ width: `${width}%` }}
        />
      ))}
    </div>
  );
}

export function StageVisual({ id }: { id: string }) {
  switch (id) {
    case "build":
      return (
        <div className={shell}>
          <div className={bar}>
            <Dots />
            <span className="font-mono">acme-mcp — zsh</span>
          </div>
          <div className="code p-3.5">
            <p>
              <span className="text-live">➜</span>{" "}
              <span className="text-foreground">npx create-mcpfy-app</span>
            </p>
            <p className="tok-cmt">  ✓ tools/chart-sales.ts</p>
            <p className="tok-cmt">  ✓ widgets/Chart.tsx</p>
            <p className="tok-cmt">  ✓ mcpfy.config.ts</p>
            <p className="mt-2">
              <span className="text-live">➜</span>{" "}
              <span className="text-foreground">mcpfy dev</span>
            </p>
            <p className="text-live">  ready on :4141 · 6 tools registered</p>
          </div>
          <div className="border-t border-border p-3.5">
            <p className="text-[11px] text-subtle-foreground">tools/chart-sales.ts</p>
            <pre className="code mt-2 overflow-x-auto">
              <code>
                <span className="tok-key">export const</span>{" "}
                <span className="tok-fn">chartSales</span>
                <span className="tok-punc"> = </span>
                <span className="tok-fn">tool</span>
                <span className="tok-punc">({"{"}</span>
                {"\n  "}
                <span className="tok-key">name</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;chart_sales&quot;</span>
                <span className="tok-punc">,</span>
                {"\n  "}
                <span className="tok-key">input</span>
                <span className="tok-punc">: z.</span>
                <span className="tok-fn">object</span>
                <span className="tok-punc">({"{ "}</span>
                <span className="tok-key">period</span>
                <span className="tok-punc">: z.</span>
                <span className="tok-fn">string</span>
                <span className="tok-punc">() {"}"}),</span>
                {"\n"}
                <span className="tok-punc">{"});"}</span>
              </code>
            </pre>
          </div>
        </div>
      );

    case "deploy":
      return (
        <div className={shell}>
          <div className={bar}>
            <span className="flex items-center gap-1.5 text-foreground">
              <GitBranch className="size-3" />
              Deployments
            </span>
            <span>auto · on push</span>
          </div>
          <ul>
            {[
              { b: "main", env: "Production", t: "12s", state: "live" },
              { b: "feat/charts", env: "Preview", t: "9s", state: "building" },
              { b: "fix/auth", env: "Preview", t: "11s", state: "live" },
            ].map((d) => (
              <li
                key={d.b}
                className="flex items-center gap-2.5 border-b border-border/60 px-3.5 py-2.5 last:border-b-0"
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    d.state === "live" ? "bg-live" : "bg-warn",
                  )}
                />
                <span className="font-mono text-[11.5px]">{d.b}</span>
                <span className="ml-auto rounded border border-border px-1.5 py-px text-[10px] text-muted-foreground">
                  {d.env}
                </span>
                <span className="w-8 text-right font-mono text-[10.5px] tabular-nums text-subtle-foreground">
                  {d.t}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-3.5">
            <div className="code rounded-lg border border-border bg-background/60 p-2.5">
              <p>
                <span className="text-live">➜</span>{" "}
                <span className="text-foreground">{site.cli}</span>
              </p>
              <p className="text-live">
                ✓ live → my-server.{site.domain}/mcp
              </p>
            </div>
          </div>
        </div>
      );

    case "publish":
      return (
        <div className={shell}>
          <div className={bar}>
            <span className="text-foreground">Publishing checks</span>
            <span className="rounded-full border border-live/25 bg-live/10 px-1.5 py-px text-[10px] font-medium text-live">
              3 / 4 passing
            </span>
          </div>
          <ul>
            {[
              ["Protocol & discovery", true],
              ["Tool conformance", true],
              ["Security & policy", true],
              ["Domain / TLS / CSP", false],
            ].map(([label, ok]) => (
              <li
                key={String(label)}
                className="flex items-center gap-2.5 border-b border-border/60 px-3.5 py-2.5 last:border-b-0"
              >
                <span
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-full",
                    ok ? "bg-live/15 text-live" : "bg-warn/15 text-warn",
                  )}
                >
                  {ok ? (
                    <Check className="size-2.5" />
                  ) : (
                    <span className="text-[9px] font-bold">!</span>
                  )}
                </span>
                <span className="text-[12.5px]">{label}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-3.5">
            <p className="text-[11px] text-subtle-foreground">Submission pack</p>
            <div className="mt-2.5 flex gap-3">
              <span className="size-14 shrink-0 rounded-[var(--r-1)] bg-n3" />
              <div className="flex-1 pt-1.5">
                <Bars w={[88, 66, 44]} />
              </div>
            </div>
          </div>
        </div>
      );

    case "iterate":
      return (
        <div className={shell}>
          <div className={bar}>
            <span className="text-foreground">Cloud Inspector</span>
            <span className="flex items-center gap-1.5">
              <Play className="size-2.5" />
              session #4f2a
            </span>
          </div>

          <div className="code p-3.5">
            <p className="text-[11px] text-subtle-foreground">
              <span className="text-t-mid">→</span> tools/call
            </p>
            <pre className="mt-1.5 overflow-x-auto rounded-lg border border-border bg-background/60 p-2.5">
              <code>
                <span className="tok-punc">{"{"}</span>
                {"\n  "}
                <span className="tok-key">&quot;name&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;chart_sales&quot;</span>
                <span className="tok-punc">,</span>
                {"\n  "}
                <span className="tok-key">&quot;arguments&quot;</span>
                <span className="tok-punc">: {"{ "}</span>
                <span className="tok-key">&quot;period&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;Q3&quot;</span>
                <span className="tok-punc"> {"}"}</span>
                {"\n"}
                <span className="tok-punc">{"}"}</span>
              </code>
            </pre>

            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-subtle-foreground">
              <span className="text-live">←</span> result
              <span className="rounded border border-live/25 bg-live/10 px-1 py-px font-medium text-live">
                200
              </span>
              <span className="ml-auto font-mono text-foreground">41ms</span>
            </p>
            <pre className="mt-1.5 overflow-x-auto rounded-lg border border-border bg-background/60 p-2.5">
              <code>
                <span className="tok-punc">{"{ "}</span>
                <span className="tok-key">&quot;content&quot;</span>
                <span className="tok-punc">: [{"{ "}</span>
                <span className="tok-key">&quot;type&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;resource&quot;</span>
                <span className="tok-punc"> {"}"}] {"}"}</span>
              </code>
            </pre>
          </div>

          <div className="grid grid-cols-3 border-t border-border">
            {[
              ["GPT-5.2", "18/18"],
              ["Claude", "18/18"],
              ["Gemini", "17/18"],
            ].map(([m, r], i) => (
              <div
                key={m}
                className={cn("px-3.5 py-3", i < 2 && "border-r border-border")}
              >
                <p className="text-[11px] text-muted-foreground">{m}</p>
                <p
                  className={cn(
                    "mt-1 font-mono text-[12.5px]",
                    r === "18/18" ? "text-live" : "text-warn",
                  )}
                >
                  {r}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "monitor":
      return (
        <div className={shell}>
          <div className={bar}>
            <span className="text-foreground">Tool calls · 24h</span>
            <span className="font-mono tabular-nums">12,481</span>
          </div>
          <div className="flex h-32 items-end gap-1 px-3.5 py-3.5">
            {[38, 62, 45, 78, 56, 88, 70, 52, 81, 64, 92, 71, 84, 59].map((h, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-sm",
                  i === 10 ? "signal-line" : "bg-t-hi/12",
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 border-t border-border">
            {[
              ["p50", "38ms", "text-foreground"],
              ["p95", "112ms", "text-foreground"],
              ["errors", "0.2%", "text-live"],
            ].map(([k, v, tone], i) => (
              <div
                key={k}
                className={cn("px-3.5 py-3", i < 2 && "border-r border-border")}
              >
                <p className="text-[11px] text-muted-foreground">{k}</p>
                <p className={cn("mt-1 font-mono text-[13px] tabular-nums", tone)}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div className={cn(shell, "h-64 bg-dots")} />;
  }
}
