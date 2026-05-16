"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { products, workItems } from "@/data/site";

const heroSlides = [
  { src: "/images/hero/homehero01.jpg", alt: "anypercent hero image 1" },
  { src: "/images/hero/homehero02.jpg", alt: "anypercent hero image 2" },
  { src: "/images/hero/homehero03.jpg", alt: "anypercent hero image 3" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [showIntro, setShowIntro] = useState(true);
  const [liftCurtain, setLiftCurtain] = useState(false);
  const [blurOutLogo, setBlurOutLogo] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  const goToSlide = (index: number) => {
    const total = heroSlides.length;
    const nextIndex = ((index % total) + total) % total;
    if (nextIndex === currentIndex) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(nextIndex);
    setIsAnimating(true);
  };

  const scrollSlides = (direction: "prev" | "next") => {
    setDirection(direction);
    goToSlide(direction === "next" ? currentIndex + 1 : currentIndex - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection("next");
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        setIsAnimating(true);
        return (prev + 1) % heroSlides.length;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (!isAnimating) return;
    const t = setTimeout(() => {
      setPrevIndex(null);
      setIsAnimating(false);
    }, 1400);
    return () => clearTimeout(t);
  }, [isAnimating]);

  useEffect(() => {
    const stepMs = 18;
    const counter = setInterval(() => {
      setLoadPct((p) => {
        if (p >= 100) return 100;
        return p + 1;
      });
    }, stepMs);

    const blur = setTimeout(() => setBlurOutLogo(true), 2050);
    const lift = setTimeout(() => setLiftCurtain(true), 2800);
    const done = setTimeout(() => setShowIntro(false), 4900);

    return () => {
      clearInterval(counter);
      clearTimeout(blur);
      clearTimeout(lift);
      clearTimeout(done);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-zinc-100">
      {showIntro ? (
        <div className="fixed inset-0 z-[110] overflow-hidden">
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d0d0d] transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${liftCurtain ? "-translate-y-full" : "translate-y-0"}`}
          >
            <div
              className={`relative h-12 w-[350px] transition-all duration-700 ease-out ${blurOutLogo ? "opacity-0 blur-md" : "opacity-100 blur-0"}`}
            >
              <div
                aria-label="anypercent"
                role="img"
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, #ff3636 0%, #ff3636 ${loadPct}%, #e6e7e8 ${loadPct}%, #e6e7e8 100%)`,
                  WebkitMaskImage: 'url("/images/ap-logo-xeno.svg")',
                  maskImage: 'url("/images/ap-logo-xeno.svg")',
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}

      <section className="flex w-full flex-col gap-0 px-5 pb-24 pt-0 md:px-[60px]">
        <SiteHeader />

        <section className="relative mt-0 animate-fade delay-1 cursor-default">
          <button
            type="button"
            onClick={() => scrollSlides("prev")}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 px-2 py-1 text-4xl font-light leading-none text-white/80 transition-all duration-200 hover:scale-110 hover:text-white"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollSlides("next")}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 px-2 py-1 text-4xl font-light leading-none text-white/80 transition-all duration-200 hover:scale-110 hover:text-white"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="relative overflow-hidden rounded-[3px] bg-zinc-900" style={{ aspectRatio: "16 / 9" }}>
            {heroSlides.map((slide, idx) => {
              const isCurrent = idx === currentIndex;
              const isPrevious = prevIndex === idx;

              const transitionClass = isCurrent
                ? isAnimating
                  ? direction === "next"
                    ? "opacity-100 blur-0 scale-100"
                    : "opacity-100 blur-0 scale-100"
                  : "opacity-100 blur-0 scale-100"
                : isPrevious && isAnimating
                  ? direction === "next"
                    ? "opacity-0 blur-[10px] scale-100"
                    : "opacity-0 blur-[10px] scale-100"
                  : direction === "next"
                    ? "opacity-0 blur-[10px] scale-[0.95]"
                    : "opacity-0 blur-[10px] scale-[0.95]";

              return (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={`object-contain select-none ${transitionClass}`}
                  style={{ transitionProperty: "opacity, filter, transform", transitionDuration: "1300ms, 1300ms, 5000ms", transitionTimingFunction: "ease-out" }}
                  priority={idx === 0}
                />
              );
            })}
          </div>
        </section>

        <section id="work" className="grid gap-5 md:grid-cols-3 animate-enter delay-2">
          {workItems.map((item) => (
            <article key={item.slug} className="rounded-[3px] border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.category}</p>
              <h2 className="mb-3 mt-3 text-xl font-medium lowercase">{item.title}</h2>
              <p className="text-sm text-zinc-300">{item.summary}</p>
              <Link href={`/work/${item.slug}`} className="mt-5 inline-block text-sm underline underline-offset-4">
                view case study
              </Link>
            </article>
          ))}
        </section>

        <section id="shop" className="rounded-[3px] border border-white/10 p-6 md:p-8 animate-enter delay-3">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-2xl font-semibold">small products</h3>
            <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300">
              view all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((p) => (
              <article key={p.name} className="rounded-[3px] border border-white/10 bg-black/40 p-5">
                <p className="text-sm text-zinc-400">{p.price}</p>
                <h4 className="mt-2 text-lg font-medium lowercase">{p.name}</h4>
                <p className="mt-2 text-sm text-zinc-300">{p.desc}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-[3px] border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                >
                  buy
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/15 pt-8 text-zinc-300">
          <p className="text-sm">Open for projects and collabs.</p>
          <Link className="mt-2 inline-block text-lg text-white underline underline-offset-4" href="/contact">
            get in touch
          </Link>
        </section>
      </section>
    </main>
  );
}
