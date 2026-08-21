import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { DiscordIcon, GithubIcon } from "@/components/site/icons";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { site } from "@/lib/site";
import { DocsMenu } from "./docs-menu";
import type { Organization } from "@/lib/dashboard";
import { OrgSwitcher } from "./org-switcher";
import { SectionSwitcher } from "./section-switcher";
import { UserMenu } from "./user-menu";

function Divider() {
  return (
    <span aria-hidden className="px-1 text-[15px] text-border">
      /
    </span>
  );
}

export function Topbar({
  email,
  avatarUrl,
  organization,
  organizations,
}: {
  email: string;
  avatarUrl?: string | null;
  organization: Organization;
  organizations: Organization[];
}) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-2 bg-background px-4 lg:px-5">
      <div className="flex min-w-0 items-center">
        <Logo className="mr-1" />
        <span className="hidden items-center sm:flex">
          <Divider />
          <OrgSwitcher organization={organization} organizations={organizations} />
        </span>
        <Divider />
        <SectionSwitcher />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Link
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="hidden h-9 items-center gap-1.5 rounded-lg px-2.5 text-[14px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
        >
          <GithubIcon className="size-4" />
          <span className="tabular-nums">{site.stars}</span>
        </Link>
        <Link
          href={site.discord}
          target="_blank"
          rel="noreferrer"
          aria-label="Discord"
          className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
        >
          <DiscordIcon className="size-[18px]" />
        </Link>
        <span className="hidden md:block">
          <DocsMenu />
        </span>
        <ThemeToggle className="border-0" />
        <UserMenu email={email} avatarUrl={avatarUrl} />
      </div>
    </header>
  );
}
