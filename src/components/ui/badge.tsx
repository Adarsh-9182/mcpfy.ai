import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-1 px-2.5 py-1 text-[12.5px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
