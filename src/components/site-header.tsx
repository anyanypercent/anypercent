"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader({
  light = false,
  logoSrc = "/images/ap-logo-xeno.svg",
  linkBaseClass,
  linkHoverClass,
}: {
  light?: boolean;
  logoSrc?: string;
  linkBaseClass?: string;
  linkHoverClass?: string;
}) {
  const hoverClass = linkHoverClass ?? (light ? "hover:text-zinc-700" : "hover:text-[#ff3636]");
  const [scrolled, setScrolled] = useState(false);
  const baseClass = linkBaseClass ?? (light ? "text-black" : "text-zinc-200");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 -mx-5 mb-0 flex items-end justify-between px-5 pb-[10px] pt-[20px] transition-all duration-700 md:-mx-[60px] md:px-[60px] ${
        scrolled
          ? "bg-white/20 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20"
          : "bg-transparent"
      }`}
    >
      <Link href="/" className="inline-flex items-center">
        <Image
          src={logoSrc}
          alt="anypercent"
          width={117}
          height={24}
          className="h-[24px] w-auto"
          priority
        />
      </Link>
      <nav className={`flex gap-7 text-[12px] font-semibold tracking-[0.08em] ${baseClass}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`uppercase transition-colors duration-700 ${hoverClass}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
