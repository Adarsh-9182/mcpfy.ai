# mcpfy.ai

Marketing site and dashboard for **mcpfy** — a fullstack MCP platform concept: an open SDK for building
MCP Apps (ChatGPT / Claude) and MCP Servers for AI agents, plus a cloud for deploying,
testing, observing and publishing them.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Radix UI and Motion.

## Getting started

```bash
npm install
cp .env.example .env.local          # then set BETTER_AUTH_SECRET
npm run db:push                     # creates .data/mcpfy.db
npm run dev
```

Open http://localhost:3000. Sign up at `/signup`, and the dashboard is at
`/dashboard`.

`BETTER_AUTH_SECRET` is the only value you must set — generate one with
`openssl rand -base64 32`. Setting `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
additionally enables "Continue with GitHub".

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run db:generate` | Generate a migration from the schema |
| `npm run db:push` | Apply the schema to the database |
| `npm run db:studio` | Browse the database |

## Project layout

```
src/
  app/               App Router routes (marketing, auth, and the dashboard)
  app/api/auth/      Better Auth catch-all handler
  app/dashboard/     Signed-in area — servers list, create, detail
  components/site/   Page sections — navbar, hero, lifecycle, testimonials, faq, footer …
  components/auth/   Sign-in / sign-up form, sign-out
  components/ui/     Primitives — button, accordion, switch, input, badge, card …
  db/                Drizzle schema and client
  lib/               Site config, content model, auth, session helpers
```

## Auth and data

Authentication is [Better Auth](https://better-auth.com) with the organization
plugin: email/password plus optional GitHub OAuth, and every server belongs to
an organisation. Data lives in libSQL through Drizzle — a local file by
default, any hosted libSQL/Turso instance via `DATABASE_URL`.

## Notes

This is an original implementation written for practice. It is **not** affiliated with,
endorsed by, or a redistribution of any existing company's site or assets. All copy,
names, logos and testimonials are fictional placeholders.
