"use client";

import { CORE_NODES } from "@/lib/data";
import { useLiveFeed } from "@/lib/hooks";

export function AmbientSideRails() {
  const feed = useLiveFeed(CORE_NODES.map((n) => n.metric), 4200);

  return (
    <>
      <aside
        className="pointer-events-none fixed top-0 bottom-0 left-0 z-[5] hidden w-12 xl:block"
        aria-hidden
      >
        <div className="absolute top-20 bottom-20 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
        {CORE_NODES.slice(0, 5).map((node, i) => (
          <div
            key={node.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${18 + i * 14}%` }}
          >
            <span className="mx-auto block h-1 w-1 rounded-full bg-accent/60" />
            <span
              className="mt-2 block font-mono text-[7px] uppercase tracking-widest text-text-secondary/45 whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {node.label.split(" ")[0]}
            </span>
          </div>
        ))}
      </aside>

      <aside
        className="pointer-events-none fixed top-0 right-0 bottom-0 z-[5] hidden w-12 xl:block"
        aria-hidden
      >
        <div className="absolute top-20 bottom-20 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent-violet/25 to-transparent" />
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.2em] text-text-secondary/40"
          style={{ writingMode: "vertical-rl" }}
        >
          live metrics
        </div>
        <div
          className="absolute bottom-[26%] left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent/55"
          style={{ writingMode: "vertical-rl" }}
        >
          {feed}
        </div>
      </aside>
    </>
  );
}
