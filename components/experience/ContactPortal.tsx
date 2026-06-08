"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Code2, Mail, Phone, Users } from "lucide-react";
import { CONTACT_LINKS } from "@/lib/data";
import { WorldSection } from "./WorldSection";

export function ContactPortal() {
  return (
    <WorldSection id="contact" className="border-t border-border pb-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl matte-panel px-8 py-16 text-center sm:px-14 sm:py-20"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">
            Contact
          </p>
          <h2 className="mt-8 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Building something ambitious?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-text-secondary">
            Let&apos;s build systems that actually ship.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { href: CONTACT_LINKS.email, icon: Mail, label: "Email" },
              { href: CONTACT_LINKS.phone, icon: Phone, label: "Phone" },
              { href: CONTACT_LINKS.linkedin, icon: Users, label: "LinkedIn" },
              { href: CONTACT_LINKS.github, icon: Code2, label: "GitHub" },
              { href: CONTACT_LINKS.schedule, icon: Calendar, label: "Schedule" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text-primary transition-colors hover:bg-surface-elevated"
              >
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
          <a
            href={CONTACT_LINKS.schedule}
            className="mt-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Book a consultation
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </motion.div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-10 sm:flex-row">
          <p className="font-mono text-[11px] text-text-secondary">
            Vinay Vasamsetty
          </p>
          <p className="font-mono text-[11px] text-text-secondary/50">
            Operational systems
          </p>
        </footer>
      </div>
    </WorldSection>
  );
}
