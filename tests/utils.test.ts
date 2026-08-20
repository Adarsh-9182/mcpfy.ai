import { describe, it, expect } from 'vitest';
import { cn, formatNumber, formatLatency, formatRelativeTime, percent } from '@/lib/utils';

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });
});

describe('formatNumber', () => {
  it('leaves small numbers alone', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999)).toBe('999');
  });

  it('abbreviates thousands', () => {
    expect(formatNumber(1000)).toBe('1.0k');
    expect(formatNumber(184320)).toBe('184.3k');
  });

  it('abbreviates millions', () => {
    expect(formatNumber(1_500_000)).toBe('1.5M');
  });
});

describe('formatLatency', () => {
  it('uses milliseconds below a second', () => {
    expect(formatLatency(142)).toBe('142ms');
  });

  it('rounds sub-millisecond values', () => {
    expect(formatLatency(12.6)).toBe('13ms');
  });

  it('switches to seconds at or above 1000ms', () => {
    expect(formatLatency(1000)).toBe('1.00s');
    expect(formatLatency(2450)).toBe('2.45s');
  });
});

describe('formatRelativeTime', () => {
  const now = new Date('2026-08-20T12:00:00.000Z');

  it('reports sub-minute gaps as just now', () => {
    expect(formatRelativeTime('2026-08-20T11:59:30.000Z', now)).toBe('just now');
  });

  it('reports minutes, hours and days', () => {
    expect(formatRelativeTime('2026-08-20T11:30:00.000Z', now)).toBe('30m ago');
    expect(formatRelativeTime('2026-08-20T06:00:00.000Z', now)).toBe('6h ago');
    expect(formatRelativeTime('2026-08-17T12:00:00.000Z', now)).toBe('3d ago');
  });

  it('collapses long gaps into months', () => {
    expect(formatRelativeTime('2026-05-20T12:00:00.000Z', now)).toBe('3mo ago');
  });
});

describe('percent', () => {
  it('returns zero when the total is zero', () => {
    expect(percent(5, 0)).toBe(0);
  });

  it('rounds to one decimal place', () => {
    expect(percent(1, 3)).toBe(33.3);
    expect(percent(50, 200)).toBe(25);
  });
});
