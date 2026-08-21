import * as React from "react";
import { PageHero } from "./page-hero";
import { Slug } from "./frame";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="legal"
        meta={`last updated ${updated}`}
        title={title}
      />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-[68ch] space-y-9 text-[15.5px] leading-[1.75] text-muted-foreground [&_h2]:display [&_h2]:text-[24px] [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_li]:border-b [&_li]:border-rule [&_li]:pb-2">
            <div className="border-l-2 border-signal bg-signal-soft/40 px-5 py-4">
              <Slug className="text-signal">notice</Slug>
              <p className="mt-2 text-[14px] leading-relaxed">
                This is a demonstration project. The text below is placeholder
                content and is not legal advice or an enforceable agreement.
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
