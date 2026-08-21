import { Marquee } from "@/components/ui/marquee";
import { customerLogos } from "./logos";
import { site } from "@/lib/site";

/**
 * The customer wall. Marks sit at low contrast and lift on hover, so the row
 * reads as texture until you look at it.
 */
export function LogoCloud({
  label = `Trusted by teams building on ${site.name} Cloud`,
}: {
  label?: string;
}) {
  return (
    <section className="py-14 md:py-16">
      <p className="container-page text-center text-[13.5px] text-muted-foreground">
        {label}
      </p>
      <Marquee className="mt-8" duration="46s">
        {customerLogos.map((Logo, i) => (
          <Logo
            key={i}
            className="text-foreground/45 transition-colors duration-300 hover:text-foreground"
          />
        ))}
      </Marquee>
    </section>
  );
}
