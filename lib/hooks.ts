"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export function useLiveFeed<T>(items: readonly T[], intervalMs = 3200) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (document.hidden) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  return items[index];
}

export function useCyclingItems<T>(items: readonly T[], count: number, intervalMs = 2800) {
  const [start, setStart] = useState(0);

  useEffect(() => {
    if (document.hidden) return;

    const id = setInterval(() => {
      setStart((s) => (s + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const visible: T[] = [];
  for (let i = 0; i < count; i++) {
    visible.push(items[(start + i) % items.length]);
  }
  return visible;
}

export function useScrollSpy(sectionIds: readonly string[], offset = 120) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return activeId;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function useCountUp(value: string, active: boolean, duration = 900) {
  const isNumeric = /^-?\d+(?:\.\d+)?/.test(value);
  const [animated, setAnimated] = useState(value);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active || !isNumeric) return;

    const match = value.match(/^(-?)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const [, sign, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted =
        numStr.includes(".")
          ? current.toFixed(1)
          : String(Math.round(current));
      setAnimated(`${sign}${formatted}${suffix}`);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, active, duration, isNumeric]);

  return active && isNumeric ? animated : value;
}

export function useVisibilityPause(callback: () => void, deps: unknown[]) {
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) callback();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
