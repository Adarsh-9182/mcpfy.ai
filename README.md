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

## Cloud auth and dashboard

`/cloud` is the login gate for the signed-in product surface, and `/dashboard`
is the app behind it. Auth runs on Supabase with Google, GitHub and email
magic links.

### Setup

1. Create a project at [supabase.com](https://supabase.com) and copy
   **Project settings → API → Project URL** and **anon public key** into
   `.env.local` (see `.env.example`).

2. In Supabase, go to **Authentication → Providers** and enable:

   - **Google** — create an OAuth client at
     [console.cloud.google.com](https://console.cloud.google.com/apis/credentials)
     (type: Web application) and paste the client ID and secret.
   - **GitHub** — create an OAuth App at
     [github.com/settings/developers](https://github.com/settings/developers)
     and paste the client ID and secret.

   Both providers need this authorized callback URL, which Supabase shows on
   the provider page:

   ```
   https://<project-ref>.supabase.co/auth/v1/callback
   ```

3. In **Authentication → URL Configuration**, add the app's own callback to
   the redirect allow list:

   ```
   http://localhost:3000/auth/callback
   https://mcpfy.ai/auth/callback
   ```

Without these variables the marketing site still builds and runs; the login
form just reports that auth is not configured, and `/dashboard` is left
unguarded so the UI can be previewed locally.

### Routes

| Route | What it is |
| --- | --- |
| `/cloud` | Login / signup. Redirects to `/dashboard` when a session exists. |
| `/auth/callback` | Exchanges the OAuth or magic-link code for a session cookie. |
| `/auth/signout` | `POST` only; clears the session and returns to `/cloud`. |
| `/dashboard` | Org overview: stats, needs-attention, server list. |
| `/dashboard/servers/[slug]/[section]` | Per-server tabs — deployments, logs, sessions, gateway, analytics, env vars, domains, publish checks, submission pack, public chat, settings. |

Dashboard data is mocked in `src/lib/dashboard.ts`. Every screen reads from
there, so wiring a real backend means replacing those accessors rather than
touching the UI.
