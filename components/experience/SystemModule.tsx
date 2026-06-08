"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ExternalLink, FileText, GitBranch } from "lucide-react";
import type { SystemCard } from "@/lib/data";
import { useCountUp } from "@/lib/hooks";
import { ExplodedArchitecture } from "./ExplodedArchitecture";

type SystemModuleProps = {
  system: SystemCard;
  index: number;
  isActive: boolean;
  onActivate: () => void;
};

function MetricValue({ value, active }: { value: string; active: boolean }) {
  const display = useCountUp(value, active);
  return <>{display}</>;
}

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
        isActive ? "matte-panel-glow" : "matte-panel hover:bg-surface-elevated"
      }`}
    >
      <button
        type="button"
        onClick={onActivate}
        data-magnetic
        className="magnetic-target flex w-full items-start gap-5 p-6 text-left sm:p-7"
      >
        <span className="mt-0.5 font-mono text-xs text-accent/70">
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
                    <p className="text-lg font-medium tracking-tight text-text-primary glow-text">
                      <MetricValue value={m.value} active={isActive} />
                    </p>
                    <p className="mt-1 text-[11px] text-text-secondary">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 font-mono text-[10px] text-text-secondary">
                {system.previewNodes.map((node, i) => (
                  <span key={node} className="flex items-center gap-2">
                    <span className="text-accent/60">●</span>
                    {node}
                    {i < system.previewNodes.length - 1 && (
                      <span className="text-border">→</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {system.links.github && (
                  <a
                    href={system.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="magnetic-target inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
                  >
                    <GitBranch size={13} />
                    GitHub
                  </a>
                )}
                {system.links.caseStudy && (
                  <a
                    href={system.links.caseStudy}
                    data-magnetic
                    className="magnetic-target inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
                  >
                    <FileText size={13} />
                    Case study
                  </a>
                )}
                {system.links.demo && system.links.demo !== "#" && (
                  <a
                    href={system.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="magnetic-target inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
                  >
                    <ExternalLink size={13} />
                    Live demo
                  </a>
                )}
              </div>

              <ExplodedArchitecture systemId={system.id} active={isActive} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
