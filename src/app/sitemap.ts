import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { platformPages } from "@/lib/platform";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /** Set where the content has a real publication date. Pages without one
      fall back to the build date, which is honest for pages that genuinely
      ship with each deploy. */
  lastModified?: string;
};

// Priority is a *relative* ranking hint within this site only — it tells a
// crawler which of our own URLs to reach for first, not how we rank against
// anyone else. So it tracks commercial intent: the paths a buyer moves along
// outrank reference material, and boilerplate sits at the bottom.
const entries: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },

  // Conversion path.
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/templates", changeFrequency: "weekly", priority: 0.9 },
  { path: "/sdk", changeFrequency: "weekly", priority: 0.9 },

  // Product surfaces.
  { path: "/inspector", changeFrequency: "monthly", priority: 0.8 },
  { path: "/vibe", changeFrequency: "monthly", priority: 0.8 },

  // Evidence and reference.
  { path: "/docs", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/customers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },

  // Boilerplate: dated content that must not claim to change every deploy.
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-08-01" },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-08-01" },
  { path: "/legal/trust", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-08-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const platform: Entry[] = platformPages.map((p) => ({
    path: `/platform/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...entries, ...platform].map((e) => ({
    url: `${site.url}${e.path}`,
    lastModified: e.lastModified ? new Date(e.lastModified) : buildDate,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
