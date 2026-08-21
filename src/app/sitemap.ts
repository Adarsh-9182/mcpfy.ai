import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { platformPages } from "@/lib/platform";

const staticRoutes = [
  "",
  "/pricing",
  "/templates",
  "/customers",
  "/blog",
  "/docs",
  "/contact",
  "/signup",
  "/sdk",
  "/inspector",
  "/vibe",
  "/legal/privacy",
  "/legal/terms",
  "/legal/trust",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    ...staticRoutes,
    ...platformPages.map((p) => `/platform/${p.slug}`),
  ];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
