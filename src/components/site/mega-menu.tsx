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
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  flask: FlaskConical,
  checks: ListChecks,
  search: Search,
  chat: MessageSquare,
  chart: BarChart3,
  sparkles: Sparkles,
};

/* The menus are laid out as a printed index: numbered entries on ruled rows,
   no thumbnails, no gradients. Hover lifts the row to the card surface and
   turns the number and arrow signal-coloured. */

function GroupLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 border-b border-rule px-5 py-3",
        className,
      )}
    >
      <span className="slug text-signal">{index}</span>
      <span className="slug text-muted-foreground">{children}</span>
    </div>
  );
}

function PlatformRow({ item, n }: { item: MenuItem; n: number }) {
  const Icon = icons[item.icon] ?? Cloud;
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={item.href}
        className="group flex min-w-0 gap-3.5 border-b border-r border-rule px-5 py-4 transition-colors hover:bg-accent"
      >
        <span className="flex w-8 shrink-0 flex-col items-start gap-2 pt-0.5">
          <span className="font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-signal">
            {String(n).padStart(2, "0")}
          </span>
          <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-signal" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[14px] font-medium">
            {item.title}
            <span
              aria-hidden
              className="text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            >
              →
            </span>
          </span>
          <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">
            {item.desc}
          </span>
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}

export function PlatformMenu() {
  return (
    <div className="grid w-[880px] grid-cols-[1fr_300px]">
      <GroupLabel index="01">Cloud</GroupLabel>
      <GroupLabel index="02" className="border-l border-rule">
        Open source
      </GroupLabel>

      <div className="grid grid-cols-2">
        {platformCloud.map((item, i) => (
          <PlatformRow key={item.title} item={item} n={i + 1} />
        ))}
      </div>

      <div className="flex flex-col border-l border-rule">
        {platformOpenSource.map((p) => (
          <NavigationMenu.Link asChild key={p.title}>
            <Link
              href={p.href}
              className="group flex-1 border-b border-rule px-5 py-4 transition-colors hover:bg-accent"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-[14px] font-medium">{p.title}</span>
                <span className="flex gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-rule px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-muted-foreground group-hover:border-signal/40 group-hover:text-signal"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-snug text-muted-foreground">
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
    <div className="w-[720px]">
      <GroupLabel index="03">By what you are building</GroupLabel>
      <div className="grid grid-cols-3">
        {solutionsMenu.map((s, i) => (
          <NavigationMenu.Link asChild key={s.title}>
            <Link
              href={s.href}
              className="group flex h-[150px] flex-col justify-between border-r border-rule px-5 py-4 transition-colors hover:bg-accent"
            >
              <span className="font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="flex items-center gap-1.5 text-[14px] font-medium">
                  {s.title}
                  <span
                    aria-hidden
                    className="text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    →
                  </span>
                </span>
                <span className="mt-1.5 block text-[12.5px] leading-snug text-muted-foreground">
                  {s.desc}
                </span>
              </span>
            </Link>
          </NavigationMenu.Link>
        ))}

        {/* closing cell: the catch-all route out of the menu */}
        <NavigationMenu.Link asChild>
          <Link
            href="/templates"
            className="group flex h-[150px] flex-col justify-between bg-hatch px-5 py-4 transition-colors hover:bg-accent hover:bg-none"
          >
            <span className="slug text-muted-foreground transition-colors group-hover:text-signal">
              start here
            </span>
            <span>
              <span className="flex items-center gap-1.5 text-[14px] font-medium">
                Browse templates
                <span
                  aria-hidden
                  className="text-signal transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-snug text-muted-foreground">
                Known-good scaffolds for the most common MCP servers.
              </span>
            </span>
          </Link>
        </NavigationMenu.Link>
      </div>
    </div>
  );
}
