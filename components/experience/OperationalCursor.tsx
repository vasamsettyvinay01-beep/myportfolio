"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CursorCharacter, type CursorMood } from "./CursorCharacter";

/** Small character — face sits on the pointer tip */
const CHARACTER_SCALE = 0.52;

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

function useHasFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot
  );
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function OperationalCursor() {
  const hasPointer = useHasFinePointer();
  const isClient = useIsClient();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);
  const [moving, setMoving] = useState(false);

  const prevPos = useRef({ x: 0, y: 0 });
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasPointer) {
      document.documentElement.classList.remove("cursor-beast");
      return;
    }

    document.documentElement.classList.add("cursor-beast");

    const move = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setLook({ x: dx, y: dy });
      setTilt(Math.max(-10, Math.min(10, dx * 0.4)));
      setMoving(Math.abs(dx) + Math.abs(dy) > 0.5);

      prevPos.current = { x: e.clientX, y: e.clientY };

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setMoving(false), 80);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-magnetic], [role='button'], input, textarea, select, label")) {
        setHovering(true);
      }
    };
    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (
        !related?.closest(
          "a, button, [data-magnetic], [role='button'], input, textarea, select, label"
        )
      ) {
        setHovering(false);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("cursor-beast");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [hasPointer]);

  if (!hasPointer || !isClient) return null;

  const mood: CursorMood = clicking
    ? "click"
    : hovering
      ? "hover"
      : moving
        ? "move"
        : "idle";

  return createPortal(
    <div
      className="pointer-events-none fixed top-0 left-0 z-[2147483647]"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${CHARACTER_SCALE})`,
        opacity: visible ? 1 : 0,
        willChange: "transform",
      }}
      aria-hidden
    >
      <CursorCharacter mood={mood} lookX={look.x} lookY={look.y} tilt={tilt} />
    </div>,
    document.body
  );
}
