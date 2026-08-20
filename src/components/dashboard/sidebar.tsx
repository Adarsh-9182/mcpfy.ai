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
  Users,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import { organization } from "@/lib/dashboard";
import { sidebarGroups } from "./nav";

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-card/30 lg:flex">
      <div className="flex h-14 items-center border-b px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-5" />
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {sidebarGroups.map((group, gi) => (
          <div key={group.label ?? gi}>
            {group.label && (
              <p className="px-2.5 pb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
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
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t px-5 py-4">
        <p className="text-[13px] font-medium">{organization.name}</p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          {organization.plan} · ${organization.creditsUsed} of $
          {organization.creditsIncluded} credits
        </p>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground/60"
            style={{
              width: `${(organization.creditsUsed / organization.creditsIncluded) * 100}%`,
            }}
          />
        </div>
      </div>
    </aside>
  );
}
