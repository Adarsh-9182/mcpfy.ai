import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CookieBanner } from "@/components/site/cookie-banner";
import { PageFrame } from "@/components/site/frame";

/** Chrome for the public marketing site. The app routes opt out of this. */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <PageFrame>
        <main id="main">{children}</main>
      </PageFrame>
      <Footer />
      <CookieBanner />
    </>
  );
}
