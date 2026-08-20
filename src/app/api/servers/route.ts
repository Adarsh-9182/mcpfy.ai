import { NextResponse } from 'next/server';
import { servers } from '@/lib/data';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  const result = status ? servers.filter((s) => s.status === status) : servers;

  return NextResponse.json({
    count: result.length,
    servers: result.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      status: s.status,
      runtime: s.runtime,
      transport: s.transport,
      region: s.region,
      version: s.version,
      calls30d: s.calls30d,
      p95Ms: s.p95Ms,
      errorRate: s.errorRate,
      uptime: s.uptime,
      toolCount: s.tools.length,
    })),
  });
}
