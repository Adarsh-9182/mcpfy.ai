# mcpfy.ai

A production-grade web application for an MCP (Model Context Protocol) server platform —
marketing site, documentation, and a working operator dashboard.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS.

## What's in here

**Marketing site**
- Landing page with animated hero, multi-language code tabs, feature grid, workflow
  walkthrough, protocol-inspector preview, live-log panel and an accessible FAQ accordion
- Pricing page with three tiers and a full comparison table
- Changelog timeline

**Documentation**
- Sidebar-navigated docs with six guides (quickstart, CLI reference, transports, auth &
  scopes, tracing, publishing)
- Content is a typed block model (`src/lib/docs.ts`) rendered by `src/components/docs/Blocks.tsx`,
  so pages are type-checked rather than parsed at build time
- Prev/next pagination and auto-generated heading anchors

**Dashboard**
- Overview with KPI tiles, traffic and latency charts, server list and a live activity feed
- Server list and per-server detail (tools, deployments, endpoint, connectors)
- Interactive Inspector that simulates an MCP handshake and streams protocol frames
- Analytics with per-tool and per-server breakdowns
- Settings for organization, scoped access tokens and team

**API routes**
- `GET /api/health` — service health
- `GET /api/servers` — server list, filterable via `?status=`
- `GET /api/servers/[slug]` — single server, 404s cleanly on unknown slugs

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint, zero-warning policy |
| `npm test` | Vitest unit + component tests |
| `npm run check` | typecheck → lint → test → build |

## Deploying to Vercel

The app is a stock Next.js project with no external services, so it deploys with zero
configuration.

**From the dashboard:** import the repository at [vercel.com/new](https://vercel.com/new).
Vercel detects Next.js and needs no build-setting changes.

**From the CLI:**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Environment variables

One optional variable, used for absolute URLs in metadata, `sitemap.xml` and `robots.txt`:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://mcpfy.ai` | Canonical origin |

## Design notes

The chart and colour work follows a validated accessibility pass rather than taste:

- Every text colour clears WCAG AA (≥ 4.5:1) against the application surface. The secondary
  text token was re-stepped to `#767D91` specifically to clear that bar.
- Charts are single-series by design. Measures on different scales (calls, errors, latency)
  get their own plot — the app contains no dual-axis charts.
- Status colours are reserved for status and always ship alongside a text label, never as
  colour alone.
- Charts carry a crosshair and tooltip, an `aria-label` summarising the series, and
  recessive gridlines.
- `prefers-reduced-motion` is respected globally.

## Verification

Verified against a real browser across desktop (1440px), tablet (768px) and mobile (390px):
all 12 pages render with no horizontal overflow, no console errors and no failed requests.
Interactive paths (inspector run, JSON validation, server switching, FAQ accordion, code
tabs, mobile menu, keyboard focus order) are exercised and pass.

## Project layout

```
src/
  app/              routes, API handlers, sitemap/robots, error & 404 boundaries
  components/
    ui/             Button, Badge, Chart, CodeBlock, StatTile, Logo, Section
    site/           Header, Footer
    marketing/      landing page sections
    dashboard/      dashboard nav and inspector
    docs/           docs sidebar and block renderer
  lib/              data, docs content, types, formatting helpers
tests/              unit, component and API-route tests
```
