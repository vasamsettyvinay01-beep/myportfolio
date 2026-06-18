"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { CORE_NODES } from "@/lib/data";
import { useInView, useReducedMotion } from "@/lib/hooks";
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
  const { ref: coreRef, inView: coreInView } = useInView<HTMLDivElement>("120px", 0.1);

  return (
    <div id="core" className="relative pb-10 pt-2">
      <div className="section-container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
              Production stack
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary">
              Ten layers I use across every shipped system — hover or tap a node
              to see where it shows up in SNIPR, CandidateMatch, Agentrix, and Orion OS.
            </p>

            <div className="mt-8 max-w-sm">
              <LiveOpsFeed />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {CORE_NODES.slice(0, 6).map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => setActive(node)}
                  onFocus={() => setActive(node)}
                  onClick={() => setActive(node)}
                  className={`rounded-lg border px-3 py-3 text-left transition-colors duration-200 ${
                    active.id === node.id
                      ? "border-accent/30 bg-surface-elevated glow-blue"
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {!reducedMotion && (
              <div
                ref={coreRef}
                className="relative mb-6 hidden aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg lg:block"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.08)_0%,transparent_70%)]" />
                {coreInView && <CoreCanvas activeNodeId={active.id} />}
              </div>
            )}
            <SoftOperationalMap active={active} onActiveChange={setActive} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
