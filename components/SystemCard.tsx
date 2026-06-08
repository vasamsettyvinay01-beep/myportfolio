"use client";

import { motion } from "framer-motion";
import { BookOpen, Boxes, Code2, Play } from "lucide-react";
import type { SystemCard as SystemCardData } from "@/lib/data";
import { GlowButton } from "@/components/ui/GlowButton";

type SystemCardProps = {
  system: SystemCardData;
  index: number;
};

function ArchitecturePreview({ nodes }: { nodes: string[] }) {
  return (
    <div className="relative h-20 overflow-hidden rounded-lg border border-border bg-bg/80">
      <svg viewBox="0 0 200 60" className="h-full w-full" aria-hidden>
        {nodes.slice(0, -1).map((_, i) => {
          const x1 = 30 + i * 45;
          const x2 = 75 + i * 45;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={30}
              x2={x2}
              y2={30}
              stroke="#4F8CFF"
              strokeWidth="1"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            />
          );
        })}
        {nodes.map((node, i) => (
          <g key={node}>
            <motion.circle
              cx={30 + i * 45}
              cy={30}
              r="6"
              fill="#0B0B0B"
              stroke="#4F8CFF"
              strokeWidth="1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            />
            <text
              x={30 + i * 45}
              y={48}
              textAnchor="middle"
              className="fill-[#9CA3AF] font-mono text-[6px] uppercase"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>
      <motion.div
        className="absolute top-1/2 left-0 h-px w-8 bg-gradient-to-r from-transparent to-accent-blue/60"
        animate={{ x: [0, 160, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function SystemCard({ system, index }: SystemCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent-blue/30 sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            {system.name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            {system.description}
          </p>
        </div>
        <span className="shrink-0 rounded border border-accent-green/30 bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] text-accent-green uppercase">
          Active
        </span>
      </div>

      <ArchitecturePreview nodes={system.previewNodes} />

      <div className="mt-4 flex flex-wrap gap-2">
        {system.stack.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[10px] text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
        {system.metrics.map((m) => (
          <div key={m.label}>
            <p className="font-mono text-sm font-medium text-accent-blue">
              {m.value}
            </p>
            <p className="text-[10px] text-text-secondary">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {system.links.caseStudy && (
          <GlowButton href={system.links.caseStudy} variant="ghost" className="!px-3 !py-1.5 text-xs">
            <BookOpen size={12} />
            Case Study
          </GlowButton>
        )}
        {system.links.architecture && (
          <GlowButton href={system.links.architecture} variant="ghost" className="!px-3 !py-1.5 text-xs">
            <Boxes size={12} />
            Architecture
          </GlowButton>
        )}
        {system.links.demo && (
          <GlowButton href={system.links.demo} variant="ghost" className="!px-3 !py-1.5 text-xs" external>
            <Play size={12} />
            Demo
          </GlowButton>
        )}
        {system.links.github && (
          <GlowButton href={system.links.github} variant="ghost" className="!px-3 !py-1.5 text-xs" external>
            <Code2 size={12} />
            GitHub
          </GlowButton>
        )}
      </div>
    </motion.article>
  );
}
