"use client";

import { useEffect, useState } from "react";

export function GlobalCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor((c) => ({ ...c, tx: e.clientX + 10, ty: e.clientY + 10 }));
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      setCursor((c) => ({
        ...c,
        x: c.x + (c.tx - c.x) * 0.2,
        y: c.y + (c.ty - c.y) * 0.2,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[120] h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-95"
      style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
    >
      <div className="mouse-cursor-icon h-full w-full" aria-hidden="true" />
    </div>
  );
}
