"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

type WorldSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
};

export function WorldSection({
  id,
  children,
  className = "",
  tight = false,
}: WorldSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.92, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -8]);

  const padding = tight ? "py-12 sm:py-16" : "py-16 sm:py-20";

  if (reducedMotion) {
    return (
      <section id={id} ref={ref} className={`relative ${padding} ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`relative ${padding} ${className}`}
    >
      {children}
    </motion.section>
  );
}
