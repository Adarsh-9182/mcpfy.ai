import * as React from "react";
import {
  Activity,
  ChevronDown,
  Command,
  GitBranch,
  LayoutGrid,
  Rocket,
  Search,
  Settings,
  TerminalSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The MCP Cloud window used as the hero shot.
 *
 * It is a static, aria-hidden rendering of the real dashboard rather than a
 * diagram: sidebar, tabs, live metrics, a tool table and an Inspector trace
 * with syntax highlighting. Everything saturated on the page comes from in
 * here — status dots, member avatars, code tokens — which is what keeps the
 * surrounding chrome monochrome. The signal spectrum appears only on live
 * data: the call-volume sparkline, the usage meter, the protocol arrow.
 */

const nav = [
  { icon: LayoutGrid, label: "Overview" },
  { icon: Rocket, label: "Servers", active: true },
  { icon: GitBranch, label: "Deployments" },
  { icon: TerminalSquare, label: "Inspector" },
  { icon: Activity, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const servers = [
  { name: "chart-server", state: "live" as const, active: true },
  { name: "postgres-mcp", state: "live" as const },
  { name: "internal-tools", state: "building" as const },
  { name: "legacy-bridge", state: "idle" as const },
];

const dot = {
  live: "bg-live",
  building: "bg-warn",
  idle: "bg-subtle-foreground/50",
};

const members = [
  { initials: "AR", hue: "bg-[#4c74ff]" },
  { initials: "TL", hue: "bg-[#3ecf8e]" },
  { initials: "PK", hue: "bg-[#f2b441]" },
];

/** A real polyline, not a bar stack — reads as telemetry at small sizes. */
function Spark({ points, tone }: { points: number[]; tone: string }) {
  const w = 96;
  const h = 26;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / span) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-6 w-full" aria-hidden>
      <path
        d={`${d} L${w},${h} L0,${h} Z`}
        fill="currentColor"
        className={cn("opacity-[0.08]", tone)}
      />
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={tone}
      />
    </svg>
  );
}

const stats = [
  {
    label: "Tool calls",
    value: "12,481",
    delta: "+18%",
    tone: "text-sig",
    points: [12, 18, 14, 22, 19, 28, 24, 33, 30, 41, 38, 47],
  },
  {
    label: "p50 latency",
    value: "38ms",
    delta: "−6ms",
    tone: "text-live",
    points: [46, 44, 45, 41, 43, 39, 40, 38, 39, 37, 38, 36],
  },
  {
    label: "Error rate",
    value: "0.2%",
    delta: "−0.4%",
    tone: "text-live",
    points: [9, 7, 8, 6, 5, 6, 4, 3, 4, 2, 2, 1],
  },
];

const tools = [
  { name: "chart_sales", schema: "object", calls: "5,204", p95: "88ms", ok: true },
  { name: "query_db", schema: "object", calls: "3,918", p95: "112ms", ok: true },
  { name: "list_reports", schema: "array", calls: "2,441", p95: "41ms", ok: true },
  { name: "export_pdf", schema: "object", calls: "918", p95: "402ms", ok: false },
];

export function ProductShot({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "panel overflow-hidden rounded-xl text-[12px] select-none",
        className,
      )}
    >
      {/* window bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded bg-gradient-to-br from-[#4c74ff] to-[#7b96ff] text-[9px] font-semibold text-white">
            A
          </span>
          <span className="font-medium">Acme Labs</span>
          <ChevronDown className="size-3 text-subtle-foreground" />
        </div>

        <span className="text-subtle-foreground">/</span>
        <span className="font-medium">chart-server</span>
        <span className="rounded border border-border px-1.5 py-px text-[10px] text-muted-foreground">
          production
        </span>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <span className="flex w-40 items-center gap-2 rounded-md border border-border bg-background/60 px-2 py-1 text-[11px] text-subtle-foreground">
            <Search className="size-3" />
            Search
            <span className="ml-auto flex items-center gap-0.5 text-[10px]">
              <Command className="size-2.5" />K
            </span>
          </span>
          <span className="flex -space-x-1.5">
            {members.map((m) => (
              <span
                key={m.initials}
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[8px] font-semibold text-white ring-2 ring-surface-2",
                  m.hue,
                )}
              >
                {m.initials}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[168px_minmax(0,1fr)] lg:grid-cols-[168px_minmax(0,1fr)_264px]">
        {/* sidebar */}
        <div className="hidden flex-col border-r border-border bg-surface-1 p-2.5 md:flex">
          <nav className="flex flex-col gap-px">
            {nav.map((item) => (
              <span
                key={item.label}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px]",
                  item.active
                    ? "bg-surface-3 text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </span>
            ))}
          </nav>

          <p className="mt-5 px-2 text-[9.5px] font-medium uppercase tracking-[0.1em] text-subtle-foreground">
            Servers
          </p>
          <div className="mt-1.5 flex flex-col gap-px">
            {servers.map((s) => (
              <span
                key={s.name}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[10.5px]",
                  s.active ? "bg-surface-3 text-foreground" : "text-muted-foreground",
                )}
              >
                <span className={cn("size-1.5 shrink-0 rounded-full", dot[s.state])} />
                <span className="truncate">{s.name}</span>
              </span>
            ))}
          </div>

          <div className="mt-auto rounded-md border border-border bg-surface-2 p-2.5">
            <p className="text-[10px] text-muted-foreground">Usage</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-3">
              <span className="block h-full w-[62%] rounded-full signal-line" />
            </div>
            <p className="mt-1.5 font-mono text-[9.5px] text-subtle-foreground">
              186k / 300k calls
            </p>
          </div>
        </div>

        {/* main */}
        <div className="min-w-0 bg-background/40">
          <div className="flex items-center gap-3 px-4 pt-3.5">
            <h3 className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em]">
              chart-server
            </h3>
            <span className="flex items-center gap-1.5 rounded-full border border-live/25 bg-live/10 px-2 py-0.5 text-[10px] font-medium text-live">
              <span className="size-1.5 rounded-full bg-live animate-pulse-ring" />
              Live
            </span>
            <span className="hidden font-mono text-[10.5px] text-subtle-foreground lg:inline">
              chart-server.mcpfy.app/mcp
            </span>
          </div>

          <div className="mt-3 flex gap-4 border-b border-border px-4">
            {["Overview", "Tools", "Deployments", "Logs"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "-mb-px border-b pb-2 text-[11.5px]",
                  i === 0
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 p-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-surface-1 p-2.5"
              >
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <p className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-[15px] font-semibold tabular-nums tracking-[-0.01em]">
                    {s.value}
                  </span>
                  <span className={cn("text-[9.5px] font-medium", s.tone)}>
                    {s.delta}
                  </span>
                </p>
                <div className="mt-1.5">
                  <Spark points={s.points} tone={s.tone} />
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 pb-3">
            <div className="overflow-hidden rounded-lg border border-border bg-surface-1">
              <div className="grid grid-cols-[minmax(0,1fr)_54px_54px] gap-2 border-b border-border px-3 py-1.5 text-[9.5px] uppercase tracking-[0.08em] text-subtle-foreground">
                <span>Tool</span>
                <span className="text-right">Calls</span>
                <span className="text-right">p95</span>
              </div>
              {tools.map((t) => (
                <div
                  key={t.name}
                  className="grid grid-cols-[minmax(0,1fr)_54px_54px] items-center gap-2 border-b border-border/60 px-3 py-2 last:border-b-0"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate font-mono text-[11px] text-foreground">
                      {t.name}
                    </span>
                    <span className="hidden rounded border border-border px-1 py-px font-mono text-[9px] text-subtle-foreground sm:inline">
                      {t.schema}
                    </span>
                  </span>
                  <span className="text-right font-mono text-[10.5px] tabular-nums text-muted-foreground">
                    {t.calls}
                  </span>
                  <span
                    className={cn(
                      "text-right font-mono text-[10.5px] tabular-nums",
                      t.ok ? "text-muted-foreground" : "text-warn",
                    )}
                  >
                    {t.p95}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* inspector */}
        <div className="hidden flex-col border-l border-border bg-surface-1 lg:flex">
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-[11.5px] font-medium">
              <TerminalSquare className="size-3.5 text-t-mid" />
              Inspector
            </span>
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[9.5px] text-muted-foreground">
              Claude Opus 5
              <ChevronDown className="size-2.5" />
            </span>
          </div>

          <div className="code p-3">
            <p className="flex items-center gap-1.5 text-[10px] text-subtle-foreground">
              <span className="text-sig">→</span> tools/call
            </p>
            <pre className="mt-1.5 overflow-x-auto rounded-md border border-border bg-background/60 p-2.5">
              <code>
                <span className="tok-punc">{"{"}</span>
                {"\n  "}
                <span className="tok-key">&quot;name&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;chart_sales&quot;</span>
                <span className="tok-punc">,</span>
                {"\n  "}
                <span className="tok-key">&quot;arguments&quot;</span>
                <span className="tok-punc">: {"{"}</span>
                {"\n    "}
                <span className="tok-key">&quot;period&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;Q3&quot;</span>
                <span className="tok-punc">,</span>
                {"\n    "}
                <span className="tok-key">&quot;limit&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-num">12</span>
                {"\n  "}
                <span className="tok-punc">{"}"}</span>
                {"\n"}
                <span className="tok-punc">{"}"}</span>
              </code>
            </pre>

            <p className="mt-3 flex items-center gap-1.5 text-[10px] text-subtle-foreground">
              <span className="text-live">←</span> result
              <span className="rounded border border-live/25 bg-live/10 px-1 py-px font-medium text-live">
                200
              </span>
              <span className="ml-auto font-mono">41ms</span>
            </p>
            <pre className="mt-1.5 overflow-x-auto rounded-md border border-border bg-background/60 p-2.5">
              <code>
                <span className="tok-punc">{"{"}</span>
                {"\n  "}
                <span className="tok-key">&quot;content&quot;</span>
                <span className="tok-punc">: [{"{"}</span>
                {"\n    "}
                <span className="tok-key">&quot;type&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;resource&quot;</span>
                <span className="tok-punc">,</span>
                {"\n    "}
                <span className="tok-key">&quot;uri&quot;</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">&quot;ui://chart&quot;</span>
                {"\n  "}
                <span className="tok-punc">{"}]"}</span>
                {"\n"}
                <span className="tok-punc">{"}"}</span>
              </code>
            </pre>
          </div>

          <div className="mt-auto border-t border-border p-3">
            <p className="text-[9.5px] uppercase tracking-[0.08em] text-subtle-foreground">
              Verified across
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["ChatGPT", "Claude", "Gemini", "Cursor"].map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[9.5px] text-muted-foreground"
                >
                  <span className="size-1 rounded-full bg-live" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
