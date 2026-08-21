import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,black,transparent)]"
      />
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          This endpoint doesn&apos;t{" "}
          <span className="font-serif italic font-normal">exist</span>
        </h1>
        <p className="mt-5 max-w-md text-balance-pretty text-muted-foreground">
          The page you were looking for has moved, or never shipped.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild size="lg">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/docs">Read the docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
