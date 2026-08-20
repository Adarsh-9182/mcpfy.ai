import { cn } from "@/lib/utils";

const tone: Record<string, string> = {
  ready: "bg-emerald-500",
  failed: "bg-red-500",
  draft: "bg-zinc-400",
  queued: "bg-amber-500",
  cloning: "bg-amber-500",
  analyzing: "bg-amber-500",
  building: "bg-amber-500",
  deploying: "bg-amber-500",
  checking: "bg-amber-500",
};

/** The one-glance state of a server or deployment. */
export function StatusDot({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      title={status}
      className={cn(
        "inline-block size-2 shrink-0 rounded-full",
        tone[status] ?? "bg-zinc-400",
        className,
      )}
    />
  );
}
