import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent directory contains a stray lockfile; pin the workspace root so
  // Turbopack does not walk up and infer the wrong project root.
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/book-call", destination: "/contact", permanent: false },
      { source: "/developers", destination: "/docs", permanent: false },
      { source: "/customer-stories", destination: "/customers", permanent: false },
      { source: "/privacy", destination: "/legal/privacy", permanent: false },
      { source: "/terms", destination: "/legal/terms", permanent: false },
      { source: "/mcp-use", destination: "/sdk", permanent: false },
    ];
  },
};

export default nextConfig;
