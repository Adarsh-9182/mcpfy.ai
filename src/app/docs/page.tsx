import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Cloud, Terminal, Wrench } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: `Guides, API reference and quickstarts for the ${site.name} SDK and Cloud.`,
};

const groups = [
  {
    icon: Terminal,
    title: `${site.name} SDK`,
    desc: "Build MCP servers and apps in TypeScript or Python.",
    links: ["Quickstart", "Defining tools", "Resources & prompts", "React views", "Testing locally"],
  },
  {
    icon: Cloud,
    title: `${site.name} Cloud`,
    desc: "Deploy, observe and scale your servers.",
    links: ["Deploy from GitHub", "CLI reference", "Preview environments", "Custom domains", "Analytics"],
  },
  {
    icon: Wrench,
    title: "Inspector",
    desc: "Debug MCP traffic against real clients.",
    links: ["Running the Inspector", "Tool testing", "JSON-RPC logs", "Widget preview", "Self-hosting"],
  },
  {
    icon: BookOpen,
    title: "Publishing",
    desc: "Get into the ChatGPT Apps Store and Claude Connectors.",
    links: ["Publishing checks", "Submission pack", "End-to-end checks", "Auth providers", "Policy guide"],
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        title={
          <>
            <span className="font-serif italic font-normal">Documentation</span>
          </>
        }
        subtitle={`Everything you need to build, deploy, test and publish with ${site.name}.`}
      />

      <Section className="border-t-0">
        <Reveal>
          <div className="rounded-xl border bg-card/40 p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Quickstart
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Ship your first MCP server
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg border bg-background/60">
                <p className="border-b px-4 py-2 font-mono text-[11px] text-muted-foreground">
                  TypeScript
                </p>
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
                  <code>
                    npx create-mcpfy-app my-server{"\n"}
                    cd my-server{"\n"}
                    npm run dev
                  </code>
                </pre>
              </div>
              <div className="overflow-hidden rounded-lg border bg-background/60">
                <p className="border-b px-4 py-2 font-mono text-[11px] text-muted-foreground">
                  Python
                </p>
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
                  <code>
                    uvx create-mcpfy-app my-server{"\n"}
                    cd my-server{"\n"}
                    uv run dev
                  </code>
                </pre>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border bg-background/60">
              <p className="border-b px-4 py-2 font-mono text-[11px] text-muted-foreground">
                Deploy
              </p>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
                <code>
                  {site.cli}
                  {"\n"}
                  <span className="text-emerald-500">
                    ✔ Live at https://my-server.{site.domain}/mcp
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 0.08}>
              <div className="flex h-full flex-col rounded-xl border bg-card/40 p-6">
                <span className="grid size-9 place-items-center rounded-lg border bg-background">
                  <g.icon className="size-4" />
                </span>
                <p className="mt-4 text-base font-medium">{g.title}</p>
                <p className="mt-1.5 text-[13px] text-muted-foreground">
                  {g.desc}
                </p>
                <ul className="mt-5 space-y-1 border-t pt-4">
                  {g.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="/docs"
                        className="group flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {l}
                        <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
