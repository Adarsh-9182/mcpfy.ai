import * as React from "react";

/**
 * Page shell. The layout is a plain vertical stack of sections on one
 * background — the width is owned by `container-page`, not by a frame.
 */
export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full">{children}</div>;
}

/** Full-bleed hairline used to separate major bands. */
export function Divider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="container-page">
        <span className="block h-px bg-border" />
      </div>
    </div>
  );
}
