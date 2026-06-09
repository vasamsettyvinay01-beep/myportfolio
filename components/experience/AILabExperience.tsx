"use client";

import { motion } from "framer-motion";
import { RESEARCH_ITEMS } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const statusLabel: Record<string, string> = {
  active: "In production",
  building: "In progress",
  archived: "Archived",
};

const statusStyle: Record<string, string> = {
  active: "text-accent-green",
  building: "text-silver",
  archived: "text-text-secondary/50",
};

export function AILabExperience() {
  return (
    <WorldSection id="ai-lab" className="border-t border-border bg-surface-lab/50">
      <div className="section-container">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Research
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Experiments and next iterations — including work that shipped, work in
            progress, and lessons from what didn&apos;t scale.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className={`rounded-lg border border-border p-5 ${
                item.status === "archived" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium text-text-primary">{item.name}</h3>
                <span className={`font-mono text-[9px] ${statusStyle[item.status]}`}>
                  {statusLabel[item.status]}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </WorldSection>
  );
}
