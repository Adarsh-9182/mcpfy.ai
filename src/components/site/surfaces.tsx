import { Check, Plus } from "lucide-react";
import { Section, SectionHeading, Tag, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { surfaceGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

/** A client directory row, the way it looks inside the host app. */
const clients = [
  { name: "ChatGPT", desc: "Apps Store · widgets + tools", on: true, hue: "from-[#10a37f] to-[#0d8266]" },
  { name: "Claude", desc: "Connectors · remote MCP", on: true, hue: "from-[#d97757] to-[#b85f43]" },
  { name: "Gemini", desc: "Enterprise agents", on: true, hue: "from-[#4c74ff] to-[#7b96ff]" },
  { name: "Cursor", desc: "Editor tool calls", on: false, hue: "from-[#8b909a] to-[#5f646d]" },
];

function ConnectorPanel() {
  return (
    <div className="card-surface overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-[13.5px] font-medium">Connectors</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            One build, published to every client.
          </p>
        </div>
        <span className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
          All
        </span>
      </div>

      <ul>
        {clients.map((c) => (
          <li
            key={c.name}
            className="flex items-center gap-3 border-b border-border/60 px-4 py-3 last:border-b-0"
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[11px] font-semibold text-white",
                c.hue,
              )}
            >
              {c.name[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">
                {c.name}
              </span>
              <span className="block truncate text-[11.5px] text-muted-foreground">
                {c.desc}
              </span>
            </span>
            <span
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium",
                c.on
                  ? "bg-live/10 text-live"
                  : "border border-border text-muted-foreground",
              )}
            >
              {c.on ? (
                <>
                  <Check className="size-3" /> Connected
                </>
              ) : (
                <>
                  <Plus className="size-3" /> Add
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Surfaces() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-20">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Distribution"
              title="Write it once. Ship it where your users already are."
              lead="The same codebase becomes a ChatGPT app, a Claude connector and a plain MCP endpoint."
              leadDim="No forks, no per-client rewrites, no second deploy pipeline."
            />

            <div className="mt-10 flex flex-col gap-6">
              {surfaceGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[12.5px] font-medium text-subtle-foreground">
                    {group.label}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <ArrowLink href="/docs">Start building</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ConnectorPanel />
        </Reveal>
      </div>
    </Section>
  );
}
