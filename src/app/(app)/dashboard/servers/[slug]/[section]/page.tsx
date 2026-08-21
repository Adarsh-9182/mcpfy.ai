import { notFound } from "next/navigation";
import {
  Analytics,
  Domains,
  Environment,
  GatewayRequests,
  PublicChat,
  PublishChecks,
  RuntimeLogs,
  Sessions,
  Settings,
  SubmissionPack,
  TestSuites,
} from "@/components/dashboard/sections";
import { serverSections } from "@/components/dashboard/nav";
import { getServer, servers, type McpServer } from "@/lib/dashboard";

/** One route file renders every server tab, keyed off the section slug. */
const sections: Record<string, (props: { server: McpServer }) => React.ReactNode> = {
  logs: RuntimeLogs,
  sessions: Sessions,
  gateway: GatewayRequests,
  analytics: Analytics,
  environment: Environment,
  domains: Domains,
  "publish-checks": PublishChecks,
  "submission-pack": SubmissionPack,
  "public-chat": PublicChat,
  settings: Settings,
  testing: TestSuites,
};

export function generateStaticParams() {
  return servers.flatMap((s) =>
    serverSections
      // "deployments" has its own route with a nested detail page.
      .filter((section) => section.slug && section.slug !== "deployments")
      .map((section) => ({ slug: s.slug, section: section.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const label = serverSections.find((s) => s.slug === section)?.label;
  const name = getServer(slug)?.name;
  return { title: label && name ? `${label} · ${name}` : "Server" };
}

export default async function ServerSectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const server = getServer(slug);
  const Section = sections[section];
  if (!server || !Section) notFound();

  return <>{Section({ server })}</>;
}
