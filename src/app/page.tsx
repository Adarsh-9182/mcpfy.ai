import { Hero } from "@/components/site/hero";
import { LogoCloud } from "@/components/site/logo-cloud";
import { Surfaces } from "@/components/site/surfaces";
import { Comparison } from "@/components/site/comparison";
import { Lifecycle } from "@/components/site/lifecycle";
import { Alternatives, Quickstart } from "@/components/site/quickstart";
import { Testimonials } from "@/components/site/testimonials";
import { Stats } from "@/components/site/stats";
import { Resources } from "@/components/site/resources";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Surfaces />
      <Comparison />
      <Lifecycle />
      <Alternatives />
      <Stats />
      <Testimonials />
      <Quickstart />
      <Resources />
      <LogoCloud label="Our open source tools are used by developers at top companies" />
      <Faq />
      <FinalCta />
    </>
  );
}
