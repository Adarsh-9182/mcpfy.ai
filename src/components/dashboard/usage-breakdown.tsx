"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function UsageBreakdown({
  rows,
}: {
  rows: { item: string; qty: string; rate: string; amount: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-[14px] font-medium transition-colors hover:bg-accent/50"
      >
        Usage breakdown
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <table className="w-full border-t text-[14px]">
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.item}>
                <td className="px-5 py-3">{r.item}</td>
                <td className="px-5 py-3 text-right nums-tabular text-muted-foreground">
                  {r.qty}
                </td>
                <td className="px-5 py-3 text-right text-muted-foreground">
                  {r.rate}
                </td>
                <td className="px-5 py-3 text-right nums-tabular">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
