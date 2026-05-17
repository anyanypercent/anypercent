"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";

const archiveItems = [
  { id: "G-001", title: "northline // study", year: "2026", medium: "render", image: "/images/hero/homehero01.jpg" },
  { id: "G-002", title: "arc // chassis", year: "2026", medium: "prototype", image: "/images/hero/homehero02.jpg" },
  { id: "G-003", title: "quietframe // shell", year: "2026", medium: "material test", image: "/images/hero/homehero03.jpg" },
  { id: "G-004", title: "xeno // outsole", year: "2025", medium: "scan", image: "/images/hero/homehero02.jpg" },
  { id: "G-005", title: "lattice // flex zones", year: "2025", medium: "process", image: "/images/hero/homehero01.jpg" },
  { id: "G-006", title: "toolpath // map", year: "2025", medium: "diagram", image: "/images/hero/homehero03.jpg" },
  { id: "G-007", title: "drop // yellow", year: "2025", medium: "color test", image: "/images/hero/homehero01.jpg" },
  { id: "G-008", title: "heel // sectional", year: "2024", medium: "r&d", image: "/images/hero/homehero02.jpg" },
  { id: "G-009", title: "profile // black", year: "2024", medium: "archive", image: "/images/hero/homehero03.jpg" },
];

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const open = (index: number) => setActiveIndex(index);
  const next = () => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % archiveItems.length));
  const prev = () =>
    setActiveIndex((prevIndex) =>
      prevIndex === null ? archiveItems.length - 1 : (prevIndex - 1 + archiveItems.length) % archiveItems.length,
    );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#e6e7e8]">
      <section className="flex w-full flex-col gap-6 px-5 pb-12 pt-0 md:px-[60px]">
        <SiteHeader linkHoverClass="hover:text-[#ff3636]" />

        <div className="mt-[60px] flex items-end justify-between border-b border-white/25 pb-4">
          <h1 className="text-[12px] font-semibold uppercase tracking-[0.08em]">gallery</h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">index of studies</p>
        </div>

        <section className="w-full">
          <div className="grid grid-cols-1 gap-y-3 gap-x-[1px] sm:grid-cols-2 lg:grid-cols-3">
            {archiveItems.map((item, i) => {
              const sizeVariant =
                i % 5 === 0
                  ? "sm:col-span-2"
                  : i % 4 === 0
                    ? "lg:row-span-2"
                    : "sm:col-span-1";
              return (
                <article
                  key={item.id}
                  className={`group bg-black/20 p-2 transition-colors ${sizeVariant}`}
                >
                  <button type="button" className="w-full cursor-pointer text-left" onClick={() => open(i)}>
                    <div className="aspect-[4/5] overflow-hidden bg-black/30">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.14em]">
                      <p className="font-mono text-white/55">{item.id}</p>
                      <p>{item.title}</p>
                      <p className="font-mono text-white/55">{item.year}</p>
                      <p className="text-white/75">{item.medium}</p>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </section>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[120] bg-black/95">
          <button
            type="button"
            aria-label="Close viewer"
            className="absolute right-5 top-5 z-20 cursor-pointer text-xl text-white hover:text-[#ff3636] md:right-8 md:top-8"
            onClick={close}
          >
            ✕
          </button>

          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-[4.25rem] font-light leading-none text-white/90 hover:text-[#ff3636] md:left-8 md:text-[5rem]"
            onClick={prev}
          >
            &lsaquo;
          </button>

          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-[4.25rem] font-light leading-none text-white/90 hover:text-[#ff3636] md:right-8 md:text-[5rem]"
            onClick={next}
          >
            &rsaquo;
          </button>

          <div className="flex h-full w-full items-center justify-center px-0 py-0">
            <img
              src={archiveItems[activeIndex].image}
              alt={archiveItems[activeIndex].title}
              className="h-full w-full object-contain"
            />
          </div>

          <p className="absolute bottom-5 right-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 md:bottom-8 md:right-8">
            {activeIndex + 1} / {archiveItems.length}
          </p>
        </div>
      ) : null}
    </main>
  );
}
