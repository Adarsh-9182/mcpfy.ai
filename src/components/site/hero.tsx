"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { Display, Em, Lede, ArrowLink } from "./section";
import { Slug } from "./frame";
import { GithubIcon } from "./icons";
import { site } from "@/lib/site";

const AGENT_PROMPT = `Build an MCP server with the ${site.name} SDK. Scaffold it with \`npx create-mcpfy-app\`, add a typed tool, then deploy with \`${site.cli}\`.`;

/** The mono line under the CTAs: one click, one prompt, straight to an agent. */
function CopyPrompt() {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_PROMPT);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable in insecure contexts */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 slug text-muted-foreground transition-colors hover:text-signal"
    >
      {copied ? (
        <Check className="size-3.5 text-pine" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span className="border-b border-rule pb-0.5 group-hover:border-signal">
        {copied ? "Prompt copied" : "Copy prompt for agents"}
      </span>
    </button>
  );
}

/**
 * The hero's right column: the whole product compressed into the shell
 * session it replaces. Static output with a live caret on the last line.
 */
function TerminalCard() {
  const lines: { text: string; tone?: "cmd" | "ok" | "dim" | "url" }[] = [
    { text: "npx create-mcpfy-app acme-mcp", tone: "cmd" },
    { text: "scaffolded  tools/  widgets/  mcpfy.config.ts", tone: "dim" },
    { text: "mcpfy dev", tone: "cmd" },
    { text: "inspector ready on :4141 — 6 tools registered", tone: "dim" },
    { text: "mcpfy deploy", tone: "cmd" },
    { text: "build 2.4s · evals 18/18 · checks passed", tone: "ok" },
    { text: "https://acme-mcp.mcpfy.app/mcp", tone: "url" },
  ];

  return (
    <div className="border border-rule bg-card shadow-[var(--drop)]">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">
          ~/acme-mcp
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-pine" />
          <Slug className="text-[10px]">live</Slug>
        </span>
      </div>

      <div className="bg-ruled px-4 py-4 font-mono text-[12.5px] leading-[2.05] md:text-[13px]">
        {lines.map((line, i) => (
          <p key={i} className="flex gap-2 whitespace-nowrap">
            {line.tone === "cmd" ? (
              <>
                <span className="text-signal">$</span>
                <span className="text-foreground">{line.text}</span>
              </>
            ) : line.tone === "ok" ? (
              <>
                <span className="text-pine">✓</span>
                <span className="text-muted-foreground">{line.text}</span>
              </>
            ) : line.tone === "url" ? (
              <>
                <span className="text-muted-foreground">→</span>
                <span className="truncate text-foreground underline decoration-signal decoration-1 underline-offset-4">
                  {line.text}
                </span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground/50">·</span>
                <span className="truncate text-muted-foreground">{line.text}</span>
              </>
            )}
          </p>
        ))}
        <p className="flex gap-2">
          <span className="text-signal">$</span>
          <span aria-hidden className="animate-caret text-foreground">
            ▍
          </span>
        </p>
      </div>
    </div>
  );
}

const facts = [
  { value: site.stars, label: "GitHub stars" },
  { value: "12k+", label: "servers deployed" },
  { value: "38ms", label: "median tool call" },
  { value: "2", label: "SDK languages" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-paper"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen"
      />

      <div className="container-page relative">
        {/* running head */}
        <div className="flex items-center gap-4 border-b border-rule py-4">
          <Slug className="text-signal">00 / the platform</Slug>
          <span aria-hidden className="h-px flex-1 bg-rule" />
          <Link
            href="/blog"
            className="slug text-muted-foreground transition-colors hover:text-foreground"
          >
            backed by Foundry&nbsp;Labs
          </Link>
        </div>

        <div className="grid gap-14 py-16 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div>
            <Display as="h1" size="xl" className="max-w-[15ch]">
              Build MCP servers that <Em>actually</Em> reach users.
            </Display>

            <div className="mt-9 flex items-center gap-4">
              <Slug className="shrink-0 text-foreground">
                the fullstack MCP framework
              </Slug>
              <span aria-hidden className="h-px flex-1 bg-rule-strong/30" />
            </div>

            <Lede className="mt-7">
              One SDK for MCP Apps in ChatGPT and Claude, and MCP Servers for
              your agents. One cloud to deploy, test, observe and publish them —
              from first commit to the app store.
            </Lede>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/signup"
                className="group inline-flex h-12 items-center gap-3 bg-foreground px-7 text-[14px] font-medium tracking-tight text-background transition-colors hover:bg-signal"
              >
                Start deploying
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <ArrowLink href="/contact" tone="muted">
                Book a call
              </ArrowLink>
              <CopyPrompt />
            </div>
          </div>

          <div className="lg:pl-4">
            <TerminalCard />
            <Link
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group mt-4 flex items-center gap-2.5 slug text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              <span>open source · {site.stars} stars</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* fact strip closing the hero */}
        <dl className="grid grid-cols-2 border-t border-rule md:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={
                "px-1 py-6 md:py-8" +
                (i > 0 ? " md:border-l md:border-rule md:pl-6" : "") +
                (i % 2 === 1 ? " border-l border-rule pl-6 md:pl-6" : "")
              }
            >
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="display block text-[30px] tabular-nums md:text-[38px]">
                  {f.value}
                </span>
                <Slug className="mt-2 block">{f.label}</Slug>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
