import type { Metadata } from 'next';
import { DashboardNav } from '@/components/dashboard/Nav';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage, inspect and observe your deployed MCP servers.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden border-r border-line p-6 lg:block">
        <div className="sticky top-6 h-[calc(100vh-3rem)]">
          <DashboardNav />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="border-b border-line p-4 lg:hidden">
          <DashboardNav />
        </div>
        <main id="main" className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
