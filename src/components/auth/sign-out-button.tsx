"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
      className="rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-accent"
    >
      Sign out
    </button>
  );
}
