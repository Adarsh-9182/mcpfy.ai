import Link from "next/link";
import { Band, Slug } from "./frame";
import { Display, Em, Lede } from "./section";
import { Reveal } from "./reveal";
import { officialServers, docsGroups } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The servers we run ourselves, then the documentation index — the reference
 * section at the back of the document, for readers ready to go and read.
 */
export function Resources() {
  return (
    <>
      <Band index="08" label="endpoints">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <Reveal>
            <Display size="lg" className="max-w-[15ch]">
              We run {site.name} through the <Em>protocol</Em> too.
            </Display>
          </Reveal>
          <Reveal delay={0.06}>
            <Lede>
              Point any MCP client at either endpoint and drive the platform
              from your own agent. Same auth, same rate limits, same docs.
            </Lede>
          </Reveal>
        </div>

        <div className="rule-grid mt-14 grid md:grid-cols-2">
          {officialServers.map((server, i) => (
            <Reveal key={server.url} delay={i * 0.08}>
              <div className="rule-cell h-full bg-card">
                <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
                  <Slug className="text-foreground">{server.name}</Slug>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 bg-pine" />
                    <Slug className="text-[10px]">live</Slug>
                  </span>
                </div>
                <div className="bg-ruled px-4 py-4">
                  <p className="flex gap-2 font-mono text-[12.5px]">
                    <span className="shrink-0 text-signal">→</span>
                    <span className="min-w-0 break-all">{server.url}</span>
                  </p>
                </div>
                <p className="border-t border-rule px-4 py-4 text-[14px] leading-relaxed text-muted-foreground">
                  {server.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band index="08.1" label="documentation">
        <Reveal>
          <Display size="md" className="max-w-[16ch]">
            The reference, end to end.
          </Display>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {docsGroups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.06}>
              <div>
                <div className="flex items-center gap-4 border-b border-rule-strong/25 pb-3">
                  <span className="font-mono text-[10.5px] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Slug className="text-foreground">{group.name}</Slug>
                </div>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label} className="border-b border-rule">
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-3 py-3 text-[14.5px] transition-colors hover:text-signal"
                      >
                        <span>{link.label}</span>
                        <span
                          aria-hidden
                          className="text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
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
      </Band>
    </>
  );
}
