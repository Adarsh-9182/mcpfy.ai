import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Blocks } from '@/components/docs/Blocks';
import { docs, getDoc } from '@/lib/docs';

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: 'Not found' };
  return { title: doc.title, description: doc.description };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const index = docs.findIndex((d) => d.slug === doc.slug);
  const prev = index > 0 ? docs[index - 1] : null;
  const next = index < docs.length - 1 ? docs[index + 1] : null;

  return (
    <article>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{doc.section}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{doc.description}</p>

      <div className="mt-8 border-t border-line pt-2">
        <Blocks blocks={doc.blocks} />
      </div>

      <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-line pt-6" aria-label="Pagination">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="focus-ring group flex-1 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/40"
          >
            <span className="text-xs text-faint">Previous</span>
            <span className="mt-1 block text-sm font-medium text-ink">{prev.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="focus-ring group flex-1 rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-brand/40"
          >
            <span className="text-xs text-faint">Next</span>
            <span className="mt-1 block text-sm font-medium text-ink">{next.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </article>
  );
}
