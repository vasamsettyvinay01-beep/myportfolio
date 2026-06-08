"use client";

import { motion } from "framer-motion";
import { HERO_EDGES, HERO_NODES } from "@/lib/data";

function getNode(id: string) {
  return HERO_NODES.find((n) => n.id === id)!;
}

export function SystemMap() {
  return (
    <div className="relative aspect-square w-full max-w-lg lg:max-w-none">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        aria-label="Operational systems map"
      >
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

        {HERO_EDGES.map(([from, to], i) => {
          const a = getNode(from);
          const b = getNode(to);
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
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

        {HERO_NODES.map((node, i) => (
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
              whileHover={{ scale: 1.3 }}
            />
            <motion.circle
              r="4"
              fill="none"
              stroke="#4F8CFF"
              strokeWidth="0.2"
              strokeOpacity="0.5"
              animate={{ r: [4, 6, 4], strokeOpacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
            <text
              y="6.5"
              textAnchor="middle"
              className="fill-[#9CA3AF] font-mono text-[2.8px] uppercase tracking-wide"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-accent-blue/10 bg-accent-blue/[0.02]" />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}
