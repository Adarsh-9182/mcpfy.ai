import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee. Children are rendered as three identical tracks, each
 * translating -100% of its own width so the next track tiles exactly into
 * place. Three copies keeps the loop seamless even when a single track is
 * narrower than the viewport. Duplicates are hidden from assistive tech.
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
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center gap-14 pr-14 animate-marquee",
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
