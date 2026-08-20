import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Wordmark: a stacked-layers glyph (build → deploy → publish) plus the name. */
export function Logo({
  className,
  showName = true,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2", className)}
      aria-label={`${site.name} home`}
    >
      <span className="relative inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none">
          <path
            d="M12 3 21 8l-9 5-9-5 9-5Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          <path
            d="m3 12 9 5 9-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <path
            d="m3 16.5 9 5 9-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
        </svg>
      </span>
      {showName && (
        <span className="text-[15px] font-semibold tracking-tight">
          {site.name}
        </span>
      )}
    </Link>
  );
}
