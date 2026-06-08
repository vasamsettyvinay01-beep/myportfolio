"use client";

import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { AI_LAB_EXTENDED } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const statusStyle: Record<string, string> = {
  active: "text-accent-green",
  building: "text-silver",
  archived: "text-text-secondary/50",
};

const RESTRICTED = new Set(["RESTRICTED", "CLASSIFIED"]);

export function AILabExperience() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const toggleUnlock = (id: string) => {
    setUnlocked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <WorldSection id="ai-lab" className="border-t border-border bg-surface-lab/50">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            AI Lab
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Research & experiments
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Prototypes, eval frameworks, and systems in development. Click classified
            entries to declassify.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AI_LAB_EXTENDED.map((item, i) => {
            const classification =
              "classification" in item ? item.classification : "ACTIVE";
            const isRestricted = RESTRICTED.has(classification);
            const isUnlocked = unlocked.has(item.id);
            const isArchived = item.status === "archived";
            const showBlur = isRestricted && !isUnlocked;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                role={isRestricted ? "button" : undefined}
                tabIndex={isRestricted ? 0 : undefined}
                onClick={isRestricted ? () => toggleUnlock(item.id) : undefined}
                onKeyDown={
                  isRestricted
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleUnlock(item.id);
                        }
                      }
                    : undefined
                }
                className={`group relative overflow-hidden rounded-lg border border-border p-5 transition-all hover:border-accent/20 hover:bg-surface-elevated ${
                  isArchived ? "opacity-50" : ""
                } ${isRestricted ? "cursor-pointer" : ""} ${
                  showBlur ? "bg-surface-lab" : ""
                }`}
              >
                {isRestricted && (
                  <div className="absolute right-4 top-4 z-10 text-text-secondary/60 transition-colors group-hover:text-accent">
                    {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
                  </div>
                )}

                <div className={showBlur ? "classified-blur" : isUnlocked ? "classified-blur unlocked" : ""}>
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
                </div>

                <p
                  className={`mt-4 font-mono text-[9px] ${
                    isRestricted && !isUnlocked
                      ? "text-accent-warn/80"
                      : "text-text-secondary/50"
                  }`}
                >
                  {isRestricted && !isUnlocked
                    ? `${classification} — click to declassify`
                    : classification}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WorldSection>
  );
}
