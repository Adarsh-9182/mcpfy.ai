import * as React from "react";
import { site } from "@/lib/site";

/* Height follows content — a fixed aspect left dead space under short mocks. */
const panel =
  "relative w-full overflow-hidden rounded-xl border bg-muted/40 p-4";
const win = "overflow-hidden rounded-lg border bg-card shadow-sm";
const winBar =
  "flex items-center gap-2 border-b px-3 py-2 font-mono text-[10px] text-muted-foreground";

function Term({ lines }: { lines: [string, string?][] }) {
  return (
    <div className="overflow-hidden rounded-lg bg-zinc-900 p-3 font-mono text-[11px] leading-relaxed">
      {lines.map(([text, tone], i) => (
        <p
          key={i}
          className={
            tone === "ok"
              ? "text-emerald-400"
              : tone === "dim"
                ? "text-zinc-500"
                : "text-zinc-200"
          }
        >
          {text}
        </p>
      ))}
    </div>
  );
}

function Bars({ n = 4, w = [90, 70, 80, 55] }: { n?: number; w?: number[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full bg-foreground/10"
          style={{ width: `${w[i % w.length]}%` }}
        />
      ))}
    </div>
  );
}

export function StageVisual({ id }: { id: string }) {
  switch (id) {
    case "build":
      return (
        <div className={panel}>
          <Term
            lines={[
              ["$ npx create-mcpfy-app"],
              ["● installing the skill…", "ok"],
            ]}
          />
          <div className={`${win} mt-3`}>
            <div className={winBar}>
              <span className="size-2 rounded-full bg-foreground/20" />
              Assistant
            </div>
            <div className="space-y-2 p-3">
              <div className="ml-auto w-[62%] rounded-lg rounded-br-sm bg-accent px-2.5 py-1.5 text-[10px]">
                add a tool that charts monthly sales
              </div>
              <div className="w-[78%] rounded-lg rounded-bl-sm border px-2.5 py-1.5">
                <Bars n={3} w={[92, 74, 58]} />
              </div>
            </div>
          </div>
        </div>
      );

    case "deploy":
      return (
        <div className={panel}>
          <div className={win}>
            <div className={winBar}>Deployments</div>
            <ul className="divide-y">
              {[
                ["main", "Production", "ok"],
                ["feat/tools", "Preview", "build"],
                ["fix/auth", "Preview", "ok"],
              ].map(([branch, env, st]) => (
                <li key={branch} className="flex items-center gap-2 px-3 py-2">
                  <span
                    className={`size-1.5 rounded-full ${st === "ok" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  <span className="font-mono text-[10px]">{branch}</span>
                  <span className="ml-auto rounded border px-1.5 py-px text-[9px] text-muted-foreground">
                    {env}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <Term
              lines={[
                [`$ ${site.cli}`],
                [`✔ live → my-server.${site.domain}/mcp`, "ok"],
              ]}
            />
          </div>
        </div>
      );

    case "publish":
      return (
        <div className={panel}>
          <div className={win}>
            <div className={winBar}>Publishing checks</div>
            <ul className="divide-y">
              {[
                ["Protocol & discovery", true],
                ["Tool conformance", true],
                ["Security & policy", true],
                ["Domain / TLS / CSP", false],
              ].map(([label, ok]) => (
                <li key={String(label)} className="flex items-center gap-2 px-3 py-2">
                  <span
                    className={`grid size-3.5 place-items-center rounded-full text-[8px] ${
                      ok
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-amber-500/15 text-amber-600"
                    }`}
                  >
                    {ok ? "✓" : "!"}
                  </span>
                  <span className="text-[10px]">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${win} mt-3`}>
            <div className={winBar}>Submission pack</div>
            <div className="flex gap-2 p-3">
              <span className="size-12 shrink-0 rounded-md border bg-background" />
              <div className="flex-1 pt-1">
                <Bars n={3} w={[88, 66, 44]} />
              </div>
            </div>
          </div>
        </div>
      );

    case "iterate":
      return (
        <div className={panel}>
          <div className={win}>
            <div className={winBar}>Cloud Inspector</div>
            <div className="p-3 font-mono text-[10px] leading-relaxed">
              <p className="text-muted-foreground">→ tools/call chart_sales</p>
              <p className="text-muted-foreground">← result 200</p>
              <p className="text-emerald-600">✔ 41ms</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["GPT", "Claude", "Gemini"].map((m) => (
              <div key={m} className={`${win} p-2`}>
                <p className="font-mono text-[9px] text-muted-foreground">{m}</p>
                <p className="mt-1 text-[11px] font-medium text-emerald-600">
                  pass
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "monitor":
      return (
        <div className={panel}>
          <div className={win}>
            <div className={winBar}>Tool calls · last 24h</div>
            <div className="flex h-24 items-end gap-1 p-3">
              {[38, 62, 45, 78, 56, 88, 70, 52, 81, 64, 92, 71].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-foreground/15"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["p50", "38ms"],
              ["p95", "112ms"],
              ["errors", "0.2%"],
            ].map(([k, v]) => (
              <div key={k} className={`${win} p-2`}>
                <p className="font-mono text-[9px] text-muted-foreground">{k}</p>
                <p className="mt-0.5 text-[13px] font-medium tabular-nums">{v}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div className={panel} />;
  }
}
