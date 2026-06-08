"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CASE_STUDIES } from "@/lib/data";

function CaseStudyBlock({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  const fields = [
    { key: "Problem", value: study.problem },
    { key: "Solution", value: study.solution },
    { key: "Tradeoff", value: study.tradeoff },
    { key: "Outcome", value: study.outcome },
  ] as const;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-text-primary">{study.name}</h3>
        <div className="flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[10px] text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.key === "Outcome" ? "sm:col-span-2" : ""}>
            <p className="mb-2 font-mono text-[10px] tracking-widest text-accent-blue uppercase">
              {field.key}
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeader
          label="// deep_dives"
          title="Selected Case Studies"
          description="Problem → solution → tradeoff → outcome. How systems get built and shipped."
        />
        <div className="flex flex-col gap-8">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyBlock key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
