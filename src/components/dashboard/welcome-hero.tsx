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
    <section className="relative isolate overflow-hidden rounded-2xl border bg-hero-wash">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain mix-blend-multiply opacity-30"
      />

      <div className="relative flex min-h-[300px] flex-col justify-between gap-10 p-7 text-zinc-900 sm:p-9">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            Welcome
          </p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-tight sm:text-[40px]">
            Hi, {name}
          </h1>
          <p className="mt-2 text-[15px] text-zinc-600">
            Organization: {organizationName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/dashboard/servers/new"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            New Server
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1 text-[15px] text-zinc-900 underline underline-offset-4"
          >
            Read the docs
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
