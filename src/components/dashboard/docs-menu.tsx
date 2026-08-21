"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu, menuItemClass } from "./menu";

const links = [
  { label: "Documentation", href: "/docs" },
  { label: "SDK reference", href: "/sdk" },
  { label: "Templates", href: "/templates" },
  { label: "Inspector", href: "/inspector" },
  { label: "Changelog", href: "/blog" },
];

export function DocsMenu() {
  return (
    <Menu
      align="end"
      trigger={({ open }) => (
        <span
          className={cn(
            "inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-[14px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            open && "bg-accent text-foreground",
          )}
        >
          Docs
          <ChevronDown className="size-3.5" />
        </span>
      )}
    >
      {({ close }) => (
        <>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={menuItemClass}
            >
              {l.label}
            </Link>
          ))}
        </>
      )}
    </Menu>
  );
}
