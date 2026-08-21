import Link from "next/link";
import { Display, Em, Lede, ArrowLink } from "./section";
import { Slug } from "./frame";

export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-paper" />
      <div className="container-page relative">
        <div className="flex items-center gap-4 border-b border-rule py-4">
          <Slug className="text-signal">error 404</Slug>
          <span aria-hidden className="h-px flex-1 bg-rule" />
          <Slug>no route matched</Slug>
        </div>

        <div className="flex min-h-[60vh] flex-col justify-center py-16">
          <Display as="h1" size="xl" className="max-w-[14ch]">
            This endpoint doesn&apos;t <Em>exist</Em>.
          </Display>
          <Lede className="mt-7">
            The page you were looking for has moved, or never shipped. The rest
            of the platform is still where you left it.
          </Lede>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/"
              className="group inline-flex h-12 items-center gap-3 bg-foreground px-7 text-[14px] font-medium tracking-tight text-background transition-colors hover:bg-signal"
            >
              Back home
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <ArrowLink href="/docs" tone="muted">
              Read the docs
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
