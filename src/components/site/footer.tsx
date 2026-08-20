import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { footerColumns } from "@/lib/content";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 md:px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_2.6fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="text-[15px] text-muted-foreground">
              © {new Date().getFullYear()} {site.name}, Inc. — All rights
              reserved.
            </p>
            <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground/80">
              An original demo project built for practice. Not affiliated with,
              or endorsed by, any existing company.
            </p>
            <ThemeToggle className="mt-1 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[15px] font-semibold">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
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
      </div>
    </footer>
  );
}
