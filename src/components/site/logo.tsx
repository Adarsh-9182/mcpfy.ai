import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Bare geometric mark + wordmark, sized to sit on the 64px navbar. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center gap-2", className)}
      aria-label={`${site.name} home`}
    >
      <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden fill="currentColor">
        <circle cx="7" cy="7" r="4" />
        <circle cx="17.5" cy="6.5" r="2.6" />
        <circle cx="6.5" cy="17.5" r="2.6" />
        <circle cx="16.5" cy="16.5" r="4.5" />
      </svg>
      <span className="text-[19px] font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}
