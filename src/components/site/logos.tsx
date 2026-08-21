import * as React from "react";

/**
 * Wordmarks for the (fictional) customers on the logo wall.
 *
 * A row of plain text names reads as a placeholder; a mark plus a wordmark set
 * in its own weight reads as a logo. All monochrome — they inherit
 * currentColor so the wall stays quiet against the dark chrome.
 */

type LogoProps = { className?: string };

function Wordmark({
  mark,
  name,
  tracking = "-0.02em",
  weight = 600,
  className,
}: {
  mark: React.ReactNode;
  name: string;
  tracking?: string;
  weight?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" aria-hidden>
        {mark}
      </svg>
      <span
        className="whitespace-nowrap text-[16px]"
        style={{ fontWeight: weight, letterSpacing: tracking }}
      >
        {name}
      </span>
    </span>
  );
}

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.7 } as const;

export function Northwind(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Northwind"
      mark={
        <>
          <path d="M4 18 12 4l8 14" {...s} strokeLinejoin="round" />
          <path d="M8 18h8" {...s} strokeLinecap="round" />
        </>
      }
    />
  );
}

export function Aperture(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Aperture"
      weight={500}
      mark={
        <>
          <circle cx="12" cy="12" r="8" {...s} />
          <path d="M12 4v8l7 4" {...s} strokeLinecap="round" />
        </>
      }
    />
  );
}

export function Cogent(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Cogent"
      mark={
        <>
          <rect x="4" y="5" width="16" height="4" rx="1" fill="currentColor" />
          <rect x="4" y="11" width="11" height="4" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="4" y="17" width="6" height="3" rx="1" fill="currentColor" opacity="0.35" />
        </>
      }
    />
  );
}

export function LumenLabs(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Lumen"
      weight={700}
      mark={
        <>
          <circle cx="12" cy="12" r="8.2" {...s} opacity="0.45" />
          <circle cx="12" cy="12" r="3.4" fill="currentColor" />
        </>
      }
    />
  );
}

export function Brightpath(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Brightpath"
      weight={500}
      mark={
        <path
          d="M5 19c4 0 3-6 7-6s3-6 7-6"
          {...s}
          strokeLinecap="round"
        />
      }
    />
  );
}

export function Sundial(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Sundial"
      mark={
        <>
          <path d="M4 17a8 8 0 0 1 16 0" {...s} strokeLinecap="round" />
          <path d="M12 17 16 8" {...s} strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.4" fill="currentColor" />
        </>
      }
    />
  );
}

export function Meridian(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Meridian"
      weight={500}
      mark={
        <>
          <circle cx="12" cy="12" r="8" {...s} />
          <ellipse cx="12" cy="12" rx="3.4" ry="8" {...s} opacity="0.6" />
          <path d="M4.4 9.5h15.2M4.4 14.5h15.2" {...s} opacity="0.6" />
        </>
      }
    />
  );
}

export function Ironclad(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Ironclad"
      weight={700}
      mark={
        <>
          <path d="M12 3.5 19 6v6.2c0 4-3 6.9-7 8.3-4-1.4-7-4.3-7-8.3V6l7-2.5Z" {...s} strokeLinejoin="round" />
          <path d="M9.5 12.2 11.4 14l3.4-3.6" {...s} strokeLinecap="round" strokeLinejoin="round" />
        </>
      }
    />
  );
}

export function BlueHarbor(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Blue Harbor"
      weight={500}
      mark={
        <>
          <path d="M12 4v14" {...s} strokeLinecap="round" />
          <path d="M5 12a7 7 0 0 0 14 0" {...s} strokeLinecap="round" />
          <circle cx="12" cy="4.6" r="1.6" {...s} />
        </>
      }
    />
  );
}

export function Kestrel(p: LogoProps) {
  return (
    <Wordmark
      {...p}
      name="Kestrel"
      mark={
        <path
          d="M4 14c5.5 0 8-2 10-5 .8 4.2-1.2 8.4-5 10 3.6.6 6.8-.6 9-3"
          {...s}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      }
    />
  );
}

export const customerLogos = [
  Northwind,
  Aperture,
  Cogent,
  LumenLabs,
  Brightpath,
  Sundial,
  Meridian,
  Ironclad,
  BlueHarbor,
  Kestrel,
];
