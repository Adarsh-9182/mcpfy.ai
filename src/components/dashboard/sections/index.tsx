import { CheckCircle2, Copy, XCircle } from "lucide-react";
import {
  BarChart,
  EmptyState,
  Mono,
  Panel,
  StatCard,
  StatusBadge,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
} from "@/components/dashboard/ui";
import {
  clientBreakdown,
  domains,
  envVars,
  gatewayRequests,
  publishChecks,
  runtimeLogs,
  sessions,
  testSuites,
  trafficSeries,
  type McpServer,
} from "@/lib/dashboard";
import { cn } from "@/lib/utils";

type SectionProps = { server: McpServer };

/* -------------------------------- overview -------------------------------- */

export function Overview({ server }: SectionProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tool calls"
          value={server.toolCalls30d.toLocaleString()}
          hint="last 30 days"
        />
        <StatCard
          label="Sessions"
          value={server.sessions30d.toLocaleString()}
          hint="last 30 days"
        />
        <StatCard label="Error rate" value={`${server.errorRate}%`} hint="last 30 days" />
        <StatCard label="p95 latency" value={`${server.p95}ms`} hint="last 30 days" />
      </div>

      <Panel title="Tool calls" description="Last 30 days">
        <div className="p-5">
          <BarChart data={trafficSeries} />
        </div>
      </Panel>

      <Panel title="Tools" description="Exposed by the current production deployment">
        <Table>
          <Thead>
            <Th>Tool</Th>
            <Th className="text-right">Calls</Th>
            <Th className="text-right">p95</Th>
            <Th className="text-right">Error rate</Th>
          </Thead>
          <Tbody>
            {server.tools.map((t) => (
              <tr key={t.name}>
                <Td>
                  <Mono>{t.name}</Mono>
                </Td>
                <Td className="text-right tabular-nums">{t.calls.toLocaleString()}</Td>
                <Td className="text-right tabular-nums">{t.p95}ms</Td>
                <Td
                  className={cn(
                    "text-right tabular-nums",
                    t.errorRate > 5 && "text-red-600 dark:text-red-400",
                  )}
                >
                  {t.errorRate}%
                </Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </Panel>
    </>
  );
}

/* ------------------------------- deployments ------------------------------ */

export function Deployments({ server }: SectionProps) {
  return (
    <Panel title="Deployments" description="Newest first">
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
                <Mono>{d.sha}</Mono>
                <span className="ml-3 text-muted-foreground">{d.message}</span>
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
  );
}

/* ---------------------------------- logs ---------------------------------- */

const logLevelStyle: Record<string, string> = {
  info: "text-muted-foreground",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
};

export function RuntimeLogs() {
  return (
    <Panel title="Runtime logs" description="Live tail from the production deployment">
      <div className="divide-y divide-border/40 font-mono text-[13px]">
        {runtimeLogs.map((l, i) => (
          <div key={i} className="flex gap-4 px-5 py-2">
            <span className="shrink-0 text-muted-foreground">{l.at}</span>
            <span className={cn("w-12 shrink-0 uppercase", logLevelStyle[l.level])}>
              {l.level}
            </span>
            <span className="min-w-0 break-all">{l.msg}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* -------------------------------- sessions -------------------------------- */

export function Sessions() {
  return (
    <Panel title="Sessions" description="Replay a conversation end to end">
      <Table>
        <Thead>
          <Th>Session</Th>
          <Th>Client</Th>
          <Th>Country</Th>
          <Th className="text-right">Tool calls</Th>
          <Th className="text-right">Duration</Th>
          <Th>Started</Th>
          <Th />
        </Thead>
        <Tbody>
          {sessions.map((s) => (
            <tr key={s.id} className="transition-colors hover:bg-accent/40">
              <Td>
                <Mono>{s.id}</Mono>
              </Td>
              <Td>{s.client}</Td>
              <Td className="text-muted-foreground">{s.country}</Td>
              <Td className="text-right tabular-nums">{s.calls}</Td>
              <Td className="text-right tabular-nums text-muted-foreground">
                {s.duration}
              </Td>
              <Td className="text-muted-foreground">{s.started}</Td>
              <Td className="text-right">
                <button
                  type="button"
                  className="text-[13px] font-medium hover:underline"
                >
                  Replay
                </button>
              </Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Panel>
  );
}

/* ---------------------------- gateway requests ---------------------------- */

export function GatewayRequests() {
  return (
    <Panel title="Gateway requests" description="Raw JSON-RPC traffic at the edge">
      <Table>
        <Thead>
          <Th>Time</Th>
          <Th>Method</Th>
          <Th>Target</Th>
          <Th>Client</Th>
          <Th className="text-right">Status</Th>
          <Th className="text-right">Latency</Th>
        </Thead>
        <Tbody>
          {gatewayRequests.map((r) => (
            <tr key={r.id} className="transition-colors hover:bg-accent/40">
              <Td className="text-muted-foreground">
                <Mono>{r.at}</Mono>
              </Td>
              <Td>
                <Mono>{r.method}</Mono>
              </Td>
              <Td className="text-muted-foreground">
                <Mono>{r.tool}</Mono>
              </Td>
              <Td>{r.client}</Td>
              <Td
                className={cn(
                  "text-right tabular-nums",
                  r.status >= 400 && "text-red-600 dark:text-red-400",
                )}
              >
                {r.status}
              </Td>
              <Td className="text-right tabular-nums text-muted-foreground">
                {r.ms}ms
              </Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Panel>
  );
}

/* -------------------------------- analytics ------------------------------- */

export function Analytics({ server }: SectionProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tool calls" value={server.toolCalls30d.toLocaleString()} hint="last 30 days" />
        <StatCard label="Error rate" value={`${server.errorRate}%`} hint="last 30 days" />
        <StatCard label="p95 latency" value={`${server.p95}ms`} hint="last 30 days" />
        <StatCard label="Region" value={server.region} hint="primary" />
      </div>

      <Panel title="Volume" description="Daily tool calls, last 30 days">
        <div className="p-5">
          <BarChart data={trafficSeries} />
        </div>
      </Panel>

      <Panel title="By client" description="Where the traffic comes from">
        <ul className="divide-y divide-border/60">
          {clientBreakdown.map((c) => (
            <li key={c.client} className="flex items-center gap-4 px-5 py-3.5">
              <span className="w-28 shrink-0 text-[14px]">{c.client}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-foreground/60"
                  style={{ width: `${c.share}%` }}
                />
              </span>
              <span className="w-12 shrink-0 text-right text-[13px] tabular-nums text-muted-foreground">
                {c.share}%
              </span>
              <span className="w-20 shrink-0 text-right text-[13px] tabular-nums">
                {c.calls}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}

/* ------------------------------- environment ------------------------------ */

export function Environment() {
  return (
    <Panel
      title="Environment variables"
      description="Encrypted at rest and injected at runtime — never written into the build"
      action={
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-lg border px-3 text-[13px] font-medium transition-colors hover:bg-accent"
        >
          Add variable
        </button>
      }
    >
      <Table>
        <Thead>
          <Th>Key</Th>
          <Th>Value</Th>
          <Th>Environments</Th>
          <Th>Updated</Th>
        </Thead>
        <Tbody>
          {envVars.map((v) => (
            <tr key={v.key}>
              <Td>
                <Mono>{v.key}</Mono>
              </Td>
              <Td className="text-muted-foreground">••••••••••••</Td>
              <Td className="text-muted-foreground">{v.environments}</Td>
              <Td className="text-muted-foreground">{v.updated}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Panel>
  );
}

/* --------------------------------- domains -------------------------------- */

export function Domains() {
  return (
    <Panel
      title="Domains"
      description="Point a CNAME at mcpfy and certificates renew themselves"
      action={
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-lg border px-3 text-[13px] font-medium transition-colors hover:bg-accent"
        >
          Add domain
        </button>
      }
    >
      <Table>
        <Thead>
          <Th>Domain</Th>
          <Th>Type</Th>
          <Th>Status</Th>
          <Th>TLS</Th>
        </Thead>
        <Tbody>
          {domains.map((d) => (
            <tr key={d.domain}>
              <Td>
                <Mono>{d.domain}</Mono>
              </Td>
              <Td className="text-muted-foreground">{d.type}</Td>
              <Td>
                <span className="inline-flex items-center gap-2 text-[13px]">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {d.status}
                </span>
              </Td>
              <Td className="text-muted-foreground">{d.tls}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Panel>
  );
}

/* ----------------------------- publish checks ----------------------------- */

export function PublishChecks() {
  const passed = publishChecks.reduce((n, c) => n + c.passed, 0);
  const total = publishChecks.reduce((n, c) => n + c.total, 0);

  return (
    <>
      <Panel
        title="Publish checks"
        description={`${passed} of ${total} checks passing against ChatGPT Apps Store and Claude Connector requirements`}
      >
        <ul className="divide-y divide-border/60">
          {publishChecks.map((c) => {
            const ok = c.passed === c.total;
            return (
              <li key={c.category} className="flex items-center gap-3.5 px-5 py-4">
                {ok ? (
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="size-4 shrink-0 text-red-500" />
                )}
                <span className="flex-1 text-[14px]">{c.category}</span>
                <span className="text-[13px] tabular-nums text-muted-foreground">
                  {c.passed}/{c.total}
                </span>
                {!ok && (
                  <button
                    type="button"
                    className="text-[13px] font-medium hover:underline"
                  >
                    Autofix
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel title="End-to-end checks" description="Run your server live inside ChatGPT and Claude">
        <div className="px-5 py-6">
          <p className="text-[14px] text-muted-foreground">
            E2E checks verify tool calls and widget rendering in the real host client
            before you submit.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Run E2E checks
          </button>
        </div>
      </Panel>
    </>
  );
}

/* ----------------------------- submission pack ---------------------------- */

export function SubmissionPack({ server }: SectionProps) {
  const assets = [
    { name: "Listing copy", detail: "Short and long description, generated from your tool schemas." },
    { name: "Tool justifications", detail: "One paragraph per tool explaining why it needs its scope." },
    { name: "Reviewer test cases", detail: "Prompts a store reviewer can paste to exercise every tool." },
    { name: "Assets", detail: "Logo, screenshots and a demo GIF at the required sizes." },
  ];

  return (
    <Panel
      title="Submission pack"
      description={`Everything a marketplace reviewer asks for, generated for ${server.name}`}
      action={
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-lg border px-3 text-[13px] font-medium transition-colors hover:bg-accent"
        >
          Regenerate
        </button>
      }
    >
      <ul className="divide-y divide-border/60">
        {assets.map((a) => (
          <li key={a.name} className="flex items-start gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium">{a.name}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{a.detail}</p>
            </div>
            <button
              type="button"
              className="shrink-0 text-[13px] font-medium hover:underline"
            >
              Preview
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ------------------------------- public chat ------------------------------ */

export function PublicChat({ server }: SectionProps) {
  const url = `https://${server.url.replace("/mcp", "")}/chat`;
  return (
    <>
      <Panel title="Public chat" description="An embeddable chat surface backed by this server">
        <div className="space-y-4 px-5 py-6">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3.5 py-2.5">
            <Mono>{url}</Mono>
            <Copy className="ml-auto size-3.5 text-muted-foreground" />
          </div>
          <p className="text-[13px] text-muted-foreground">
            Share the link directly, or drop the embed snippet on any page you already
            have an audience on.
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4 font-mono text-[12px]">
{`<script src="https://embed.mcpfy.ai/chat.js"
        data-server="${server.slug}"></script>`}
          </pre>
        </div>
      </Panel>

      <EmptyState
        title="No conversations yet"
        description="Once someone opens your public chat, their sessions show up here alongside the rest of your traffic."
      />
    </>
  );
}

/* -------------------------------- settings -------------------------------- */

export function Settings({ server }: SectionProps) {
  const rows = [
    { label: "Server name", value: server.name },
    { label: "Repository", value: server.repo },
    { label: "Production branch", value: server.branch },
    { label: "Runtime", value: server.runtime },
    { label: "Region", value: server.region },
  ];

  return (
    <>
      <Panel title="General">
        <dl className="divide-y divide-border/60">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-4 px-5 py-3.5">
              <dt className="w-44 shrink-0 text-[14px] text-muted-foreground">
                {r.label}
              </dt>
              <dd className="flex-1 text-[14px]">
                <Mono>{r.value}</Mono>
              </dd>
              <button
                type="button"
                className="text-[13px] font-medium hover:underline"
              >
                Edit
              </button>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel title="Danger zone" className="border-red-500/30">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-[14px] font-medium">Delete this server</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Removes the deployment, its domains and all retained logs. This cannot
              be undone.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg border border-red-500/40 px-3.5 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
          >
            Delete server
          </button>
        </div>
      </Panel>
    </>
  );
}

/* --------------------------------- testing -------------------------------- */

export function TestSuites() {
  return (
    <Panel
      title="Test suites"
      description="The same checks run across every client and model you target"
      action={
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-lg border px-3 text-[13px] font-medium transition-colors hover:bg-accent"
        >
          New suite
        </button>
      }
    >
      <Table>
        <Thead>
          <Th>Suite</Th>
          <Th>Clients</Th>
          <Th>Models</Th>
          <Th>Result</Th>
          <Th>Last run</Th>
        </Thead>
        <Tbody>
          {testSuites.map((s) => (
            <tr key={s.name}>
              <Td className="font-medium">{s.name}</Td>
              <Td className="text-muted-foreground">{s.clients}</Td>
              <Td className="text-muted-foreground">{s.models}</Td>
              <Td>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 text-[13px]",
                    s.result === "failing" && "text-red-600 dark:text-red-400",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      s.result === "passing" ? "bg-emerald-500" : "bg-red-500",
                    )}
                  />
                  {s.result === "passing" ? "Passing" : "Failing"}
                </span>
              </Td>
              <Td className="text-muted-foreground">{s.ran}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Panel>
  );
}
