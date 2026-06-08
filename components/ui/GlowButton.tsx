"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type GlowButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-blue/15 text-text-primary border-accent-blue/40 hover:bg-accent-blue/25 hover:border-accent-blue/60 glow-blue",
  secondary:
    "bg-surface-elevated text-text-primary border-border hover:border-accent-violet/40 hover:bg-white/[0.04]",
  ghost:
    "bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:border-border",
};

export function GlowButton({
  href,
  onClick,
  children,
  variant = "primary",
  external,
  className = "",
}: GlowButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps}>
        <Link href={href} className={base}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={base} {...motionProps}>
      {children}
    </motion.button>
  );
}
