import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { TemplateGallery } from "@/components/site/template-gallery";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Deploy-ready MCP starters for every framework and use case. Clone a template and ship in under a minute.",
};

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        title={<span className="font-serif italic font-normal">Templates</span>}
        subtitle="Get started quickly by cloning a template and deploying your MCP server."
      />
      <TemplateGallery />
    </>
  );
}
