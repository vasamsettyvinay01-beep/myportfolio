"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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

export function SoftOperationalMap() {
  const [active, setActive] = useState(MAP_NODES[0]);

  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0 rounded-2xl matte-panel overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.03)_0%,transparent_55%)]" />

        <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Operational systems map">
          {EDGES.map(({ from, to }, i) => (
            <motion.line
              key={`${from.id}-${to.id}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.04 }}
            />
          ))}

          <motion.circle
            cx="50"
            cy="50"
            r="6"
            fill="none"
            stroke="rgba(110,139,255,0.15)"
            strokeWidth="0.3"
            animate={{ r: [6, 7, 6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="50" cy="50" r="2.5" fill="rgba(110,139,255,0.35)" />

          {MAP_NODES.map((node, i) => (
            <g
              key={node.id}
              transform={`translate(${node.cx}, ${node.cy})`}
              onMouseEnter={() => setActive(node)}
              className="cursor-default"
            >
              <motion.circle
                r={active.id === node.id ? 2.2 : 1.6}
                fill={active.id === node.id ? "rgba(110,139,255,0.5)" : "rgba(184,192,204,0.25)"}
                stroke={active.id === node.id ? "rgba(110,139,255,0.4)" : "rgba(255,255,255,0.08)"}
                strokeWidth="0.25"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.35 }}
              />
              <text
                y="5"
                textAnchor="middle"
                className="fill-[#A1A1AA] font-mono text-[2.2px] uppercase tracking-wide"
              >
                {node.label.split(" ")[0]}
              </text>
            </g>
          ))}

        </svg>
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-bg/95 p-4 backdrop-blur-sm sm:left-auto sm:right-4 sm:max-w-xs"
      >
        <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
          {active.activity}
        </p>
        <p className="mt-1 text-sm font-medium text-text-primary">{active.label}</p>
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">{active.detail}</p>
        <p className="mt-2 font-mono text-[11px] text-silver">{active.metric}</p>
      </motion.div>
    </div>
  );
}
