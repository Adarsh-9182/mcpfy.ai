import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { TemplateGallery } from "@/components/site/template-gallery";
import { Em } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Deploy-ready MCP starters for every framework and use case. Clone a template and ship in under a minute.",
};

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        eyebrow="templates"
        meta="known-good scaffolds"
        title={
          <>
            Start from a known-good <Em>scaffold</Em>.
          </>
        }
        subtitle="Get started quickly by cloning a template and deploying your MCP server."
      />
      <TemplateGallery />
    </>
  );
}
