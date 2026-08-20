import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FrameSection } from "@/components/site/frame";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GithubIcon } from "@/components/site/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get started",
  description: `Create a ${site.name} account and deploy your first MCP server.`,
};

const perks = [
  "Deploy from GitHub in under 60 seconds",
  "$5 of usage credit every month on the Free plan",
  "Cross-client testing and the Cloud Inspector included",
  "No card required to ship your first server",
];

export default function SignupPage() {
  return (
    <>
      <PageHero
        title="Start deploying"
        subtitle={`Create a ${site.name} account and ship your first MCP server today.`}
      />
      <FrameSection>
        <div className="grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              What you get on the Free plan
            </h2>
            <ul className="mt-6 space-y-4">
              {perks.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground/60" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[13px] text-muted-foreground">
              This is a demo site — no account is actually created.
            </p>
          </div>

          <div className="rounded-xl border bg-card/40 p-6 sm:p-8">
            <p className="text-[17px] font-medium">Create your account</p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border bg-background text-[15px] font-medium transition-colors hover:bg-accent"
              >
                <GithubIcon className="size-4" /> Continue with GitHub
              </button>
              <ShimmerButton className="h-12 w-full">
                Continue with email
              </ShimmerButton>
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
              By continuing you agree to the{" "}
              <Link href="/legal/terms" className="underline underline-offset-2">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </FrameSection>
    </>
  );
}
