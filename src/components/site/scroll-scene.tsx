"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven 3D. A scene starts tilted back on its X axis and stands up as
 * it reaches the middle of the viewport, so product surfaces read as objects
 * lying in space rather than as images pasted on the page.
 *
 * The transform is written straight to the node inside one rAF per scroll —
 * no state, no re-render — and the listener is only attached while the scene
 * is actually on screen. Reduced motion leaves it flat.
 */
export function ScrollScene({
  children,
  intensity = 1,
  className,
  sceneClassName,
}: {
  children: React.ReactNode;
  /** 0 disables the tilt; 1 is the house default; 1.5 for hero objects. */
  intensity?: number;
  className?: string;
  sceneClassName?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let attached = false;

    const apply = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // 0 when the top edge is at the bottom of the viewport, 1 once the
      // scene has travelled 85% of the way up.
      const raw = (vh - rect.top) / (vh * 0.85);
      const p = Math.min(1, Math.max(0, raw));
      const eased = 1 - Math.pow(1 - p, 3);

      const rotate = (1 - eased) * 11 * intensity;
      const lift = (1 - eased) * 26 * intensity;
      const scale = 0.955 + eased * 0.045;

      el.style.transform = `translateY(${lift.toFixed(2)}px) scale(${scale.toFixed(4)}) rotateX(${rotate.toFixed(2)}deg)`;
      el.style.opacity = (0.72 + eased * 0.28).toFixed(3);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !attached) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          attached = true;
          apply();
        } else if (!entry.isIntersecting && attached) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          attached = false;
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );

    io.observe(el);
    apply();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [intensity]);

  return (
    <div
      className={cn("[perspective:1600px] [perspective-origin:50%_0%]", className)}
    >
      <div
        ref={ref}
        className={cn("will-change-transform [transform-style:preserve-3d]", sceneClassName)}
      >
        {children}
      </div>
    </div>
  );
}
