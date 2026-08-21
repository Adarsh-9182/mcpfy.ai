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
import type { McpServer } from "@/lib/dashboard";
import { getServerBySlug } from "@/lib/db/queries";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const label = serverSections.find((s) => s.slug === section)?.label;
  const name = (await getServerBySlug(slug))?.name;
  return { title: label && name ? `${label} · ${name}` : "Server" };
}

export default async function ServerSectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const server = await getServerBySlug(slug);
  const Section = sections[section];
  if (!server || !Section) notFound();

  return <>{Section({ server })}</>;
}
