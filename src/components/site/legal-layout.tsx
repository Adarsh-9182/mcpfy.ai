import * as React from "react";
import { PageHero } from "./page-hero";

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
      <PageHero eyebrow="Legal" title={title} subtitle={`Last updated ${updated}`} />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-[70ch] space-y-8 text-[15px] leading-[1.75] text-muted-foreground [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            <div className="card-surface rounded-xl p-5 text-[13.5px]">
              This is a demonstration project. The text below is placeholder
              content and is not legal advice or an enforceable agreement.
            </div>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
