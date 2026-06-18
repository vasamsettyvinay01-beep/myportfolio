"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Cpu,
  Database,
  Layout,
  Radio,
  Server,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { ARCHITECTURE_FLOW } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const ICONS: Record<string, LucideIcon> = {
  input: Radio,
  orchestration: Bot,
  backend: Server,
  data: Database,
  automation: Cpu,
  ui: Layout,
  monitoring: Activity,
};

const SPANS: Record<string, string> = {
  input: "md:col-span-4",
  orchestration: "md:col-span-8",
  backend: "md:col-span-4",
  data: "md:col-span-4",
  automation: "md:col-span-4",
  ui: "md:col-span-6",
  monitoring: "md:col-span-6",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function ArchitectureExperience() {
  const [activeId, setActiveId] = useState<string>(ARCHITECTURE_FLOW[0].id);
  const active = ARCHITECTURE_FLOW.find((n) => n.id === activeId)!;

  return (
    <WorldSection id="architecture" className="border-t border-border">
      <div className="section-container">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl text-text-primary sm:text-4xl">
            How I build
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            The same seven layers appear in every production system I ship — from
            SNIPR and CandidateMatch to Agentrix, Orion OS, and D8 Copilot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {ARCHITECTURE_FLOW.map((node, i) => {
            const Icon = ICONS[node.id] ?? Server;
            const isActive = activeId === node.id;

            return (
              <motion.button
                key={node.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, ease: EASE }}
                onClick={() => setActiveId(node.id)}
                data-magnetic
                className={`magnetic-target rounded-xl border p-5 text-left transition-colors md:p-6 ${SPANS[node.id]} ${
                  isActive
                    ? "border-accent/40 bg-surface-elevated"
                    : "border-border bg-surface/70 hover:border-accent/20 hover:bg-surface-elevated/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `${node.color}50`,
                      backgroundColor: `${node.color}15`,
                      color: node.color,
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-medium text-text-primary">{node.label}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {node.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-text-secondary">
          <span className="font-medium text-text-primary">{active.label}:</span>{" "}
          {active.description}
        </p>
      </div>
    </WorldSection>
  );
}
