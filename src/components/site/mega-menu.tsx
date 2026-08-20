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

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b px-5 py-3.5 text-[15px] font-medium">{children}</div>
  );
}

/** One Platform row: gradient thumbnail tile + title and description. */
function PlatformRow({ item }: { item: MenuItem }) {
  const Icon = icons[item.icon] ?? Cloud;
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={item.href}
        className="group flex min-w-0 items-stretch border-b border-r transition-colors hover:bg-accent"
      >
        <span
          className={cn(
            "grid w-[84px] shrink-0 place-items-center bg-linear-to-br",
            item.tile,
          )}
        >
          <Icon className="size-5 text-foreground/70" />
        </span>
        <span className="min-w-0 flex-1 px-4 py-3.5">
          <span className="block text-[14px] font-medium">{item.title}</span>
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
    <div className="grid w-[900px] grid-cols-[1fr_298px]">
      {/* headers */}
      <GroupLabel>Cloud</GroupLabel>
      <GroupLabel>
        <span className="border-l pl-5 -ml-5 block">Open source</span>
      </GroupLabel>

      {/* left: two-column grid of cloud features */}
      <div className="grid grid-cols-2">
        {platformCloud.map((item) => (
          <PlatformRow key={item.title} item={item} />
        ))}
      </div>

      {/* right: open-source products */}
      <div className="flex flex-col border-l">
        {platformOpenSource.map((p) => (
          <NavigationMenu.Link asChild key={p.title}>
            <Link
              href={p.href}
              className="flex-1 border-b px-5 py-4 transition-colors hover:bg-accent"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-[14px] font-medium">{p.title}</span>
                <span className="flex gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border px-1 py-px font-mono text-[9px] text-muted-foreground"
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
    <div className="grid w-[900px] grid-cols-4">
      {/* The reference alternates a feature cell with an empty one. */}
      {solutionsMenu.flatMap((s, i) => [
        <NavigationMenu.Link asChild key={s.title}>
          <Link
            href={s.href}
            className="flex h-[170px] flex-col justify-between border-r px-5 py-4 transition-colors hover:bg-accent"
          >
            <span className="text-[14px] font-medium">{s.title}</span>
            <span className="text-[12.5px] leading-snug text-muted-foreground">
              {s.desc}
            </span>
          </Link>
        </NavigationMenu.Link>,
        <span
          aria-hidden
          key={`${s.title}-spacer`}
          className={cn("h-[170px]", i === 0 && "border-r")}
        />,
      ])}
    </div>
  );
}
