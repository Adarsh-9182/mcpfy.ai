import Link from "next/link";
import { FileCode2, Link2, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import { PageHeader } from "@/components/dashboard/ui";

export const metadata = { title: "New server" };

const options: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta: string;
}[] = [
  {
    icon: GithubIcon,
    title: "Import a Git repository",
    desc: "Connect the mcpfy GitHub App once. Every push to the default branch deploys, and every pull request gets a preview URL.",
    cta: "Connect GitHub",
  },
  {
    icon: FileCode2,
    title: "Start from a template",
    desc: "Deploy-ready starters for mcp-use, the MCP TypeScript and Python SDKs, FastMCP and a plain Dockerfile.",
    cta: "Browse templates",
  },
  {
    icon: Sparkles,
    title: "Vibecode it",
    desc: "Describe what the server should do and watch the tools, schemas and widgets scaffold in front of you.",
    cta: "Start vibecoding",
  },
  {
    icon: Link2,
    title: "Connect an existing server",
    desc: "Already hosting elsewhere? Point mcpfy at a URL and use testing, analytics and publish checks without moving.",
    cta: "Connect by URL",
  },
];

export default function NewServerPage() {
  return (
    <>
      <PageHeader
        title="Create a new server"
        description="Four ways to get an MCP server running on mcpfy Cloud."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((o) => (
          <div key={o.title} className="rounded-xl border bg-card/40 p-6">
            <o.icon className="size-5 text-muted-foreground" />
            <h2 className="mt-4 text-[15px] font-medium">{o.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {o.desc}
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-9 items-center rounded-lg border px-3.5 text-[14px] font-medium transition-colors hover:bg-accent"
            >
              {o.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="text-[13px] text-muted-foreground">
        Prefer the terminal?{" "}
        <Link href="/docs" className="underline underline-offset-2">
          npx mcpfy deploy
        </Link>{" "}
        works from any directory with an MCP server in it.
      </p>
    </>
  );
}
