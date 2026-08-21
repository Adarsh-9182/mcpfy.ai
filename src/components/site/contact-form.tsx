"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slug } from "./frame";

/* Underlined fields, not boxes — the form reads like a printed slip. */
const field =
  "h-11 w-full border-b border-rule bg-transparent px-0 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-signal";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}>
        <Slug>{label}</Slug>
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  // Demo site: there is no backend, so the submit is handled entirely client-side.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-rule bg-card">
        <div className="flex items-center gap-2.5 border-b border-rule px-5 py-2.5">
          <span className="size-1.5 bg-pine" />
          <Slug className="text-pine">received</Slug>
        </div>
        <div className="px-5 py-12 text-center">
          <p className="display text-[28px]">Thanks — message received.</p>
          <p className="mx-auto mt-3 max-w-[42ch] text-[14.5px] leading-relaxed text-muted-foreground">
            This is a demo site, so nothing was actually sent. On a real
            deployment this would reach the team inbox.
          </p>
          <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-rule bg-card">
      <div className="flex items-center justify-between border-b border-rule px-5 py-2.5">
        <Slug className="text-signal">new enquiry</Slug>
        <span className="font-mono text-[10.5px] text-muted-foreground">
          4 fields
        </span>
      </div>

      <div className="flex flex-col gap-7 px-5 py-7 sm:px-7">
        <div className="grid gap-7 sm:grid-cols-2">
          <Field id="name" label="01 — name">
            <input
              id="name"
              name="name"
              required
              className={field}
              placeholder="Ada Lovelace"
            />
          </Field>
          <Field id="email" label="02 — work email">
            <input
              id="email"
              name="email"
              type="email"
              required
              className={field}
              placeholder="ada@example.com"
            />
          </Field>
        </div>

        <Field id="company" label="03 — company">
          <input
            id="company"
            name="company"
            className={field}
            placeholder="Acme Inc."
          />
        </Field>

        <Field id="message" label="04 — what are you building?">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full resize-y border-b border-rule bg-transparent px-0 py-2 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-signal"
            placeholder="We're building an MCP server for…"
          />
        </Field>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          <Button type="submit" size="lg">
            Send message
          </Button>
          <Slug className="max-w-[34ch] normal-case tracking-normal">
            Demo form — submissions are handled in the browser and never sent
            anywhere.
          </Slug>
        </div>
      </div>
    </form>
  );
}
