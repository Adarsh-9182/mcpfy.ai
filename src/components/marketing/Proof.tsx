const stats = [
  { value: '38M+', label: 'tool calls served monthly' },
  { value: '12,400', label: 'servers deployed' },
  { value: '99.98%', label: 'platform uptime' },
  { value: '84ms', label: 'median cold start' },
];

export function Proof() {
  return (
    <section className="border-t border-line bg-surface/40 py-14">
      <div className="shell">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
