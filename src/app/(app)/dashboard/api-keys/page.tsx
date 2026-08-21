import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import {
  Mono,
  Pill,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
} from "@/components/dashboard/ui";
import { apiKeys } from "@/lib/dashboard";

export const metadata = { title: "API keys" };

/** The bare logo mark, used as the watermark in the empty table. */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <circle cx="7" cy="7" r="4" />
      <circle cx="17.5" cy="6.5" r="2.6" />
      <circle cx="6.5" cy="17.5" r="2.6" />
      <circle cx="16.5" cy="16.5" r="4.5" />
    </svg>
  );
}

export default function ApiKeysPage() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">API Keys</h1>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            Manage your API keys for programmatic access
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1 text-[14px] underline underline-offset-2"
          >
            Docs
            <ArrowUpRight className="size-3.5" />
          </Link>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            New API Key
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <Thead>
            <Th>Name</Th>
            <Th>Key Preview</Th>
            <Th>Status</Th>
            <Th>Expires</Th>
            <Th>Created</Th>
            <Th>Last Used</Th>
            <Th className="text-right">Actions</Th>
          </Thead>
          <Tbody>
            {apiKeys.length === 0 ? (
              <tr>
                <Td colSpan={7} className="px-5 py-10">
                  <span className="flex items-center gap-5">
                    <Mark className="size-9 text-muted-foreground/40" />
                    <span className="text-[14px] text-muted-foreground">
                      You currently have no API keys. Create one to get started.
                    </span>
                  </span>
                </Td>
              </tr>
            ) : (
              apiKeys.map((k) => (
                <tr key={k.prefix}>
                  <Td className="font-medium">{k.name}</Td>
                  <Td className="text-muted-foreground">
                    <Mono>{k.prefix}••••</Mono>
                  </Td>
                  <Td>
                    <Pill tone={k.status === "active" ? "success" : "danger"}>
                      {k.status === "active" ? "Active" : "Expired"}
                    </Pill>
                  </Td>
                  <Td className="text-muted-foreground">{k.expires}</Td>
                  <Td className="text-muted-foreground">{k.created}</Td>
                  <Td className="text-muted-foreground">{k.lastUsed ?? "—"}</Td>
                  <Td className="text-right">
                    <button
                      type="button"
                      className="text-[13px] font-medium text-red-600 hover:underline dark:text-red-400"
                    >
                      Revoke
                    </button>
                  </Td>
                </tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </>
  );
}
