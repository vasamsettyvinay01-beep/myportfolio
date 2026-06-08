"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Code2 } from "lucide-react";
import { CONTACT_LINKS } from "@/lib/data";
import { AISystemCore } from "./AISystemCore";

export function HeroCommand() {
  return (
    <section className="relative min-h-screen ambient-top">
      <div className="section-container relative z-20 pt-28 pb-2 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] tracking-[0.22em] text-text-secondary uppercase">
            AI Product Engineer · Founding Engineer · Systems Builder
          </p>
          <h1 className="mt-8 text-4xl font-medium leading-[1.06] tracking-[-0.02em] text-text-primary sm:text-5xl lg:text-[3.25rem]">
            I build AI-powered operational systems that ship.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary">
            Technical founder building automation infrastructure, AI workflows,
            SaaS platforms, and production-grade operational tooling.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#systems"
              className="inline-flex items-center gap-2 rounded-md bg-text-primary px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              View systems
              <ArrowRight size={15} strokeWidth={1.5} />
            </a>
            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-primary transition-colors hover:bg-surface-elevated"
            >
              <Code2 size={15} strokeWidth={1.5} />
              GitHub
            </a>
            <a
              href={CONTACT_LINKS.schedule}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-surface-elevated"
            >
              <Calendar size={15} strokeWidth={1.5} />
              Book a call
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 font-mono text-[11px] text-text-secondary">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              Systems operational
            </span>
            <span>7 deployed modules</span>
            <span>Last ship 05/22/26</span>
          </div>
        </motion.div>
      </div>

      <AISystemCore />
    </section>
  );
}
