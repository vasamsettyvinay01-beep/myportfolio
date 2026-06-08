"use client";

import { useState } from "react";
import { SYSTEMS } from "@/lib/data";
import { WorldSection } from "./WorldSection";
import { SystemModule } from "./SystemModule";

export function SystemsUniverse() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <WorldSection id="systems">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">
            Systems
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Production modules
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Operational platforms in production — select a module to inspect
            architecture and metrics.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {SYSTEMS.map((system, i) => (
            <SystemModule
              key={system.id}
              system={system}
              index={i}
              isActive={activeId === system.id}
              onActivate={() =>
                setActiveId(activeId === system.id ? null : system.id)
              }
            />
          ))}
        </div>
      </div>
    </WorldSection>
  );
}
