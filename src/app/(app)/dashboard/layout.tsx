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
    /* The chrome sits on the muted page ground; the screen itself is a raised
       card that runs off the bottom edge, so scrolling stays on the document. */
    <div className="min-h-dvh bg-muted/50">
      <Topbar email={email} avatarUrl={avatarUrl} />

      <div className="flex items-start gap-0">
        <Sidebar className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] lg:flex" />

        <main className="min-h-[calc(100dvh-3.5rem)] min-w-0 flex-1 rounded-tl-2xl border-l border-t bg-background px-5 py-7 lg:mr-4 lg:rounded-tr-2xl lg:border-r lg:px-8">
          <div className="mx-auto max-w-6xl space-y-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
