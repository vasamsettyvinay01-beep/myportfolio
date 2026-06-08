"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { EXPLODED_LAYERS } from "@/lib/data";

type ExplodedArchitectureProps = {
  systemId: string;
  active: boolean;
};

const CX = 400;
const CY = 200;

function toSvg(x: number, y: number) {
  return { x: CX + x * 0.75, y: CY + y * 0.55 };
}

export function ExplodedArchitecture({ systemId, active }: ExplodedArchitectureProps) {
  const layers = EXPLODED_LAYERS[systemId] ?? [];
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      initial={false}
      animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="relative mt-8 h-[260px] overflow-hidden rounded-lg border border-border bg-bg sm:h-[300px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.04)_0%,transparent_60%)]" />

        <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" aria-hidden>
          {layers.map((layer, i) =>
            layers.slice(i + 1).map((target) => {
              const a = toSvg(layer.x, layer.y);
              const b = toSvg(target.x, target.y);
              const isHighlighted =
                hoveredId === layer.id ||
                hoveredId === target.id ||
                !hoveredId;
              return (
                <motion.line
                  key={`${layer.id}-${target.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={
                    isHighlighted && hoveredId
                      ? "rgba(110,139,255,0.35)"
                      : "rgba(255,255,255,0.08)"
                  }
                  strokeWidth={isHighlighted && hoveredId ? 1.5 : 1}
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: active ? [0, -16] : 0 }}
                  transition={{
                    strokeDashoffset: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />
              );
            })
          )}
        </svg>

        <div className="absolute inset-0">
          {layers.map((layer, i) => {
            const pos = toSvg(layer.x, layer.y);
            const isHovered = hoveredId === layer.id;
            return (
              <motion.div
                key={layer.id}
                initial={false}
                animate={
                  active
                    ? {
                        left: `${(pos.x / 800) * 100}%`,
                        top: `${(pos.y / 400) * 100}%`,
                        opacity: hoveredId && !isHovered ? 0.45 : 1,
                        scale: isHovered ? 1.05 : 1,
                      }
                    : { left: "50%", top: "50%", opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-36 -translate-x-1/2 -translate-y-1/2 sm:w-40"
                onMouseEnter={() => setHoveredId(layer.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`rounded-md border px-3 py-2.5 transition-colors ${
                    isHovered
                      ? "border-accent/40 bg-surface-elevated glow-blue"
                      : "border-border bg-surface"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase text-text-secondary">
                    {layer.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-text-secondary/80">
                    {layer.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
