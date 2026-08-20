import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { schema } from "@/db/schema";

const githubId = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  emailAndPassword: {
    enabled: true,
    // No transactional email provider is wired up yet, so accounts are usable
    // immediately rather than stranded behind an email nobody can send.
    requireEmailVerification: false,
  },
  // GitHub is how servers get deployed, so it is the social provider that
  // matters here. Configured only when credentials are present.
  socialProviders:
    githubId && githubSecret
      ? { github: { clientId: githubId, clientSecret: githubSecret } }
      : {},
  plugins: [
    organization({
      // Every deployed server belongs to an organisation, so a personal one is
      // created on sign-up and set active for the first session.
      allowUserToCreateOrganization: true,
    }),
    // Must stay last: it forwards Better Auth's Set-Cookie headers through
    // Next's server-action and route-handler boundaries.
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
