import { MarqueeVertical } from "@/components/ui/marquee-vertical";
import { Band, Slug } from "./frame";
import { Display, Em, Lede } from "./section";
import { Reveal } from "./reveal";
import { testimonials, type Testimonial } from "@/lib/content";

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

/** One clipping: the quote set in the display serif, the byline in mono. */
function Clipping({ t }: { t: Testimonial }) {
  return (
    <figure className="border-b border-rule px-1 py-7">
      <blockquote className="display text-[19px] leading-[1.35] text-foreground md:text-[21px]">
        <span aria-hidden className="mr-1 text-signal">
          “
        </span>
        {t.body}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-7 shrink-0 place-items-center border border-rule font-mono text-[10px] tracking-tight text-muted-foreground"
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-mono text-[11.5px] uppercase tracking-[0.12em]">
            {t.name}
          </span>
          <span className="block truncate font-mono text-[11px] text-muted-foreground">
            {t.handle}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const cols = [0, 1, 2].map((c) => testimonials.filter((_, i) => i % 3 === c));

  return (
    <Band index="06" label="field notes">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
        <Reveal>
          <Display size="lg" className="max-w-[14ch]">
            What people say once it&apos;s <Em>shipped</Em>.
          </Display>
        </Reveal>
        <Reveal delay={0.06}>
          <Lede>
            Thousands of teams build on the open SDK. These are illustrative
            personas — the workflows they describe are the real ones.
          </Lede>
        </Reveal>
      </div>

      <div className="relative mt-14 grid h-[600px] grid-cols-1 gap-x-12 overflow-hidden border-t border-rule mask-fade-y sm:grid-cols-2 lg:grid-cols-3">
        {cols.map((col, ci) => (
          <MarqueeVertical
            key={ci}
            duration={`${52 + ci * 11}s`}
            reverse={ci === 1}
            className={
              ci === 2
                ? "hidden border-l border-rule pl-12 lg:flex"
                : ci === 1
                  ? "hidden border-l border-rule pl-12 sm:flex"
                  : ""
            }
          >
            {col.map((t) => (
              <Clipping key={t.handle} t={t} />
            ))}
          </MarqueeVertical>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-rule pt-5">
        <Slug>illustrative personas · not endorsements</Slug>
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </div>
    </Band>
  );
}
