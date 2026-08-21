import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

/** The gradient greeting card at the top of the dashboard home. */
export function WelcomeHero({
  name,
  organizationName,
}: {
  name: string;
  organizationName: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border border-rule bg-foreground text-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06] mix-blend-screen"
      />

      <div className="relative flex min-h-[300px] flex-col justify-between gap-10 p-7 sm:p-9">
        <div>
          <p className="slug opacity-60">
            Welcome
          </p>
          <h1 className="display mt-4 text-[36px] sm:text-[46px]">
            Hi, {name}
          </h1>
          <p className="mt-3 font-mono text-[12px] opacity-70">
            Organization: {organizationName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/dashboard/servers/new"
            className="inline-flex h-11 items-center gap-2 bg-background px-5 slug text-foreground transition-colors hover:bg-signal hover:text-signal-foreground"
          >
            <Plus className="size-4" />
            New Server
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 slug opacity-70 transition-opacity hover:opacity-100"
          >
            Read the docs
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
