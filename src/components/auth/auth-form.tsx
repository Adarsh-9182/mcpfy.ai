"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Input, Label } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GithubIcon } from "@/components/site/icons";

type Mode = "sign-in" | "sign-up";

/** Turn whatever Better Auth returned into something worth showing a user. */
function messageFor(error: unknown) {
  if (typeof error === "object" && error && "message" in error) {
    const m = (error as { message?: string }).message;
    if (m) return m;
  }
  return "Something went wrong. Please try again.";
}

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [githubPending, setGithubPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const signingUp = mode === "sign-up";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "");

    const result = signingUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      setError(messageFor(result.error));
      setPending(false);
      return;
    }

    // A server always belongs to an organisation, so make sure a new account
    // has one before it lands on the dashboard.
    if (signingUp) {
      const slug = `${name || email.split("@")[0]}-${Date.now().toString(36)}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      await authClient.organization.create({
        name: name ? `${name}'s workspace` : "My workspace",
        slug,
      });
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function onGithub() {
    setError(null);
    setGithubPending(true);
    const result = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    if (result?.error) {
      setError(messageFor(result.error));
      setGithubPending(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card/40 p-6 sm:p-8">
      <p className="text-[17px] font-medium">
        {signingUp ? "Create your account" : "Welcome back"}
      </p>

      <button
        type="button"
        onClick={onGithub}
        disabled={githubPending || pending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border bg-background text-[15px] font-medium transition-colors hover:bg-accent disabled:opacity-60"
      >
        {githubPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GithubIcon className="size-4" />
        )}
        Continue with GitHub
      </button>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {signingUp && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoComplete="name" required />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            minLength={8}
            autoComplete={signingUp ? "new-password" : "current-password"}
            required
          />
          {signingUp && (
            <p className="text-[12px] text-muted-foreground">
              At least 8 characters.
            </p>
          )}
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[13px] text-destructive"
          >
            {error}
          </p>
        )}

        <ShimmerButton
          type="submit"
          disabled={pending || githubPending}
          className="h-12 w-full"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : signingUp ? (
            "Create account"
          ) : (
            "Sign in"
          )}
        </ShimmerButton>
      </form>

      <p className="mt-6 text-[13px] text-muted-foreground">
        {signingUp ? (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="underline underline-offset-2">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to mcpfy?{" "}
            <Link href="/signup" className="underline underline-offset-2">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
