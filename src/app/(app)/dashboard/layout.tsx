import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Dashboard" },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email = "you@example.com";
  let avatarUrl: string | null = null;

  if (supabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? email;
    avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? null;
  }

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar email={email} avatarUrl={avatarUrl} />
        <div className="flex-1 px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
