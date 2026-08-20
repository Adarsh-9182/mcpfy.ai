import type { Block } from '@/lib/docs';
import { cn } from '@/lib/utils';

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'p':
            return (
              <p key={i} className="mt-5 leading-relaxed text-muted">
                {block.text}
              </p>
            );

          case 'h2':
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="mt-12 scroll-mt-24 text-xl font-semibold tracking-tight text-ink"
              >
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={i} id={slugify(block.text)} className="mt-8 scroll-mt-24 text-base font-semibold text-ink">
                {block.text}
              </h3>
            );

          case 'code':
            return (
              <pre
                key={i}
                className="mt-5 overflow-x-auto rounded-xl border border-line bg-surface p-4 text-[13px] leading-relaxed"
              >
                <code className="font-mono text-muted">{block.code}</code>
              </pre>
            );

          case 'list':
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'steps':
            return (
              <ol key={i} className="mt-5 space-y-3">
                {block.items.map((item, n) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line bg-elevated font-mono text-[11px] text-brand">
                      {n + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case 'note':
            return (
              <aside
                key={i}
                className={cn(
                  'mt-6 rounded-xl border-l-2 bg-elevated/60 p-4 text-sm leading-relaxed',
                  block.tone === 'warn' ? 'border-l-warn text-muted' : 'border-l-brand text-muted',
                )}
              >
                <span className={cn('mr-2 font-semibold', block.tone === 'warn' ? 'text-warn' : 'text-brand')}>
                  {block.tone === 'warn' ? 'Careful' : 'Note'}
                </span>
                {block.text}
              </aside>
            );

          case 'table':
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[420px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-line bg-elevated/50 text-left">
                      {block.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-2.5 font-medium text-ink">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {block.rows.map((row, r) => (
                      <tr key={r} className="bg-surface">
                        {row.map((cell, c) => (
                          <td key={c} className={cn('px-4 py-2.5 text-muted', c === 0 && 'font-mono text-xs text-ink')}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
