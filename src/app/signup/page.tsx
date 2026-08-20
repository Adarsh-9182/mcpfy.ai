import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FrameSection } from "@/components/site/frame";
import { AuthForm } from "@/components/auth/auth-form";
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
          </div>

          <AuthForm mode="sign-up" />
        </div>
      </FrameSection>
    </>
  );
}
