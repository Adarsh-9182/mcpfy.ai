import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Slug } from "@/components/site/frame";
import { site } from "@/lib/site";
import { LoginForm } from "./login-form";

/**
 * The signed-out screen. Both /cloud and /signup render it: an ink column
 * stating what the platform is, and a paper column holding the form.
 */
const platformFeatures = [
  "Hosting",
  "Evaluations",
  "Publishing checks",
  "Submission pack",
  "Cloud Inspector",
  "Public chat",
  "Analytics",
];

export function AuthScreen() {
  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b border-rule px-5 py-4 lg:px-8">
        <Logo />
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 slug text-muted-foreground transition-colors hover:text-signal"
        >
          <span className="border-b border-current pb-0.5">Book a call</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </header>

      <main className="grid flex-1 lg:grid-cols-2 lg:overflow-hidden">
        {/* the pitch, set on ink */}
        <section className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-rule bg-foreground px-10 py-12 text-background lg:flex xl:px-14">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06] mix-blend-screen"
          />

          <div className="relative flex items-center gap-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] opacity-60">
              the platform
            </span>
            <span aria-hidden className="h-px flex-1 bg-background/20" />
          </div>

          <div className="relative">
            <h2 className="display max-w-[13ch] text-[46px] xl:text-[56px]">
              All of MCP, on one pipeline.
            </h2>
            <p className="mt-7 max-w-[44ch] text-[16px] leading-relaxed opacity-70">
              {site.name} is the complete platform to build, deploy and
              distribute MCP servers, Claude connectors and ChatGPT apps.
            </p>
          </div>

          <ul className="relative grid grid-cols-2 gap-px bg-background/20">
            {platformFeatures.map((feature, i) => (
              <li
                key={feature}
                className="flex items-baseline gap-2.5 bg-foreground px-4 py-3.5"
              >
                <span className="font-mono text-[10px] opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px]">{feature}</span>
              </li>
            ))}
            <li aria-hidden className="bg-foreground bg-hatch px-4 py-3.5" />
          </ul>
        </section>

        {/* the form, set on paper */}
        <section className="relative isolate flex items-center justify-center overflow-y-auto px-5 py-14 sm:px-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-paper"
          />
          <div className="relative w-full max-w-sm">
            <Suspense fallback={<div className="h-[460px]" />}>
              <LoginForm />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="hidden shrink-0 items-center gap-4 border-t border-rule px-8 py-3 lg:flex">
        <Slug>{site.domain}</Slug>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <Slug>demo project · not a real service</Slug>
      </footer>
    </div>
  );
}
