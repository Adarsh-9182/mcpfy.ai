import { describe, it, expect } from 'vitest';
import { GET as listServers } from '@/app/api/servers/route';
import { GET as getServerRoute } from '@/app/api/servers/[slug]/route';
import { GET as health } from '@/app/api/health/route';

describe('GET /api/health', () => {
  it('reports ok', async () => {
    const res = health();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ status: 'ok' });
  });
});

describe('GET /api/servers', () => {
  it('returns every server with a matching count', async () => {
    const res = listServers(new Request('https://mcpfy.ai/api/servers'));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.servers).toHaveLength(body.count);
    expect(body.count).toBeGreaterThan(0);
  });

  it('filters by status', async () => {
    const res = listServers(new Request('https://mcpfy.ai/api/servers?status=live'));
    const body = await res.json();
    expect(body.count).toBeGreaterThan(0);
    for (const server of body.servers) {
      expect(server.status).toBe('live');
    }
  });

  it('returns an empty list for an unknown status', async () => {
    const res = listServers(new Request('https://mcpfy.ai/api/servers?status=bogus'));
    const body = await res.json();
    expect(body.count).toBe(0);
    expect(body.servers).toEqual([]);
  });
});

describe('GET /api/servers/[slug]', () => {
  it('returns a single server', async () => {
    const res = await getServerRoute(new Request('https://mcpfy.ai/api/servers/billing-ledger'), {
      params: Promise.resolve({ slug: 'billing-ledger' }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.server.slug).toBe('billing-ledger');
  });

  it('404s an unknown slug', async () => {
    const res = await getServerRoute(new Request('https://mcpfy.ai/api/servers/nope'), {
      params: Promise.resolve({ slug: 'nope' }),
    });
    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toMatchObject({ error: 'server_not_found' });
  });
});
