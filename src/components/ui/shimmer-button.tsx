import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ShimmerButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
};

/**
 * Pill CTA with a conic-gradient sweep running around the border.
 * The sweep is a rotating conic gradient masked to a thin ring.
 */
export function ShimmerButton({
  className,
  children,
  asChild = false,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "var(--foreground)",
  ...props
}: ShimmerButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
        "border border-white/10 px-6 py-3 text-[15px] font-medium text-[var(--background)]",
        "[border-radius:var(--radius)] [background:var(--bg)]",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className,
      )}
      {...props}
    >
      {/* rotating conic sweep, clipped to the button's rounded rect */}
      <span className="absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
        <span className="animate-shimmer-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
          <span className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </span>
      </span>

      {/* Slottable marks the real child so `asChild` merges onto it and the
          decorative spans render as its siblings. */}
      <Slottable>{children}</Slottable>

      {/* inner highlight */}
      <span className="absolute inset-0 -z-20 size-full transform-gpu shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f] [border-radius:var(--radius)]" />

      {/* solid core that masks the sweep to a ring */}
      <span className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
    </Comp>
  );
}
