"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function UserMenu({
  email,
  avatarUrl,
}: {
  email: string;
  avatarUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initial = email.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex size-9 items-center justify-center overflow-hidden rounded-full border bg-muted text-[13px] font-medium transition-colors hover:bg-accent"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="" className="size-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 w-60 overflow-hidden rounded-xl border bg-popover shadow-lg"
        >
          <div className="border-b px-4 py-3">
            <p className="truncate text-[13px] font-medium">{email}</p>
          </div>
          <div className="p-1.5">
            <Link
              href="/dashboard/settings"
              className="block rounded-lg px-2.5 py-2 text-[14px] transition-colors hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Account settings
            </Link>
            <Link
              href="/docs"
              className="block rounded-lg px-2.5 py-2 text-[14px] transition-colors hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Documentation
            </Link>
          </div>
          <form action="/auth/signout" method="post" className="border-t p-1.5">
            <button
              type="submit"
              className="w-full rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors hover:bg-accent"
            >
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
