import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page shell. The editorial layout has no boxed frame: the page is a stack of
 * full-bleed horizontal bands, each separated by a rule, all sharing the one
 * measure set by `container-page`.
 */
export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full">{children}</div>;
}

/** The mono slug that indexes a band from the left rail. */
export function Slug({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span className={cn("slug text-muted-foreground", className)} {...props}>
      {children}
    </span>
  );
}

/**
 * One band of the page: a top rule, a mono index in the left margin, and the
 * content column beside it. The index is the running order of the page — it
 * is what makes the layout read as a document rather than a deck of cards.
 *
 * `flush` drops the measure for full-bleed children (marquees, ledgers).
 */
export function Band({
  index,
  label,
  flush = false,
  rule = true,
  className,
  innerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  index?: string;
  label?: string;
  flush?: boolean;
  rule?: boolean;
  innerClassName?: string;
}) {
  const rail = index || label;

  return (
    <section
      className={cn("relative", rule && "border-t border-rule", className)}
      {...props}
    >
      <div className={cn(!flush && "container-page")}>
        <div
          className={cn(
            rail ? "band-grid py-20 md:py-28" : "py-20 md:py-28",
            innerClassName,
          )}
        >
          {rail && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="flex items-center gap-2.5 lg:flex-col lg:items-start lg:gap-3">
                {index && (
                  <span className="slug text-signal">{index}</span>
                )}
                {index && label && (
                  <span
                    aria-hidden
                    className="h-px w-6 bg-rule lg:w-10"
                  />
                )}
                {label && <Slug>{label}</Slug>}
              </p>
            </div>
          )}
          <div className={cn(rail && "min-w-0")}>{children}</div>
        </div>
      </div>
    </section>
  );
}

/** A full-width rule with an optional mono caption sitting on it. */
export function Rule({
  caption,
  className,
}: {
  caption?: string;
  className?: string;
}) {
  if (!caption) {
    return <span aria-hidden className={cn("block h-px bg-rule", className)} />;
  }
  return (
    <span className={cn("flex items-center gap-4", className)}>
      <Slug className="shrink-0">{caption}</Slug>
      <span aria-hidden className="h-px flex-1 bg-rule" />
    </span>
  );
}
