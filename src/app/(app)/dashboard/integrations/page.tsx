import { AlertTriangle, Plus, RefreshCw } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import { Pill } from "@/components/dashboard/ui";
import { githubInstallations } from "@/lib/dashboard";

export const metadata = { title: "Integrations" };

export default function IntegrationsPage() {
  return (
    <>
      <div>
        <h1 className="text-[24px] font-semibold tracking-tight">Integrations</h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Connect third-party services to your organization
        </p>
      </div>

      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
              <GithubIcon className="size-5" />
              GitHub
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Connect the mcpfy GitHub App to deploy servers from your
              repositories. Each user or organization you install on is a
              separate connection.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            Connect new Org
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border">
          {githubInstallations.length === 0 ? (
            <p className="px-6 py-10 text-center text-[14px] text-muted-foreground">
              No GitHub App installations yet. Use{" "}
              <span className="font-medium text-foreground">Connect new Org</span>{" "}
              to add one.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {githubInstallations.map((i) => (
                <li
                  key={i.account}
                  className="flex flex-wrap items-center gap-4 px-5 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2.5 text-[14px] font-medium">
                      {i.account}
                      <Pill>{i.type}</Pill>
                      {i.status === "needs-attention" && (
                        <Pill tone="warning">
                          <AlertTriangle className="mr-1 size-3" />
                          Needs attention
                        </Pill>
                      )}
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {i.detail ??
                        `${i.repositories} repositories available to deploy.`}
                    </p>
                  </div>

                  {i.status === "needs-attention" && (
                    <button
                      type="button"
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors hover:bg-accent"
                    >
                      <RefreshCw className="size-3.5" />
                      Recheck access
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-[13px] font-medium underline underline-offset-2"
                  >
                    Configure
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
