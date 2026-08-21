import { TeamTabs } from "@/components/dashboard/team-tabs";
import { roles } from "@/lib/dashboard";
import { getTeam } from "@/lib/db/queries";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <div>
        <h1 className="text-[24px] font-semibold tracking-tight">Team</h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Invite and manage members for your organization
        </p>
      </div>

      <TeamTabs members={team} roles={roles} />
    </>
  );
}
