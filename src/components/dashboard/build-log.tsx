"use client";

import { useMemo, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogLine } from "@/lib/dashboard";

const levelStyle: Record<LogLine["level"], string> = {
  info: "text-muted-foreground",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
};

type Filter = "all" | "info" | "warn" | "error";

/**
 * Build log viewer: filter by severity or step, and copy a permalink to any
 * single line so a failure can be shared as-is.
 */
export function BuildLog({ lines }: { lines: LogLine[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [step, setStep] = useState<string>("all");
  const [copied, setCopied] = useState<number | null>(null);

  const steps = useMemo(
    () => ["all", ...Array.from(new Set(lines.map((l) => l.step)))],
    [lines],
  );

  const counts = useMemo(
    () => ({
      all: lines.length,
      info: lines.filter((l) => l.level === "info").length,
      warn: lines.filter((l) => l.level === "warn").length,
      error: lines.filter((l) => l.level === "error").length,
    }),
    [lines],
  );

  const visible = lines.filter(
    (l) =>
      (filter === "all" || l.level === filter) &&
      (step === "all" || l.step === step),
  );

  async function copyLine(n: number) {
    const url = `${window.location.origin}${window.location.pathname}#L${n}`;
    await navigator.clipboard.writeText(url);
    setCopied(n);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <section className="rounded-xl border bg-card/40">
      <header className="flex flex-wrap items-center gap-3 border-b px-5 py-3">
        <h2 className="mr-auto text-[15px] font-medium">Build log</h2>

        <div className="flex items-center gap-1 rounded-lg border p-0.5">
          {(["all", "info", "warn", "error"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[13px] capitalize transition-colors",
                filter === f
                  ? "bg-accent font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
              <span className="ml-1.5 tabular-nums opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>

        <select
          value={step}
          onChange={(e) => setStep(e.target.value)}
          aria-label="Filter by build step"
          className="h-8 rounded-lg border bg-background px-2.5 text-[13px]"
        >
          {steps.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All steps" : s}
            </option>
          ))}
        </select>
      </header>

      {visible.length === 0 ? (
        <p className="px-5 py-10 text-center text-[14px] text-muted-foreground">
          No lines match this filter.
        </p>
      ) : (
        <div className="divide-y divide-border/40 font-mono text-[13px]">
          {visible.map((l) => (
            <div
              key={l.n}
              id={`L${l.n}`}
              className="group flex gap-4 px-5 py-1.5 target:bg-amber-500/10"
            >
              <span className="w-6 shrink-0 select-none text-right text-muted-foreground/60 tabular-nums">
                {l.n}
              </span>
              <span className="shrink-0 text-muted-foreground">{l.at}</span>
              <span className={cn("w-12 shrink-0 uppercase", levelStyle[l.level])}>
                {l.level}
              </span>
              <span className="min-w-0 flex-1 break-all">{l.msg}</span>
              <button
                type="button"
                onClick={() => copyLine(l.n)}
                aria-label={`Copy link to line ${l.n}`}
                className="shrink-0 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              >
                {copied === l.n ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Link2 className="size-3.5 text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
