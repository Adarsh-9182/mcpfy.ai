import { MarqueeVertical } from "@/components/ui/marquee-vertical";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

const hues = [
  "bg-[#4c74ff]",
  "bg-[#3ecf8e]",
  "bg-[#f2b441]",
  "bg-[#f2545b]",
  "bg-[#a78bfa]",
  "bg-[#22d3ee]",
];

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.9 2H22l-7.1 8.1L23.2 22h-6.5l-5.1-6.7L5.8 22H2.7l7.6-8.7L1.5 2h6.7l4.6 6.1L18.9 2Zm-1.1 18h1.7L7.3 3.7H5.5L17.8 20Z" />
    </svg>
  );
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="card-surface mb-4 rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <figcaption className="flex items-center gap-2.5">
          <span
            aria-hidden
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white",
              hues[i % hues.length],
            )}
          >
            {initials(t.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13.5px] font-medium">
              {t.name}
            </span>
            <span className="block truncate text-[12.5px] text-subtle-foreground">
              {t.handle}
            </span>
          </span>
        </figcaption>
        <XMark className="size-3.5 shrink-0 text-subtle-foreground" />
      </div>
      <blockquote className="mt-4 text-[13.5px] leading-[1.6] text-muted-foreground">
        {t.body}
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  const cols = [0, 1, 2].map((c) => testimonials.filter((_, i) => i % 3 === c));

  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Developers"
          title="What people say once it ships"
          lead="Thousands of teams build on the open SDK."
          leadDim="These are illustrative personas — the workflows are the real ones."
          className="mx-auto max-w-2xl"
        />
      </Reveal>

      <div className="relative mt-14 grid h-[560px] grid-cols-1 gap-4 overflow-hidden mask-fade-y sm:grid-cols-2 lg:grid-cols-3">
        {cols.map((col, ci) => (
          <MarqueeVertical
            key={ci}
            duration={`${54 + ci * 12}s`}
            reverse={ci === 1}
            className={ci === 2 ? "hidden lg:flex" : ci === 1 ? "hidden sm:flex" : ""}
          >
            {col.map((t, i) => (
              <Card key={t.handle} t={t} i={i * 3 + ci} />
            ))}
          </MarqueeVertical>
        ))}
      </div>
    </Section>
  );
}
