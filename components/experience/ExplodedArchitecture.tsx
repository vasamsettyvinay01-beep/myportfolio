"use client";

import { motion } from "framer-motion";
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

  return (
    <motion.div
      initial={false}
      animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="relative mt-8 h-[260px] rounded-lg border border-border bg-bg sm:h-[300px]">
        <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" aria-hidden>
          {layers.map((layer, i) =>
            layers.slice(i + 1).map((target) => {
              const a = toSvg(layer.x, layer.y);
              const b = toSvg(target.x, target.y);
              return (
                <line
                  key={`${layer.id}-${target.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              );
            })
          )}
        </svg>

        <div className="absolute inset-0">
          {layers.map((layer, i) => {
            const pos = toSvg(layer.x, layer.y);
            return (
              <motion.div
                key={layer.id}
                initial={false}
                animate={
                  active
                    ? {
                        left: `${(pos.x / 800) * 100}%`,
                        top: `${(pos.y / 400) * 100}%`,
                        opacity: 1,
                      }
                    : { left: "50%", top: "50%", opacity: 0 }
                }
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-36 -translate-x-1/2 -translate-y-1/2 sm:w-40"
              >
                <div className="rounded-md border border-border bg-surface px-3 py-2.5">
                  <p className="font-mono text-[10px] text-text-secondary uppercase">
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
