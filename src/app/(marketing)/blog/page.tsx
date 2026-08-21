import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Product updates, engineering notes and MCP guides from the ${site.name} team.`,
};

const posts = [
  {
    title: "Introducing Cloud Inspector",
    excerpt:
      "Debug a deployed MCP server from any browser: fire tool calls, read JSON-RPC frames, and swap the model behind the conversation without touching your local setup.",
    date: "2026-08-12",
    tag: "Product",
    read: "6 min",
  },
  {
    title: "What we learned shipping 500 MCP servers",
    excerpt:
      "Cold starts, schema drift, and the three failure modes that account for most production incidents on MCP endpoints.",
    date: "2026-07-29",
    tag: "Engineering",
    read: "11 min",
  },
  {
    title: "Publishing checks, explained",
    excerpt:
      "The six categories every marketplace submission is graded on, why apps get rejected, and how to pass on the first try.",
    date: "2026-07-14",
    tag: "Guides",
    read: "8 min",
  },
  {
    title: "Typed tools are the whole point",
    excerpt:
      "A tool schema is a contract with a model. Loose schemas produce loose behaviour — here is how we think about designing them.",
    date: "2026-06-30",
    tag: "Engineering",
    read: "7 min",
  },
  {
    title: "Preview deployments for MCP",
    excerpt:
      "Every branch gets a live MCP URL, so a reviewer can point a real client at the change before it merges.",
    date: "2026-06-18",
    tag: "Product",
    read: "5 min",
  },
  {
    title: "Evals that actually gate your CI",
    excerpt:
      "Model-judged pass/fail per client and per model, wired into pull requests so a regression in one client blocks the merge.",
    date: "2026-06-02",
    tag: "Guides",
    read: "9 min",
  },
];

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        title={
          <>
            The <span className="font-serif italic font-normal">blog</span>
          </>
        }
        subtitle="Product updates, engineering notes, and guides for building on MCP."
      />

      <Section className="border-t-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <Link
                href="/blog"
                className="group flex h-full flex-col rounded-xl border bg-card/40 p-6 transition-colors hover:bg-card"
              >
                <div className="mb-5 h-32 rounded-lg border bg-background/60 bg-grid" />
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                    {p.tag}
                  </span>
                  <time dateTime={p.date}>
                    {formatter.format(new Date(`${p.date}T00:00:00Z`))}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{p.read}</span>
                </div>
                <h2 className="mt-3 text-base font-medium leading-snug transition-opacity group-hover:opacity-80">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
