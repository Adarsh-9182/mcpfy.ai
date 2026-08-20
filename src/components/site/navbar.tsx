"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon } from "./icons";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import {
  navLinks,
  platformMenu,
  productsMenu,
  solutionsMenu,
  solutionsSub,
} from "@/lib/content";

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
      <Link href={href} className="block rounded-lg p-3 transition-colors hover:bg-accent">
        <div className="text-sm font-medium">{title}</div>
        {desc && (
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{desc}</p>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}

const triggerClass =
  "group inline-flex h-9 items-center gap-1 rounded-lg px-3 text-[15px] transition-colors hover:text-muted-foreground data-[state=open]:text-muted-foreground";
const linkClass =
  "inline-flex h-9 items-center rounded-lg px-3 text-[15px] transition-colors hover:text-muted-foreground";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-4 md:px-6 lg:px-12">
        <Logo />

        {/* centered primary nav */}
        <NavigationMenu.Root
          delayDuration={80}
          className="relative hidden md:block"
        >
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass}>
                Platform
                <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-0 w-full">
                <div className="grid w-[640px] grid-cols-[1fr_200px] gap-6 p-4">
                  <div>
                    <p className="px-3 pb-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
                    <p className="px-3 pb-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>

          <div className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center">
            <NavigationMenu.Viewport
              className={cn(
                "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
                "origin-top overflow-hidden rounded-xl border bg-popover shadow-xl",
                "transition-[width,height] duration-250",
                "data-[state=closed]:animate-[nav-out_150ms_ease] data-[state=open]:animate-[nav-in_200ms_ease]",
              )}
            />
          </div>
        </NavigationMenu.Root>

        {/* right cluster */}
        <div className="flex items-center gap-2">
          <Link
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-[15px] transition-colors hover:text-muted-foreground lg:inline-flex"
          >
            <GithubIcon className="size-[18px]" />
            {site.stars}
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Cloud
          </Link>

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
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>

                <nav className="mt-8 flex flex-col gap-6">
                  <div>
                    <p className="pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
                    <p className="pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
                  <ThemeToggle className="rounded-full" />
                  <Link
                    href="/docs"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-foreground text-[15px] font-medium text-background"
                  >
                    Start deploying
                  </Link>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
