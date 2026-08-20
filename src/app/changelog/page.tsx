import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { CTA } from '@/components/marketing/CTA';
import { Badge } from '@/components/ui/Badge';
import { changelog } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'What shipped recently on the mcpfy platform.',
};

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] glow" aria-hidden="true" />
          <div className="shell relative py-20 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">Changelog</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              What shipped recently
            </h1>
          </div>
        </section>

        <section className="shell py-16">
          <ol className="relative mx-auto max-w-2xl border-l border-line pl-8">
            {changelog.map((entry) => (
              <li key={entry.title} className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-bg bg-brand"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <time dateTime={entry.date} className="font-mono text-xs text-faint">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                  {entry.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink">{entry.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{entry.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
