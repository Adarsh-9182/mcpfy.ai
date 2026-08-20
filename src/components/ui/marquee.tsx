import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee. Children are rendered twice so the -50% keyframe loops
 * seamlessly; the duplicate is hidden from assistive tech.
 */
export function Marquee({
  children,
  className,
  duration = "40s",
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group flex overflow-hidden mask-fade-x", className)}
      style={{ ["--marquee-duration" as string]: duration }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-8 pr-8 animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
