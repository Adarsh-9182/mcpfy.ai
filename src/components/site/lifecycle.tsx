"use client";

import * as React from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { lifecycle } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Lifecycle() {
  const [value, setValue] = React.useState(lifecycle[0].id);
  const reduce = useReducedMotion();
  const active = lifecycle.find((s) => s.id === value) ?? lifecycle[0];

  return (
    <section className="border-t py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            className="mx-auto"
            title={
              <>
                From first commit to{" "}
                <span className="font-serif italic font-normal">production</span>.
              </>
            }
            subtitle="Every step of the MCP lifecycle. No extra tools."
          />
        </Reveal>

        <Tabs.Root value={value} onValueChange={setValue} className="mt-12">
          <Tabs.List
            aria-label="MCP lifecycle stages"
            className="mx-auto flex w-full max-w-2xl items-center justify-center gap-1 overflow-x-auto rounded-xl border bg-card/40 p-1"
          >
            {lifecycle.map((stage) => (
              <Tabs.Trigger
                key={stage.id}
                value={stage.id}
                className={cn(
                  "relative flex-1 whitespace-nowrap rounded-lg px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  "data-[state=active]:text-foreground",
                )}
              >
                {value === stage.id && !reduce && (
                  <motion.span
                    layoutId="lifecycle-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {value === stage.id && reduce && (
                  <span className="absolute inset-0 -z-10 rounded-lg bg-accent" />
                )}
                {stage.kicker}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="relative mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="mx-auto max-w-3xl text-center">
                  <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-balance-pretty leading-relaxed text-muted-foreground">
                    {active.body}
                  </p>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {active.cards.map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * i }}
                      className="group flex h-full flex-col rounded-xl border bg-card/40 p-6 transition-colors hover:bg-card"
                    >
                      <div className="mb-5 h-24 rounded-lg border bg-background/60 bg-grid" />
                      <p className="text-sm font-medium">{card.title}</p>
                      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                        {card.desc}
                      </p>
                      {card.cta && (
                        <Link
                          href="/docs"
                          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground transition-opacity hover:opacity-70"
                        >
                          {card.cta}
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs.Root>
      </div>
    </section>
  );
}
