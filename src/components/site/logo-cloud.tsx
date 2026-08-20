import { Marquee } from "@/components/ui/marquee";
import { FrameSection } from "./frame";
import { trustedLogos } from "@/lib/content";
import { site } from "@/lib/site";

export function LogoCloud({
  label = `Trusted by teams building on ${site.name} Cloud`,
}: {
  label?: string;
}) {
  return (
    <FrameSection flush>
      <div className="py-14">
        <p className="text-center text-[15px] text-muted-foreground">{label}</p>
        <Marquee className="mt-8" duration="45s">
          {trustedLogos.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap text-xl font-semibold tracking-tight text-muted-foreground/50 transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </FrameSection>
  );
}
