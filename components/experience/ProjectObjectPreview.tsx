"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const ProjectObjectCanvas = dynamic(
  () => import("@/components/three/ProjectObjectCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-xl bg-accent/5" />
    ),
  }
);

type ProjectObjectPreviewProps = {
  systemId: string;
  active?: boolean;
  size?: "sm" | "lg";
  className?: string;
  label?: string;
};

export function ProjectObjectPreview({
  systemId,
  active = false,
  size = "sm",
  className = "",
  label,
}: ProjectObjectPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "120px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-bg ${className}`}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.08)_0%,transparent_70%)]" />
      {mounted && !reducedMotion ? (
        <ProjectObjectCanvas systemId={systemId} active={active} size={size} className="h-full w-full" />
      ) : (
        <div className="flex h-full w-full items-center justify-center border border-border/50 bg-surface/50">
          <div className="h-6 w-6 rounded-full border border-accent/20 bg-accent/10" />
        </div>
      )}
    </div>
  );
}
