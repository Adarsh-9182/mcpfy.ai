import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mcpfy.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'mcpfy.ai — Build, deploy and observe MCP servers',
    template: '%s · mcpfy.ai',
  },
  description:
    'mcpfy is the platform for Model Context Protocol servers in production: zero-config deploys, a built-in inspector, tool-level tracing and one-click publishing to Claude and ChatGPT.',
  keywords: ['MCP', 'Model Context Protocol', 'AI tools', 'MCP server hosting', 'Claude connectors'],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'mcpfy.ai',
    title: 'mcpfy.ai — Build, deploy and observe MCP servers',
    description:
      'Zero-config deploys, a built-in inspector, tool-level tracing and one-click publishing for MCP servers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mcpfy.ai — Build, deploy and observe MCP servers',
    description:
      'Zero-config deploys, a built-in inspector, tool-level tracing and one-click publishing for MCP servers.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#08090d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
