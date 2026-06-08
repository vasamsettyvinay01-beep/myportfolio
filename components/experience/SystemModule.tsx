"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { SystemCard } from "@/lib/data";
import { ExplodedArchitecture } from "./ExplodedArchitecture";

type SystemModuleProps = {
  system: SystemCard;
  index: number;
  isActive: boolean;
  onActivate: () => void;
};

export function SystemModule({
  system,
  index,
  isActive,
  onActivate,
}: SystemModuleProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl transition-all duration-300 ${
        isActive ? "matte-panel-elevated" : "matte-panel hover:bg-surface-elevated"
      }`}
    >
      <button
        type="button"
        onClick={onActivate}
        className="flex w-full items-start gap-5 p-6 text-left sm:p-7"
      >
        <span className="mt-0.5 font-mono text-xs text-text-secondary">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium tracking-tight text-text-primary">
            {system.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {system.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {system.stack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronRight size={18} strokeWidth={1.5} className="text-text-secondary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border"
          >
            <div className="px-6 pb-7 sm:px-7">
              <div className="grid grid-cols-3 gap-6 pt-6">
                {system.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-lg font-medium tracking-tight text-text-primary">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[11px] text-text-secondary">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 font-mono text-[10px] text-text-secondary">
                {system.previewNodes.map((node, i) => (
                  <span key={node} className="flex items-center gap-2">
                    {node}
                    {i < system.previewNodes.length - 1 && (
                      <span className="text-border">/</span>
                    )}
                  </span>
                ))}
              </div>

              <ExplodedArchitecture systemId={system.id} active={isActive} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
