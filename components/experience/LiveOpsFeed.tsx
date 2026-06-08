"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LIVE_OPS_FEED } from "@/lib/data";
import { useCyclingItems, useLiveFeed } from "@/lib/hooks";

export function LiveOpsFeed({ compact = false }: { compact?: boolean }) {
  const current = useLiveFeed(LIVE_OPS_FEED, 4000);
  const stream = useCyclingItems(LIVE_OPS_FEED, compact ? 2 : 3, 3200);

  if (compact) {
    return (
      <div className="space-y-1 font-mono text-[10px] text-text-secondary">
        {stream.map((item, i) => (
          <p key={`${item.tag}-${i}`} className="truncate opacity-70">
            <span className="text-text-secondary/60">[{item.tag}]</span> {item.message}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg matte-panel p-4">
      <p className="font-mono text-[10px] tracking-wider text-text-secondary uppercase">
        Live operations
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={current.tag + current.message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 font-mono text-xs leading-relaxed text-text-primary"
        >
          <span className="text-text-secondary">[{current.tag}]</span> {current.message}
        </motion.p>
      </AnimatePresence>
      <div className="mt-4 space-y-1 border-t border-border pt-3">
        {stream.slice(1).map((item, i) => (
          <p key={i} className="truncate font-mono text-[10px] text-text-secondary/70">
            [{item.tag}] {item.message}
          </p>
        ))}
      </div>
    </div>
  );
}
