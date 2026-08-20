"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { faq } from "@/lib/content";
import { site } from "@/lib/site";

export function Faq() {
  return (
    <FrameSection>
      <div className="grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-sm text-base text-muted-foreground">
              Everything you need to build, deploy, test, and publish with{" "}
              {site.name}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full border-t">
            {faq.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </FrameSection>
  );
}
