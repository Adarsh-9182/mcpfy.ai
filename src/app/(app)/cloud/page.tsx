import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
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
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-9 items-center rounded-full border px-4 text-[14px] font-medium transition-colors hover:bg-accent"
        >
          Book a call
        </Link>
      </header>

      <div className="grid flex-1 lg:grid-cols-2">
        {/* auth card */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <Suspense fallback={<div className="h-[380px]" />}>
              <LoginForm />
            </Suspense>
            <p className="mt-8 text-center text-[12px] leading-relaxed text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/legal/terms" className="underline underline-offset-2">
                TOS
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="underline underline-offset-2">
                Privacy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* product panel */}
        <div className="relative hidden items-center overflow-hidden border-l lg:flex">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-zinc-100 via-sky-100 to-zinc-200 dark:from-zinc-900 dark:via-sky-950 dark:to-zinc-900"
          />
          <div className="relative z-10 px-12 xl:px-20">
            <h2 className="max-w-md text-4xl font-medium tracking-tight">
              All-in-one MCP platform
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {site.name} is the complete platform to build, deploy and distribute
              MCP servers, Claude connectors and ChatGPT apps.
            </p>
            <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-3.5">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-[15px]">
                  <Check className="size-4 shrink-0 text-muted-foreground" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
