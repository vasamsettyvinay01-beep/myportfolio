"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CORE_NODES } from "@/lib/data";
import { LiveOpsFeed } from "./LiveOpsFeed";
import { SoftOperationalMap } from "./SoftOperationalMap";

export function AISystemCore() {
  const [active, setActive] = useState(CORE_NODES[0]);

  return (
    <div id="core" className="relative flex min-h-[70vh] flex-col justify-center pb-16 pt-8">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase"
            >
              Operational map
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary"
            >
              A live view of orchestration routes, agent coordination, and
              infrastructure — quiet, always running.
            </motion.p>

            <div className="mt-10 hidden max-w-sm sm:block">
              <LiveOpsFeed />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {CORE_NODES.slice(0, 6).map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => setActive(node)}
                  onFocus={() => setActive(node)}
                  className={`rounded-lg border px-3 py-3 text-left transition-all duration-300 ${
                    active.id === node.id
                      ? "border-border bg-surface-elevated"
                      : "border-transparent bg-transparent hover:border-border hover:bg-surface"
                  }`}
                >
                  <p className="font-mono text-[10px] text-text-secondary">{node.label}</p>
                  <p className="mt-1 text-xs text-text-primary">{node.metric}</p>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <SoftOperationalMap />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
