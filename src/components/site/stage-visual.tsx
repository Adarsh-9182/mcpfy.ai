import * as React from "react";
import { site } from "@/lib/site";

/**
 * The mock surfaces that sit beside each lifecycle stage. They are drawn in
 * the same language as the rest of the site: square corners, hairline rules,
 * mono type, one signal accent and pine for anything passing.
 */

const panel = "border border-rule bg-card";
const head =
  "flex items-center justify-between border-b border-rule px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground";
const row = "flex items-center gap-2.5 border-b border-rule-soft px-3.5 py-2.5 last:border-b-0";

function Term({ lines }: { lines: [string, ("ok" | "dim" | "sig")?][] }) {
  return (
    <div className="bg-ruled px-3.5 py-3 font-mono text-[11.5px] leading-[1.9]">
      {lines.map(([text, tone], i) => (
        <p
          key={i}
          className={
            tone === "ok"
              ? "text-pine"
              : tone === "dim"
                ? "text-muted-foreground"
                : tone === "sig"
                  ? "text-signal"
                  : "text-foreground"
          }
        >
          {text}
        </p>
      ))}
    </div>
  );
}

function Bars({ w = [92, 74, 58] }: { w?: number[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {w.map((width, i) => (
        <span
          key={i}
          className="h-1.5 bg-foreground/10"
          style={{ width: `${width}%` }}
        />
      ))}
    </div>
  );
}

function Status({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        "shrink-0 border px-1.5 py-px font-mono text-[9.5px] uppercase tracking-wider " +
        (ok ? "border-pine/40 text-pine" : "border-signal/40 text-signal")
      }
    >
      {children}
    </span>
  );
}

export function StageVisual({ id }: { id: string }) {
  switch (id) {
    case "build":
      return (
        <div className={panel}>
          <div className={head}>
            <span>scaffold</span>
            <span className="normal-case tracking-normal">create-mcpfy-app</span>
          </div>
          <Term
            lines={[
              ["$ npx create-mcpfy-app", "sig"],
              ["  ├ tools/chart-sales.ts", "dim"],
              ["  ├ widgets/Chart.tsx", "dim"],
              ["  └ mcpfy.config.ts", "dim"],
              ["✓ skill installed into your agent", "ok"],
            ]}
          />
          <div className="border-t border-rule">
            <div className={head}>
              <span>assistant</span>
            </div>
            <div className="space-y-2.5 p-3.5">
              <p className="ml-auto w-[70%] border border-rule bg-accent px-3 py-2 text-[11.5px]">
                add a tool that charts monthly sales
              </p>
              <div className="w-[80%] border border-rule px-3 py-2.5">
                <Bars />
              </div>
            </div>
          </div>
        </div>
      );

    case "deploy":
      return (
        <div className={panel}>
          <div className={head}>
            <span>deployments</span>
            <span className="normal-case tracking-normal">auto · on push</span>
          </div>
          <ul>
            {[
              ["main", "production", true],
              ["feat/tools", "preview", false],
              ["fix/auth", "preview", true],
            ].map(([branch, env, ok]) => (
              <li key={String(branch)} className={row}>
                <span
                  className={`size-1.5 shrink-0 ${ok ? "bg-pine" : "bg-signal"}`}
                />
                <span className="font-mono text-[11.5px]">{branch}</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {env}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-rule">
            <Term
              lines={[
                [`$ ${site.cli}`, "sig"],
                [`✓ live → my-server.${site.domain}/mcp`, "ok"],
              ]}
            />
          </div>
        </div>
      );

    case "publish":
      return (
        <div className={panel}>
          <div className={head}>
            <span>publishing checks</span>
            <span className="normal-case tracking-normal">3 / 4</span>
          </div>
          <ul>
            {[
              ["Protocol & discovery", true],
              ["Tool conformance", true],
              ["Security & policy", true],
              ["Domain / TLS / CSP", false],
            ].map(([label, ok]) => (
              <li key={String(label)} className={row}>
                <span className="text-[12px]">{label}</span>
                <Status ok={Boolean(ok)}>{ok ? "pass" : "fix"}</Status>
              </li>
            ))}
          </ul>
          <div className="border-t border-rule">
            <div className={head}>
              <span>submission pack</span>
            </div>
            <div className="flex gap-3 p-3.5">
              <span className="size-14 shrink-0 border border-rule bg-hatch" />
              <div className="flex-1 pt-1.5">
                <Bars w={[88, 66, 44]} />
              </div>
            </div>
          </div>
        </div>
      );

    case "iterate":
      return (
        <div className={panel}>
          <div className={head}>
            <span>cloud inspector</span>
            <span className="normal-case tracking-normal">session #4f2a</span>
          </div>
          <Term
            lines={[
              ["→ tools/call chart_sales", "dim"],
              ["← result 200 · 1.4kb", "dim"],
              ["✓ 41ms", "ok"],
            ]}
          />
          <div className="grid grid-cols-3 border-t border-rule">
            {["GPT", "Claude", "Gemini"].map((m) => (
              <div
                key={m}
                className="border-r border-rule px-3.5 py-3 last:border-r-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m}
                </p>
                <p className="mt-1.5 font-mono text-[12px] text-pine">pass</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "monitor":
      return (
        <div className={panel}>
          <div className={head}>
            <span>tool calls · 24h</span>
            <span className="normal-case tracking-normal">12,481</span>
          </div>
          <div className="flex h-28 items-end gap-1 px-3.5 py-3.5">
            {[38, 62, 45, 78, 56, 88, 70, 52, 81, 64, 92, 71].map((h, i) => (
              <span
                key={i}
                className={`flex-1 ${i === 10 ? "bg-signal" : "bg-foreground/12"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 border-t border-rule">
            {[
              ["p50", "38ms"],
              ["p95", "112ms"],
              ["errors", "0.2%"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="border-r border-rule px-3.5 py-3 last:border-r-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {k}
                </p>
                <p className="mt-1 font-mono text-[14px] tabular-nums">{v}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div className={`${panel} h-64 bg-hatch`} />;
  }
}
