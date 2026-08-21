import Link from "next/link";
import { ArrowUpRight, HelpCircle, Undo2 } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import { ConnectServerForm } from "@/components/dashboard/connect-server-form";
import { UseTemplateButton } from "@/components/dashboard/use-template-button";
import { starterTemplates } from "@/lib/dashboard";

export const metadata = { title: "New server" };

export default function NewServerPage() {
  return (
    <>
      <Link
        href="/dashboard/servers"
        className="inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <Undo2 className="size-4" />
        Back to servers
      </Link>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <section>
          <h1 className="flex items-center gap-2.5 text-[20px] font-semibold tracking-tight">
            <GithubIcon className="size-5" />
            Import from GitHub
          </h1>

          <div className="mt-5 flex flex-col items-center justify-center rounded-xl border px-6 py-14 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <GithubIcon className="size-6 text-muted-foreground" />
            </span>
            <h2 className="mt-5 text-[15px] font-medium">Connect to GitHub</h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Connect your GitHub account to deploy repositories
            </p>
            <button
              type="button"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
            >
              Connect GitHub
            </button>
            <p className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <HelpCircle className="size-3.5" />
              Having trouble?{" "}
              <Link
                href="/dashboard/integrations"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Reinstall the GitHub App.
              </Link>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold tracking-tight">
            Build Something New
          </h2>

          <div className="relative isolate mt-5 flex min-h-[300px] flex-col justify-between overflow-hidden rounded-xl border bg-panel-wash p-7">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grain mix-blend-multiply opacity-30"
            />
            <p className="relative font-serif text-[30px] font-medium leading-tight tracking-tight text-zinc-900">
              Vibecode your MCP App
            </p>
            <div className="relative flex justify-end">
              <Link
                href="/vibe"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-zinc-900 px-4 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Try now
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-6 rounded-xl border p-7 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <h2 className="text-[17px] font-semibold tracking-tight">
            Connect an existing server
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            Already hosting your MCP server elsewhere? Connect it by URL to run
            evals, publishing checks, and the submission pack. No deploy
            required.
          </p>
        </div>
        <ConnectServerForm />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold tracking-tight">
          Starter Templates
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {starterTemplates.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border p-6"
            >
              <h3 className="text-[15px] font-medium">{t.name}</h3>
              <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                {t.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <UseTemplateButton
                  name={t.name}
                  repo={t.repo}
                  description={t.description}
                />
                <Link
                  href={`https://github.com/${t.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-4" />
                  Source
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
