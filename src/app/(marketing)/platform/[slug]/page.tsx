import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/site/product-page";
import { getPlatformPage, platformPages } from "@/lib/platform";

export function generateStaticParams() {
  return platformPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) return {};
  return { title: page.navTitle, description: page.subtitle };
}

export default async function PlatformFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();

  // Five sibling features plus a docs card, matching the reference layout.
  const related = [
    ...platformPages
      .filter((p) => p.slug !== page.slug)
      .slice(0, 5)
      .map((p) => ({
        slug: p.slug,
        navTitle: p.navTitle,
        subtitle: p.subtitle,
        href: `/platform/${p.slug}`,
      })),
    {
      slug: "docs",
      navTitle: "Documentation",
      subtitle: "Guides, API references and deployment how-tos.",
      href: "/docs",
    },
  ];

  return <ProductPage page={page} related={related} />;
}
