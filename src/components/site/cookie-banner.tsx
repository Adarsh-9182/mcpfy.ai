"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "mcpfy.cookie-consent";

/* A tiny external store so the banner can read localStorage without a
   setState-in-effect mount guard. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): string {
  // localStorage throws in blocked/private contexts — treat that as "undecided".
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

// Hidden during SSR so the first client paint matches the server markup.
function getServerSnapshot(): string {
  return "ssr";
}

function decide(value: "accepted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore — the banner still dismisses for this session */
  }
  listeners.forEach((l) => l());
}

export function CookieBanner() {
  const consent = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const visible = consent === "";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl border bg-popover p-4 shadow-xl"
        >
          <p className="text-sm font-medium">Cookie preferences</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            We use cookies to improve your experience. See our{" "}
            <Link
              href="/legal/privacy"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => decide("denied")}
            >
              Deny
            </Button>
            <Button size="sm" className="flex-1" onClick={() => decide("accepted")}>
              Accept all
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
