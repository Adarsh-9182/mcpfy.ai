"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { GithubIcon, GoogleIcon } from "@/components/site/icons";
import { cn } from "@/lib/utils";

type Provider = "google" | "github";
type Pending = Provider | "email" | null;

const LAST_USED_KEY = "mcpfy:last-auth-provider";

/** Callback errors arrive as raw provider strings; keep them readable. */
function friendlyError(raw: string | null) {
  if (!raw) return null;
  if (raw === "missing_code") {
    return "That sign-in link is incomplete. Try signing in again.";
  }
  if (raw.includes("code verifier")) {
    return "That sign-in link was opened on a different device or browser. Start again on this one.";
  }
  if (raw === "no_session") {
    return "Sign-in did not complete. Try again — if it keeps happening, allow cookies for this site.";
  }
  return raw;
}

/**
 * Reads the remembered provider from localStorage. useSyncExternalStore keeps
 * the server snapshot (null) and the first client paint in agreement, so the
 * badge appears without a hydration mismatch.
 */
const noopSubscribe = () => () => {};

function useLastUsedProvider(): Provider | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const stored = window.localStorage.getItem(LAST_USED_KEY);
      return stored === "google" || stored === "github" ? stored : null;
    },
    () => null,
  );
}

/** Small pill that straddles the top border of the provider used last time. */
function LastUsedBadge() {
  return (
    <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap border border-rule bg-background px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-signal">
      Last used
    </span>
  );
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
  const lastUsed = useLastUsedProvider();

  function guard() {
    if (supabaseConfigured) return true;
    setError(
      "Auth is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
    return false;
  }

  async function signInWithOAuth(provider: Provider) {
    setError(null);
    if (!guard()) return;
    setPending(provider);
    window.localStorage.setItem(LAST_USED_KEY, provider);

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
      <div>
        <p className="slug text-signal">check your inbox</p>
        <h1 className="display mt-4 text-[34px]">
          The link is on its way.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          We sent a sign-in link to{" "}
          <span className="text-foreground">{email}</span>. Open it on this
          device to continue.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 slug text-muted-foreground underline decoration-signal decoration-1 underline-offset-4 hover:text-signal"
        >
          Use a different email
        </button>
      </div>
    );
  }

  const providerClass =
    "relative inline-flex h-12 items-center justify-center gap-2.5 border border-rule bg-background slug transition-colors hover:border-signal hover:text-signal disabled:opacity-60";

  return (
    <div>
      <div>
        <p className="slug text-signal">access</p>
        <h1 className="display mt-4 text-[38px] sm:text-[44px]">
          Log in or sign up
        </h1>
      </div>

      <form onSubmit={signInWithEmail} className="mt-9">
        <label htmlFor="email" className="slug block">
          email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mt-2.5 h-12 w-full border-b border-rule bg-transparent px-0 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-signal"
        />
        <button
          type="submit"
          disabled={pending !== null}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-foreground slug text-background transition-colors hover:bg-signal hover:text-signal-foreground disabled:opacity-60"
        >
          {pending === "email" && <Loader2 className="size-4 animate-spin" />}
          Continue
        </button>
      </form>

      <div className="my-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-rule" />
        <span className="slug text-muted-foreground">or continue with</span>
        <span className="h-px flex-1 bg-rule" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => signInWithOAuth("google")}
          disabled={pending !== null}
          className={cn(providerClass, lastUsed === "google" && "border-signal/50")}
        >
          {lastUsed === "google" && <LastUsedBadge />}
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
          className={cn(providerClass, lastUsed === "github" && "border-signal/50")}
        >
          {lastUsed === "github" && <LastUsedBadge />}
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
          className="mt-5 border-l-2 border-destructive bg-destructive/5 px-3.5 py-3 text-[13px] leading-relaxed text-destructive"
        >
          {error}
        </p>
      )}

      <p className="mt-8 border-t border-rule pt-5 text-[13px] leading-relaxed text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/legal/terms" className="text-foreground underline decoration-signal decoration-1 underline-offset-4">
          TOS
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy" className="text-foreground underline decoration-signal decoration-1 underline-offset-4">
          Privacy
        </Link>
      </p>
    </div>
  );
}
