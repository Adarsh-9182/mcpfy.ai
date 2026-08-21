import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Slug } from "./frame";

/**
 * Editorial type primitives. Headlines are set in the display serif and run
 * large; every supporting label is mono and uppercase. Nothing in between.
 */

/** Serif display headline. `as` lets a band pick its own heading level. */
export function Display({
  as: Tag = "h2",
  size = "md",
  className,
  children,
  ...props
}: React.ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "text-[26px] md:text-[32px]",
    md: "text-[34px] md:text-[44px] lg:text-[52px]",
    lg: "text-[40px] md:text-[56px] lg:text-[64px]",
    xl: "text-[44px] md:text-[64px] lg:text-[80px]",
  };
  return (
    <Tag className={cn("display text-balance", sizes[size], className)} {...props}>
      {children}
    </Tag>
  );
}

/** The italic, signal-coloured word inside a display headline. */
export function Em({ children }: { children: React.ReactNode }) {
  return <em className="italic text-signal">{children}</em>;
}

/** Standfirst paragraph under a display headline. */
export function Lede({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-[52ch] text-balance-pretty text-[16.5px] leading-[1.65] text-muted-foreground md:text-[18px]",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/** Mono link with a sliding arrow — the site's standard call to action. */
export function ArrowLink({
  href,
  external = false,
  tone = "ink",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  tone?: "ink" | "signal" | "muted";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-2 slug transition-colors",
        tone === "signal" && "text-signal hover:text-signal-ink",
        tone === "ink" && "text-foreground hover:text-signal",
        tone === "muted" && "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/** Square mono chip used for tags, categories and surface lists. */
export function Chip({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-rule bg-card px-2.5 py-1 font-mono text-[11px] tracking-tight text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Simple padded section for the secondary marketing pages that do not need
 * the indexed band treatment.
 */
export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("border-t border-rule py-16 md:py-24", className)}
      {...props}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && <Slug className="text-signal">{kicker}</Slug>}
      <Display size="md" className="max-w-4xl">
        {title}
      </Display>
      {subtitle && <Lede>{subtitle}</Lede>}
    </div>
  );
}
