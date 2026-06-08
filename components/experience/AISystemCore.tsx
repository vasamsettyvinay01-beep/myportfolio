"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { CORE_NODES } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";
import { LiveOpsFeed } from "./LiveOpsFeed";
import { SoftOperationalMap } from "./SoftOperationalMap";

const CoreCanvas = dynamic(() => import("@/components/three/CoreCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-square w-full items-center justify-center rounded-2xl matte-panel">
      <div className="h-8 w-8 animate-pulse rounded-full bg-accent/20" />
    </div>
  ),
});

export function AISystemCore() {
  const [active, setActive] = useState(CORE_NODES[0]);
  const reducedMotion = useReducedMotion();

  return (
    <div id="core" className="relative flex min-h-[70vh] flex-col justify-center pb-16 pt-8">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary"
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
              {CORE_NODES.slice(0, 6).map((node, i) => (
                <motion.button
                  key={node.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onMouseEnter={() => setActive(node)}
                  onFocus={() => setActive(node)}
                  onClick={() => setActive(node)}
                  className={`rounded-lg border px-3 py-3 text-left transition-all duration-300 ${
                    active.id === node.id
                      ? "border-accent/30 bg-surface-elevated glow-blue"
                      : "border-transparent bg-transparent hover:border-border hover:bg-surface"
                  }`}
                >
                  <p className="font-mono text-[10px] text-text-secondary">{node.label}</p>
                  <p className="mt-1 text-xs text-text-primary">{node.metric}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {!reducedMotion && (
              <div className="relative mb-6 hidden aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg lg:block">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.08)_0%,transparent_70%)]" />
                <CoreCanvas activeNodeId={active.id} />
              </div>
            )}
            <SoftOperationalMap active={active} onActiveChange={setActive} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
