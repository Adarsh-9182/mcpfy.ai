import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-lg border bg-background px-3.5 text-[15px] transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-[13px] font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}
