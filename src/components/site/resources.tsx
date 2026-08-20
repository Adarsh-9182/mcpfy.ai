import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { officialServers, docsGroups } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The servers we run ourselves, plus the documentation entry points — the
 * last thing on the page, for readers who are ready to go and read something.
 */
export function Resources() {
  return (
    <>
      <FrameSection>
        <div className="py-16 md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight md:text-4xl">
              Official {site.name} MCP servers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-base text-muted-foreground md:text-lg">
              We run the platform through the protocol too. Point a client at
              either endpoint and drive {site.name} from your agent.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {officialServers.map((server, i) => (
              <Reveal key={server.url} delay={i * 0.08}>
                <div className="h-full rounded-xl border bg-card/40 p-6">
                  <h3 className="text-[15px] font-medium">{server.name}</h3>
                  <pre className="mt-3 overflow-x-auto rounded-lg border bg-background/60 px-4 py-3">
                    <code className="font-mono text-[13px]">{server.url}</code>
                  </pre>
                  <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                    {server.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FrameSection>

      <FrameSection>
        <div className="py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Documentation
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {docsGroups.map((group, i) => (
              <Reveal key={group.name} delay={i * 0.06}>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {group.name}
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-border/60 pt-5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-[14px]"
                        >
                          <span className="underline underline-offset-2 decoration-border group-hover:decoration-foreground">
                            {link.label}
                          </span>
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FrameSection>
    </>
  );
}
