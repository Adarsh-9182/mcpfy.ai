import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border border-rule bg-card p-6 transition-colors duration-200 hover:border-signal/40",
        className,
      )}
      {...props}
    />
  );
}
