import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { DocsSidebar } from '@/components/docs/Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="shell grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <DocsSidebar />
        </aside>
        <main id="main" className="min-w-0 max-w-2xl pb-12">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
