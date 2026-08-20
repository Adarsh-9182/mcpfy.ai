import { notFound } from "next/navigation";
import { Overview } from "@/components/dashboard/sections";
import { getServer } from "@/lib/dashboard";

export default async function ServerOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const server = getServer(slug);
  if (!server) notFound();

  return <Overview server={server} />;
}
