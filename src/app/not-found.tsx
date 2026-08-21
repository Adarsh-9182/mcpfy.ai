import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageFrame } from "@/components/site/frame";
import { NotFoundContent } from "@/components/site/not-found-content";

/**
 * Global 404 for URLs that match no route group, so it has to bring the
 * marketing chrome itself — the root layout no longer renders it.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <PageFrame>
        <main id="main">
          <NotFoundContent />
        </main>
      </PageFrame>
      <Footer />
    </>
  );
}
