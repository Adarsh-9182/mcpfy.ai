import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { FrameSection } from "@/components/site/frame";
import { PageHero } from "@/components/site/page-hero";
import { CreateOrganizationForm } from "@/components/dashboard/create-organization-form";

/**
 * Where a signed-in user with no organisation lands. Kept outside /dashboard
 * because that layout requires an organisation to render at all.
 */
export default async function WelcomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  return (
    <>
      <PageHero
        title="One last thing"
        subtitle="Servers belong to a workspace. Name yours and you are in."
      />
      <FrameSection>
        <div className="mx-auto w-full max-w-md py-16 md:py-24">
          <CreateOrganizationForm
            defaultName={
              session.user.name ? `${session.user.name}'s workspace` : "My workspace"
            }
          />
        </div>
      </FrameSection>
    </>
  );
}
