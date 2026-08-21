"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  FlaskConical,
  Home,
  KeyRound,
  Plug,
  Server,
  Settings,
  Undo2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarGroups } from "./nav";
import { UpgradeCard } from "./upgrade-card";

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

export function Sidebar({
  className,
  serverCount = 0,
}: {
  className?: string;
  serverCount?: number;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-[268px] shrink-0 flex-col bg-background",
        className,
      )}
    >
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/dashboard/organizations"
          className="mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <Undo2 className="size-4 shrink-0" />
          Back to all organizations
        </Link>

        {sidebarGroups.map((group, gi) => (
          <div key={group.label ?? gi} className={gi === 0 ? "" : "mt-6"}>
            {group.label && (
              <p className="px-2.5 pb-1.5 text-[13px] text-muted-foreground">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = icons[item.icon] ?? Home;
                const active =
                  "exact" in item && item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] transition-colors",
                        active
                          ? "bg-accent font-medium text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.count && (
                        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] nums-tabular text-muted-foreground">
                          {serverCount}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <UpgradeCard />
    </aside>
  );
}
