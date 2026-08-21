"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { fieldClass } from "./ui";

/** URL form for attaching an already-hosted MCP server. */
export function ConnectServerForm() {
  const [url, setUrl] = useState("");
  const valid = /^https?:\/\/.+/i.test(url.trim());

  return (
    <form
      className="w-full space-y-2.5 sm:max-w-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="url"
        inputMode="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://your-mcp-server.com/mcp"
        aria-label="MCP server URL"
        className={cn(fieldClass, "h-11")}
      />
      <button
        type="submit"
        disabled={!valid}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground px-4 text-[14px] font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted-foreground/60 disabled:opacity-100"
      >
        Connect MCP
      </button>
    </form>
  );
}
