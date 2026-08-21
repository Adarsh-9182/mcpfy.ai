import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-rule bg-card px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
