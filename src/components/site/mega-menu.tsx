import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  BarChart3,
  Cloud,
  FlaskConical,
  ListChecks,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";
import {
  platformCloud,
  platformOpenSource,
  solutionsMenu,
  type MenuItem,
} from "@/lib/content";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  flask: FlaskConical,
  checks: ListChecks,
  search: Search,
  chat: MessageSquare,
  chart: BarChart3,
  sparkles: Sparkles,
};

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 pb-2 pt-1 text-[12px] font-medium text-subtle-foreground">
      {children}
    </p>
  );
}

function Row({ item }: { item: MenuItem }) {
  const Icon = icons[item.icon] ?? Cloud;
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={item.href}
        className="group flex min-w-0 gap-3 rounded-lg p-3 transition-colors hover:bg-surface-2"
      >
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[var(--r-1)] border border-line bg-n2 text-t-mid transition-colors duration-[var(--d-2)] group-hover:border-line-strong group-hover:bg-n3 group-hover:text-t-hi">
          <Icon className="size-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[13.5px] font-medium">{item.title}</span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
            {item.desc}
          </span>
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}

export function PlatformMenu() {
  return (
    <div className="grid w-[720px] grid-cols-[1fr_260px]">
      <div className="p-2">
        <GroupLabel>Cloud</GroupLabel>
        <div className="grid grid-cols-2">
          {platformCloud.map((item) => (
            <Row key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className="border-l border-border bg-surface-1/60 p-2">
        <GroupLabel>Open source</GroupLabel>
        {platformOpenSource.map((p) => (
          <NavigationMenu.Link asChild key={p.title}>
            <Link
              href={p.href}
              className="group block rounded-lg p-3 transition-colors hover:bg-surface-2"
            >
              <span className="flex items-center gap-2">
                <span className="text-[13.5px] font-medium">{p.title}</span>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border px-1 py-px font-mono text-[9.5px] text-subtle-foreground"
                  >
                    {t}
                  </span>
                ))}
              </span>
              <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">
                {p.desc}
              </span>
            </Link>
          </NavigationMenu.Link>
        ))}
      </div>
    </div>
  );
}

export function SolutionsMenu() {
  return (
    <div className="w-[440px] p-2">
      <GroupLabel>By what you are building</GroupLabel>
      {solutionsMenu.map((s) => (
        <NavigationMenu.Link asChild key={s.title}>
          <Link
            href={s.href}
            className="group block rounded-lg p-3 transition-colors hover:bg-surface-2"
          >
            <span className="text-[13.5px] font-medium">{s.title}</span>
            <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
              {s.desc}
            </span>
          </Link>
        </NavigationMenu.Link>
      ))}
      <NavigationMenu.Link asChild>
        <Link
          href="/templates"
          className="group mt-1 flex items-center justify-between rounded-lg border border-border bg-surface-1 p-3 transition-colors hover:border-border-strong"
        >
          <span>
            <span className="text-[13.5px] font-medium">Browse templates</span>
            <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
              Known-good scaffolds to start from.
            </span>
          </span>
          <span
            aria-hidden
            className="text-t-mid transition-transform duration-[var(--d-3)] group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </NavigationMenu.Link>
    </div>
  );
}
