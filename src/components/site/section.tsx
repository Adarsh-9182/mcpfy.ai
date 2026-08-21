import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Section primitives. Headings are one grotesk at a few tight sizes; the only
 * decorative device is the two-tone lead, where the first sentence stays at
 * full contrast and the rest drops to muted.
 */

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Small label above a heading. Sentence case, never tracked out. */
export function Eyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-xs font-medium text-t-mid", className)} {...props}>
      {children}
    </p>
  );
}

export function Title({
  as: Tag = "h2",
  size = "md",
  className,
  children,
  ...props
}: React.ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  // Size, line-height and tracking all arrive together from the scale.
  const sizes = {
    sm: "text-h3",
    md: "text-h2",
    lg: "text-h1",
    xl: "text-display",
  };
  return (
    <Tag className={cn("text-balance", sizes[size], className)} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Lead paragraph. `dim` continues the sentence at lower contrast, which reads
 * as one thought at two weights rather than two stacked paragraphs.
 */
export function Lead({
  dim,
  className,
  children,
  ...props
}: React.ComponentProps<"p"> & { dim?: React.ReactNode }) {
  return (
    <p
      className={cn(
        "measure-lead text-lead text-t-hi/90 text-balance-pretty",
        className,
      )}
      {...props}
    >
      {children}
      {dim && <span className="text-muted-foreground"> {dim}</span>}
    </p>
  );
}

/** Section header block: eyebrow, title, lead, optional action. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  leadDim,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  leadDim?: React.ReactNode;
  action?: React.ReactNode;
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
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title className="max-w-[20ch]">{title}</Title>
      {lead && (
        <Lead dim={leadDim} className={align === "center" ? "mx-auto" : undefined}>
          {lead}
        </Lead>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Text link with a sliding arrow. */
export function ArrowLink({
  href,
  external = false,
  tone = "strong",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  tone?: "strong" | "plain";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors",
        tone === "strong"
          ? "text-t-hi hover:text-t-mid"
          : "text-t-mid hover:text-t-hi",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

/** Small bordered tag. */
export function Tag({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--r-1)] border border-line bg-n1 px-2.5 py-1 text-sm text-t-mid",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** A live status dot with an expanding ring. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-1.5 shrink-0 rounded-full bg-live animate-pulse-ring",
        className,
      )}
    />
  );
}
