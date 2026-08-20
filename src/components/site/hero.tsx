"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { site } from "@/lib/site";

const AGENT_PROMPT = `Build an MCP server with the ${site.name} SDK. Scaffold it with \`npx create-mcpfy-app\`, add a typed tool, then deploy with \`${site.cli}\`.`;

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
      className="inline-flex items-center gap-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span className="underline decoration-dotted underline-offset-2 hover:decoration-solid">
        {copied ? "Copied to clipboard" : "Copy prompt for agents"}
      </span>
    </button>
  );
}

/** Inline link that reveals a preview card on hover, as in the reference. */
function LovedByDevelopers() {
  return (
    <span className="relative inline-block">
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 mb-4 hidden w-[22rem] -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover/loved:opacity-100 sm:block"
      >
        <span className="block overflow-hidden rounded-lg border bg-card shadow-lg">
          <span className="flex items-center gap-2 border-b px-3 py-2 text-left">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] text-muted-foreground">
              {site.name}/{site.name} · {site.stars} stars
            </span>
          </span>
          <span className="flex items-end gap-1 px-3 py-4">
            {[28, 41, 34, 55, 48, 67, 59, 78, 71, 90].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-foreground/15"
                style={{ height: `${h * 0.6}px` }}
              />
            ))}
          </span>
        </span>
      </span>
      <Link
        href={site.github}
        target="_blank"
        rel="noreferrer"
        className="group/loved underline decoration-dotted underline-offset-2 hover:decoration-solid"
      >
        Loved by developers.
      </Link>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 top-px z-0 bg-hero-wash dark:opacity-60"
      />
      <div className="relative z-10 px-4 py-6 md:px-6 lg:px-12">
        {/* frosted panel floating on the gradient wash */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border bg-background/80 px-4 py-14 text-center backdrop-blur-md md:py-24">
          <Link
            href="/blog"
            className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 dark:bg-orange-900/20"
          >
            <span className="text-xs font-medium text-orange-900 dark:text-orange-200">
              Backed by
            </span>
            <span className="text-xs font-bold tracking-tight text-orange-900 dark:text-orange-200">
              Foundry&nbsp;Labs
            </span>
          </Link>

          <h1 className="max-w-2xl px-4 text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Build and deploy MCP Apps and Servers
          </h1>

          <p className="max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
            The {site.name} SDK is the fullstack MCP framework to develop MCP
            Apps for ChatGPT / Claude &amp; MCP Servers for AI Agents.{" "}
            <LovedByDevelopers />
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ShimmerButton asChild>
              <Link href="/docs">Start deploying</Link>
            </ShimmerButton>
            <Link
              href="/contact"
              // The reference keeps both hero CTAs on fixed surfaces across themes.
              className="inline-flex h-[50px] items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[15px] font-medium text-zinc-900 transition-opacity hover:opacity-90"
            >
              Book a call
            </Link>
          </div>

          <CopyPrompt />
        </div>
      </div>
    </section>
  );
}
