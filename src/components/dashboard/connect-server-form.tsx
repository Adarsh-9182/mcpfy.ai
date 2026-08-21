"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { connectServer, type ActionState } from "@/lib/db/actions";
import { cn } from "@/lib/utils";
import { fieldClass } from "./ui";

const initial: ActionState = { error: null };

/** URL form for attaching an already-hosted MCP server. */
export function ConnectServerForm() {
  const [url, setUrl] = useState("");
  const [state, formAction, pending] = useActionState(connectServer, initial);
  const valid = /^https?:\/\/.+/i.test(url.trim());

  return (
    <form action={formAction} className="w-full space-y-2.5 sm:max-w-md">
      <input
        type="url"
        name="url"
        inputMode="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://your-mcp-server.com/mcp"
        aria-label="MCP server URL"
        className={cn(fieldClass, "h-11")}
      />
      <button
        type="submit"
        disabled={!valid || pending}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-[14px] font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted-foreground/60 disabled:opacity-100"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        Connect MCP
      </button>
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-[13px] text-red-600 dark:text-red-400"
        >
          {state.error}
        </p>
      )}
    </form>
  );
}
