"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Section, SectionHeading, Title } from "./section";
import { Reveal } from "./reveal";
import { ScrollScene } from "./scroll-scene";
import { quickstart, alternatives } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Highlights the leading binary and any flags so a command reads as code. */
function Command({ cmd }: { cmd: string }) {
  const [bin, ...rest] = cmd.split(" ");
  return (
    <>
      <span className="tok-fn">{bin}</span>
      {rest.map((word, i) => (
        <span key={i} className={word.startsWith("-") ? "tok-num" : "text-foreground"}>
          {" "}
          {word}
        </span>
      ))}
    </>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <button
      type="button"
      aria-label="Copy command"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable in insecure contexts */
        }
      }}
      className="rounded-md p-1.5 text-subtle-foreground opacity-0 transition-all hover:bg-surface-3 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
    >
      {copied ? (
        <Check className="size-3.5 text-live" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}

export function Quickstart() {
  const [lang, setLang] = React.useState(0);
  const track = quickstart[lang];

  return (
    <Section className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Quick start"
            title="Three commands to a public MCP URL"
            lead="Scaffold a server, run it against a real client, and ship it."
            leadDim="Nothing else to install, in either language."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ScrollScene intensity={0.7}>
          <div className="surface-2 edge-lit overflow-hidden rounded-[var(--r-2)]">
            <div className="flex items-center gap-1 border-b border-border bg-surface-2/60 px-2 py-1.5">
              {quickstart.map((t, i) => (
                <button
                  key={t.lang}
                  type="button"
                  onClick={() => setLang(i)}
                  aria-pressed={lang === i}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-[12.5px] font-medium transition-colors",
                    lang === i
                      ? "bg-surface-3 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.lang}
                </button>
              ))}
              <span className="ml-auto pr-1 font-mono text-[11px] text-subtle-foreground">
                {track.steps.length} steps
              </span>
            </div>

            <ol className="divide-y divide-border/60">
              {track.steps.map((step, i) => (
                <li key={step.cmd} className="group px-4 py-3.5">
                  <p className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span className="font-mono text-subtle-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.label}
                  </p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
                    <span className="shrink-0 select-none text-live">➜</span>
                    <code className="code min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
                      <Command cmd={step.cmd} />
                    </code>
                    <CopyButton text={step.cmd} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          </ScrollScene>
        </Reveal>
      </div>
    </Section>
  );
}

/** The case for the SDK, grouped by what you are actually doing. */
export function Alternatives() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Why us"
          title={`Why teams pick ${site.name}`}
          className="mx-auto max-w-2xl"
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {alternatives.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.08}>
            <div className="card-surface h-full rounded-xl p-6">
              <Title size="sm">{group.name}</Title>
              <ul className="mt-5 flex flex-col gap-3.5">
                {group.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-t-mid" />
                    <span className="text-[14px] leading-relaxed text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
