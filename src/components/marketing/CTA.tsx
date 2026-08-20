import { ButtonLink } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] glow rotate-180" aria-hidden="true" />
      <div className="shell relative py-24 text-center sm:py-32">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Your first server is live in under five minutes
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted">
          Free for three servers and 50,000 tool calls a month. No credit card, no sales call.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/dashboard" size="lg">
            Start building
          </ButtonLink>
          <ButtonLink href="/docs" variant="secondary" size="lg">
            Browse the docs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
