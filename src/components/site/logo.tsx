import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * A shell prompt in a rounded tile: chevron plus caret. It stays legible at
 * 24px, which the earlier routing glyph did not.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center gap-2", className)}
      aria-label={`${site.name} home`}
    >
      <span className="grid size-6 place-items-center rounded-[7px] bg-foreground text-background">
        <svg viewBox="0 0 24 24" className="size-[15px]" aria-hidden fill="none">
          <path
            d="m6.5 7.5 4.5 4.5-4.5 4.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 16.5h4.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.03em]">
        {site.name}
      </span>
    </Link>
  );
}
