"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createServer, type ActionState } from "@/app/dashboard/actions";
import { Input, Label } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const runtimes = [
  { value: "node", label: "Node" },
  { value: "python", label: "Python" },
  { value: "docker", label: "Docker" },
];

export function NewServerForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    createServer,
    {},
  );

  return (
    <form action={action} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="weather-server" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="repoUrl">Repository</Label>
        <Input
          id="repoUrl"
          name="repoUrl"
          placeholder="https://github.com/you/weather-server"
        />
        <p className="text-[12px] text-muted-foreground">
          Leave empty to create a draft and connect a repository later.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="runtime">Runtime</Label>
          <select
            id="runtime"
            name="runtime"
            defaultValue="node"
            className="h-11 rounded-lg border bg-background px-3 text-[15px]"
          >
            {runtimes.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="productionBranch">Production branch</Label>
          <Input
            id="productionBranch"
            name="productionBranch"
            defaultValue="main"
          />
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[13px] text-destructive"
        >
          {state.error}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3">
        <ShimmerButton type="submit" disabled={pending} className="h-11">
          {pending ? <Loader2 className="size-4 animate-spin" /> : "Create server"}
        </ShimmerButton>
        <Link
          href="/dashboard"
          className="text-[14px] text-muted-foreground underline underline-offset-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
