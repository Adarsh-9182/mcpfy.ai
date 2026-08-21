"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { serverSections } from "./nav";

export function ServerTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const base = `/dashboard/servers/${slug}`;

  return (
    <nav className="-mb-px flex gap-1 overflow-x-auto border-b">
      {serverSections.map((section) => {
        const href = section.slug ? `${base}/${section.slug}` : base;
        const active = pathname === href;
        return (
          <Link
            key={section.slug || "overview"}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap border-b-2 px-3 py-2.5 text-[14px] transition-colors",
              active
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
