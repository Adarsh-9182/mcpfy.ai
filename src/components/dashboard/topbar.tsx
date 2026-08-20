import Link from "next/link";
import { Plus } from "lucide-react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { UserMenu } from "./user-menu";

export function Topbar({
  email,
  avatarUrl,
}: {
  email: string;
  avatarUrl?: string | null;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-5 backdrop-blur-md">
      <Link
        href="/dashboard"
        className="text-[14px] font-medium lg:hidden"
      >
        Dashboard
      </Link>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/servers/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          New server
        </Link>
        <ThemeToggle />
        <UserMenu email={email} avatarUrl={avatarUrl} />
      </div>
    </header>
  );
}
