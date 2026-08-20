import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/pricing",
  "/templates",
  "/customers",
  "/blog",
  "/docs",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/legal/trust",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
