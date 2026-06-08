"use client";

import { motion } from "framer-motion";
import { Calendar, Code2, Mail, Phone, Users } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { CONTACT_LINKS } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-12 text-center sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-blue/5 to-transparent" />
          <div className="relative">
            <span className="font-mono text-xs tracking-widest text-accent-blue uppercase">
              {"// contact"}
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-text-primary sm:text-4xl">
              Building something ambitious?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Let&apos;s build systems that actually ship.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <GlowButton href={CONTACT_LINKS.email} external>
                <Mail size={16} />
                Email
              </GlowButton>
              <GlowButton href={CONTACT_LINKS.phone} variant="secondary" external>
                <Phone size={16} />
                Phone
              </GlowButton>
              <GlowButton href={CONTACT_LINKS.linkedin} variant="secondary" external>
                <Users size={16} />
                LinkedIn
              </GlowButton>
              <GlowButton href={CONTACT_LINKS.github} variant="secondary" external>
                <Code2 size={16} />
                GitHub
              </GlowButton>
              <GlowButton href={CONTACT_LINKS.schedule} variant="secondary" external>
                <Calendar size={16} />
                Schedule Call
              </GlowButton>
            </div>
          </div>
        </motion.div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-mono text-xs text-text-secondary">
            Vinay Vasamsetty — Technical Founder · AI Product Engineer
          </p>
          <p className="font-mono text-xs text-text-secondary/60">
            © {new Date().getFullYear()} — Systems that ship
          </p>
        </footer>
      </div>
    </section>
  );
}
