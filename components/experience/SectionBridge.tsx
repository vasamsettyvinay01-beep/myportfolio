"use client";

import { SHIPPING_LOG } from "@/lib/data";
import { useLiveFeed } from "@/lib/hooks";

const FEED = SHIPPING_LOG.map((entry) => ({
  tag: entry.tag,
  message: entry.message,
}));

type SectionBridgeProps = {
  label: string;
};

/** @deprecated Removed from layout — ship log entries used instead of synthetic ops feed */
export function SectionBridge({ label }: SectionBridgeProps) {
  const feed = useLiveFeed(FEED, 3800);

  return (
    <div className="section-container py-6 font-mono text-[10px] text-text-secondary">
      <span className="text-text-secondary/60">{label}</span>{" "}
      [{feed.tag}] {feed.message}
    </div>
  );
}
