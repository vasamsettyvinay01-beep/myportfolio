"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { SystemCard } from "@/components/SystemCard";
import { SYSTEMS } from "@/lib/data";

export function SystemsSection() {
  return (
    <section id="systems" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeader
          label="// deployed_systems"
          title="Systems"
          description="Production AI systems, operational platforms, and automation infrastructure — not side projects."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {SYSTEMS.map((system, i) => (
            <SystemCard key={system.id} system={system} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
