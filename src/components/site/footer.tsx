import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LiveDot } from "./section";
import { DiscordIcon, GithubIcon, LinkedinIcon } from "./icons";
import { footerColumns } from "@/lib/content";
import { site } from "@/lib/site";

const socials = [
  { href: site.github, label: "GitHub", Icon: GithubIcon },
  { href: site.discord, label: "Discord", Icon: DiscordIcon },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_2.2fr] lg:gap-20">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="measure-tight text-sm text-t-mid">
              The fullstack MCP platform. Build once, deploy everywhere agents
              and users already are.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-n1 px-2.5 py-1 text-xs text-t-mid">
              <LiveDot />
              All systems operational
            </span>
            <div className="flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium">{col.title}</p>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="text-sm text-t-mid transition-colors hover:text-t-hi"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-t-lo">
            © {new Date().getFullYear()} {site.name}, Inc. All rights reserved.
          </p>
          <p className="max-w-[56ch] text-xs text-t-lo">
            An original demo project built for practice. Not affiliated with, or
            endorsed by, any existing company.
          </p>
        </div>
      </div>
    </footer>
  );
}
