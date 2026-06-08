"use client";

import { OperationalCursor } from "./OperationalCursor";

export function CursorRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OperationalCursor />
      {children}
    </>
  );
}
