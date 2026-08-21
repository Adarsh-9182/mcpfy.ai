"use client";

import { useActionState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { createServer, type ActionState } from "@/lib/db/actions";

const initial: ActionState = { error: null };

/**
 * Creates a server from a template. The template's repository is recorded so
 * the server page can point at the code it came from.
 */
export function UseTemplateButton({
  name,
  repo,
  description,
}: {
  name: string;
  repo: string;
  description: string;
}) {
  const [state, formAction, pending] = useActionState(createServer, initial);

  return (
    <form action={formAction} className="contents">
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="repo" value={repo} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="runtime" value="typescript" />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1.5 text-[14px] font-medium underline underline-offset-2 disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <ArrowRight className="size-3.5" />
        )}
        Use template
      </button>
      {state.error && (
        <p role="alert" className="text-[13px] text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
