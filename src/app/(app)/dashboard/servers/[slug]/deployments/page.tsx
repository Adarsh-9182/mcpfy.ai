import Link from "next/link";
import { notFound } from "next/navigation";
import { Mono, Panel, StatusBadge, Table, Tbody, Td, Th, Thead } from "@/components/dashboard/ui";
import { getServer, servers } from "@/lib/dashboard";

export function generateStaticParams() {
  return servers.map((s) => ({ slug: s.slug }));
}

export default async function DeploymentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const server = getServer(slug);
  if (!server) notFound();

  const production = server.deployments.find(
    (d) => d.environment === "production" && d.status === "ready",
  );

  return (
    <>
      {production && (
        <Panel title="Production" description="Currently serving traffic">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5">
            <div>
              <p className="text-[13px] text-muted-foreground">Deployment</p>
              <Link
                href={`/dashboard/servers/${slug}/deployments/${production.id}`}
                className="mt-1 block font-medium hover:underline"
              >
                <Mono>{production.sha}</Mono>
              </Link>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Endpoint</p>
              <p className="mt-1">
                <Mono>{production.url}</Mono>
              </p>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Deployed</p>
              <p className="mt-1 text-[14px]">{production.createdAt}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-lg border px-3.5 text-[14px] font-medium transition-colors hover:bg-accent"
              >
                Redeploy
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-lg border px-3.5 text-[14px] font-medium transition-colors hover:bg-accent"
              >
                Rollback
              </button>
            </div>
          </div>
        </Panel>
      )}

      <Panel title="All deployments" description="Newest first">
        <Table>
          <Thead>
            <Th>Commit</Th>
            <Th>Status</Th>
            <Th>Environment</Th>
            <Th>Branch</Th>
            <Th>Author</Th>
            <Th className="text-right">Duration</Th>
            <Th>Created</Th>
          </Thead>
          <Tbody>
            {server.deployments.map((d) => (
              <tr key={d.id} className="transition-colors hover:bg-accent/40">
                <Td>
                  <Link
                    href={`/dashboard/servers/${slug}/deployments/${d.id}`}
                    className="hover:underline"
                  >
                    <Mono>{d.sha}</Mono>
                    <span className="ml-3 text-muted-foreground">{d.message}</span>
                  </Link>
                </Td>
                <Td>
                  <StatusBadge status={d.status} />
                </Td>
                <Td className="capitalize text-muted-foreground">{d.environment}</Td>
                <Td className="text-muted-foreground">
                  <Mono>{d.branch}</Mono>
                </Td>
                <Td className="text-muted-foreground">{d.author}</Td>
                <Td className="text-right tabular-nums text-muted-foreground">
                  {d.duration}
                </Td>
                <Td className="text-muted-foreground">{d.createdAt}</Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </Panel>
    </>
  );
}
