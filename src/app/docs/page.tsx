import type { Metadata } from 'next';
import Link from 'next/link';
import { docs, docSections } from '@/lib/docs';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Guides and reference for building, deploying and operating MCP servers on mcpfy.',
};

export default function DocsIndexPage() {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Documentation</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Build MCP servers that hold up</h1>
      <p className="mt-4 leading-relaxed text-muted">
        Start with the quickstart to get a server deployed, then work through the core concepts
        when you are ready to put it in front of real users.
      </p>

      <div className="mt-10 space-y-10">
        {docSections.map((section) => (
          <section key={section}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">{section}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {docs
                .filter((d) => d.section === section)
                .map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      className="focus-ring group block h-full rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/40 hover:bg-elevated"
                    >
                      <span className="text-sm font-medium text-ink group-hover:text-ink">{doc.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">{doc.description}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
