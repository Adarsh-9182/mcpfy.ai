import { Trash2 } from "lucide-react";
import { OrgSettingsForm } from "@/components/dashboard/org-settings-form";
import { getCurrentOrganization } from "@/lib/db/queries";

export const metadata = { title: "Organization" };

export default async function OrgSettingsPage() {
  const organization = await getCurrentOrganization();
  if (!organization) return null;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-7">
      <div>
        <h1 className="text-[24px] font-semibold tracking-tight">
          Edit Organization
        </h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          Update your organization&apos;s name, logo, and description.
        </p>
      </div>

      <OrgSettingsForm organization={organization} />

      <section className="flex flex-col gap-5 rounded-xl border border-red-500/25 bg-red-500/[0.04] p-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-[17px] font-semibold tracking-tight text-red-600 dark:text-red-400">
            Delete organization
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-red-600/85 dark:text-red-400/85">
            Deleting this organization is permanent and cannot be undone. All
            servers, agents, and data associated with this organization will be
            removed.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-red-500/40 px-4 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
        >
          <Trash2 className="size-4" />
          Delete organization
        </button>
      </section>
    </div>
  );
}
