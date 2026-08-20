import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card/50 p-6 transition-colors duration-200 hover:bg-card",
        className,
      )}
      {...props}
    />
  );
}
