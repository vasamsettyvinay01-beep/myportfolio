"use client";

import { motion } from "framer-motion";
import { Beaker, Circle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AI_LAB_ITEMS } from "@/lib/data";

const statusStyles = {
  active: "text-accent-green border-accent-green/30 bg-accent-green/10",
  building: "text-accent-violet border-accent-violet/30 bg-accent-violet/10",
};

export function AILab() {
  return (
    <section id="ai-lab" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeader
          label="// r_and_d"
          title="AI Lab"
          description="Experimental systems, prototypes, and research threads — the R&D layer behind production ships."
        />

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl border border-dashed border-accent-violet/20 bg-accent-violet/[0.02]" />

          <div className="relative grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-3">
            {AI_LAB_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Beaker size={14} className="text-accent-violet" />
                    <h3 className="text-sm font-medium text-text-primary">
                      {item.name}
                    </h3>
                  </div>
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-text-secondary/60">
                  <Circle
                    size={6}
                    className={
                      item.status === "active"
                        ? "fill-accent-green text-accent-green"
                        : "fill-accent-violet text-accent-violet animate-pulse"
                    }
                  />
                  {item.status === "active" ? "running" : "in_progress"}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-violet/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
