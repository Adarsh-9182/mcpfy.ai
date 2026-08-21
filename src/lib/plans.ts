/**
 * Plan catalogue. Shared by the marketing pricing page and the in-app
 * billing screen so the two can never drift apart.
 */

export type Tier = {
  name: string;
  monthly: number | null;
  credits: string;
  /** Request allowance, shown under credits on the marketing pricing page. */
  requests: string;
  blurb: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const YEARLY_DISCOUNT = 0.17;

export const tiers: Tier[] = [
  {
    name: "Free",
    monthly: 0,
    credits: "$5 included monthly",
    requests: "30k requests / month",
    blurb: "Everything you need to ship your first MCP server.",
    cta: "Start for free",
    features: [
      "2 projects",
      "7 days analytics retention",
      "1 team member",
      "Deploy from GitHub organization",
    ],
  },
  {
    name: "Hobby",
    monthly: 25,
    credits: "$30 included, then pay-as-you-go",
    requests: "300k requests / month",
    blurb: "For side projects heading to the marketplaces.",
    cta: "Get started",
    featured: true,
    features: [
      "5 projects",
      "30 days analytics retention",
      "3 team members",
      "Preview deployments",
      "Deploy from GitHub organization",
      "Cold-start prevention",
      "Email support",
    ],
  },
  {
    name: "Startup",
    monthly: 250,
    credits: "$300 included, then pay-as-you-go",
    requests: "3M requests / month",
    blurb: "For teams running MCP in production.",
    cta: "Get started",
    features: [
      "Unlimited projects",
      "1 year analytics retention",
      "10 team members",
      "Preview deployments",
      "Deploy from GitHub organization",
      "Cold-start prevention",
      "All regions",
      "Dedicated Slack channel",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    credits: "Unlimited volume pricing",
    requests: "Unlimited requests",
    blurb: "Procurement, compliance and scale.",
    cta: "Contact sales",
    features: [
      "Unlimited projects",
      "Unlimited analytics retention",
      "Unlimited team members",
      "Preview deployments",
      "Deploy from GitHub organization",
      "Cold-start prevention",
      "All regions",
      "Premium support",
    ],
  },
];

export const metered = [
  { label: "Tool-call requests", price: "$0.10", unit: "per 1,000" },
  { label: "Eval runs", price: "$1.00", unit: "per run" },
  { label: "End-to-end checks", price: "$2.00", unit: "per check" },
];

/** Monthly price for a tier, discounted when billed yearly. */
export function priceFor(tier: Tier, yearly: boolean) {
  if (tier.monthly === null) return "Custom";
  if (tier.monthly === 0) return "$0";
  const value = yearly
    ? Math.round(tier.monthly * (1 - YEARLY_DISCOUNT))
    : tier.monthly;
  return `$${value}`;
}
