"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon } from "./icons";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { navLinks, platformCloud } from "@/lib/content";
import { PlatformMenu, SolutionsMenu } from "./mega-menu";

/* Every nav label is a mono slug, so the bar reads as a running header rather
   than a row of buttons. The active/open state is a signal underline. */
const triggerClass =
  "group inline-flex h-8 items-center gap-1.5 slug text-muted-foreground transition-colors hover:text-foreground data-[state=open]:text-signal";
const linkClass =
  "inline-flex h-8 items-center slug text-muted-foreground transition-colors hover:text-foreground";

function Caret() {
  return (
    <span
      aria-hidden
      className="text-[9px] transition-transform duration-200 group-data-[state=open]:rotate-180"
    >
      ▼
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-[60px] items-center justify-between gap-6">
        <Logo />

        <NavigationMenu.Root
          delayDuration={80}
          className="relative hidden md:block"
        >
          <NavigationMenu.List className="flex items-center gap-7">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass}>
                Platform
                <Caret />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-0 w-auto">
                <PlatformMenu />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={triggerClass}>
                Solutions
                <Caret />
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

          <div className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center">
            <NavigationMenu.Viewport
              className={cn(
                "relative mt-[9px] h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
                "origin-top overflow-hidden border border-rule bg-popover shadow-[var(--drop)]",
                "transition-[width,height] duration-250",
                "data-[state=closed]:animate-[nav-out_150ms_ease] data-[state=open]:animate-[nav-in_200ms_ease]",
              )}
            />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-3">
          <Link
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 slug text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <GithubIcon className="size-[15px]" />
            {site.stars}
          </Link>
          <span aria-hidden className="hidden h-4 w-px bg-rule lg:block" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/cloud"
            className="group inline-flex h-9 items-center gap-2 bg-foreground px-4 slug text-background transition-colors hover:bg-signal"
          >
            Cloud
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="inline-flex size-9 items-center justify-center border border-rule text-muted-foreground transition-colors hover:text-foreground md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-sm md:hidden" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto border-l border-rule bg-background px-6 py-5 md:hidden">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <Logo />
                  </Dialog.Title>
                  <Dialog.Close
                    className="inline-flex size-9 items-center justify-center border border-rule text-muted-foreground"
                    aria-label="Close menu"
                  >
                    <X className="size-4" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Site navigation
                </Dialog.Description>

                <nav className="mt-10 flex flex-col gap-9">
                  <div>
                    <p className="slug border-b border-rule pb-2.5 text-signal">
                      01 / platform
                    </p>
                    <ul className="mt-1">
                      {platformCloud.map((i) => (
                        <li key={i.title}>
                          <Link
                            href={i.href}
                            onClick={() => setOpen(false)}
                            className="block border-b border-rule-soft py-3 text-[15px] transition-colors hover:text-signal"
                          >
                            {i.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="slug border-b border-rule pb-2.5 text-signal">
                      02 / company
                    </p>
                    <ul className="mt-1">
                      {navLinks.map((i) => (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            onClick={() => setOpen(false)}
                            className="block border-b border-rule-soft py-3 text-[15px] transition-colors hover:text-signal"
                          >
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>

                <div className="mt-auto flex items-center gap-3 pt-10">
                  <ThemeToggle />
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-foreground slug text-background"
                  >
                    Start deploying <span aria-hidden>→</span>
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
