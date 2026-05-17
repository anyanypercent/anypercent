"use client";

import { useMemo, useState } from "react";

const WORDS = [
  "additive",
  "lattice",
  "ergonomic",
  "pressure map",
  "rapid iterate",
  "zoned flex",
  "parametric",
  "lightweight",
  "toolpath",
  "future form",
];

const LAYOUT_VARIANTS = [
  "md:col-span-2 md:row-span-2 md:h-[280px]",
  "md:col-span-1 md:h-[130px]",
  "md:col-span-1 md:h-[170px]",
  "md:col-span-2 md:h-[180px]",
  "md:col-span-1 md:h-[220px]",
  "md:col-span-1 md:h-[145px]",
  "md:col-span-2 md:h-[210px]",
  "md:col-span-1 md:h-[155px]",
];

export function WorkEditorialBoard({ bgColor = "#0d0d0d" }: { bgColor?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  const imageSlots = useMemo(
    () => Array.from({ length: 24 }, (_, i) => i + 1),
    [],
  );

  const shiftX = (pointer.x - 0.5) * 28;
  const shiftY = (pointer.y - 0.5) * 24;

  return (
    <section
      className="relative isolate overflow-hidden px-4 py-6 md:px-8 md:py-10"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setPointer({ x, y });
      }}
      onMouseLeave={() => {
        setPointer({ x: 0.5, y: 0.5 });
        setActive(null);
      }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: bgColor }} />

      <div className="pointer-events-none absolute inset-0 z-10">
        {WORDS.map((word, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const left = 6 + col * 19;
          const top = 12 + row * 34;
          const scale = active === i ? 1.06 : 1;
          return (
            <p
              key={word}
              className="absolute select-none whitespace-nowrap text-[10vw] font-semibold uppercase leading-none tracking-[0.06em] text-white/16 transition-transform duration-300 md:text-[4.6vw]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(${shiftX * (0.25 + i * 0.03)}px, ${shiftY * (0.2 + i * 0.025)}px) scale(${scale})`,
              }}
            >
              {word}
            </p>
          );
        })}
      </div>

      <div className="relative z-20 mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
        <p>future image board</p>
        <p>24 placeholder frames · 10 editorial copy tags</p>
      </div>

      <div className="relative z-20 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {imageSlots.map((slot, idx) => {
          const hovered = active === idx % WORDS.length;
          const variant = LAYOUT_VARIANTS[idx % LAYOUT_VARIANTS.length];
          return (
            <button
              key={slot}
              type="button"
              className={`group relative h-[118px] overflow-hidden border border-white/50 bg-black/35 text-left transition duration-300 hover:border-white md:h-[150px] ${variant}`}
              onMouseEnter={() => setActive(idx % WORDS.length)}
            >
              <div
                className="absolute inset-0 transition-transform duration-300"
                style={{
                  transform: `translate(${shiftX * -0.22}px, ${shiftY * -0.2}px) scale(${hovered ? 1.04 : 1})`,
                }}
              >
                <div className="h-full w-full bg-[linear-gradient(160deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_38%,rgba(0,0,0,0.35)_100%)]" />
              </div>
              <div className="absolute inset-0 border border-white/10" />
              <p className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">
                image {String(slot).padStart(2, "0")}
              </p>
              <p className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                placeholder
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
