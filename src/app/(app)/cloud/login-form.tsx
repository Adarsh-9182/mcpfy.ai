"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { GithubIcon } from "@/components/site/icons";
import { GoogleIcon } from "@/components/site/icons";

type Pending = "google" | "github" | "email" | null;

/** Callback errors arrive as raw provider strings; keep them readable. */
function friendlyError(raw: string | null) {
  if (!raw) return null;
  if (raw === "missing_code") {
    return "That sign-in link is incomplete. Try signing in again.";
  }
  if (raw.includes("code verifier")) {
    return "That sign-in link was opened on a different device or browser. Start again on this one.";
  }
  return raw;
}

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [pending, setPending] = useState<Pending>(null);
  // The auth callback bounces failures back here as ?error=, so seed from it.
  const [error, setError] = useState<string | null>(() =>
    friendlyError(params.get("error")),
  );
  const [sent, setSent] = useState(false);

  function guard() {
    if (supabaseConfigured) return true;
    setError(
      "Auth is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
    return false;
  }

  async function signInWithOAuth(provider: "google" | "github") {
    setError(null);
    if (!guard()) return;
    setPending(provider);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setError(error.message);
      setPending(null);
    }
  }

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!guard()) return;
    setPending("email");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    setPending(null);
    if (error) setError(error.message);
    else setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-medium tracking-tight">Check your inbox</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          We sent a sign-in link to <span className="text-foreground">{email}</span>.
          Open it on this device to continue.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-[14px] font-medium underline underline-offset-4"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-medium tracking-tight">
        Log in or sign up
      </h1>

      <form onSubmit={signInWithEmail} className="mt-8 space-y-3">
        <label htmlFor="email" className="block text-[13px] font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-11 w-full rounded-lg border bg-background px-3.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
        />
        <button
          type="submit"
          disabled={pending !== null}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-[15px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending === "email" && <Loader2 className="size-4 animate-spin" />}
          Continue
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[12px] text-muted-foreground">Or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => signInWithOAuth("google")}
          disabled={pending !== null}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border bg-background text-[15px] font-medium transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending === "google" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <GoogleIcon className="size-[18px]" />
          )}
          Google
        </button>
        <button
          type="button"
          onClick={() => signInWithOAuth("github")}
          disabled={pending !== null}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border bg-background text-[15px] font-medium transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending === "github" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <GithubIcon className="size-[18px]" />
          )}
          GitHub
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-500/30 bg-red-500/5 px-3.5 py-3 text-[13px] leading-relaxed text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
