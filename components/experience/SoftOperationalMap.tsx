"use client";

import { motion } from "framer-motion";
import type { CoreNode } from "@/lib/data";
import { CORE_NODES } from "@/lib/data";

const MAP_NODES = CORE_NODES.map((n, i) => {
  const angle = (i / CORE_NODES.length) * Math.PI * 2 - Math.PI / 2;
  const r = 38;
  return {
    ...n,
    cx: 50 + Math.cos(angle) * r,
    cy: 50 + Math.sin(angle) * r,
  };
});

const EDGES = MAP_NODES.flatMap((a, i) => {
  const b = MAP_NODES[(i + 2) % MAP_NODES.length];
  return [{ from: a, to: b }];
});

type SoftOperationalMapProps = {
  active: CoreNode;
  onActiveChange: (node: CoreNode) => void;
};

export function SoftOperationalMap({ active, onActiveChange }: SoftOperationalMapProps) {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0 overflow-hidden rounded-2xl matte-panel-glow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.06)_0%,transparent_55%)]" />
        <div className="beast-shimmer absolute inset-0 opacity-40" />

        <svg viewBox="0 0 100 100" className="relative z-10 h-full w-full" aria-label="Operational systems map">
          <defs>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {EDGES.map(({ from, to }, i) => {
            const isActiveEdge =
              from.id === active.id || to.id === active.id;
            return (
              <motion.line
                key={`${from.id}-${to.id}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={isActiveEdge ? "rgba(110,139,255,0.35)" : "rgba(255,255,255,0.06)"}
                strokeWidth={isActiveEdge ? "0.35" : "0.2"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.03 }}
              />
            );
          })}

          <motion.circle
            cx="50"
            cy="50"
            r="6"
            fill="none"
            stroke="rgba(110,139,255,0.25)"
            strokeWidth="0.35"
            animate={{ r: [6, 7.5, 6], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="50" cy="50" r="2.8" fill="rgba(110,139,255,0.45)" filter="url(#node-glow)" />

          {MAP_NODES.map((node, i) => (
            <g
              key={node.id}
              transform={`translate(${node.cx}, ${node.cy})`}
              onMouseEnter={() => onActiveChange(node)}
              onFocus={() => onActiveChange(node)}
              className="cursor-default"
              tabIndex={0}
              role="button"
              aria-label={node.label}
            >
              <motion.circle
                r={active.id === node.id ? 2.6 : 1.6}
                fill={
                  active.id === node.id
                    ? "rgba(110,139,255,0.65)"
                    : "rgba(184,192,204,0.2)"
                }
                stroke={
                  active.id === node.id
                    ? "rgba(155,123,255,0.6)"
                    : "rgba(255,255,255,0.08)"
                }
                strokeWidth="0.3"
                filter={active.id === node.id ? "url(#node-glow)" : undefined}
                animate={{ opacity: active.id === node.id ? 1 : [0.6, 0.9, 0.6] }}
                transition={{
                  duration: active.id === node.id ? 0.3 : 4,
                  repeat: active.id === node.id ? 0 : Infinity,
                  delay: i * 0.3,
                }}
              />
              <text
                y="5.5"
                textAnchor="middle"
                className={`font-mono text-[2px] uppercase tracking-wide ${
                  active.id === node.id ? "fill-text-primary" : "fill-[#A1A1AA]"
                }`}
              >
                {node.label.split(" ")[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 left-4 right-4 z-20 rounded-lg border border-accent/20 bg-bg/95 p-4 backdrop-blur-md sm:left-auto sm:right-4 sm:max-w-xs"
      >
        <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
          {active.activity}
        </p>
        <p className="mt-1 text-sm font-medium text-text-primary">{active.label}</p>
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">{active.detail}</p>
        <p className="mt-2 font-mono text-[11px] text-silver">{active.metric}</p>
      </motion.div>
    </div>
  );
}
