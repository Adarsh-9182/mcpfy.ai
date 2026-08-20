import type { MetadataRoute } from 'next';
import { docs } from '@/lib/docs';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mcpfy.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/pricing', '/docs', '/changelog'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const docRoutes = docs.map((doc) => ({
    url: `${base}/docs/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...docRoutes];
}
