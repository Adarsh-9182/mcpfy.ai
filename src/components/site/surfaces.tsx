import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { surfaceGroups } from "@/lib/content";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-3.5 py-1.5 text-[14px] transition-colors hover:bg-accent">
      {children}
    </span>
  );
}

/** Overlapping app-directory mock that sits in the right column. */
function SurfacesVisual() {
  const connectors = [
    { name: "Notion", desc: "Search, update and power workflows", on: true },
    { name: "Slack", desc: "Send messages and fetch channel data", on: true },
    { name: "Figma", desc: "Generate diagrams from Figma context", on: false },
    { name: "Canva", desc: "Search, create and edit designs", on: false },
  ];

  return (
    <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-xl border bg-[linear-gradient(150deg,#eef2ff_0%,#f7fbe8_55%,#ececec_100%)] dark:bg-[linear-gradient(150deg,#1b1b20_0%,#16171a_55%,#121214_100%)]">
      {/* connectors card */}
      <div className="absolute left-[14%] top-[6%] w-[88%] rounded-lg border bg-card p-4 shadow-lg">
        <p className="text-[15px] font-semibold">Connectors</p>
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          Unlock more when you connect remote and local tools.
        </p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-md border px-2 py-0.5 text-[10px] text-muted-foreground">
            Featured
          </span>
          <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium">
            All
          </span>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-1.5">
          {connectors.map((c) => (
            <li
              key={c.name}
              className="flex items-start gap-2 rounded-md border bg-background p-2"
            >
              <span className="mt-0.5 size-4 shrink-0 rounded bg-foreground/10" />
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-medium">
                  {c.name}
                </span>
                <span className="block truncate text-[9px] text-muted-foreground">
                  {c.desc}
                </span>
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground">
                {c.on ? "✓" : "+"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* apps card overlapping below */}
      <div className="absolute left-[6%] top-[52%] w-[92%] rounded-lg border bg-card p-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold">
            Apps{" "}
            <span className="rounded bg-accent px-1 py-px text-[8px] align-middle">
              BETA
            </span>
          </span>
          <span className="rounded-md border px-2 py-0.5 text-[9px] text-muted-foreground">
            Search apps
          </span>
        </div>
        <div className="mt-2 h-20 rounded-md bg-[linear-gradient(120deg,#3b82f6,#60a5fa_60%,#93c5fd)] p-2">
          <span className="text-[10px] font-medium text-white">
            Edit with your tools
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {["Photoshop", "Airtable", "AllTrails", "Apple Music"].map((a) => (
            <span
              key={a}
              className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1"
            >
              <span className="size-3 rounded bg-foreground/10" />
              <span className="truncate text-[9px]">{a}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Surfaces() {
  return (
    <FrameSection>
      <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <h2 className="max-w-xl text-3xl font-medium tracking-tight md:text-4xl lg:text-[44px] lg:leading-[1.08]">
              Your fastest path to the ChatGPT Apps Store and Claude Connectors.
            </h2>
            <p className="mt-5 max-w-lg text-base text-muted-foreground">
              One codebase. Every surface where users and agents already work.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {surfaceGroups.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {group.label}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/docs"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
            >
              Start building <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SurfacesVisual />
        </Reveal>
      </div>
    </FrameSection>
  );
}
