"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { GithubIcon } from "./icons";
import { templateCategories, templates } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Deterministic preview chart per template, so cards differ without images. */
function Preview({ seed }: { seed: string }) {
  const bars = React.useMemo(() => {
    // A stable hash of the name, so a template's preview never changes shape.
    let seedHash = 0;
    for (const ch of seed) seedHash = (seedHash * 31 + ch.charCodeAt(0)) % 9973;
    return Array.from({ length: 9 }, (_, i) => {
      const n = Math.sin(seedHash + i * 12.9898) * 43758.5453;
      return 28 + Math.floor((n - Math.floor(n)) * 62);
    });
  }, [seed]);

  return (
    <div className="relative flex h-28 items-end gap-1.5 overflow-hidden rounded-lg border border-border bg-background/50 p-3">
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "relative flex-1 rounded-sm",
            i === bars.length - 2 ? "bg-t-hi/45" : "bg-t-hi/12",
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function TemplateGallery() {
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      const inCategory = category === "All" || t.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [category, query]);

  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {templateCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
                  category === c
                    ? "bg-surface-3 text-foreground"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates"
              aria-label="Search templates"
              className="h-9 w-full rounded-lg border border-border bg-surface-1 pl-9 pr-3 text-[13.5px] outline-none transition-colors placeholder:text-subtle-foreground focus:border-line-strong"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-border bg-surface-1 px-6 py-20 text-center">
            <p className="text-[14px] text-muted-foreground">
              No templates match “{query}”.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <div
                key={t.name}
                className="card-surface group flex flex-col rounded-xl p-4 transition-colors hover:border-border-strong"
              >
                <Preview seed={t.name} />

                <div className="mt-4 flex items-start justify-between gap-3">
                  <p className="text-[14px] font-medium">{t.name}</p>
                  <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-subtle-foreground">
                    {t.category}
                  </span>
                </div>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 border-t border-border pt-3.5">
                  <Link
                    href="https://github.com/mcpfy"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="size-3.5" /> Source
                  </Link>
                  <Link
                    href="/docs"
                    className="ml-auto inline-flex items-center gap-1 text-[13px] font-medium text-t-hi transition-colors hover:text-t-mid"
                  >
                    Try now <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
