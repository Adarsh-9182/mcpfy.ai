import { Marquee } from "@/components/ui/marquee";
import { trustedLogos } from "@/lib/content";
import { site } from "@/lib/site";

export function LogoCloud({
  label = `Trusted by teams building on ${site.name} Cloud`,
}: {
  label?: string;
}) {
  return (
    <section className="border-t py-14">
      <div className="container-page">
        <p className="text-center text-[13px] text-muted-foreground">{label}</p>
        <Marquee className="mt-8" duration="45s">
          {trustedLogos.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
