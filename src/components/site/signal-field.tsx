"use client";

import * as React from "react";

/**
 * The live background: packets travelling along the protocol wires.
 *
 * One canvas behind the whole site. A set of slow bezier "wires" spans the
 * viewport, and packets run along them, tinted across the signal spectrum by
 * how far along they are. Scrolling gives the traffic a short burst of speed,
 * so the page feels wired to something rather than decorated.
 *
 * It is deliberately quiet — the wires sit at ~4% and the packets are small.
 * It pauses when the tab is hidden and renders a single static frame when the
 * visitor has asked for reduced motion.
 */

type Pt = { x: number; y: number };

const WIRES = 7;
const SAMPLES = 160;
const PACKETS_PER_WIRE = 4;

/** violet → indigo → cyan, sampled by position along a wire */
function spectrum(t: number): [number, number, number] {
  const stops: [number, number, number][] = [
    [139, 92, 255],
    [109, 139, 255],
    [53, 216, 245],
  ];
  const s = Math.min(0.9999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(s);
  const f = s - i;
  const a = stops[i];
  const b = stops[Math.min(stops.length - 1, i + 1)];
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
    let wires: Pt[][] = [];
    let packets: { wire: number; t: number; speed: number; len: number }[] = [];
    let raf = 0;
    let boost = 0;
    let lastScroll = window.scrollY;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Wires run corner to corner rather than left to right, so the field
      // reads as a routed network instead of as scan lines.
      wires = Array.from({ length: WIRES }, (_, i) => {
        const k = i / (WIRES - 1);
        const p0 = { x: -w * 0.12, y: h * (0.12 + k * 0.82) };
        const p3 = { x: w * 1.12, y: h * (0.86 - k * 0.78) };
        const swing = (i % 2 === 0 ? 1 : -1) * h * (0.18 + 0.1 * k);
        const p1 = { x: w * 0.3, y: p0.y + swing };
        const p2 = { x: w * 0.72, y: p3.y - swing };
        return Array.from({ length: SAMPLES }, (_, s) =>
          cubic(p0, p1, p2, p3, s / (SAMPLES - 1)),
        );
      });

      packets = [];
      for (let i = 0; i < WIRES; i++) {
        for (let j = 0; j < PACKETS_PER_WIRE; j++) {
          packets.push({
            wire: i,
            t: (j / PACKETS_PER_WIRE + i * 0.13) % 1,
            speed: 0.00022 + Math.random() * 0.00042,
            len: 12 + Math.floor(Math.random() * 16),
          });
        }
      }
    };

    // White wires vanish on the light canvas, so the ink flips with the theme.
    const isDark = () => document.documentElement.classList.contains("dark");

    const drawWires = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark()
        ? "rgba(255,255,255,0.055)"
        : "rgba(10,10,10,0.055)";
      for (const pts of wires) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
    };

    const drawPackets = () => {
      ctx.globalCompositeOperation = "lighter";
      for (const p of packets) {
        const pts = wires[p.wire];
        if (!pts) continue;
        const head = Math.floor(p.t * (SAMPLES - 1));
        const [r, g, b] = spectrum(p.t);

        for (let k = 0; k < p.len; k++) {
          const idx = head - k;
          if (idx < 0) break;
          const pt = pts[idx];
          const fade = 1 - k / p.len;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${(fade * fade * 0.5).toFixed(3)})`;
          ctx.arc(pt.x, pt.y, 0.6 + fade * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // The head, with a halo that swells when the pointer is near it —
        // the field notices you without ever chasing the cursor.
        const hp = pts[head];
        const dx = hp.x - pointer.x;
        const dy = hp.y - pointer.y;
        const near = Math.max(0, 1 - Math.hypot(dx, dy) / 220);
        const radius = 22 + near * 46;
        const halo = ctx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, radius);
        halo.addColorStop(0, `rgba(${r | 0},${g | 0},${b | 0},${(0.3 + near * 0.35).toFixed(3)})`);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      drawWires();
      for (const p of packets) {
        p.t += p.speed * (1 + boost * 5);
        if (p.t > 1) p.t -= 1;
      }
      drawPackets();
      boost *= 0.94;
      raf = requestAnimationFrame(frame);
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      drawWires();
      drawPackets();
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onScroll = () => {
      const d = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      boost = Math.min(1, boost + d / 900);
    };

    const start = () => {
      if (reduced || raf) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      build();
      if (reduced) staticFrame();
    };

    build();
    if (reduced) staticFrame();
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
        maskImage:
          "radial-gradient(120% 90% at 50% 20%, #000 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.25) 100%)",
        WebkitMaskImage:
          "radial-gradient(120% 90% at 50% 20%, #000 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.25) 100%)",
      }}
    >
      <canvas ref={ref} className="size-full opacity-90 dark:opacity-100" />
    </div>
  );
}
