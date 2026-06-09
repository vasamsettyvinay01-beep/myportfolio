"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const AnimatedBackgroundCanvas = dynamic(
  () => import("@/components/three/AnimatedBackgroundCanvas"),
  { ssr: false }
);

export function AnimatedBackgroundLayer() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (reducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="animated-bg-fallback absolute inset-0" />
        <div className="ambient-top absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-50" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="animated-bg-corners absolute inset-0 z-[1]" />
      <div className="animated-bg-vignette absolute inset-0 z-[2]" />
      <div className="ambient-top absolute inset-0 z-[1]" />
      <div className="bg-grid absolute inset-0 z-[1] opacity-55" />

      <div className="absolute inset-0 z-0 opacity-95">
        {visible && <AnimatedBackgroundCanvas />}
      </div>

      <div className="animated-bg-scan absolute inset-0 z-[1]" />
    </div>
  );
}
