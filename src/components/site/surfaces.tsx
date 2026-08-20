import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { surfaceGroups } from "@/lib/content";

export function Surfaces() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          align="center"
          className="mx-auto"
          title={
            <>
              Your fastest path to the{" "}
              <span className="font-serif italic font-normal">ChatGPT Apps Store</span>{" "}
              and Claude Connectors.
            </>
          }
          subtitle="One codebase. Every surface where users and agents already work."
        />
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {surfaceGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.08}>
            <div className="h-full rounded-xl border bg-card/40 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {group.label}
              </p>
              <ul className="mt-5 space-y-1">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                  >
                    <span
                      aria-hidden
                      className="grid size-7 shrink-0 place-items-center rounded-md border bg-background text-[11px] font-semibold text-muted-foreground"
                    >
                      {item.slice(0, 2).toUpperCase()}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/docs">
              Start building <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
