"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md";

type Button3DProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  primary:
    "bg-text-primary text-bg border-transparent hover:opacity-90",
  secondary:
    "border-border bg-transparent text-text-primary hover:border-accent/30 hover:bg-surface-elevated",
  ghost:
    "border-border bg-transparent text-text-secondary hover:border-accent/30 hover:text-text-primary hover:bg-surface-elevated",
  accent:
    "border-accent/25 bg-accent/5 text-text-primary hover:border-accent/40 hover:bg-accent/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3 py-1.5 text-xs",
};

export function Button3D({
  href,
  onClick,
  children,
  variant = "secondary",
  size = "md",
  external,
  className = "",
  type = "button",
}: Button3DProps) {
  const base = `magnetic-target inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" data-magnetic className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} data-magnetic className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} data-magnetic className={base}>
      {children}
    </button>
  );
}
