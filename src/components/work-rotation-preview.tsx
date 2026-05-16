"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 37;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function frameSrc(frameIndex: number) {
  const n = String(frameIndex + 1).padStart(4, "0");
  return `/images/work/project-001/sequence_37/${n}.png`;
}

export function WorkRotationPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = sectionRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = Math.max(node.offsetHeight - viewport, 1);
      const progressed = clamp(-rect.top / total, 0, 1);
      const nextFrame = Math.round(progressed * (FRAME_COUNT - 1));
      setFrame(nextFrame);
    };

    onScroll();

    // Warm browser cache for smoother first scroll.
    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = frameSrc(i);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const turn = (frame / (FRAME_COUNT - 1)) * 360;

  return (
    <section ref={sectionRef} className="relative z-10 h-[260vh] w-full clear-both">
      <div className="sticky top-0 flex h-screen w-full items-start justify-center pt-[10px]">
        <div className="flex w-full flex-col gap-[10px] px-0">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">
            <p>project 001 rotation placeholder</p>
            <p>
              frame {String(frame + 1).padStart(3, "0")} / {FRAME_COUNT} · yaw{" "}
              {Math.round(turn)}°
            </p>
          </div>

          <div
            className="relative isolate overflow-hidden border border-white/50 p-8"
            style={{
              background:
                "linear-gradient(90deg, #ff3636 0%, #8a2323 14%, #000000 28%, #000000 72%, #8a2323 86%, #ff3636 100%)",
            }}
          >
            <div
              className="flex w-full items-center justify-center"
              style={{ aspectRatio: "16 / 9", minHeight: "420px" }}
            >
              <img
                src={frameSrc(frame)}
                alt={`Shoe rotation frame ${frame + 1}`}
                className="h-full w-full object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/65">
            Render guide: transparent sequence 0001-0037, fixed camera, fixed lighting.
          </p>
        </div>
      </div>
    </section>
  );
}
