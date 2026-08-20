import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section";
import { testimonials, type Testimonial } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

const swatches = ["#6366f1", "#f97316", "#10b981", "#e11d48", "#8b5cf6", "#0ea5e9"];

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-xl border bg-card/50 p-5 transition-colors hover:bg-card sm:w-[380px]">
      <blockquote className="flex-1 text-[13.5px] leading-relaxed text-foreground/90">
        {t.body}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
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
  const mid = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, mid);
  const rowTwo = testimonials.slice(mid);

  return (
    <section className="overflow-hidden border-t py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            className="mx-auto"
            title={
              <>
                Developers <span className="font-serif italic font-normal">love</span> it
              </>
            }
            subtitle="Thousands of dev teams are building with the open SDK."
          />
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        <Marquee duration="70s">
          {rowOne.map((t, i) => (
            <TestimonialCard key={t.handle} t={t} i={i} />
          ))}
        </Marquee>
        <Marquee duration="70s" reverse>
          {rowTwo.map((t, i) => (
            <TestimonialCard key={t.handle} t={t} i={i + mid} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
