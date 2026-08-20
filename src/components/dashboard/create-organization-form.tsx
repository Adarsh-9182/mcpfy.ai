"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Input, Label } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function CreateOrganizationForm({
  defaultName,
}: {
  defaultName: string;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const name = String(
      new FormData(event.currentTarget).get("name") ?? "",
    ).trim();

    const slug = `${name}-${Date.now().toString(36)}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const result = await authClient.organization.create({ name, slug });
    if (result.error) {
      setError(result.error.message ?? "Could not create the workspace.");
      setPending(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border bg-card/40 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Workspace name</Label>
        <Input id="name" name="name" defaultValue={defaultName} required />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[13px] text-destructive"
        >
          {error}
        </p>
      )}

      <ShimmerButton type="submit" disabled={pending} className="mt-6 h-12 w-full">
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Continue"}
      </ShimmerButton>
    </form>
  );
}
