"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Code2, Users } from "lucide-react";
import { Button3D } from "@/components/ui/Button3D";
import { CONTACT_LINKS, SHIPPING_LOG, SITE } from "@/lib/data";
import { AISystemCore } from "./AISystemCore";

const EASE = [0.22, 1, 0.36, 1] as const;

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

          <h1 className="mt-8 text-4xl leading-[1.15] text-text-primary sm:text-5xl lg:text-[3.75rem]">
            {SITE.headline}
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
            <Button3D href="#systems" variant="primary">
              Read build story
              <ArrowRight size={15} strokeWidth={1.5} />
            </Button3D>
            <Button3D href={CONTACT_LINKS.github} variant="secondary" external>
              <Code2 size={15} strokeWidth={1.5} />
              GitHub
            </Button3D>
            <Button3D href={CONTACT_LINKS.linkedin} variant="ghost" external>
              <Users size={15} strokeWidth={1.5} />
              LinkedIn
            </Button3D>
            <Button3D href={CONTACT_LINKS.schedule} variant="accent" external>
              <Calendar size={15} strokeWidth={1.5} />
              Book a call
            </Button3D>
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
