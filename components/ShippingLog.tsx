"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SHIPPING_LOG } from "@/lib/data";

export function ShippingLog() {
  return (
    <section id="shipping-log" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeader
          label="// build_log"
          title="Shipping Log"
          description="Production changes, patches, and ships — logged like an ops terminal."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-xl border border-border bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-border bg-bg px-4 py-3">
            <Terminal size={14} className="text-accent-green" />
            <span className="font-mono text-xs text-text-secondary">
              vinay@ops — ~/shipping-log
            </span>
            <span className="ml-auto font-mono text-[10px] text-accent-green">
              tail -f
            </span>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-4 font-mono text-sm sm:p-6">
            {SHIPPING_LOG.map((entry, i) => (
              <motion.div
                key={`${entry.date}-${i}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group border-b border-border/50 py-3 last:border-0"
              >
                <span className="text-accent-blue">[{entry.date}]</span>{" "}
                <span className="text-text-primary transition-colors group-hover:text-accent-green">
                  {entry.message}
                </span>
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-2 text-accent-green"
            >
              ▌
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
