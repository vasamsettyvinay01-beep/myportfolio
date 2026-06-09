"use client";

import { motion } from "framer-motion";
import { CORE_NODES } from "@/lib/data";

const MAP_NODES = CORE_NODES.slice(0, 8).map((n, i) => {
  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
  const r = 38;
  return {
    ...n,
    x: 50 + Math.cos(angle) * r,
    y: 50 + Math.sin(angle) * r,
  };
});

export function SystemMap() {
  return (
    <div className="relative aspect-square w-full max-w-lg lg:max-w-none">
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Production stack map">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {MAP_NODES.map((node, i) => {
          const next = MAP_NODES[(i + 2) % MAP_NODES.length];
          return (
            <motion.line
              key={`${node.id}-${next.id}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="url(#edgeGrad)"
              strokeWidth="0.35"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
            />
          );
        })}

        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="#4F8CFF"
          strokeWidth="0.3"
          strokeOpacity="0.3"
          animate={{ r: [8, 10, 8], strokeOpacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="#4F8CFF"
          fillOpacity="0.4"
          animate={{ fillOpacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {MAP_NODES.map((node, i) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <motion.circle
              r="2.8"
              fill="#0B0B0B"
              stroke="#4F8CFF"
              strokeWidth="0.5"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
            />
            <text
              y="6.5"
              textAnchor="middle"
              className="fill-[#9CA3AF] font-mono text-[2.8px] uppercase tracking-wide"
            >
              {node.label.split(" ")[0]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
