"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section";
import { faq } from "@/lib/content";
import { site } from "@/lib/site";

export function Faq() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <SectionHeading
            title={
              <>
                Frequently asked{" "}
                <span className="font-serif italic font-normal">questions</span>
              </>
            }
            subtitle={`Everything you need to build, deploy, test, and publish with ${site.name}.`}
          />
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
    </section>
  );
}
