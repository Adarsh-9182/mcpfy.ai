import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Vertical infinite marquee. Three stacked tracks each translate -100% of
 * their own height so the next tiles exactly into place.
 */
export function MarqueeVertical({
  children,
  className,
  duration = "50s",
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: duration }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 flex-col animate-marquee-vertical",
            reverse && "[animation-direction:reverse]",
            "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
