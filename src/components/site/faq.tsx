"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Band } from "./frame";
import { Display, Em, Lede, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { faq } from "@/lib/content";

export function Faq() {
  return (
    <Band index="09" label="questions">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <Display size="md" className="max-w-[12ch]">
              Answers, before you <Em>ask</Em>.
            </Display>
            <Lede className="mt-6 max-w-[34ch]">
              Everything about building, deploying, testing and publishing.
            </Lede>
            <div className="mt-8">
              <ArrowLink href="/contact" tone="signal">
                Still stuck? Talk to us
              </ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-rule-strong/25"
          >
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger index={String(i + 1).padStart(2, "0")}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Band>
  );
}
