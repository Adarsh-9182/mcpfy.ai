import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CookieBanner } from "@/components/site/cookie-banner";
import { PageFrame } from "@/components/site/frame";
import { SignalField } from "@/components/site/signal-field";

/** Chrome for the public marketing site. The app routes opt out of this. */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* the live wire field sits behind everything; content rides above it */}
      <SignalField />
      <div className="relative z-10">
        <Navbar />
        <PageFrame>
          <main id="main">{children}</main>
        </PageFrame>
        <Footer />
      </div>
      <CookieBanner />
    </>
  );
}
