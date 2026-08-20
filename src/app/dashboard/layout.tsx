import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/session";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Manage your ${site.name} servers.`,
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, organization } = await requireSession();

  return (
    <div className="px-4 py-8 md:px-6 lg:px-12">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {organization.name}
          </p>
          <h1 className="mt-1.5 text-2xl font-medium tracking-tight">
            <Link href="/dashboard">Servers</Link>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-muted-foreground">{user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  );
}
