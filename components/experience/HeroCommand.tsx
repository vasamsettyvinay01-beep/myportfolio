"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Code2, Users } from "lucide-react";
import { CONTACT_LINKS, SHIPPING_LOG, SITE } from "@/lib/data";
import { AISystemCore } from "./AISystemCore";

const EASE = [0.22, 1, 0.36, 1] as const;

const headline = SITE.headline.split(" ");

export function HeroCommand() {
  const lastShip = SHIPPING_LOG[0];

  return (
    <section className="ambient-hero relative">
      <div className="section-container relative z-20 pt-24 pb-4 sm:pt-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary"
          >
            {SITE.role} · {SITE.location}
          </motion.p>

          <h1 className="mt-8 text-4xl font-medium leading-[1.06] tracking-[-0.02em] text-text-primary sm:text-5xl lg:text-[3.25rem]">
            {headline.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.06, ease: EASE }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
            className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary"
          >
            {SITE.subhead}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-4 font-mono text-[11px] text-text-secondary/80"
          >
            {SITE.companies}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#systems"
              data-magnetic
              className="magnetic-target glow-blue inline-flex items-center gap-2 rounded-md bg-text-primary px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              View products
              <ArrowRight size={15} strokeWidth={1.5} />
            </a>
            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="magnetic-target inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-accent/30 hover:bg-surface-elevated"
            >
              <Code2 size={15} strokeWidth={1.5} />
              GitHub
            </a>
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="magnetic-target inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary hover:bg-surface-elevated"
            >
              <Users size={15} strokeWidth={1.5} />
              LinkedIn
            </a>
            <a
              href={CONTACT_LINKS.schedule}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="magnetic-target inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary hover:bg-surface-elevated"
            >
              <Calendar size={15} strokeWidth={1.5} />
              Book a call
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 font-mono text-[11px] text-text-secondary"
          >
            Last ship {lastShip.date} — {lastShip.message}
          </motion.p>
        </div>
      </div>

      <AISystemCore />
    </section>
  );
}
