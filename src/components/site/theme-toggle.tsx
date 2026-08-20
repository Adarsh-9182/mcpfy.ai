"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      // Rendered inert until mounted so SSR markup matches the client.
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {mounted ? (
        isDark ? <Sun className="size-4" /> : <Moon className="size-4" />
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
