import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { CTA } from '@/components/marketing/CTA';
import { FAQ } from '@/components/marketing/FAQ';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Usage-based pricing for MCP servers — billed by tool calls, never by seat.',
};

const tiers = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    blurb: 'Enough to run real internal tooling before you pay anything.',
    cta: 'Start free',
    href: '/dashboard',
    featured: false,
    features: [
      '3 MCP servers',
      '50,000 tool calls / month',
      'Built-in inspector',
      '7-day trace retention',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$40',
    cadence: 'per month',
    blurb: 'For teams shipping servers that customers actually depend on.',
    cta: 'Start 14-day trial',
    href: '/dashboard',
    featured: true,
    features: [
      'Unlimited servers',
      '2M tool calls / month, then $2 per 100k',
      'Edge runtime & custom domains',
      '30-day trace retention',
      'Scoped tokens & per-tool rate limits',
      'Connector publishing',
      'Email support, 1 business day',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'annual',
    blurb: 'Self-hosted control plane, procurement and the paperwork that comes with it.',
    cta: 'Talk to us',
    href: '/docs',
    featured: false,
    features: [
      'Self-hosted in your VPC',
      'SSO / SAML & audit logs',
      'Unlimited retention',
      '99.99% uptime SLA',
      'Dedicated support channel',
    ],
  },
];

const comparison = [
  { label: 'MCP servers', free: '3', pro: 'Unlimited', ent: 'Unlimited' },
  { label: 'Tool calls included', free: '50k / mo', pro: '2M / mo', ent: 'Negotiated' },
  { label: 'Runtimes', free: 'Node, Python', pro: 'Node, Python, Edge', ent: 'All + custom' },
  { label: 'Trace retention', free: '7 days', pro: '30 days', ent: 'Unlimited' },
  { label: 'Scoped tokens', free: '—', pro: 'Yes', ent: 'Yes' },
  { label: 'Connector publishing', free: '—', pro: 'Yes', ent: 'Yes' },
  { label: 'SSO / SAML', free: '—', pro: '—', ent: 'Yes' },
  { label: 'Uptime SLA', free: '—', pro: '99.9%', ent: '99.99%' },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] glow" aria-hidden="true" />
          <div className="shell relative py-20 text-center sm:py-24">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">Pricing</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Priced by what you serve
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted">
              Billed on tool calls, not seats. Invite the whole team on every plan.
            </p>
          </div>
        </section>

        <section className="shell py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-7',
                  tier.featured ? 'border-brand/50 bg-surface shadow-2xl shadow-brand/5' : 'border-line bg-surface',
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-medium text-brand-ink">
                    Most popular
                  </span>
                )}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-faint">{tier.name}</h2>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-ink">{tier.price}</span>
                  <span className="text-sm text-faint">{tier.cadence}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tier.blurb}</p>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand">
                        <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ButtonLink
                    href={tier.href}
                    variant={tier.featured ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    {tier.cta}
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="shell pb-20">
          <h2 className="mb-6 text-xl font-semibold tracking-tight">Compare plans</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">Feature comparison across mcpfy plans</caption>
              <thead>
                <tr className="border-b border-line bg-elevated/50 text-left">
                  <th scope="col" className="px-5 py-3 font-medium text-faint">Feature</th>
                  <th scope="col" className="px-5 py-3 font-medium text-ink">Free</th>
                  <th scope="col" className="px-5 py-3 font-medium text-ink">Pro</th>
                  <th scope="col" className="px-5 py-3 font-medium text-ink">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparison.map((row) => (
                  <tr key={row.label} className="bg-surface">
                    <th scope="row" className="px-5 py-3 text-left font-normal text-muted">{row.label}</th>
                    <td className="px-5 py-3 text-muted">{row.free}</td>
                    <td className="px-5 py-3 text-muted">{row.pro}</td>
                    <td className="px-5 py-3 text-muted">{row.ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
