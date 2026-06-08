"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { ARCHITECTURE_FLOW } from "@/lib/data";
import { WorldSection } from "./WorldSection";

export function ArchitectureExperience() {
  const [activeId, setActiveId] = useState<string | null>(ARCHITECTURE_FLOW[0].id);
  const active = ARCHITECTURE_FLOW.find((n) => n.id === activeId);

  return (
    <WorldSection id="architecture" className="border-t border-border">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            Build pattern
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            How I build systems
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Every product follows the same operational spine — automation, reliability,
            workflow clarity, and fast iteration.
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max items-center gap-2 sm:gap-3">
            {ARCHITECTURE_FLOW.map((node, i) => (
              <div key={node.id} className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  type="button"
                  onMouseEnter={() => setActiveId(node.id)}
                  onFocus={() => setActiveId(node.id)}
                  onClick={() => setActiveId(node.id)}
                  data-magnetic
                  className={`magnetic-target group flex flex-col items-center rounded-xl border px-4 py-5 transition-all sm:min-w-[118px] sm:px-5 ${
                    activeId === node.id
                      ? "matte-panel-glow border-accent/30"
                      : "matte-panel hover:bg-surface-elevated"
                  }`}
                  style={{ "--node-color": node.color } as CSSProperties}
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border font-mono text-xs font-medium"
                    style={{
                      borderColor: `${node.color}50`,
                      backgroundColor: `${node.color}18`,
                      color: node.color,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="text-center text-xs font-medium text-text-primary sm:text-sm">
                    {node.label}
                  </span>
                </motion.button>
                {i < ARCHITECTURE_FLOW.length - 1 && (
                  <ArrowRight className="shrink-0 text-text-secondary/30" size={16} />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={active?.id ?? "default"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-8 rounded-xl matte-panel p-6 sm:p-7"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {active?.label ?? "Layer"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {active?.description ??
              "Hover or tap a layer to see how each part of the stack connects."}
          </p>
        </motion.div>
      </div>
    </WorldSection>
  );
}
