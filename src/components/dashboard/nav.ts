/** Sidebar structure for the signed-in app, grouped like the Cloud docs. */
export const sidebarGroups = [
  {
    label: null,
    items: [
      { label: "Overview", href: "/dashboard", icon: "home", exact: true },
      { label: "Servers", href: "/dashboard/servers", icon: "server" },
      { label: "Testing", href: "/dashboard/testing", icon: "flask" },
      { label: "Analytics", href: "/dashboard/analytics", icon: "chart" },
    ],
  },
  {
    label: "Organization",
    items: [
      { label: "Team", href: "/dashboard/team", icon: "users" },
      { label: "API keys", href: "/dashboard/api-keys", icon: "key" },
      { label: "Integrations", href: "/dashboard/integrations", icon: "plug" },
      { label: "Billing & plans", href: "/dashboard/billing", icon: "card" },
      { label: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
] as const;

/** Sections of a single server, rendered as tabs on the server detail page. */
export const serverSections = [
  { slug: "", label: "Overview" },
  { slug: "deployments", label: "Deployments" },
  { slug: "logs", label: "Runtime logs" },
  { slug: "sessions", label: "Sessions" },
  { slug: "gateway", label: "Gateway requests" },
  { slug: "analytics", label: "Analytics" },
  { slug: "environment", label: "Environment variables" },
  { slug: "domains", label: "Domains" },
  { slug: "publish-checks", label: "Publish checks" },
  { slug: "submission-pack", label: "Submission pack" },
  { slug: "public-chat", label: "Public chat" },
  { slug: "settings", label: "Settings" },
] as const;

export type ServerSectionSlug = (typeof serverSections)[number]["slug"];
