"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type WorldSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function WorldSection({ id, children, className = "" }: WorldSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, -16]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`relative py-28 sm:py-36 ${className}`}
    >
      {children}
    </motion.section>
  );
}
