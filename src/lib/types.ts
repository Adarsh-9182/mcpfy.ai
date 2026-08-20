export type ServerStatus = 'live' | 'building' | 'degraded' | 'paused' | 'failed';
export type Runtime = 'node' | 'python' | 'edge';
export type Transport = 'streamable-http' | 'sse' | 'stdio';

export interface McpTool {
  name: string;
  description: string;
  calls30d: number;
  p95Ms: number;
  errorRate: number;
}

export interface Deployment {
  id: string;
  sha: string;
  message: string;
  author: string;
  status: 'ready' | 'building' | 'error';
  createdAt: string;
  durationSec: number;
}

export interface McpServer {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ServerStatus;
  runtime: Runtime;
  transport: Transport;
  region: string;
  url: string;
  version: string;
  updatedAt: string;
  calls30d: number;
  p95Ms: number;
  errorRate: number;
  uptime: number;
  tools: McpTool[];
  deployments: Deployment[];
  connectors: string[];
}

export interface TimePoint {
  t: string;
  calls: number;
  errors: number;
  p95: number;
}

export interface LogLine {
  id: string;
  at: string;
  level: 'info' | 'warn' | 'error';
  server: string;
  message: string;
}
