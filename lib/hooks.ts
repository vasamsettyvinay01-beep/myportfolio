"use client";

import { useEffect, useState } from "react";

export function useLiveFeed<T>(items: readonly T[], intervalMs = 3200) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
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
