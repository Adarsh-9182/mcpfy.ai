import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Hero } from '@/components/marketing/Hero';
import { Proof } from '@/components/marketing/Proof';
import { Features } from '@/components/marketing/Features';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Inspector } from '@/components/marketing/Inspector';
import { Observability } from '@/components/marketing/Observability';
import { Publish } from '@/components/marketing/Publish';
import { FAQ } from '@/components/marketing/FAQ';
import { CTA } from '@/components/marketing/CTA';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Proof />
        <Features />
        <HowItWorks />
        <Inspector />
        <Observability />
        <Publish />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
