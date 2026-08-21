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
        eyebrow="Blog"
        title={
          <>
            Notes from the build.
          </>
        }
        subtitle="Product updates, engineering notes, and guides for building on MCP."
      />

      <Section className="border-t-0">
        <ol className="border-t border-rule-strong/25">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.05}>
              <li className="border-b border-rule">
                <Link
                  href="/blog"
                  className="group grid gap-3 py-8 md:grid-cols-[4rem_minmax(0,1fr)_10rem] md:gap-8"
                >
                  <span className="font-mono text-[10.5px] text-muted-foreground transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="display block text-[26px] leading-tight transition-colors group-hover:text-signal md:text-[30px]">
                      {p.title}
                    </span>
                    <span className="mt-3 block max-w-[68ch] text-[14.5px] leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </span>
                  </span>

                  <span className="flex flex-wrap items-start gap-x-3 gap-y-1.5 md:flex-col md:items-end md:text-right">
                    <span className="slug text-signal">{p.tag}</span>
                    <time dateTime={p.date} className="slug">
                      {formatter.format(new Date(`${p.date}T00:00:00Z`))}
                    </time>
                    <span className="slug">{p.read}</span>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
