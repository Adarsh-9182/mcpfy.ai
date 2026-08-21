import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Squared buttons. The editorial system has almost no radius, and the primary
 * action resolves to the signal colour on hover rather than fading out.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-[14px] font-medium tracking-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-signal hover:text-signal-foreground",
        signal:
          "bg-signal text-signal-foreground hover:bg-signal-ink",
        outline:
          "border border-rule-strong/30 bg-transparent hover:border-signal hover:text-signal",
        subtle: "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "hover:bg-accent",
        link: "text-foreground underline-offset-4 hover:text-signal hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-5",
        lg: "h-12 px-7",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
