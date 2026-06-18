"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const accents = ["#6e8bff", "#9b7bff", "#74d3ae"];

export function IntelPanel() {
  return (
    <WorldSection id="intel" className="border-t border-border">
      <div className="section-container">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl text-text-primary sm:text-4xl">
            Case studies
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Problem, solution, tradeoff, and outcome for five production systems
            — SNIPR, CandidateMatch, Agentrix, Orion OS, and D8 Copilot.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {CASE_STUDIES.map((study, i) => (
            <motion.article
              key={study.id}
              id={`intel-${study.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl matte-panel p-7 sm:p-8"
              style={{ borderLeftColor: accents[i % accents.length], borderLeftWidth: 2 }}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
                style={{ background: `${accents[i % accents.length]}18` }}
              />

              <div className="relative flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight">{study.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 grid gap-8 sm:grid-cols-2">
                {(
                  [
                    ["Problem", study.problem],
                    ["Solution", study.solution],
                    ["Tradeoff", study.tradeoff],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                      {label}
                    </p>
                    <p className="text-sm leading-[1.7] text-text-secondary">{value}</p>
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
                    Outcome
                  </p>
                  <p className="rounded-lg border border-accent/15 bg-accent/5 px-5 py-4 text-sm leading-[1.7] text-text-primary">
                    {study.outcome}
                  </p>
                </div>
              </div>

              <Link
                href={`/case-studies/${study.id}`}
                className="relative mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-accent"
              >
                Read full case study
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </WorldSection>
  );
}
