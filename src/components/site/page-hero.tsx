import * as React from "react";
import { Eyebrow, Title, Lead } from "./section";

/** Masthead for the secondary pages. */
export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] hero-glow opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-dots opacity-40 mask-radial"
      />
      <div className="container-page relative py-16 text-center md:py-20">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Title as="h1" size="lg" className="mx-auto max-w-[20ch]">
          {title}
        </Title>
        {subtitle && (
          <Lead className="mx-auto mt-5 max-w-[58ch] text-center">{subtitle}</Lead>
        )}
      </div>
    </section>
  );
}
