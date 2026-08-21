import type { Metadata } from "next";

/**
 * Internal spec sheet for the staged redesign. Not linked from anywhere and
 * excluded from indexing — it exists so each part of the system can be
 * reviewed on its own before the sections are rebuilt on top of it.
 */
export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

function Row({
  label,
  children,
  note,
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="grid gap-5 border-t border-line py-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
      <div>
        <h2 className="text-[15px] font-medium">{label}</h2>
        {note && (
          <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-t-mid">
            {note}
          </p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Swatch({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  return (
    <div>
      <div
        className={`h-16 rounded-[var(--r-1)] border border-line ${className}`}
      />
      <p className="mt-2 text-[12px] font-medium">{name}</p>
      <p className="font-mono text-[11px] text-t-lo">{value}</p>
    </div>
  );
}

const neutrals = [
  { name: "canvas", value: "--n-canvas", cls: "bg-canvas" },
  { name: "n-1", value: "--n-1", cls: "bg-n1" },
  { name: "n-2", value: "--n-2", cls: "bg-n2" },
  { name: "n-3", value: "--n-3", cls: "bg-n3" },
  { name: "n-4", value: "--n-4", cls: "bg-n4" },
  { name: "n-5", value: "--n-5", cls: "bg-n5" },
  { name: "n-6", value: "--n-6", cls: "bg-n6" },
];

export default function StyleGuidePage() {
  return (
    <div className="container-page py-16">
      <header className="max-w-2xl">
        <p className="font-mono text-[12px] text-t-lo">Part 1 / 20</p>
        <h1 className="mt-4 text-[40px] font-semibold leading-[1.05] tracking-[-0.035em]">
          Signal
        </h1>
        <p className="mt-5 text-[16px] leading-[1.6] text-t-mid">
          <span className="text-t-hi">
            MCP is the wire between a model and the world.
          </span>{" "}
          So the chrome is instrument-grade and almost colourless — true
          neutral greys, white primary actions, no coloured buttons anywhere.
          One violet→cyan spectrum appears only where the protocol is doing
          work: the wire, live data, focus.
        </p>
      </header>

      <div className="mt-16">
        <Row
          label="Neutral scale"
          note="True greys, no hue. Every product in this category tints its greys blue; staying neutral is what makes the surfaces read as material."
        >
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {neutrals.map((n) => (
              <Swatch key={n.name} name={n.name} value={n.value} className={n.cls} />
            ))}
          </div>
        </Row>

        <Row
          label="Text roles"
          note="Three levels only. Anything that needs a fourth is a layout problem, not a colour problem."
        >
          <div className="flex flex-col gap-3">
            <p className="text-[20px] text-t-hi">
              High — headings and primary copy
            </p>
            <p className="text-[16px] text-t-mid">
              Mid — body copy, descriptions, supporting text
            </p>
            <p className="text-[14px] text-t-lo">
              Low — metadata, captions, disabled states
            </p>
          </div>
        </Row>

        <Row
          label="The signal"
          note="Reserved. It is never a button, never a card background, never decoration — only the wire, live data and focus."
        >
          <div className="flex flex-col gap-6">
            <div className="h-16 rounded-[var(--r-1)] signal-line" />
            <div className="flex flex-wrap items-center gap-8">
              <span className="signal-text text-[28px] font-semibold tracking-[-0.03em]">
                Gradient text
              </span>
              <span className="signal-border inline-flex items-center rounded-[var(--r-pill)] px-4 py-2 text-[13px]">
                Signal border
              </span>
              <span className="h-px w-40 signal-line" />
            </div>
          </div>
        </Row>

        <Row label="Status" note="Carried by colour, never by a label alone.">
          <div className="flex flex-wrap gap-3">
            {[
              { name: "live", cls: "bg-live/12 text-live", dot: "bg-live" },
              { name: "warn", cls: "bg-warn/12 text-warn", dot: "bg-warn" },
              { name: "fail", cls: "bg-fail/12 text-fail", dot: "bg-fail" },
            ].map((s) => (
              <span
                key={s.name}
                className={`inline-flex items-center gap-2 rounded-[var(--r-pill)] px-3 py-1.5 text-[13px] font-medium ${s.cls}`}
              >
                <span className={`size-1.5 rounded-full ${s.dot}`} />
                {s.name}
              </span>
            ))}
          </div>
        </Row>

        <Row
          label="Materials"
          note="Every raised surface carries a specular top edge. That hairline of light is what stops dark UI reading as flat blocks."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["surface", "surface", "flat card — the workhorse"],
              ["surface-2", "surface-2", "raised: popovers, hovers"],
              ["surface-3", "surface-3", "product windows"],
              ["glass", "glass", "frosted chrome"],
              ["inset-well", "inset-well", "code and inputs sit below"],
              ["edge-lit", "surface-2 edge-lit", "specular top edge"],
            ].map(([name, cls, desc]) => (
              <div
                key={name}
                className={`rounded-[var(--r-2)] p-5 ${cls}`}
              >
                <p className="font-mono text-[12px]">{name}</p>
                <p className="mt-1.5 text-[12.5px] text-t-mid">{desc}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[var(--r-3)] border border-line">
            <div aria-hidden className="absolute inset-0 bloom" />
            <p className="relative px-5 py-10 text-center font-mono text-[12px] text-t-mid">
              bloom
            </p>
          </div>
        </Row>

        <Row label="Radii" note="Softer than the genre standard — 8 / 12 / 18 / 26.">
          <div className="flex flex-wrap gap-4">
            {[
              ["r-1", "8px"],
              ["r-2", "12px"],
              ["r-3", "18px"],
              ["r-4", "26px"],
            ].map(([n, v]) => (
              <div key={n} className="text-center">
                <div
                  className="size-24 border border-line bg-n2"
                  style={{ borderRadius: `var(--${n})` }}
                />
                <p className="mt-2 font-mono text-[11px] text-t-lo">
                  {n} · {v}
                </p>
              </div>
            ))}
          </div>
        </Row>

        <Row
          label="Buttons"
          note="The primary action is white on dark, black on light. No coloured CTA anywhere on the site — that inversion is the biggest break from the category."
        >
          <div className="flex flex-wrap items-center gap-3">
            <button className="h-10 rounded-[var(--r-1)] bg-t-hi px-4 text-[14px] font-medium text-canvas transition-opacity duration-[var(--d-2)] hover:opacity-90">
              Primary
            </button>
            <button className="h-10 rounded-[var(--r-1)] border border-line bg-n1 px-4 text-[14px] font-medium transition-colors duration-[var(--d-2)] hover:border-line-strong hover:bg-n2">
              Secondary
            </button>
            <button className="h-10 rounded-[var(--r-1)] px-4 text-[14px] font-medium text-t-mid transition-colors duration-[var(--d-2)] hover:bg-n2 hover:text-t-hi">
              Ghost
            </button>
          </div>
        </Row>

        <Row
          label="Motion"
          note="One house curve — expo out. Everything decelerates the same way, which is what makes a page feel like one object."
        >
          <dl className="grid gap-x-8 gap-y-3 font-mono text-[12.5px] sm:grid-cols-2">
            {[
              ["--e-out", "cubic-bezier(.16,1,.3,1) — house curve"],
              ["--e-in-out", "cubic-bezier(.65,0,.35,1)"],
              ["--e-spring", "cubic-bezier(.34,1.56,.64,1)"],
              ["--d-1 … --d-4", "120 / 200 / 340 / 620ms"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="shrink-0 text-t-hi">{k}</dt>
                <dd className="text-t-lo">{v}</dd>
              </div>
            ))}
          </dl>
        </Row>
      </div>
    </div>
  );
}
