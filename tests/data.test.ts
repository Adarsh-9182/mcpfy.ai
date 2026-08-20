import { describe, it, expect } from 'vitest';
import { servers, getServer, trafficSeries, recentLogs, changelog } from '@/lib/data';

describe('server catalogue', () => {
  it('exposes a unique id and slug per server', () => {
    expect(new Set(servers.map((s) => s.id)).size).toBe(servers.length);
    expect(new Set(servers.map((s) => s.slug)).size).toBe(servers.length);
  });

  it('gives every server at least one tool and one deployment', () => {
    for (const server of servers) {
      expect(server.tools.length).toBeGreaterThan(0);
      expect(server.deployments.length).toBeGreaterThan(0);
    }
  });

  it('keeps rates and uptime inside sane bounds', () => {
    for (const server of servers) {
      expect(server.errorRate).toBeGreaterThanOrEqual(0);
      expect(server.errorRate).toBeLessThan(100);
      expect(server.uptime).toBeGreaterThan(90);
      expect(server.uptime).toBeLessThanOrEqual(100);
      for (const tool of server.tools) {
        expect(tool.errorRate).toBeGreaterThanOrEqual(0);
        expect(tool.p95Ms).toBeGreaterThan(0);
      }
    }
  });

  it('never reports more tool calls than the server total', () => {
    for (const server of servers) {
      const toolTotal = server.tools.reduce((sum, t) => sum + t.calls30d, 0);
      expect(toolTotal).toBeLessThanOrEqual(server.calls30d);
    }
  });

  it('uses parseable ISO timestamps', () => {
    for (const server of servers) {
      expect(Number.isNaN(Date.parse(server.updatedAt))).toBe(false);
      for (const d of server.deployments) {
        expect(Number.isNaN(Date.parse(d.createdAt))).toBe(false);
      }
    }
  });
});

describe('getServer', () => {
  it('finds a server by slug', () => {
    expect(getServer('billing-ledger')?.name).toBe('Billing Ledger');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getServer('nope')).toBeUndefined();
  });
});

describe('traffic series', () => {
  it('covers 30 days in ascending order', () => {
    expect(trafficSeries).toHaveLength(30);
    const dates = trafficSeries.map((p) => p.t);
    expect([...dates].sort()).toEqual(dates);
  });

  it('never reports more errors than calls', () => {
    for (const point of trafficSeries) {
      expect(point.errors).toBeLessThanOrEqual(point.calls);
      expect(point.p95).toBeGreaterThan(0);
    }
  });
});

describe('logs and changelog', () => {
  it('uses known log levels', () => {
    for (const log of recentLogs) {
      expect(['info', 'warn', 'error']).toContain(log.level);
    }
  });

  it('lists changelog entries newest first', () => {
    const dates = changelog.map((c) => c.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});
