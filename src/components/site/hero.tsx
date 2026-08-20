"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const AGENT_PROMPT = `Build an MCP server with the ${site.name} SDK. Scaffold it with \`npx create-mcpfy-app\`, add a typed tool, then deploy with \`${site.cli}\`.`;

const avatars = ["#f97316", "#6366f1", "#10b981", "#e11d48", "#8b5cf6"];

function CopyPromptButton() {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending reset if the component unmounts mid-timeout.
  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_PROMPT);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (insecure context) — fail quietly */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy prompt for agents"}
    </button>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--foreground)_9%,transparent),transparent)] blur-2xl" />
      </div>

      <div className="container-page flex flex-col items-center pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
        <motion.div {...rise(0)}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <Sparkles className="size-3.5" />
            Introducing Cloud Inspector
            <ArrowRight className="size-3" />
          </Link>
        </motion.div>

        <motion.h1
          {...rise(0.06)}
          className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
        >
          Build and deploy{" "}
          <span className="font-serif italic font-normal">MCP Apps</span> and Servers
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-6 max-w-2xl text-balance-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          The {site.name} SDK is the fullstack MCP framework to develop MCP Apps
          for ChatGPT &amp; Claude, and MCP Servers for AI agents.
        </motion.p>

        <motion.div
          {...rise(0.18)}
          className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            {avatars.map((c, i) => (
              <span
                key={i}
                className="size-6 rounded-full border-2 border-background"
                style={{ background: c }}
                aria-hidden
              />
            ))}
          </div>
          Loved by developers.
        </motion.div>

        <motion.div
          {...rise(0.24)}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/docs">
              Start deploying <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/contact">Book a call</Link>
          </Button>
          <CopyPromptButton />
        </motion.div>

        {/* terminal */}
        <motion.div {...rise(0.32)} className="mt-16 w-full max-w-3xl">
          <div className="overflow-hidden rounded-xl border bg-card/70 text-left shadow-[var(--drop)] backdrop-blur">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                {site.domain} — zsh
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-muted-foreground">$ </span>
                npx create-mcpfy-app my-server{"\n"}
                <span className="text-muted-foreground">
                  ✔ Scaffolding MCP server…{"\n"}
                </span>
                <span className="text-muted-foreground">$ </span>
                {site.cli}
                {"\n"}
                <span className="text-emerald-500">
                  ✔ Deployed in 41s → https://my-server.{site.domain}/mcp
                </span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
