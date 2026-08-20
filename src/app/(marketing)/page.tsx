import { Hero } from "@/components/site/hero";
import { LogoCloud } from "@/components/site/logo-cloud";
import { Surfaces } from "@/components/site/surfaces";
import { Lifecycle } from "@/components/site/lifecycle";
import { Testimonials } from "@/components/site/testimonials";
import { Stats } from "@/components/site/stats";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Surfaces />
      <Lifecycle />
      <Testimonials />
      <Stats />
      <LogoCloud label="Our open source tools are used by developers at top companies" />
      <Faq />
      <FinalCta />
    </>
  );
}
