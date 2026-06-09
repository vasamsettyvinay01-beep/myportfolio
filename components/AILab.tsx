"use client";

import { motion } from "framer-motion";
import { Beaker } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RESEARCH_ITEMS } from "@/lib/data";

const statusStyles = {
  active: "text-accent-green border-accent-green/30 bg-accent-green/10",
  building: "text-accent-violet border-accent-violet/30 bg-accent-violet/10",
  archived: "text-text-secondary border-border bg-surface",
};

const statusLabel = {
  active: "In production",
  building: "In progress",
  archived: "Archived",
};

export function AILab() {
  return (
    <section id="ai-lab" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeader
          label="Research"
          title="Research"
          description="Experiments and next iterations — shipped work, in-progress builds, and archived lessons."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-lg border border-border bg-surface p-4 ${
                item.status === "archived" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Beaker size={14} className="text-accent-violet" />
                  <h3 className="text-sm font-medium text-text-primary">{item.name}</h3>
                </div>
                <span
                  className={`rounded border px-1.5 py-0.5 font-mono text-[9px] ${statusStyles[item.status]}`}
                >
                  {statusLabel[item.status]}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
