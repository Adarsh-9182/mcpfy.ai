import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { site } from "@/lib/site";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in or sign up",
  description: `Log in to ${site.name} Cloud to deploy, test, observe and publish your MCP servers.`,
  robots: { index: false, follow: false },
};

const platformFeatures = [
  "Hosting",
  "Evaluations",
  "Publishing checks",
  "Submission pack",
  "Cloud Inspector",
  "Public chat",
  "Analytics",
];

export default function CloudLoginPage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-70"
      />

      <header className="relative flex items-center justify-between px-5 py-5 lg:px-10">
        <Logo />
        <Link
          href="/contact"
          className="inline-flex h-11 items-center gap-2 rounded-full border bg-background px-5 text-[15px] font-medium transition-colors hover:bg-accent"
        >
          Book a call
          <ArrowRight className="size-4" />
        </Link>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-4 pb-14 pt-4 lg:px-10">
        {/* One grainy wash card holds both halves; the form floats inside it. */}
        <div className="relative isolate w-full max-w-5xl overflow-hidden rounded-[28px] border bg-panel-wash p-2.5 sm:p-3.5">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grain opacity-35 mix-blend-multiply"
          />

          <div className="relative grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="rounded-[22px] border border-white/70 bg-background px-6 py-12 shadow-[var(--drop)] sm:px-10 sm:py-14">
              <div className="mx-auto w-full max-w-sm">
                <Suspense fallback={<div className="h-[430px]" />}>
                  <LoginForm />
                </Suspense>
              </div>
            </div>

            <div className="hidden flex-col justify-center px-8 py-12 text-zinc-900 lg:flex xl:px-10">
              <h2 className="max-w-sm text-[40px] font-semibold leading-[1.12] tracking-tight">
                All-in-one MCP platform
              </h2>
              <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-zinc-600">
                {site.name} is the complete platform to build, deploy and
                distribute MCP servers, Claude connectors and ChatGPT apps.
              </p>

              <ul className="mt-9 space-y-4">
                {platformFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3.5 text-[18px]"
                  >
                    <CircleCheck
                      className="size-[19px] shrink-0 text-zinc-500"
                      strokeWidth={1.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
