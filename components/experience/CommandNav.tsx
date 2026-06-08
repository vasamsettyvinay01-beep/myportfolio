"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useScrollSpy } from "@/lib/hooks";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export function CommandNav() {
  const [open, setOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl">
      <nav className="section-container flex h-14 items-center justify-between sm:h-[4.25rem]">
        <Link
          href="#core"
          data-magnetic
          className="magnetic-target font-mono text-[13px] tracking-tight text-text-primary"
        >
          vinay<span className="text-accent">.systems</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-magnetic
                  className={`magnetic-target text-[13px] transition-colors hover:text-text-primary ${
                    isActive ? "nav-active text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          data-magnetic
          className="magnetic-target hidden rounded-md border border-accent/25 bg-accent/5 px-4 py-1.5 text-[13px] text-text-primary transition-colors hover:border-accent/40 hover:bg-accent/10 md:inline-flex"
        >
          Contact
        </a>

        <button
          type="button"
          className="text-text-primary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0 }}
          className="overflow-hidden border-t border-border lg:hidden"
        >
          <ul className="section-container flex flex-col gap-5 py-6">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-text-secondary"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
