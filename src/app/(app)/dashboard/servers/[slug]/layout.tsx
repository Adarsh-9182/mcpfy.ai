import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ServerTabs } from "@/components/dashboard/server-tabs";
import { Mono, StatusBadge } from "@/components/dashboard/ui";
import { getServerBySlug } from "@/lib/db/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: (await getServerBySlug(slug))?.name ?? "Server" };
}

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const server = await getServerBySlug(slug);
  if (!server) notFound();

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="text-2xl font-medium tracking-tight">{server.name}</h1>
          <StatusBadge status={server.status} />
        </div>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          {server.description}
        </p>
        <a
          href={`https://${server.url}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Mono>{server.url}</Mono>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <ServerTabs slug={slug} />

      <div className="space-y-8">{children}</div>
    </>
  );
}
