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
import { navLinks, platformCloud } from "@/lib/content";
import { PlatformMenu, SolutionsMenu } from "./mega-menu";

const triggerClass =
  "group inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground data-[state=open]:text-foreground";
const linkClass =
  "inline-flex h-8 items-center rounded-md px-2.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container-page flex h-14 items-center gap-6">
        <Logo />

        <NavigationMenu.Root delayDuration={60} className="relative hidden md:block">
          <NavigationMenu.List className="flex items-center gap-0.5">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass}>
                Platform
                <ChevronDown className="size-3 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-0 w-auto">
                <PlatformMenu />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass}>
                Solutions
                <ChevronDown className="size-3 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-0 w-auto">
                <SolutionsMenu />
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

          <div className="absolute left-0 top-full flex justify-start">
            <NavigationMenu.Viewport
              className={cn(
                "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
                "origin-top-left overflow-hidden rounded-xl border border-border bg-popover shadow-panel",
                "transition-[width,height] duration-250",
                "data-[state=closed]:animate-[nav-out_140ms_ease] data-[state=open]:animate-[nav-in_180ms_ease]",
              )}
            />
          </div>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <GithubIcon className="size-4" />
            {site.stars}
          </Link>
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/cloud"
            className="ml-1 inline-flex h-8 items-center rounded-lg bg-foreground px-3.5 text-[13.5px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Open Cloud
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto border-l border-border bg-background p-5 md:hidden">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <Logo />
                  </Dialog.Title>
                  <Dialog.Close
                    className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground"
                    aria-label="Close menu"
                  >
                    <X className="size-4" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Site navigation
                </Dialog.Description>

                <nav className="mt-8 flex flex-col gap-7">
                  <div>
                    <p className="px-2 text-[12px] font-medium text-subtle-foreground">
                      Platform
                    </p>
                    <ul className="mt-1.5">
                      {platformCloud.map((i) => (
                        <li key={i.title}>
                          <Link
                            href={i.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2 py-2 text-[15px] transition-colors hover:bg-surface-2"
                          >
                            {i.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="px-2 text-[12px] font-medium text-subtle-foreground">
                      Company
                    </p>
                    <ul className="mt-1.5">
                      {navLinks.map((i) => (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2 py-2 text-[15px] transition-colors hover:bg-surface-2"
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
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-foreground text-[14.5px] font-medium text-background"
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
