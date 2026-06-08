"use client";

import { motion } from "framer-motion";
import { AI_LAB_EXTENDED } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const statusStyle: Record<string, string> = {
  active: "text-accent-green",
  building: "text-silver",
  archived: "text-text-secondary/50",
};

export function AILabExperience() {
  return (
    <WorldSection id="ai-lab" className="border-t border-border bg-surface-lab/50">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">
            AI Lab
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Research & experiments
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Prototypes, eval frameworks, and systems in development — internal
            R&D, not production.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AI_LAB_EXTENDED.map((item, i) => {
            const classification =
              "classification" in item ? item.classification : "ACTIVE";
            const isArchived = item.status === "archived";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className={`rounded-lg border border-border p-5 transition-colors hover:bg-surface-elevated ${
                  isArchived ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-text-primary">{item.name}</h3>
                  <span
                    className={`font-mono text-[9px] uppercase ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <p className="mt-4 font-mono text-[9px] text-text-secondary/50">
                  {classification}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WorldSection>
  );
}
