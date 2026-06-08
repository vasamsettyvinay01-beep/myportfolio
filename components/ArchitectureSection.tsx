"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARCHITECTURE_FLOW } from "@/lib/data";

export function ArchitectureSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ARCHITECTURE_FLOW.find((n) => n.id === activeId);

  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeader
          label="// build_pattern"
          title="How I Build Systems"
          description="Every system is designed around automation, reliability, workflow clarity, and fast product iteration."
        />

        <div className="overflow-x-auto pb-4">
          <div className="flex min-w-max items-center gap-2 sm:gap-3">
            {ARCHITECTURE_FLOW.map((node, i) => (
              <div key={node.id} className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  type="button"
                  onMouseEnter={() => setActiveId(node.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(node.id)}
                  onBlur={() => setActiveId(null)}
                  whileHover={{ scale: 1.04 }}
                  className="group relative flex flex-col items-center rounded-xl border border-border bg-surface px-4 py-5 transition-colors hover:border-[var(--node-color)] sm:min-w-[120px] sm:px-5"
                  style={{ "--node-color": node.color } as CSSProperties}
                >
                  <motion.div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border font-mono text-xs font-medium"
                    style={{
                      borderColor: `${node.color}40`,
                      backgroundColor: `${node.color}15`,
                      color: node.color,
                    }}
                    animate={
                      activeId === node.id
                        ? { boxShadow: `0 0 20px ${node.color}40` }
                        : { boxShadow: "0 0 0px transparent" }
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.div>
                  <span className="text-center text-xs font-medium text-text-primary sm:text-sm">
                    {node.label}
                  </span>
                  <motion.span
                    className="mt-1 h-0.5 rounded-full"
                    style={{ backgroundColor: node.color }}
                    initial={{ width: 0 }}
                    animate={{ width: activeId === node.id ? "100%" : 0 }}
                  />
                </motion.button>
                {i < ARCHITECTURE_FLOW.length - 1 && (
                  <ArrowRight
                    className="shrink-0 text-text-secondary/40"
                    size={18}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={active?.id ?? "default"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-xl border border-border bg-surface p-5 sm:p-6"
        >
          <p className="font-mono text-xs text-accent-blue uppercase">
            {active ? active.label : "Architecture Layer"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {active?.description ??
              "Hover a node to explore each layer of the operational stack."}
          </p>
        </motion.div>

        <div className="mt-8 hidden lg:block">
          <svg viewBox="0 0 800 120" className="w-full" aria-hidden>
            <defs>
              <linearGradient id="flowGrad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2EE6A6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 40 60 Q 200 20 400 60 T 760 60"
              fill="none"
              stroke="url(#flowGrad)"
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
