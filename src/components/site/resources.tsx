import Link from "next/link";
import { Copy } from "lucide-react";
import { Section, SectionHeading, LiveDot, Title } from "./section";
import { Reveal } from "./reveal";
import { officialServers, docsGroups } from "@/lib/content";
import { site } from "@/lib/site";

/** The endpoints we run ourselves, then the documentation index. */
export function Resources() {
  return (
    <>
      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Dogfood"
            title={`We run ${site.name} through the protocol too`}
            lead="Point any MCP client at either endpoint and drive the platform from your own agent."
            leadDim="Same auth, same rate limits, same docs."
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {officialServers.map((server, i) => (
            <Reveal key={server.url} delay={i * 0.07}>
              <div className="card-surface h-full rounded-xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[14px] font-medium">{server.name}</p>
                  <span className="flex items-center gap-1.5 rounded-full border border-live/25 bg-live/10 px-2 py-0.5 text-[11px] font-medium text-live">
                    <LiveDot />
                    Live
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
                  <code className="code min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground">
                    {server.url}
                  </code>
                  <Copy
                    aria-hidden
                    className="size-3.5 shrink-0 text-subtle-foreground"
                  />
                </div>

                <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                  {server.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Documentation" title="The reference, end to end" />
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {docsGroups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.05}>
              <div>
                <Title size="sm" className="text-[16px] md:text-[16px]">
                  {group.name}
                </Title>
                <ul className="mt-4 flex flex-col">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-3 rounded-lg py-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className="text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
