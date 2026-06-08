"use client";

import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/data";
import { WorldSection } from "./WorldSection";

export function IntelPanel() {
  return (
    <WorldSection id="intel" className="border-t border-border">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">
            Case studies
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Selected intelligence
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Problem, solution, tradeoff, outcome — how systems ship.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {CASE_STUDIES.map((study, i) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-xl matte-panel p-7 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight">{study.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {(
                  [
                    ["Problem", study.problem],
                    ["Solution", study.solution],
                    ["Tradeoff", study.tradeoff],
                    ["Outcome", study.outcome],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className={label === "Outcome" ? "sm:col-span-2" : ""}>
                    <p className="mb-3 font-mono text-[10px] tracking-widest text-text-secondary uppercase">
                      {label}
                    </p>
                    <p className="text-sm leading-[1.7] text-text-secondary">{value}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </WorldSection>
  );
}
