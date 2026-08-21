"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Check,
  ChevronsUpDown,
  CreditCard,
  FlaskConical,
  Home,
  KeyRound,
  Plug,
  Server,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./nav";
import { Menu, menuItemClass } from "./menu";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  server: Server,
  flask: FlaskConical,
  chart: BarChart3,
  users: Users,
  key: KeyRound,
  plug: Plug,
  card: CreditCard,
  settings: Settings,
};

/** Longest matching nav entry wins, so /dashboard/servers/x reads "Servers". */
function currentItem(pathname: string) {
  return (
    [...navItems]
      .filter((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))
      .sort((a, b) => b.href.length - a.href.length)[0] ?? navItems[0]
  );
}

export function SectionSwitcher() {
  const pathname = usePathname();
  const active = currentItem(pathname);
  const ActiveIcon = icons[active.icon] ?? Home;

  return (
    <Menu
      trigger={({ open }) => (
        <span
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-full px-2.5 text-[14px] transition-colors hover:bg-accent",
            open && "bg-accent",
          )}
        >
          <ActiveIcon className="size-4 text-muted-foreground" />
          <span className="font-medium">{active.label}</span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </span>
      )}
    >
      {({ close }) => (
        <>
          {navItems.map((item) => {
            const Icon = icons[item.icon] ?? Home;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={menuItemClass}
              >
                <Icon className="size-4 text-muted-foreground" />
                <span className="flex-1">{item.label}</span>
                {item.href === active.href && (
                  <Check className="size-4 text-muted-foreground" />
                )}
              </Link>
            );
          })}
        </>
      )}
    </Menu>
  );
}
