import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ServerStatus } from "@/lib/dashboard";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-[14px] text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border bg-card/40", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 border-b px-5 py-3.5">
          <div>
            {title && <h2 className="text-[15px] font-medium">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
}) {
  const negative = delta?.startsWith("+") && label.toLowerCase().includes("error");
  return (
    <div className="rounded-xl border bg-card/40 p-5">
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-medium tracking-tight tabular-nums">{value}</p>
      <p className="mt-1.5 flex items-center gap-2 text-[12px] text-muted-foreground">
        {delta && (
          <span
            className={cn(
              "font-medium tabular-nums",
              negative ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400",
            )}
          >
            {delta}
          </span>
        )}
        {hint}
      </p>
    </div>
  );
}

const statusStyles: Record<ServerStatus, { dot: string; label: string }> = {
  ready: { dot: "bg-emerald-500", label: "Ready" },
  building: { dot: "bg-amber-500 animate-pulse", label: "Building" },
  error: { dot: "bg-red-500", label: "Error" },
  paused: { dot: "bg-zinc-400", label: "Paused" },
};

export function StatusBadge({ status }: { status: ServerStatus }) {
  const s = statusStyles[status];
  return (
    <span className="inline-flex items-center gap-2 text-[13px]">
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/* --------------------------------- tables --------------------------------- */

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[14px]">{children}</table>
    </div>
  );
}

export function Th({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-5 py-2.5 text-left text-[12px] font-medium uppercase tracking-wide text-muted-foreground",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("whitespace-nowrap px-5 py-3.5 align-middle", className)}>
      {children}
    </td>
  );
}

export function Tbody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-border/60">{children}</tbody>;
}

export function Thead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b bg-muted/30">
      <tr>{children}</tr>
    </thead>
  );
}

/* -------------------------------- fragments ------------------------------- */

export function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[13px]">{children}</span>;
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center">
      <h3 className="text-[15px] font-medium">{title}</h3>
      <p className="mt-2 max-w-sm text-[14px] text-muted-foreground">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex h-9 items-center rounded-lg bg-foreground px-4 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

/** Minimal bar chart — no chart library, just sized divs. */
export function BarChart({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  return (
    <div className={cn("flex h-40 items-end gap-1", className)}>
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-foreground/15 transition-colors hover:bg-foreground/35"
          style={{ height: `${Math.max((v / max) * 100, 3)}%` }}
          title={`${v.toLocaleString()} calls`}
        />
      ))}
    </div>
  );
}
