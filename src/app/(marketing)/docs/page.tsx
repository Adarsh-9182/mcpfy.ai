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
        eyebrow="Documentation"
        title={
          <>
            Docs for every part of the pipeline.
          </>
        }
        subtitle={`Everything you need to build, deploy, test and publish with ${site.name}.`}
      />

      <Section className="border-t-0">
        <Reveal>
          <div className="border border-rule bg-card">
            <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
              <span className="slug text-signal">quickstart</span>
              <span className="font-mono text-[10.5px] text-muted-foreground">
                3 commands
              </span>
            </div>

            <div className="px-5 py-7 sm:px-7">
              <h2 className="display text-[30px] md:text-[36px]">
                Ship your first MCP server
              </h2>

              <div className="rule-grid mt-7 grid md:grid-cols-2">
                {[
                  {
                    lang: "TypeScript",
                    lines: [
                      "npx create-mcpfy-app my-server",
                      "cd my-server",
                      "npm run dev",
                    ],
                  },
                  {
                    lang: "Python",
                    lines: [
                      "uvx create-mcpfy-app my-server",
                      "cd my-server",
                      "uv run dev",
                    ],
                  },
                ].map((track) => (
                  <div key={track.lang} className="rule-cell">
                    <p className="slug border-b border-rule px-4 py-2.5">
                      {track.lang}
                    </p>
                    <pre className="bg-ruled overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[2.05]">
                      <code>
                        {track.lines.map((l) => (
                          <span key={l} className="flex gap-2">
                            <span className="text-signal">$</span>
                            {l}
                          </span>
                        ))}
                      </code>
                    </pre>
                  </div>
                ))}
              </div>

              <div className="rule-grid mt-px grid">
                <div className="rule-cell">
                  <p className="slug border-b border-rule px-4 py-2.5">Deploy</p>
                  <pre className="bg-ruled overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[2.05]">
                    <code>
                      <span className="flex gap-2">
                        <span className="text-signal">$</span>
                        {site.cli}
                      </span>
                      <span className="flex gap-2 text-pine">
                        <span>✓</span>
                        Live at https://my-server.{site.domain}/mcp
                      </span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="rule-grid mt-14 grid sm:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 0.08} className="rule-cell">
              <div className="flex h-full flex-col px-5 py-7">
                <div className="flex items-center gap-3">
                  <g.icon className="size-4 text-signal" />
                  <span className="font-mono text-[10.5px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="display mt-4 text-[24px]">{g.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {g.desc}
                </p>
                <ul className="mt-6 border-t border-rule">
                  {g.links.map((l) => (
                    <li key={l} className="border-b border-rule-soft">
                      <Link
                        href="/docs"
                        className="group flex items-center justify-between gap-3 py-2.5 text-[14px] transition-colors hover:text-signal"
                      >
                        {l}
                        <ArrowRight className="size-3.5 text-signal opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
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
