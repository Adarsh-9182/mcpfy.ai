import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("border-t py-20 sm:py-28", className)} {...props}>
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
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {kicker}
        </span>
      )}
      <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-balance-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
