"use client";

import * as React from "react";

/**
 * The live background: traffic moving along the protocol wires.
 *
 * Craft notes, because each of these is the difference between this reading
 * as a screensaver and reading as instrumentation:
 *
 * - Wires are arc-length parameterised. A bezier's `t` is not proportional to
 *   distance, so stepping `t` makes packets visibly surge on the straights and
 *   crawl through the curves. Every wire is resampled into a table of
 *   cumulative distances and packets move in pixels per second along it.
 * - Motion is delta-timed, so a 120Hz display does not run the field twice as
 *   fast as a 60Hz one.
 * - Trails are tapered strokes, not chains of dots. A dot chain is what makes
 *   this kind of effect look beady.
 * - Three depth layers, each with its own speed, weight and parallax, so the
 *   field has somewhere to recede to.
 * - Colour is rationed: most packets are the page's own ink, and only a third
 *   carry the spectrum.
 * - The pointer acts as a torch — wires brighten inside a radius around it,
 *   rather than the field chasing the cursor.
 *
 * It caps DPR at 2, pauses on a hidden tab, follows the theme, and renders one
 * static frame when the visitor has asked for reduced motion.
 */

type Pt = { x: number; y: number };
type Wire = { pts: Pt[]; cum: number[]; len: number; layer: number };
type Packet = {
  wire: number;
  dist: number;
  speed: number;
  trail: number;
  tint: [number, number, number] | null;
};

const SAMPLES = 220;
const TORCH_RADIUS = 260;

/** far → near. Depth is carried by weight, speed and parallax together. */
const LAYERS = [
  { wires: 3, alpha: 0.55, width: 0.8, speed: 26, parallax: 14, packets: 2 },
  { wires: 3, alpha: 0.8, width: 1.15, speed: 46, parallax: 30, packets: 3 },
  { wires: 2, alpha: 1, width: 1.5, speed: 74, parallax: 54, packets: 3 },
];

const SPECTRUM: [number, number, number][] = [
  [139, 92, 255],
  [109, 139, 255],
  [53, 216, 245],
];

function tintAt(t: number): [number, number, number] {
  const s = Math.min(0.9999, Math.max(0, t)) * (SPECTRUM.length - 1);
  const i = Math.floor(s);
  const f = s - i;
  const a = SPECTRUM[i];
  const b = SPECTRUM[Math.min(SPECTRUM.length - 1, i + 1)];
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
  ];
}

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

