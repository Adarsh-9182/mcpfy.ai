import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { OrgAvatar } from "@/components/dashboard/org-switcher";
import { Pill } from "@/components/dashboard/ui";
import { organization, organizations } from "@/lib/dashboard";

export const metadata = { title: "Organizations" };

export default function OrganizationsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">
            Organizations
          </h1>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            Pick an organization to work in, or start a new one.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          New organization
        </button>
      </div>

      <ul className="divide-y divide-border/60 overflow-hidden rounded-xl border">
        {organizations.map((org) => (
          <li key={org.slug}>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/50"
            >
              <OrgAvatar slug={org.slug} className="size-9" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2.5 text-[15px] font-medium">
                  {org.name}
                  {org.slug === organization.slug && <Pill>Current</Pill>}
                </p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  {org.plan} plan · ${org.creditsUsed.toFixed(2)} of $
                  {org.creditsIncluded.toFixed(2)} credits used
                </p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
