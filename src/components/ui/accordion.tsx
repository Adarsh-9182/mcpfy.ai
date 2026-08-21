"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-rule", className)}
      {...props}
    />
  );
}

/**
 * The trigger is a ruled row with an optional mono index in the margin. The
 * open state is marked by a signal `−`, matching the site's other affordances.
 */
function AccordionTrigger({
  className,
  children,
  index,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  index?: string;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-start gap-4 py-5 text-left transition-colors hover:text-signal data-[state=open]:text-foreground",
          className,
        )}
        {...props}
      >
        {index && (
          <span className="mt-1 shrink-0 font-mono text-[10.5px] text-muted-foreground transition-colors group-hover:text-signal group-data-[state=open]:text-signal">
            {index}
          </span>
        )}
        <span className="flex-1 text-[16px] font-medium tracking-tight md:text-[17px]">
          {children}
        </span>
        <span
          aria-hidden
          className="mt-0.5 shrink-0 font-mono text-[15px] leading-none text-muted-foreground transition-colors group-data-[state=open]:text-signal"
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[acc-up_220ms_ease] data-[state=open]:animate-[acc-down_260ms_ease]"
      {...props}
    >
      <div
        className={cn(
          "pb-6 pl-0 pr-8 text-[15px] leading-relaxed text-muted-foreground sm:pl-[2.1rem]",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
