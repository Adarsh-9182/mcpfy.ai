"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { GithubIcon } from "./icons";
import { templateCategories, templates } from "@/lib/content";
import { cn } from "@/lib/utils";

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
    <section className="py-16 sm:py-20">
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
                  "rounded-lg border px-3 py-1.5 text-[13px] transition-colors",
                  category === c
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates"
              aria-label="Search templates"
              className="h-10 w-full rounded-lg border bg-card/40 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No templates match “{query}”.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <div
                key={t.name}
                className="group flex flex-col rounded-xl border bg-card/40 p-5 transition-colors hover:bg-card"
              >
                <div className="mb-5 h-28 rounded-lg border bg-background/60 bg-grid" />
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium">{t.name}</p>
                  <span className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t.category}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 border-t pt-4">
                  <Link
                    href="https://github.com/mcpfy"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <GithubIcon className="size-3.5" /> Source
                  </Link>
                  <Link
                    href="/docs"
                    className="ml-auto inline-flex items-center gap-1 text-[13px] font-medium transition-opacity hover:opacity-70"
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