/** Resample a cubic into evenly-indexed points plus a distance table. */
function buildWire(p0: Pt, p1: Pt, p2: Pt, p3: Pt, layer: number): Wire {
  const pts: Pt[] = [];
  const cum: number[] = [0];
  for (let i = 0; i < SAMPLES; i++) {
    pts.push(cubic(p0, p1, p2, p3, i / (SAMPLES - 1)));
    if (i > 0) {
      const a = pts[i - 1];
      const b = pts[i];
      cum.push(cum[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
    }
  }
  return { pts, cum, len: cum[cum.length - 1], layer };
}

function pointAt(w: Wire, d: number): Pt {
  const target = ((d % w.len) + w.len) % w.len;
  let lo = 0;
  let hi = w.cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (w.cum[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  const i = Math.max(1, lo);
  const span = w.cum[i] - w.cum[i - 1] || 1;
  const f = (target - w.cum[i - 1]) / span;
  const a = w.pts[i - 1];
  const b = w.pts[i];
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

export function SignalField() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let wires: Wire[] = [];
    let packets: Packet[] = [];
    let nodes: { wire: number; dist: number }[] = [];
    let raf = 0;
    let last = 0;
    let boost = 0;
    let scrollNorm = 0;
    let lastScroll = window.scrollY;
    const pointer = { x: -9999, y: -9999, on: 0 };

    const build = () => {
      // Phones carry a thinner field — fewer wires and packets, and the DPR is
      // capped harder because the fill rate, not the maths, is the limit.
      const small = window.innerWidth < 720;
      const dpr = Math.min(small ? 1.5 : 2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";

      wires = [];
      packets = [];
      nodes = [];

      // Wires are generated past the top and bottom edges so the parallax
      // offset never drags an end into view.
      const overscan = h * 0.35;
      let seed = 1;
      const rand = () => {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        return seed / 2147483648;
      };

      LAYERS.forEach((layer, li) => {
        const wireCount = small ? Math.max(1, layer.wires - 1) : layer.wires;
        const packetCount = small ? Math.max(1, layer.packets - 1) : layer.packets;
        for (let i = 0; i < wireCount; i++) {
          const k = (i + 0.5) / wireCount;
          const y0 = -overscan + (h + overscan * 2) * ((k + li * 0.11) % 1);
          const y1 = -overscan + (h + overscan * 2) * ((1 - k + li * 0.23) % 1);
          const swing = (i % 2 === 0 ? 1 : -1) * h * (0.22 + rand() * 0.2);

          // Alternate the travel direction, otherwise every wire rakes the
          // same way and the field reads as scan lines.
          const rtl = (i + li) % 2 === 1;
          const from = { x: rtl ? w * 1.15 : -w * 0.15, y: rtl ? y1 : y0 };
          const to = { x: rtl ? -w * 0.15 : w * 1.15, y: rtl ? y0 : y1 };

          const wire = buildWire(
            from,
            { x: w * 0.3, y: from.y + swing },
            { x: w * 0.7, y: to.y - swing },
            to,
            li,
          );
          const wi = wires.push(wire) - 1;

          for (let p = 0; p < packetCount; p++) {
            packets.push({
              wire: wi,
              dist: rand() * wire.len,
              speed: layer.speed * (0.72 + rand() * 0.6),
              trail: 52 + rand() * 62,
              // Colour is the exception, not the rule.
              tint: rand() < 0.34 ? tintAt(rand()) : null,
            });
          }

          nodes.push({ wire: wi, dist: wire.len * (0.28 + rand() * 0.12) });
          nodes.push({ wire: wi, dist: wire.len * (0.62 + rand() * 0.14) });
        }
      });
    };

    const isDark = () => document.documentElement.classList.contains("dark");

    const offsetFor = (layer: number) =>
      -scrollNorm * LAYERS[layer].parallax;

    const strokeWires = (alpha: number) => {
      for (const wire of wires) {
        const L = LAYERS[wire.layer];
        ctx.globalAlpha = alpha * L.alpha;
        ctx.lineWidth = L.width * 0.7;
        ctx.beginPath();
        const dy = offsetFor(wire.layer);
        ctx.moveTo(wire.pts[0].x, wire.pts[0].y + dy);
        for (let i = 1; i < wire.pts.length; i += 2) {
          ctx.lineTo(wire.pts[i].x, wire.pts[i].y + dy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawWires = () => {
      const dark = isDark();
      ctx.strokeStyle = dark ? "rgb(255,255,255)" : "rgb(10,10,10)";
      strokeWires(dark ? 0.05 : 0.055);

      // The torch: wires come up inside a radius around the pointer.
      if (pointer.on > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, TORCH_RADIUS, 0, Math.PI * 2);
        ctx.clip();
        strokeWires((dark ? 0.16 : 0.14) * pointer.on);
        ctx.restore();
      }
    };

    const drawNodes = () => {
      const dark = isDark();
      const base = dark ? "255,255,255" : "10,10,10";
      for (const n of nodes) {
        const wire = wires[n.wire];
        if (!wire) continue;
        const dy = offsetFor(wire.layer);
        const pt = pointAt(wire, n.dist);

        // brighten while a packet is passing through
        let hit = 0;
        for (const p of packets) {
          if (p.wire !== n.wire) continue;
          const gap = Math.abs(((p.dist - n.dist) % wire.len + wire.len) % wire.len);
          const near = Math.min(gap, wire.len - gap);
          hit = Math.max(hit, Math.max(0, 1 - near / 70));
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${base},${(0.1 + hit * 0.5).toFixed(3)})`;
        ctx.arc(pt.x, pt.y + dy, 1.1 + hit * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const SEGS = 10;

    const drawPackets = () => {
      const dark = isDark();
      const ink: [number, number, number] = dark ? [235, 240, 255] : [30, 34, 60];
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";

      for (const p of packets) {
        const wire = wires[p.wire];
        if (!wire) continue;
        const L = LAYERS[wire.layer];
        const dy = offsetFor(wire.layer);
        const [r, g, b] = p.tint ?? ink;

        // tapered trail, drawn as segments rather than dots
        for (let s = 0; s < SEGS; s++) {
          const a = pointAt(wire, p.dist - (s / SEGS) * p.trail);
          const c = pointAt(wire, p.dist - ((s + 1) / SEGS) * p.trail);
          const fade = 1 - s / SEGS;
          ctx.beginPath();
          ctx.lineWidth = L.width * (0.25 + fade * 1.15);
          ctx.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${(
            fade * fade * 0.5 * L.alpha * (dark ? 1 : 0.75)
          ).toFixed(3)})`;
          ctx.moveTo(a.x, a.y + dy);
          ctx.lineTo(c.x, c.y + dy);
          ctx.stroke();
        }

        // head: a tight core with a restrained bloom
        const head = pointAt(wire, p.dist);
        const hx = head.x;
        const hy = head.y + dy;
        const near = Math.max(
          0,
          1 - Math.hypot(hx - pointer.x, hy - pointer.y) / TORCH_RADIUS,
        );
        const bloom = 7 + near * 26;

        const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, bloom);
        grad.addColorStop(
          0,
          `rgba(${r | 0},${g | 0},${b | 0},${(0.34 * L.alpha + near * 0.3).toFixed(3)})`,
        );
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hx, hy, bloom, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${(0.85 * L.alpha).toFixed(3)})`;
        ctx.arc(hx, hy, L.width * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    /**
     * Punch a soft hole where the hero type sits. Nothing should ever cross a
     * headline; the hole fades out once the hero has scrolled away so the
     * field is not permanently dimmed through the middle of the screen.
     */
    const protectType = () => {
      const strength = 0.88 * (1 - Math.min(1, window.scrollY / (h * 0.9)));
      if (strength <= 0.01) return;

      const cx = w / 2;
      const cy = h * 0.34;
      const r = Math.min(w * 0.44, h * 0.62);
      const g = ctx.createRadialGradient(cx, cy, r * 0.15, cx, cy, r);
      g.addColorStop(0, `rgba(0,0,0,${strength})`);
      g.addColorStop(0.62, `rgba(0,0,0,${strength * 0.45})`);
      g.addColorStop(1, "rgba(0,0,0,0)");

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      drawWires();
      drawNodes();
      drawPackets();
      protectType();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;

      for (const p of packets) {
        p.dist += p.speed * (1 + boost * 3.2) * dt;
        if (p.dist > wires[p.wire].len) p.dist -= wires[p.wire].len;
      }

      boost *= Math.pow(0.05, dt);
      pointer.on += ((pointer.x > -9000 ? 1 : 0) - pointer.on) * Math.min(1, dt * 6);

      paint();
      raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScroll);
      lastScroll = y;
      boost = Math.min(1, boost + delta / 1100);
      scrollNorm = Math.min(1, y / (window.innerHeight * 4));
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const start = () => {
      if (reduced || raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      build();
      if (reduced) paint();
    };

    build();
    if (reduced) paint();
    else start();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        // densest behind the hero, thinning down the page so it never
        // competes with body copy
        maskImage:
          "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0.34) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0.34) 100%)",
      }}
    >
      <canvas ref={ref} className="size-full" />
    </div>
  );
}
