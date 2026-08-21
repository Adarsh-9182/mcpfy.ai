"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { ProductShot } from "./product-shot";
import { ScrollScene } from "./scroll-scene";
import { GithubIcon } from "./icons";
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
      className="inline-flex items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? (
        <Check className="size-3.5 text-live" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? "Copied to clipboard" : "Copy prompt for agents"}
    </button>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* glow behind the product shot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] hero-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-dots opacity-[0.5] mask-radial"
      />

      <div className="container-page relative pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/blog"
            className="group glass edge-lit inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[13px] transition-colors duration-[var(--d-2)] hover:border-line-strong"
          >
            <span className="rounded-full bg-n3 px-2 py-0.5 text-[11.5px] font-medium text-t-hi">
              New
            </span>
            <span className="text-muted-foreground">
              Cloud Inspector is out of beta
            </span>
            <span
              aria-hidden
              className="text-subtle-foreground transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>

          <h1 className="mt-7 text-[40px] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[54px] md:text-[64px]">
            Build and deploy MCP
            <br className="hidden sm:block" /> servers and apps
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] text-muted-foreground">
            <span className="text-foreground">
              One SDK, one cloud, every client.
            </span>{" "}
            Ship to ChatGPT and Claude, run for your own agents, and see every
            tool call in production.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-[var(--r-1)] bg-t-hi px-5 text-[14.5px] font-medium text-canvas transition-opacity duration-[var(--d-2)] hover:opacity-90"
            >
              Start deploying
            </Link>
            <Link
              href="/contact"
              className="surface edge-lit inline-flex h-11 items-center justify-center rounded-[var(--r-1)] px-5 text-[14.5px] font-medium transition-colors duration-[var(--d-2)] hover:border-line-strong hover:bg-n2"
            >
              Book a call
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <CopyPrompt />
            <span aria-hidden className="hidden h-3 w-px bg-border sm:block" />
            <Link
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              {site.stars} stars
            </Link>
          </div>
        </div>

        {/* the product itself, cropped by the fold so it reads as a real app */}
        <div className="relative mt-14 md:mt-16">
          <ScrollScene intensity={1.5}>
            <ProductShot className="mx-auto max-w-[1120px]" />
          </ScrollScene>
        </div>
      </div>
    </section>
  );
}
