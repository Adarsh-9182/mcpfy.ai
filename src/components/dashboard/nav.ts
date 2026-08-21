export type NavItem = {
  label: string;
  href: string;
  icon: string;
  /** Match the path exactly — only the Dashboard root needs it. */
  exact?: boolean;
  /** Render the server count as a trailing badge. */
  count?: boolean;
};

export type NavGroup = { label: string | null; items: NavItem[] };

/**
 * Sidebar structure for the signed-in app: a single Dashboard root, then the
 * server surfaces, then the org-level admin screens.
 */
export const sidebarGroups: NavGroup[] = [
  {
    label: null,
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "home", exact: true },
    ],
  },
  {
    label: "Servers",
    items: [
      { label: "Servers", href: "/dashboard/servers", icon: "server", count: true },
      { label: "Testing", href: "/dashboard/testing", icon: "flask" },
      { label: "Analytics", href: "/dashboard/analytics", icon: "chart" },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Org settings", href: "/dashboard/settings", icon: "settings" },
      { label: "Team", href: "/dashboard/team", icon: "users" },
      { label: "Integrations", href: "/dashboard/integrations", icon: "plug" },
      { label: "API Keys", href: "/dashboard/api-keys", icon: "key" },
      { label: "Billing", href: "/dashboard/billing", icon: "card" },
    ],
  },
];

/** Flat lookup used by the topbar breadcrumb to name the current screen. */
export const navItems = sidebarGroups.flatMap((g) => g.items);

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
