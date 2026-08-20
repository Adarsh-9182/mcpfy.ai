import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { footerColumns } from "@/lib/content";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_2.2fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The fullstack MCP platform. Build, deploy, test and publish MCP
              apps and servers.
            </p>
            <ThemeToggle className="mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] font-semibold">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
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

        <div className="mt-12 flex flex-col gap-2 border-t pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} — All rights reserved.
          </p>
          <p>
            An original demo project. Not affiliated with any existing company.
          </p>
        </div>
      </div>
    </footer>
  );
}
