import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent directory contains a stray lockfile; pin the workspace root so
  // Turbopack does not walk up and infer the wrong project root.
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
};

export default nextConfig;
