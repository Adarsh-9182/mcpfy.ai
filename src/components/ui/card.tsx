import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("card-surface rounded-xl p-6 transition-colors duration-200", className)}
      {...props}
    />
  );
}
