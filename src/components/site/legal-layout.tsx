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
      <PageHero title={title} subtitle={`Last updated ${updated}`} />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            <div className="rounded-xl border bg-card/40 p-5 text-[13px]">
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
