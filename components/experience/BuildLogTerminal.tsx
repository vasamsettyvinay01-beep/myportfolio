"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LIVE_OPS_FEED, TERMINAL_LOG } from "@/lib/data";
import { WorldSection } from "./WorldSection";

const levelColors = {
  info: "text-text-secondary",
  success: "text-accent-green",
  warn: "text-accent-warn",
};

export function BuildLogTerminal() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [liveIndex, setLiveIndex] = useState(0);
  const [liveLines, setLiveLines] = useState<
    { time: string; tag: string; message: string; level: "info" | "success" | "warn" }[]
  >([]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [liveLines]);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      const feedItem = LIVE_OPS_FEED[liveIndex % LIVE_OPS_FEED.length];

      setLiveLines((prev) => [
        ...prev.slice(-4),
        {
          time,
          tag: feedItem.tag,
          message: feedItem.message,
          level: "success" as const,
        },
      ]);
      setLiveIndex((i) => i + 1);
    }, 4500);

    return () => clearInterval(id);
  }, [liveIndex]);

  return (
    <WorldSection id="terminal" className="border-t border-border">
      <div className="section-container">
        <div className="mb-16 max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            Build log
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-text-primary sm:text-4xl">
            Operational terminal
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Deployments, orchestration events, and infrastructure activity — streaming live.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="scanlines relative overflow-hidden rounded-xl matte-panel-glow"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono text-[11px] text-text-secondary">
              vasamsettyvinay@ops — ~/build-log
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] text-accent-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
              live
            </span>
          </div>

          <div
            ref={scrollRef}
            className="terminal-scroll max-h-[400px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-[1.7] sm:px-6"
          >
            {TERMINAL_LOG.map((entry, i) => (
              <motion.div
                key={`static-${i}`}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="mb-1.5"
              >
                <span className="text-text-secondary/40">{entry.time}</span>{" "}
                <span className={levelColors[entry.level]}>[{entry.tag}]</span>{" "}
                <span className="text-text-primary/85">{entry.message}</span>
              </motion.div>
            ))}

            <AnimatePresence>
              {liveLines.map((entry, i) => (
                <motion.div
                  key={`live-${entry.time}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-1.5"
                >
                  <span className="text-text-secondary/40">{entry.time}</span>{" "}
                  <span className={levelColors[entry.level]}>[{entry.tag}]</span>{" "}
                  <span className="text-accent-green/90">{entry.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            <span className="text-accent-green/90 terminal-cursor">▌</span>
          </div>
        </motion.div>
      </div>
    </WorldSection>
  );
}
