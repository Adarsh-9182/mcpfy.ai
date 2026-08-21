import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Server,
  Wrench,
} from "lucide-react";
import { CounterCard, CounterRow, Panel } from "@/components/dashboard/ui";
import { WelcomeHero } from "@/components/dashboard/welcome-hero";
import {
  changelog,
  homeStats,
  needsAttention,
  organization,
} from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

const statIcons = {
  server: Server,
  tool: Wrench,
  chat: MessageSquare,
} as const;

/** "priya.nair@acme.com" -> "Priya". Falls back to the whole local part. */
function greetingName(email: string, fullName?: string | null) {
  if (fullName) return fullName.split(" ")[0];
  const local = email.split("@")[0].split(/[._-]/)[0];
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export default async function DashboardHomePage() {
  let email = "you@example.com";
  let fullName: string | null = null;

  if (supabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? email;
    fullName =
      (user?.user_metadata?.full_name as string | undefined) ??
      (user?.user_metadata?.name as string | undefined) ??
      null;
  }

  return (
    <>
      <WelcomeHero
        name={greetingName(email, fullName)}
        organizationName={organization.name}
      />

      <CounterRow>
        {homeStats.map((s) => (
          <CounterCard
            key={s.label}
            icon={statIcons[s.icon]}
            value={s.value}
            label={s.label}
          />
        ))}
      </CounterRow>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Needs Attention" className="flex flex-col">
          {needsAttention.length === 0 ? (
            <p className="flex-1 px-5 py-5 text-[13px] italic text-muted-foreground">
              You will see here items that need attention, like failed
              deployments or issues related to your MCP servers.
            </p>
          ) : (
            <ul className="flex-1 divide-y divide-border/60">
              {needsAttention.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5 px-5 py-4">
                  <AlertTriangle
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      item.severity === "error"
                        ? "text-red-500"
                        : "text-amber-500",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium">{item.title}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium hover:underline"
                  >
                    {item.action}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="flex items-center gap-2 border-t px-5 py-3.5 text-[13px] text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-500" />
            All systems operational
          </p>
        </Panel>

        <Panel
          title="Latest Updates"
          action={
            <Link
              href="/blog"
              className="text-[13px] underline underline-offset-2 hover:text-foreground"
            >
              Changelog
            </Link>
          }
        >
          <ul className="divide-y divide-border/60">
            {changelog.map((entry) => (
              <li key={entry.title} className="px-5 py-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {entry.date}
                </p>
                <p className="mt-2 text-[15px] font-medium">{entry.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
