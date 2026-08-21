"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { faq } from "@/lib/content";

export function Faq() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title="Answers before you ask"
              lead="Everything about building, deploying, testing and publishing."
            />
            <div className="mt-6">
              <ArrowLink href="/contact">Still stuck? Talk to us</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full border-t border-border">
            {faq.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
