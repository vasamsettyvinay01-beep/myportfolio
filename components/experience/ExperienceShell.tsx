"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BuildLogTerminal } from "./BuildLogTerminal";
import { AILabExperience } from "./AILabExperience";
import { CommandNav } from "./CommandNav";
import { ContactPortal } from "./ContactPortal";
import { HeroCommand } from "./HeroCommand";
import { IntelPanel } from "./IntelPanel";
import { SystemsUniverse } from "./SystemsUniverse";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35 });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-gradient-to-r from-accent via-accent-violet to-accent" />
    </motion.div>
  );
}

export function ExperienceShell() {
  return (
    <div className="experience-root bg-noise relative min-h-screen">
      <div className="ambient-top pointer-events-none fixed inset-0 z-0" />
      <div className="bg-grid pointer-events-none fixed inset-0 z-0 opacity-70" />
      <ScrollProgress />
      <CommandNav />

      <main className="relative z-10">
        <HeroCommand />
        <SystemsUniverse />
        <BuildLogTerminal />
        <AILabExperience />
        <IntelPanel />
        <ContactPortal />
      </main>
    </div>
  );
}
