"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * Sidebar footer nudge. Dismissal is local to the session — there is no
 * persistence layer for user preferences yet.
 */
export function UpgradeCard() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative m-3 rounded-xl border bg-card p-4 shadow-[var(--drop)]">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-2.5 top-2.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        <X className="size-3.5" />
      </button>

      <p className="pr-5 text-[14px] font-medium">Upgrade your plan</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
        Unlock additional team members, projects, and higher server count on the
        Hobby and Startup plans.
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Link
          href="/pricing"
          className="text-[13px] underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Compare plans
        </Link>
        <Link
          href="/dashboard/billing"
          className="inline-flex h-8 items-center rounded-full bg-foreground px-3.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Upgrade
        </Link>
      </div>
    </div>
  );
}
