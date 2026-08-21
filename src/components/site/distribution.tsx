import { Section, SectionHeading, Tag, ArrowLink } from "./section";
import { Reveal } from "./reveal";
import { ScrollScene } from "./scroll-scene";
import { surfaceGroups } from "@/lib/content";

/**
 * Distribution, drawn as the thing it actually is: one build on the left,
 * wires fanning out to every client on the right, with a packet running down
 * each wire. Replaces the connector-directory mock, which was the same
 * picture every other MCP platform puts here.
 *
 * The comets are pure CSS on `stroke-dashoffset`, so the site-wide
 * reduced-motion rule stops them without any extra handling.
 */

const targets = [
  { name: "ChatGPT", kind: "MCP App", latency: "38ms" },
  { name: "Claude", kind: "Connector", latency: "41ms" },
  { name: "Gemini Enterprise", kind: "MCP Server", latency: "52ms" },
  { name: "Cursor · VS Code", kind: "MCP Server", latency: "36ms" },
  { name: "Your agent runtime", kind: "MCP Server", latency: "29ms" },
];

const VB = { w: 640, h: 372 };
const NODE = { x: 16, y: 144, w: 156, h: 84 };
const CHIP = { x: 398, w: 226, h: 46 };
const TOP = 18;
const GAP = 68;

function wirePath(i: number) {
  const y = TOP + i * GAP + CHIP.h / 2;
  const sx = NODE.x + NODE.w;
  const sy = NODE.y + NODE.h / 2;
  return `M${sx},${sy} C${sx + 110},${sy} ${CHIP.x - 120},${y} ${CHIP.x},${y}`;
}

function RoutingDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[var(--r-3)] surface-3 edge-lit">
      <div aria-hidden className="absolute inset-0 bloom opacity-70" />

      <div className="relative flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[12.5px] font-medium">Live routing</span>
        <span className="font-mono text-[11px] text-t-lo">
          1 build → {targets.length} surfaces
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="relative block w-full"
        role="img"
        aria-label="One deployment routed to five MCP clients"
      >
        <defs>
          <linearGradient id="sig" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--sig-a)" />
            <stop offset="52%" stopColor="var(--sig-b)" />
            <stop offset="100%" stopColor="var(--sig-c)" />
          </linearGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* wires */}
        {targets.map((t, i) => (
          <g key={t.name}>
            <path
              d={wirePath(i)}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1.2"
            />
            <path
              d={wirePath(i)}
              fill="none"
              stroke="url(#sig)"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="url(#glow)"
              className="wire-comet"
              style={{ animationDelay: `${i * 0.55}s` }}
            />
            {/* a second, slower packet keeps every wire feeling occupied */}
            <path
              d={wirePath(i)}
              fill="none"
              stroke="url(#sig)"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="wire-comet wire-comet-slow"
              style={{ animationDelay: `${1.9 + i * 0.4}s` }}
            />
          </g>
        ))}

        {/* source */}
        <g>
          <rect
            x={NODE.x}
            y={NODE.y}
            width={NODE.w}
            height={NODE.h}
            rx="14"
            fill="var(--n-2)"
            stroke="var(--line-strong)"
          />
          <text
            x={NODE.x + 16}
            y={NODE.y + 32}
            className="fill-t-lo"
            style={{ fontSize: 11, fontFamily: "var(--mono-family)" }}
          >
            deployment
          </text>
          <text
            x={NODE.x + 16}
            y={NODE.y + 54}
            className="fill-t-hi"
            style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            acme-mcp
          </text>
          <circle cx={NODE.x + 20} cy={NODE.y + 70} r="3" fill="var(--live)" />
          <text
            x={NODE.x + 30}
            y={NODE.y + 74}
            className="fill-t-mid"
            style={{ fontSize: 11 }}
          >
            main · 12s ago
          </text>
        </g>

        {/* clients */}
        {targets.map((t, i) => {
          const y = TOP + i * GAP;
          return (
            <g key={t.name}>
              <rect
                x={CHIP.x}
                y={y}
                width={CHIP.w}
                height={CHIP.h}
                rx="12"
                fill="var(--n-1)"
                stroke="var(--line)"
              />
              <circle cx={CHIP.x + 18} cy={y + CHIP.h / 2} r="3" fill="var(--live)" />
              <text
                x={CHIP.x + 32}
                y={y + 20}
                className="fill-t-hi"
                style={{ fontSize: 12.5, fontWeight: 500 }}
              >
                {t.name}
              </text>
              <text
                x={CHIP.x + 32}
                y={y + 36}
                className="fill-t-lo"
                style={{ fontSize: 11 }}
              >
                {t.kind}
              </text>
              <text
                x={CHIP.x + CHIP.w - 14}
                y={y + 30}
                textAnchor="end"
                className="fill-t-mid"
                style={{ fontSize: 11, fontFamily: "var(--mono-family)" }}
              >
                {t.latency}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Distribution() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Distribution"
              title="One deploy. Every client, already connected."
              lead="Push once and the same server answers in ChatGPT, in Claude, and in your own agents."
              leadDim="No forks, no per-client rewrites, no second pipeline."
            />

            <div className="mt-10 flex flex-col gap-6">
              {surfaceGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[12.5px] font-medium text-t-lo">
                    {group.label}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <ArrowLink href="/docs">Start building</ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ScrollScene intensity={0.9}>
            <RoutingDiagram />
          </ScrollScene>
        </Reveal>
      </div>
    </Section>
  );
}
