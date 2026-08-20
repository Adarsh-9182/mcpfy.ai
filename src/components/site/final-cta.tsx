import Link from "next/link";
import { ArrowRight, GitBranch, LayoutTemplate, Wand2 } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const paths = [
  {
    icon: GitBranch,
    title: "From a Git repository",
    desc: "Already have an MCP server on GitHub? Deploy it with one click.",
    cta: "Connect GitHub",
    href: "/docs",
  },
  {
    icon: Wand2,
    title: "Vibecode your MCP App",
    desc: "Describe what you want. Watch your MCP server and widgets scaffold in front of you.",
    cta: "Start vibecoding",
    href: "/docs",
  },
  {
    icon: LayoutTemplate,
    title: "From a template",
    desc: "Pick one of our templates and start from a known-good scaffold.",
    cta: "Browse templates",
    href: "/templates",
  },
];

export function FinalCta() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          align="center"
          className="mx-auto"
          title={
            <>
              Begin your MCP journey the{" "}
              <span className="font-serif italic font-normal">fastest</span> way
            </>
          }
        />
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {paths.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <Link
              href={p.href}
              className="group flex h-full flex-col rounded-xl border bg-card/40 p-6 transition-colors hover:bg-card"
            >
              <span className="grid size-9 place-items-center rounded-lg border bg-background">
                <p.icon className="size-4" />
              </span>
              <p className="mt-5 text-base font-medium">{p.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium">
                {p.cta}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
