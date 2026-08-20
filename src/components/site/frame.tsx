import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page shell: a fixed-width column with hairline rules down both edges and
 * small cross ticks at each section boundary — the blueprint frame the whole
 * site sits inside.
 */
export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[1280px] border-x border-border/60">
      {children}
    </div>
  );
}

/** A cross tick that straddles the frame rule at a section boundary. */
function Tick({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 z-10 hidden -translate-y-1/2 md:block",
        side === "left" ? "-left-[3px]" : "-right-[3px]",
      )}
    >
      <span className="block h-px w-[7px] bg-border" />
      <span className="absolute left-[3px] top-[-3px] block h-[7px] w-px bg-border" />
    </span>
  );
}

/**
 * One page section: a top hairline with corner ticks, plus vertical padding.
 * `flush` drops the horizontal padding for full-bleed children (marquees).
 */
export function FrameSection({
  className,
  children,
  flush = false,
  ...props
}: React.ComponentProps<"section"> & { flush?: boolean }) {
  return (
    <section
      className={cn("relative border-t border-border/60", className)}
      {...props}
    >
      <Tick side="left" />
      <Tick side="right" />
      <div className={cn(flush ? "" : "px-4 md:px-6 lg:px-12")}>{children}</div>
    </section>
  );
}
