import { notFound } from "next/navigation";
import { Overview } from "@/components/dashboard/sections";
import { getServerBySlug } from "@/lib/db/queries";

export default async function ServerOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const server = await getServerBySlug(slug);
  if (!server) notFound();

  return <Overview server={server} />;
}
