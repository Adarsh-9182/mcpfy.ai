import { Marquee } from "@/components/ui/marquee";
import { Band, Slug } from "./frame";
import { trustedLogos } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * A masthead strip rather than a logo wall: the names run past in mono, split
 * by signal slashes, with the label pinned to the left like a byline.
 */
export function LogoCloud({
  label = `Trusted by teams building on ${site.name} Cloud`,
  index,
}: {
  label?: string;
  index?: string;
}) {
  return (
    <Band flush innerClassName="py-0">
      <div className="container-page">
        <div className="flex items-center gap-4 py-4">
          {index && <Slug className="text-signal">{index}</Slug>}
          <Slug className="hidden shrink-0 sm:block">{label}</Slug>
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </div>
      </div>

      <div className="border-t border-rule py-7">
        <Marquee duration="52s">
          {trustedLogos.map((name) => (
            <span key={name} className="flex items-center gap-8">
              <span className="whitespace-nowrap font-mono text-[15px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground">
                {name}
              </span>
              <span aria-hidden className="text-signal">
                /
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </Band>
  );
}
