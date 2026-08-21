import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Slug } from "./frame";
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
    <footer className="border-t border-rule-strong/25">
      <div className="container-page">
        {/* colophon */}
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_2.4fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">
              The fullstack MCP platform. Build once, deploy everywhere agents
              and users already are.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center border border-rule text-muted-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  <Icon className="size-[15px]" />
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <Slug className="block border-b border-rule pb-3 text-foreground">
                  {col.title}
                </Slug>
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
                          className="text-[14.5px] text-muted-foreground transition-colors hover:text-signal"
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

        {/* imprint */}
        <div className="flex flex-col gap-3 border-t border-rule py-7 sm:flex-row sm:items-center sm:justify-between">
          <Slug>
            © {new Date().getFullYear()} {site.name}, inc. — all rights reserved
          </Slug>
          <Slug className="max-w-[52ch] normal-case tracking-normal">
            An original demo project built for practice. Not affiliated with, or
            endorsed by, any existing company.
          </Slug>
        </div>
      </div>

      {/* the wordmark, set as a masthead across the foot of the page */}
      <div aria-hidden className="overflow-hidden border-t border-rule">
        <p className="display container-page select-none py-8 text-center text-[19vw] leading-[0.8] text-foreground/[0.05]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
