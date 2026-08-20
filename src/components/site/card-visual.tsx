import * as React from "react";
import { cn } from "@/lib/utils";

const frame =
  "relative h-24 overflow-hidden rounded-lg border bg-background/60 p-3";
const bar = "rounded-full bg-foreground/15";
const chip =
  "rounded-md border bg-card px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground";

function Lines({ widths }: { widths: number[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {widths.map((w, i) => (
        <span key={i} className={cn(bar, "h-1.5")} style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

/** Small decorative product mock shown at the top of each lifecycle card. */
export function CardVisual({ id }: { id: string }) {
  switch (id) {
    case "SDK":
      return (
        <div className={cn(frame, "font-mono text-[9px] leading-relaxed")}>
          <p className="text-muted-foreground">$ npx create-mcpfy-app</p>
          <p className="text-emerald-500">✔ scaffolded</p>
          <div className="mt-1.5">
            <Lines widths={[70, 52, 61]} />
          </div>
        </div>
      );

    case "Skill":
      return (
        <div className={cn(frame, "flex flex-wrap content-start gap-1")}>
          {["Claude Code", "Cursor", "Codex", "VS Code"].map((s) => (
            <span key={s} className={chip}>
              {s}
            </span>
          ))}
          <span className="mt-1 w-full">
            <Lines widths={[58, 40]} />
          </span>
        </div>
      );

    case "Vibe":
      return (
        <div className={cn(frame, "flex flex-col gap-1.5")}>
          <span className="max-w-[78%] rounded-lg rounded-bl-sm border bg-card px-2 py-1 text-[9px] text-muted-foreground">
            build me a sales chart tool
          </span>
          <span className="ml-auto max-w-[52%] rounded-lg rounded-br-sm bg-foreground/10 px-2 py-1 text-[9px]">
            scaffolding…
          </span>
        </div>
      );

    case "GitHub App":
      return (
        <div className={cn(frame, "flex items-center gap-2")}>
          <span className={chip}>repo</span>
          <span className="h-px flex-1 bg-foreground/20" />
          <span className={chip}>build</span>
          <span className="h-px flex-1 bg-foreground/20" />
          <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-500">
            live
          </span>
        </div>
      );

    case "Preview per branch":
      return (
        <div className={cn(frame, "flex flex-col gap-1.5")}>
          {["main", "feat/tools", "fix/auth"].map((b, i) => (
            <span key={b} className="flex items-center gap-2">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  i === 0 ? "bg-emerald-500" : "bg-foreground/25",
                )}
              />
              <span className="font-mono text-[9px] text-muted-foreground">
                {b}
              </span>
              <span className={cn(bar, "h-1 flex-1")} />
            </span>
          ))}
        </div>
      );

    case "Custom domains":
      return (
        <div className={cn(frame, "flex flex-col items-center justify-center gap-1.5")}>
          <span className="rounded-md border bg-card px-2 py-1 font-mono text-[9px]">
            mcp.acme.com
          </span>
          <span className="font-mono text-[9px] text-emerald-500">
            ● TLS active
          </span>
        </div>
      );

    case "Marketplace checklists":
      return (
        <div className={cn(frame, "flex flex-col gap-1.5")}>
          {[true, true, false].map((ok, i) => (
            <span key={i} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-3 place-items-center rounded-full text-[7px]",
                  ok
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-foreground/10 text-muted-foreground",
                )}
              >
                {ok ? "✓" : "•"}
              </span>
              <span className={cn(bar, "h-1.5")} style={{ width: `${62 - i * 12}%` }} />
            </span>
          ))}
        </div>
      );

    case "Submission assets":
      return (
        <div className={cn(frame, "grid grid-cols-3 gap-1.5")}>
          <span className="rounded-md border bg-card" />
          <span className="col-span-2 flex flex-col justify-center gap-1.5 px-1">
            <Lines widths={[88, 64, 46]} />
          </span>
        </div>
      );

    case "Embedded chat":
      return (
        <div className={cn(frame, "flex flex-col gap-1.5")}>
          <span className="font-mono text-[9px] text-muted-foreground">
            mcp.acme.com/chat
          </span>
          <span className="max-w-[70%] rounded-lg border bg-card px-2 py-1 text-[9px] text-muted-foreground">
            ask anything
          </span>
        </div>
      );

    case "Cloud Inspector":
      return (
        <div className={cn(frame, "font-mono text-[9px] leading-relaxed")}>
          <p className="text-muted-foreground">→ tools/call</p>
          <p className="text-muted-foreground">← result 200</p>
          <p className="text-emerald-500">✔ 41ms</p>
        </div>
      );

    case "Model swap":
      return (
        <div className={cn(frame, "flex flex-col justify-center gap-1.5")}>
          {["GPT", "Claude", "Gemini"].map((m, i) => (
            <span key={m} className="flex items-center gap-2">
              <span className={chip}>{m}</span>
              <span
                className={cn(bar, "h-1.5")}
                style={{ width: `${52 - i * 10}%` }}
              />
            </span>
          ))}
        </div>
      );

    case "Automatic evals":
      return (
        <div className={cn(frame, "grid grid-cols-6 grid-rows-3 gap-1")}>
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "rounded-[3px]",
                i % 7 === 3 ? "bg-foreground/20" : "bg-emerald-500/30",
              )}
            />
          ))}
        </div>
      );

    case "Analytics":
      return (
        <div className={cn(frame, "flex items-end gap-1.5")}>
          {[38, 62, 45, 78, 56, 88, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-foreground/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      );

    case "Session tracking":
      return (
        <div className={cn(frame, "flex flex-col justify-center gap-2")}>
          {[0, 1, 2].map((r) => (
            <span key={r} className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <React.Fragment key={i}>
                  <span className="size-1.5 rounded-full bg-foreground/25" />
                  {i < 4 && <span className="h-px flex-1 bg-foreground/15" />}
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      );

    case "Observability":
      return (
        <div className={cn(frame, "flex items-center")}>
          <svg viewBox="0 0 100 34" className="h-full w-full" aria-hidden>
            <polyline
              points="0,26 12,20 24,24 36,12 48,17 60,8 72,14 84,5 100,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground/35"
            />
            <circle cx="84" cy="5" r="2.5" className="fill-destructive" />
          </svg>
        </div>
      );

    default:
      return <div className={cn(frame, "bg-grid")} />;
  }
}
