"use client";

import { motion } from "framer-motion";
import { Calendar, Code2, Mail, Phone, Users } from "lucide-react";
import { CONTACT_LINKS, SITE } from "@/lib/data";
import { WorldSection } from "./WorldSection";

export function ContactPortal() {
  return (
    <WorldSection id="contact" tight className="border-t border-border pb-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl matte-panel-glow px-8 py-16 text-center sm:px-14 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.06)_0%,transparent_65%)]" />

          <h2 className="relative text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Work with me
          </h2>
          <p className="relative mx-auto mt-6 max-w-md text-base text-text-secondary">
            Founding engineer or contract — agent systems, recruiting AI, document
            pipelines, and ops automation. Email or book 30 minutes on Calendly.
          </p>

          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            {[
              { href: CONTACT_LINKS.email, icon: Mail, label: "Email" },
              { href: CONTACT_LINKS.phone, icon: Phone, label: "Phone" },
              { href: CONTACT_LINKS.linkedin, icon: Users, label: "LinkedIn" },
              { href: CONTACT_LINKS.github, icon: Code2, label: "GitHub" },
              { href: CONTACT_LINKS.schedule, icon: Calendar, label: "Calendly" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                data-magnetic
                target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="magnetic-target inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-accent/30 hover:bg-surface-elevated"
              >
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-10 sm:flex-row">
          <p className="font-mono text-[11px] text-text-secondary">{SITE.name}</p>
          <p className="font-mono text-[11px] text-text-secondary/50">
            {SITE.role} · {SITE.location}
          </p>
        </footer>
      </div>
    </WorldSection>
  );
}
