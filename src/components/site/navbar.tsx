"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, Star, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import {
  navLinks,
  platformMenu,
  productsMenu,
  solutionsMenu,
  solutionsSub,
} from "@/lib/content";

function StarBadge() {
  return (
    <Link
      href={site.github}
      target="_blank"
      rel="noreferrer"
      className="hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:inline-flex"
    >
      <Star className="size-3.5" />
      {site.stars}
    </Link>
  );
}

function MenuLink({
  title,
  desc,
  href,
}: {
  title: string;
  desc?: string;
  href: string;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        className="block rounded-lg p-3 transition-colors hover:bg-accent"
      >
        <div className="text-sm font-medium">{title}</div>
        {desc && (
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
            {desc}
          </p>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}

const triggerClass =
  "group inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Logo className="mr-3" />

          <NavigationMenu.Root
            delayDuration={80}
            className="relative hidden md:block"
          >
            <NavigationMenu.List className="flex items-center gap-0.5">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Platform
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-0 w-full data-[motion=from-end]:animate-[nav-in_200ms_ease] data-[motion=from-start]:animate-[nav-in_200ms_ease]">
                  <div className="grid w-[640px] grid-cols-[1fr_200px] gap-6 p-4">
                    <div>
                      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Platform
                      </p>
                      <ul className="grid grid-cols-2 gap-1">
                        {platformMenu.map((item) => (
                          <li key={item.title}>
                            <MenuLink {...item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-l pl-4">
                      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Products
                      </p>
                      <ul className="grid gap-1">
                        {productsMenu.map((item) => (
                          <li key={item.title}>
                            <MenuLink {...item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Solutions
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-0 w-full">
                  <div className="grid w-[460px] gap-1 p-4">
                    {solutionsMenu.map((item) => (
                      <MenuLink key={item.title} {...item} />
                    ))}
                    <div className="mt-2 flex gap-1 border-t pt-2">
                      {solutionsSub.map((item) => (
                        <NavigationMenu.Link asChild key={item.title}>
                          <Link
                            href={item.href}
                            className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenu.Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {navLinks.map((link) => (
                <NavigationMenu.Item key={link.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={link.href}
                      className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>

            <div className="absolute left-0 top-full flex justify-start">
              <NavigationMenu.Viewport
                className={cn(
                  "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
                  "origin-top-left overflow-hidden rounded-xl border bg-popover shadow-xl",
                  "transition-[width,height] duration-250",
                  "data-[state=closed]:animate-[nav-out_150ms_ease] data-[state=open]:animate-[nav-in_200ms_ease]",
                )}
              />
            </div>
          </NavigationMenu.Root>
        </div>

        <div className="flex items-center gap-2">
          <StarBadge />
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex">
            <Link href="/contact">Get a demo</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/docs">Cloud</Link>
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-accent md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto border-l bg-background p-6 md:hidden">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <Logo />
                  </Dialog.Title>
                  <Dialog.Close
                    className="inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground"
                    aria-label="Close menu"
                  >
                    <X className="size-4" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Site navigation
                </Dialog.Description>

                <nav className="mt-8 flex flex-col gap-6">
                  <div>
                    <p className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Platform
                    </p>
                    <ul className="grid gap-0.5">
                      {platformMenu.map((i) => (
                        <li key={i.title}>
                          <Link
                            href={i.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                          >
                            {i.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Company
                    </p>
                    <ul className="grid gap-0.5">
                      {navLinks.map((i) => (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                          >
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>

                <div className="mt-auto flex items-center gap-2 pt-8">
                  <ThemeToggle />
                  <Button asChild className="flex-1">
                    <Link href="/docs" onClick={() => setOpen(false)}>
                      Start deploying
                    </Link>
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
