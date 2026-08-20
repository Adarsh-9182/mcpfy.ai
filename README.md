# mcpfy.ai

Marketing site for **mcpfy** — a fullstack MCP platform concept: an open SDK for building
MCP Apps (ChatGPT / Claude) and MCP Servers for AI agents, plus a cloud for deploying,
testing, observing and publishing them.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Radix UI and Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## Project layout

```
src/
  app/               App Router routes (home, pricing, templates, customers, blog, docs, legal)
  components/site/   Page sections — navbar, hero, lifecycle, testimonials, faq, footer …
  components/ui/     Primitives — button, accordion, switch, badge, card …
  lib/               Site config, content model, utils
```

## Notes

This is an original implementation written for practice. It is **not** affiliated with,
endorsed by, or a redistribution of any existing company's site or assets. All copy,
names, logos and testimonials are fictional placeholders.
