import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { member, organization } from "@/db/schema";

/**
 * The signed-in user plus the organisation their servers belong to.
 *
 * The active organisation is whatever the session points at; if that is unset
 * — a social sign-in that never went through the sign-up form, say — we fall
 * back to the first organisation they are a member of.
 */
export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const activeId = session.session.activeOrganizationId;
  if (activeId) {
    const [org] = await db
      .select()
      .from(organization)
      .where(eq(organization.id, activeId))
      .limit(1);
    if (org) return { user: session.user, organization: org };
  }

  const [fallback] = await db
    .select({ organization })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(eq(member.userId, session.user.id))
    .limit(1);

  // Deliberately outside /dashboard: that layout calls this helper, so sending
  // an org-less user anywhere inside it would redirect in a loop.
  if (!fallback) redirect("/welcome");
  return { user: session.user, organization: fallback.organization };
}
