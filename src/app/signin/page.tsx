import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { FrameSection } from "@/components/site/frame";
import { AuthForm } from "@/components/auth/auth-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to your ${site.name} account.`,
};

export default function SignInPage() {
  return (
    <>
      <PageHero
        title="Sign in"
        subtitle={`Pick up where you left off with your ${site.name} servers.`}
      />
      <FrameSection>
        <div className="mx-auto w-full max-w-md py-16 md:py-24">
          <AuthForm mode="sign-in" />
        </div>
      </FrameSection>
    </>
  );
}
