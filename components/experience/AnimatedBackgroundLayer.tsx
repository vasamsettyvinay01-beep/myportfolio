"use client";

import { useReducedMotion } from "@/lib/hooks";

/** Lightweight CSS background — no WebGL (major scroll/GPU savings). */
export function AnimatedBackgroundLayer() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className={`animated-bg-fallback absolute inset-0 ${reducedMotion ? "" : "animated-bg-fallback--static"}`} />
      <div className="ambient-top absolute inset-0" />
      <div className="bg-grid bg-grid--static absolute inset-0 opacity-40" />
      <div className="animated-bg-vignette absolute inset-0" />
    </div>
  );
}
