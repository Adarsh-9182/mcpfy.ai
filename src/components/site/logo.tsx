import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The mark is a prompt block: a squared bracket with the caret sitting inside
 * it, in the signal colour. The wordmark is set in the display serif, so the
 * logo carries the same voice as the headlines.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-baseline gap-2.5", className)}
      aria-label={`${site.name} home`}
    >
      <svg
        viewBox="0 0 20 20"
        className="size-[18px] translate-y-[2px]"
        aria-hidden
        fill="none"
      >
        <path
          d="M6 1H1v18h5M14 1h5v18h-5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect x="8" y="6" width="4" height="8" className="fill-signal" />
      </svg>
      <span className="display text-[23px] leading-none">
        {site.name}
        <span className="text-signal">.</span>
      </span>
    </Link>
  );
}
