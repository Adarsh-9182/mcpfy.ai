"use client";

import { useMemo, useState } from "react";
import { ListFilter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Member, MemberStatus } from "@/lib/dashboard";
import { Pill, Table, Tbody, Td, Th, Thead, fieldClass } from "./ui";

const tabs = ["Members", "Roles & permissions"] as const;
type Tab = (typeof tabs)[number];

const statusCycle: (MemberStatus | "all")[] = ["all", "active", "invited"];

/** Purple initial disc, matching the member avatars in the members table. */
function MemberAvatar({ name }: { name: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[13px] font-medium text-white">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

/** Header cell whose label collapses into a filter input when toggled. */
function SearchableTh({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Th>
      {open || value ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => !value && setOpen(false)}
          placeholder={`Filter ${label.toLowerCase()}`}
          aria-label={`Filter by ${label.toLowerCase()}`}
          className={cn(fieldClass, "h-7 w-40 text-[13px] font-normal normal-case")}
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 uppercase transition-colors hover:text-foreground"
        >
          {label}
          <Search className="size-3.5" />
        </button>
      )}
    </Th>
  );
}

export function TeamTabs({
  members,
  roles,
}: {
  members: Member[];
  roles: readonly { role: string; can: string }[];
}) {
  const [tab, setTab] = useState<Tab>("Members");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [statusIndex, setStatusIndex] = useState(0);
  const [invite, setInvite] = useState("");
  const [role, setRole] = useState("Member");

  const status = statusCycle[statusIndex];

  const visible = useMemo(
    () =>
      members.filter(
        (m) =>
          m.name.toLowerCase().includes(nameFilter.trim().toLowerCase()) &&
          m.email.toLowerCase().includes(emailFilter.trim().toLowerCase()) &&
          (status === "all" || m.status === status),
      ),
    [members, nameFilter, emailFilter, status],
  );

  const canInvite = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(invite.trim());

  return (
    <>
      <div role="tablist" className="flex gap-6 border-b">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 pb-2.5 text-[14px] transition-colors",
              tab === t
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Members" ? (
        <>
          <div>
            <p className="text-[14px] font-medium">Invite teammates</p>
            <form
              className="mt-3 flex flex-wrap items-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setInvite("");
              }}
            >
              <input
                type="email"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="colleague@example.com"
                aria-label="Email to invite"
                className={cn(fieldClass, "w-full rounded-full sm:w-72")}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Role"
                className={cn(fieldClass, "w-40 rounded-full")}
              >
                <option>Member</option>
                <option>Admin</option>
                <option>Viewer</option>
              </select>
              <button
                type="submit"
                disabled={!canInvite}
                className="inline-flex h-10 items-center rounded-full bg-foreground px-4 text-[14px] font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted-foreground/60 disabled:opacity-100"
              >
                Send invite
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <Table>
              <Thead>
                <SearchableTh
                  label="Member"
                  value={nameFilter}
                  onChange={setNameFilter}
                />
                <SearchableTh
                  label="Email"
                  value={emailFilter}
                  onChange={setEmailFilter}
                />
                <Th>
                  <button
                    type="button"
                    onClick={() =>
                      setStatusIndex((i) => (i + 1) % statusCycle.length)
                    }
                    className="inline-flex items-center gap-1.5 uppercase transition-colors hover:text-foreground"
                  >
                    Status
                    <ListFilter className="size-3.5" />
                    {status !== "all" && (
                      <span className="normal-case text-foreground">
                        : {status}
                      </span>
                    )}
                  </button>
                </Th>
                <Th>Role</Th>
                <Th>Last activity</Th>
              </Thead>
              <Tbody>
                {visible.map((m) => (
                  <tr key={m.email}>
                    <Td>
                      <span className="flex items-center gap-3">
                        <MemberAvatar name={m.name} />
                        <span className="font-medium">
                          {m.name}
                          {m.you && (
                            <span className="text-muted-foreground"> (You)</span>
                          )}
                        </span>
                      </span>
                    </Td>
                    <Td className="text-muted-foreground">{m.email}</Td>
                    <Td>
                      <Pill tone={m.status === "active" ? "success" : "warning"}>
                        {m.status === "active" ? "Active" : "Invited"}
                      </Pill>
                    </Td>
                    <Td>
                      <Pill>{m.role}</Pill>
                    </Td>
                    <Td className="text-muted-foreground">
                      {m.lastActivity ?? "—"}
                    </Td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <Td colSpan={5} className="py-10 text-center text-muted-foreground">
                      No members match those filters.
                    </Td>
                  </tr>
                )}
              </Tbody>
            </Table>
          </div>
        </>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <dl className="divide-y divide-border/60">
            {roles.map((r) => (
              <div key={r.role} className="flex gap-4 px-5 py-4">
                <dt className="w-32 shrink-0 text-[14px] font-medium">
                  {r.role}
                </dt>
                <dd className="text-[14px] text-muted-foreground">{r.can}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
}
