"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TERMINAL_LOG } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const levelColors = {
  info: "text-text-secondary",
  success: "text-accent-green",
  warn: "text-accent-warn",
};

export function BuildLogTerminal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  return (
    <WorldSection id="terminal" className="border-t border-border">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">
            Build log
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Operational terminal
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Deployments, orchestration events, and infrastructure activity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-xl matte-panel"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono text-[11px] text-text-secondary">
              ops — build-log
            </span>
            <span className="font-mono text-[10px] text-accent-green">live</span>
          </div>

          <div
            ref={scrollRef}
            className="terminal-scroll max-h-[380px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-[1.7] sm:px-6"
          >
            {TERMINAL_LOG.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="mb-1.5"
              >
                <span className="text-text-secondary/40">{entry.time}</span>{" "}
                <span className={levelColors[entry.level]}>[{entry.tag}]</span>{" "}
                <span className="text-text-primary/85">{entry.message}</span>
              </motion.div>
            ))}
            <span className="text-accent-green/80">▌</span>
          </div>
        </motion.div>
      </div>
    </WorldSection>
  );
}
