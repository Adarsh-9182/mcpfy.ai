import { PageHeader, Panel } from "@/components/dashboard/ui";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { organization } from "@/lib/dashboard";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  let email = "you@example.com";
  let provider = "email";

  if (supabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? email;
    provider = user?.app_metadata?.provider ?? provider;
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="Your account and this organization."
      />

      <Panel title="Account">
        <dl className="divide-y divide-border/60">
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-44 shrink-0 text-[14px] text-muted-foreground">Email</dt>
            <dd className="text-[14px]">{email}</dd>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-44 shrink-0 text-[14px] text-muted-foreground">
              Signed in with
            </dt>
            <dd className="text-[14px] capitalize">{provider}</dd>
          </div>
        </dl>
      </Panel>

      <Panel title="Organization">
        <dl className="divide-y divide-border/60">
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-44 shrink-0 text-[14px] text-muted-foreground">Name</dt>
            <dd className="flex-1 text-[14px]">{organization.name}</dd>
            <button type="button" className="text-[13px] font-medium hover:underline">
              Edit
            </button>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5">
            <dt className="w-44 shrink-0 text-[14px] text-muted-foreground">Slug</dt>
            <dd className="flex-1 font-mono text-[13px]">{organization.slug}</dd>
            <button type="button" className="text-[13px] font-medium hover:underline">
              Edit
            </button>
          </div>
        </dl>
      </Panel>

      <Panel title="Danger zone" className="border-red-500/30">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-[14px] font-medium">Delete organization</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Deletes every server, domain and log in {organization.name}.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg border border-red-500/40 px-3.5 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
          >
            Delete organization
          </button>
        </div>
      </Panel>
    </>
  );
}
