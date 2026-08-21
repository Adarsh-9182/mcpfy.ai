"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-and-rise on first scroll into view.
 *
 * The hidden state is applied by CSS under `html.js` only, and the reveal is a
 * plain transition rather than a JS animation — so if scripts fail, if
 * IntersectionObserver is missing, or if a crawler renders the page without
 * running the observer, the content is simply visible. One shared observer
 * serves every instance on the page.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof IntersectionObserver === "undefined") return null;
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -48px 0px" },
  );
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getObserver();
    if (!io) {
      el.classList.add("is-in");
      return;
    }

    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
