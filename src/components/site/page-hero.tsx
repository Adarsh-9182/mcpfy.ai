import * as React from "react";
import { Display, Lede } from "./section";
import { Slug } from "./frame";

/**
 * The masthead for every secondary page: a running head, a display headline
 * and a standfirst, all left-aligned on the paper wash.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  meta,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  meta?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-paper" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen"
      />

      <div className="container-page relative">
        <div className="flex items-center gap-4 border-b border-rule py-4">
          <Slug className="text-signal">{eyebrow ?? "mcpfy"}</Slug>
          <span aria-hidden className="h-px flex-1 bg-rule" />
          {meta && <Slug>{meta}</Slug>}
        </div>

        <div className="grid gap-8 py-14 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <Display as="h1" size="lg" className="max-w-[16ch]">
            {title}
          </Display>
          {subtitle && <Lede className="lg:pb-2">{subtitle}</Lede>}
        </div>
      </div>
    </section>
  );
}
