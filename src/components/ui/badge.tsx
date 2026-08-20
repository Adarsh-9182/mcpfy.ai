import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
