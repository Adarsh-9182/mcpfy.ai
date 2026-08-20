import { describe, it, expect } from 'vitest';
import { docs, getDoc, docSections } from '@/lib/docs';
import { slugify } from '@/components/docs/Blocks';

describe('docs content', () => {
  it('has unique slugs', () => {
    expect(new Set(docs.map((d) => d.slug)).size).toBe(docs.length);
  });

  it('gives every page a title, description and body', () => {
    for (const doc of docs) {
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.description.length).toBeGreaterThan(0);
      expect(doc.blocks.length).toBeGreaterThan(0);
    }
  });

  it('derives sections from the pages themselves', () => {
    for (const doc of docs) {
      expect(docSections).toContain(doc.section);
    }
  });

  it('keeps every table row aligned with its header', () => {
    for (const doc of docs) {
      for (const block of doc.blocks) {
        if (block.kind === 'table') {
          for (const row of block.rows) {
            expect(row).toHaveLength(block.head.length);
          }
        }
      }
    }
  });

  it('resolves a page by slug', () => {
    expect(getDoc('quickstart')?.title).toBe('Quickstart');
    expect(getDoc('missing')).toBeUndefined();
  });
});

describe('slugify', () => {
  it('produces url-safe anchors', () => {
    expect(slugify('Install the CLI')).toBe('install-the-cli');
    expect(slugify('Auth & scopes')).toBe('auth-scopes');
  });
});
