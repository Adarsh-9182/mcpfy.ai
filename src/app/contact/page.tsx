import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a call with the ${site.name} team.`,
};

const points = [
  "A walkthrough of deploys, previews and analytics on your own repo.",
  "Guidance on marketplace submission and publishing checks.",
  "Volume pricing, SSO, and procurement for larger teams.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Book a <span className="font-serif italic font-normal">call</span>
          </>
        }
        subtitle="Tell us what you are building and we will get back to you within one business day."
      />

      <Section className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              What we will cover
            </h2>
            <ul className="mt-6 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
