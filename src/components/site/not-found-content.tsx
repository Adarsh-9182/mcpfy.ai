import Link from "next/link";
import { Title, Lead } from "./section";

export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] hero-glow opacity-70"
      />
      <div className="container-page relative flex min-h-[68vh] flex-col items-center justify-center text-center">
        <p className="font-mono text-[12.5px] text-brand">404</p>
        <Title as="h1" size="lg" className="mt-4 max-w-[16ch]">
          This endpoint doesn&apos;t exist
        </Title>
        <Lead className="mx-auto mt-5 max-w-[46ch] text-center">
          The page you were looking for has moved, or never shipped.
        </Lead>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-lg bg-foreground px-5 text-[14.5px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Back home
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-11 items-center rounded-lg border border-border bg-surface-1 px-5 text-[14.5px] font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}
