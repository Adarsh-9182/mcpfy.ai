import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth/auth-screen";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Log in or sign up",
  description: `Create a ${site.name} account and deploy your first MCP server.`,
  robots: { index: false, follow: false },
};

/** "Start deploying" lands here; it is the same screen as /cloud. */
export default function SignupPage() {
  return <AuthScreen />;
}
