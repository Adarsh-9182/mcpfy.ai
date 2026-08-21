"use client";

import Link from "next/link";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { organization, organizations } from "@/lib/dashboard";
import { Menu, MenuLabel, menuItemClass } from "./menu";

/** Deterministic pastel per org, so the avatar is stable without an upload. */
function avatarStyle(slug: string) {
  const hue = [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  return {
    backgroundImage: `radial-gradient(circle at 30% 25%, hsl(${hue} 85% 72%), hsl(${(hue + 40) % 360} 80% 58%))`,
  };
}

export function OrgAvatar({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      style={avatarStyle(slug)}
      className={cn("inline-block size-5 shrink-0 rounded-full", className)}
    />
  );
}

export function OrgSwitcher() {
  return (
    <Menu
      trigger={({ open }) => (
        <span
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-full border px-2.5 text-[14px] transition-colors hover:bg-accent",
            open && "bg-accent",
          )}
        >
          <OrgAvatar slug={organization.slug} />
          <span className="max-w-40 truncate font-medium">
            {organization.name}
          </span>
          <span className="rounded-full border px-1.5 py-px text-[10px] uppercase tracking-wide text-muted-foreground">
            {organization.plan}
          </span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </span>
      )}
    >
      {({ close }) => (
        <>
          <MenuLabel>Organizations</MenuLabel>
          {organizations.map((org) => (
            <Link
              key={org.slug}
              href="/dashboard"
              onClick={close}
              className={menuItemClass}
            >
              <OrgAvatar slug={org.slug} />
              <span className="flex-1 truncate">{org.name}</span>
              {org.slug === organization.slug && (
                <Check className="size-4 text-muted-foreground" />
              )}
            </Link>
          ))}
          <div className="my-1.5 border-t" />
          <Link
            href="/dashboard/organizations"
            onClick={close}
            className={menuItemClass}
          >
            <Plus className="size-4 text-muted-foreground" />
            New organization
          </Link>
        </>
      )}
    </Menu>
  );
}
