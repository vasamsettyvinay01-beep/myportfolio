"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Code2 } from "lucide-react";
import { SystemMap } from "@/components/SystemMap";
import { GlowButton } from "@/components/ui/GlowButton";
import { CONTACT_LINKS } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center pt-16 pb-20">
      <div className="section-container grid flex-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block font-mono text-[10px] tracking-[0.2em] text-accent-blue uppercase sm:text-xs"
          >
            AI Product Engineer · Founding Engineer · Systems Builder
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            I build AI-powered operational systems that{" "}
            <span className="text-accent-blue">ship.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Technical founder building automation infrastructure, AI workflows,
            SaaS platforms, recruiting systems, backend architecture, and
            production-grade operational tooling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <GlowButton href="#systems">
              View Systems
              <ArrowRight size={16} />
            </GlowButton>
            <GlowButton
              href={CONTACT_LINKS.github}
              variant="secondary"
              external
            >
              <Code2 size={16} />
              GitHub
            </GlowButton>
            <GlowButton
              href={CONTACT_LINKS.schedule}
              variant="secondary"
              external
            >
              <Calendar size={16} />
              Book a Call
            </GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center gap-6 font-mono text-xs text-text-secondary"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              Systems online
            </span>
            <span>7 active builds</span>
            <span>Last ship: 05/22/26</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-text-secondary uppercase tracking-wider">
              <span>Operational Systems Map</span>
              <span className="text-accent-green">LIVE</span>
            </div>
            <SystemMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
