import { PageHeader, Panel } from "@/components/dashboard/ui";
import { GithubIcon } from "@/components/site/icons";

export const metadata = { title: "Integrations" };

const integrations = [
  {
    name: "GitHub",
    detail: "Connected to acme-labs. Every push to a default branch deploys, and every pull request gets a preview URL.",
    status: "Connected",
  },
  {
    name: "Webhooks",
    detail: "POST deployment, check and incident events to your own endpoint.",
    status: "2 endpoints",
  },
  {
    name: "mcpfy MCP server",
    detail: "Let a coding agent manage deployments, logs and observability over MCP.",
    status: "mcp.mcpfy.ai/mcp",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        title="Integrations"
        description="How mcpfy talks to the rest of your toolchain."
      />

      <Panel>
        <ul className="divide-y divide-border/60">
          {integrations.map((i) => (
            <li key={i.name} className="flex items-start gap-4 px-5 py-5">
              {i.name === "GitHub" && (
                <GithubIcon className="mt-0.5 size-5 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium">{i.name}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{i.detail}</p>
              </div>
              <span className="shrink-0 text-[13px] text-muted-foreground">
                {i.status}
              </span>
              <button
                type="button"
                className="shrink-0 text-[13px] font-medium hover:underline"
              >
                Configure
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
