"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SHIPPING_LOG } from "@/lib/data";
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
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl text-text-primary sm:text-4xl">
            Ship log
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Dated record of production deploys, fixes, and infrastructure changes
            across SNIPR, CandidateMatch, Agentrix, Orion OS, and related systems.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="scanlines relative overflow-hidden rounded-xl matte-panel-glow"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono text-[11px] text-text-secondary">
              ~/ship-log — newest first
            </span>
          </div>

          <div
            ref={scrollRef}
            className="terminal-scroll max-h-[360px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-[1.7] sm:px-6"
          >
            {[...SHIPPING_LOG].reverse().map((entry, i) => (
              <motion.div
                key={`${entry.date}-${entry.tag}`}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="mb-1.5"
              >
                <span className="text-text-secondary/50">{entry.date}</span>{" "}
                <span className={levelColors[entry.level]}>[{entry.tag}]</span>{" "}
                <span className="text-text-primary/90">{entry.message}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </WorldSection>
  );
}
