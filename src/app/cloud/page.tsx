import type { Metadata } from "next";
import { ProductPage } from "@/components/site/product-page";
import { getProductPage } from "@/lib/products";
import { platformPages } from "@/lib/platform";

const page = getProductPage("cloud");

export const metadata: Metadata = {
  title: page.navTitle,
  description: page.subtitle,
};

export default function Page() {
  const related = platformPages.slice(0, 6).map((p) => ({
    slug: p.slug,
    navTitle: p.navTitle,
    subtitle: p.subtitle,
    href: `/platform/${p.slug}`,
  }));
  return <ProductPage page={page} related={related} />;
}
