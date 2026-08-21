"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { deleteServer } from "@/lib/db/actions";

/**
 * Deleting a server is not undoable, so the button asks for the server's name
 * before it will fire — the same guard the destructive flows elsewhere use.
 */
export function DeleteServerButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState("");
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex h-9 shrink-0 items-center rounded-lg border border-red-500/40 px-3.5 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
      >
        Delete server
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <label htmlFor="confirm-delete" className="text-[13px] text-muted-foreground">
        Type <span className="font-mono text-foreground">{name}</span> to confirm
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id="confirm-delete"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          autoComplete="off"
          className="h-9 min-w-52 rounded-lg border bg-background px-3 font-mono text-[13px] outline-none focus:border-foreground/30"
        />
        <button
          type="button"
          disabled={typed !== name || pending}
          onClick={() => startTransition(() => void deleteServer(slug))}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-red-600 px-3.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          Delete
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setTyped("");
          }}
          className="inline-flex h-9 items-center rounded-lg border px-3.5 text-[14px] font-medium transition-colors hover:bg-accent"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
