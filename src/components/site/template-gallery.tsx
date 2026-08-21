"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { GithubIcon } from "./icons";
import { Slug } from "./frame";
import { templateCategories, templates } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The gallery is a catalogue: a filter bar on a rule, then numbered entries in
 * a hairline grid. Each entry's preview is drawn, not photographed.
 */
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
        <div className="flex flex-col gap-4 border-b border-rule pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {templateCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "slug border-b pb-1 transition-colors",
                  category === c
                    ? "border-signal text-signal"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative sm:w-60">
            <Search className="pointer-events-none absolute left-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates"
              aria-label="Search templates"
              className="h-9 w-full border-b border-rule bg-transparent pl-6 font-mono text-[12.5px] outline-none transition-colors placeholder:text-muted-foreground focus:border-signal"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 py-3">
          <Slug>
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          </Slug>
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </div>

        {filtered.length === 0 ? (
          <div className="border border-rule bg-hatch px-6 py-20 text-center">
            <p className="font-mono text-[13px] text-muted-foreground">
              No templates match “{query}”.
            </p>
          </div>
        ) : (
          <div className="rule-grid grid sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <div
                key={t.name}
                className="rule-cell group flex flex-col transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
                  <span className="font-mono text-[10.5px] text-muted-foreground transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(3, "0")}
                  </span>
                  <Slug className="text-[10px]">{t.category}</Slug>
                </div>

                <div className="h-24 bg-grid" />

                <div className="flex flex-1 flex-col px-4 py-4">
                  <p className="display text-[20px]">{t.name}</p>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10.5px] text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-5 border-t border-rule px-4 py-3">
                  <Link
                    href="https://github.com/mcpfy"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 slug text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="size-3.5" /> Source
                  </Link>
                  <Link
                    href="/docs"
                    className="group/cta ml-auto inline-flex items-center gap-2 slug text-foreground transition-colors hover:text-signal"
                  >
                    <span className="border-b border-current pb-0.5">Try now</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/cta:translate-x-1"
                    >
                      →
                    </span>
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
