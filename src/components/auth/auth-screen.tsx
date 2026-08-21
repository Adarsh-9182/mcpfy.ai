import { Suspense } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ProductShot } from "@/components/site/product-shot";
import { site } from "@/lib/site";
import { LoginForm } from "./login-form";

/**
 * The signed-out screen, served from both /cloud and /signup: the form on the
 * left, and the thing you are signing in to on the right.
 */
const platformFeatures = [
  "Hosting and preview deployments",
  "Cross-client evaluations",
  "Publishing checks and submission pack",
  "Cloud Inspector and session replay",
  "Analytics for every tool call",
];

export function AuthScreen() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] hero-glow opacity-70"
      />

      <header className="relative flex items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <Link
          href="/contact"
          className="inline-flex h-9 items-center rounded-lg border border-border bg-surface-1 px-4 text-[13.5px] font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
        >
          Book a call
        </Link>
      </header>

      <main className="relative grid flex-1 items-center gap-12 px-5 pb-16 pt-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <Suspense fallback={<div className="h-[440px]" />}>
            <LoginForm />
          </Suspense>
        </div>

        <div className="hidden lg:block">
          <ProductShot />
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3">
            {platformFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-[13.5px] text-muted-foreground"
              >
                <Check className="mt-0.5 size-3.5 shrink-0 text-t-mid" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="relative flex items-center justify-between px-5 py-4 text-[12.5px] text-subtle-foreground lg:px-8">
        <span>{site.domain}</span>
        <span>Demo project — not a real service</span>
      </footer>
    </div>
  );
}
