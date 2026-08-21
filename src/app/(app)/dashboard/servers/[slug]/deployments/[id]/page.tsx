import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  CircleDashed,
  GitBranch,
  Loader2,
  Minus,
  X,
} from "lucide-react";
import { BuildLog } from "@/components/dashboard/build-log";
import { Mono, Panel, StatusBadge } from "@/components/dashboard/ui";
import {
  buildLog,
  buildSteps,
  type StepStatus,
} from "@/lib/dashboard";
import { getDeploymentById } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const found = await getDeploymentById(slug, id);
  return { title: found ? `${found.deployment.sha} · ${found.server.name}` : "Deployment" };
}

const stepIcon: Record<StepStatus, React.ComponentType<{ className?: string }>> = {
  done: Check,
  running: Loader2,
  failed: X,
  skipped: Minus,
};

const stepStyle: Record<StepStatus, string> = {
  done: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
  running: "border-amber-500/40 text-amber-600 dark:text-amber-400",
  failed: "border-red-500/40 text-red-600 dark:text-red-400",
  skipped: "border-border text-muted-foreground",
};

export default async function DeploymentDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const found = await getDeploymentById(slug, id);
  if (!found) notFound();

  const { server, deployment } = found;
  const steps = buildSteps(deployment);
  const lines = buildLog(server, deployment);
  const isProduction = deployment.environment === "production";

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/dashboard/servers/${slug}/deployments`}
            className="text-[13px] text-muted-foreground hover:underline"
          >
            ← All deployments
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="text-xl font-medium tracking-tight">
              <Mono>{deployment.sha}</Mono>
            </h2>
            <StatusBadge status={deployment.status} />
            <span className="rounded-full border px-2.5 py-0.5 text-[12px] capitalize text-muted-foreground">
              {deployment.environment}
            </span>
          </div>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            {deployment.message}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg border px-3.5 text-[14px] font-medium transition-colors hover:bg-accent"
          >
            Redeploy
          </button>
          {deployment.status === "ready" && (
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-lg border px-3.5 text-[14px] font-medium transition-colors hover:bg-accent"
            >
              {isProduction ? "Rollback to this" : "Promote to production"}
            </button>
          )}
          <a
            href={`https://${deployment.url}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      {/* build pipeline */}
      <Panel title="Build" description={`Finished in ${deployment.duration}`}>
        <ol className="flex flex-wrap gap-3 px-5 py-5">
          {steps.map((step) => {
            const Icon = stepIcon[step.status];
            return (
              <li
                key={step.name}
                className={cn(
                  "flex min-w-[8.5rem] flex-1 items-center gap-2.5 rounded-lg border px-3.5 py-3",
                  stepStyle[step.status],
                )}
              >
                {step.status === "running" ? (
                  <Loader2 className="size-4 shrink-0 animate-spin" />
                ) : step.status === "skipped" ? (
                  <CircleDashed className="size-4 shrink-0" />
                ) : (
                  <Icon className="size-4 shrink-0" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-foreground">
                    {step.name}
                  </span>
                  <span className="block text-[12px] tabular-nums text-muted-foreground">
                    {step.duration}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </Panel>

      <BuildLog lines={lines} />

      {/* source */}
      <Panel title="Source">
        <dl className="divide-y divide-border/60">
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-40 shrink-0 text-[14px] text-muted-foreground">
              Repository
            </dt>
            <dd className="text-[14px]">
              <Mono>{server.repo}</Mono>
            </dd>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-40 shrink-0 text-[14px] text-muted-foreground">Branch</dt>
            <dd className="inline-flex items-center gap-1.5 text-[14px]">
              <GitBranch className="size-3.5 text-muted-foreground" />
              <Mono>{deployment.branch}</Mono>
            </dd>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-40 shrink-0 text-[14px] text-muted-foreground">Author</dt>
            <dd className="text-[14px]">{deployment.author}</dd>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-40 shrink-0 text-[14px] text-muted-foreground">
              Endpoint
            </dt>
            <dd className="text-[14px]">
              <Mono>{deployment.url}</Mono>
            </dd>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-40 shrink-0 text-[14px] text-muted-foreground">
              Created
            </dt>
            <dd className="text-[14px]">{deployment.createdAt}</dd>
          </div>
        </dl>
      </Panel>
    </>
  );
}
