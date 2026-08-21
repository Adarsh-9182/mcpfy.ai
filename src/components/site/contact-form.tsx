"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const field =
  "h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-[14px] outline-none transition-colors placeholder:text-subtle-foreground focus:border-line-strong";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  // Demo site: there is no backend, so the submit is handled entirely client-side.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card-surface flex flex-col items-center rounded-xl p-10 text-center">
        <span className="grid size-10 place-items-center rounded-full bg-live/12 text-live">
          <Check className="size-5" />
        </span>
        <p className="mt-4 text-[16px] font-medium">Thanks — message received</p>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted-foreground">
          This is a demo site, so nothing was actually sent. On a real
          deployment this would reach the team inbox.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-surface flex flex-col gap-5 rounded-xl p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[13px] font-medium">
            Name
          </label>
          <input id="name" name="name" required className={field} placeholder="Ada Lovelace" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[13px] font-medium">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="ada@example.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-[13px] font-medium">
          Company
        </label>
        <input id="company" name="company" className={field} placeholder="Acme Inc." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[13px] font-medium">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-border bg-background/50 p-3 text-[14px] leading-relaxed outline-none transition-colors placeholder:text-subtle-foreground focus:border-line-strong"
          placeholder="We're building an MCP server for…"
        />
      </div>

      <Button type="submit" size="lg" className="mt-1">
        Send message
      </Button>
      <p className="text-[12.5px] text-subtle-foreground">
        Demo form — submissions are handled in the browser and never sent
        anywhere.
      </p>
    </form>
  );
}
