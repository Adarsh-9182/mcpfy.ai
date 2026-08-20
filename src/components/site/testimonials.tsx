import { MarqueeVertical } from "@/components/ui/marquee-vertical";
import { FrameSection } from "./frame";
import { Reveal } from "./reveal";
import { testimonials, type Testimonial } from "@/lib/content";

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

const swatches = ["#6366f1", "#f97316", "#10b981", "#e11d48", "#8b5cf6", "#0ea5e9"];

function XMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 text-muted-foreground/60" aria-hidden fill="currentColor">
      <path d="M18.9 2H22l-7.1 8.1L23.2 22h-6.5l-5.1-6.7L5.8 22H2.7l7.6-8.7L1.5 2h6.7l4.6 6.1L18.9 2Zm-1.1 18h1.7L7.3 3.7H5.5L17.8 20Z" />
    </svg>
  );
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="border-b px-5 py-6">
      <div className="flex items-start justify-between gap-3">
        <blockquote className="text-[14px] leading-relaxed text-foreground/90">
          {t.body}
        </blockquote>
        <XMark />
      </div>
      <figcaption className="mt-4 flex items-center gap-2.5 border-t pt-4">
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
          style={{ background: swatches[i % swatches.length] }}
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium">{t.name}</span>
          <span className="block truncate text-[12px] text-muted-foreground">
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
    <FrameSection>
      <div className="py-16 text-center md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Developers love it
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Thousands of dev teams are building with the open SDK.
          </p>
        </Reveal>

        <div className="relative mt-14 grid h-[560px] grid-cols-1 gap-6 overflow-hidden text-left mask-fade-y sm:grid-cols-2 lg:grid-cols-3">
          {cols.map((col, ci) => (
            <MarqueeVertical
              key={ci}
              duration={`${46 + ci * 9}s`}
              reverse={ci === 1}
              className={ci === 2 ? "hidden lg:flex" : ci === 1 ? "hidden sm:flex" : ""}
            >
              {col.map((t, i) => (
                <Card key={t.handle} t={t} i={i * 3 + ci} />
              ))}
            </MarqueeVertical>
          ))}
        </div>
      </div>
    </FrameSection>
  );
}
