"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Both icons are always rendered and toggled with the `dark:` variant, so the
 * server and client markup match without a mount guard.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center border border-rule text-muted-foreground transition-colors hover:border-signal hover:text-signal",
        className,
      )}
    >
      <Sun className="hidden size-[15px] dark:block" />
      <Moon className="size-[15px] dark:hidden" />
    </button>
  );
}
