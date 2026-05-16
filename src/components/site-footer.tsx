"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const policyLinks = [
  { label: "Cookie Policy", href: "/pages/cookie-policy" },
  { label: "Privacy Statement", href: "/pages/privacy-policy" },
  { label: "Terms & Conditions", href: "/pages/terms-and-conditions" },
  { label: "Accessibility Statement", href: "/pages/accessibility-statement" },
  { label: "Data Request Form", href: "https://preferences.kith.com/" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

function SocialIcon({ name }: { name: string }) {
  const base = "h-[15px] w-[15px]";
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={base} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={base} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4L20 20" />
          <path d="M20 4L4 20" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={base} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M14 4v8.5a4.5 4.5 0 1 1-3.2-4.3" />
          <path d="M14 4c1.2 2 2.7 3.2 5 3.4" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={base} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="6.5" width="18" height="11" rx="3" />
          <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export function SiteFooter() {
  const pathname = usePathname();
  const isShop = pathname?.startsWith("/shop");
  const isWorkDetail = pathname?.startsWith("/work/");
  const isWork = pathname === "/work";

  const theme = isShop
    ? {
        bg: "bg-[#CCCCCC]",
        text: "text-zinc-900",
        border: "border-black/20",
        muted: "text-zinc-700",
        dim: "text-zinc-600",
      }
    : isWorkDetail
      ? {
          bg: "bg-[#ff3636]",
          text: "text-[#e6e7e8]",
          border: "border-[#e6e7e8]/30",
          muted: "text-[#e6e7e8]/85",
          dim: "text-[#e6e7e8]/70",
        }
      : isWork
        ? {
            bg: "bg-[#0d0d0d]",
            text: "text-[#e6e7e8]",
            border: "border-[#e6e7e8]/20",
            muted: "text-[#e6e7e8]/85",
            dim: "text-[#e6e7e8]/65",
          }
        : {
            bg: "bg-[#0d0d0d]",
            text: "text-[#e6e7e8]",
            border: "border-white/20",
            muted: "text-[#e6e7e8]/90",
            dim: "text-[#e6e7e8]/65",
          };

  return (
    <footer className={`border-t ${theme.border} ${theme.bg} ${theme.text}`}>
      <div className="mx-auto w-full px-5 py-10 md:px-[60px] md:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em]">Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/contact"
                  className={`text-[12px] uppercase tracking-[0.12em] transition-colors hover:opacity-100 ${theme.muted}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em]">Policies</h2>
            <ul className="mt-4 space-y-3">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`text-[12px] uppercase tracking-[0.12em] transition-colors hover:opacity-100 ${theme.muted}`}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em]">Social</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-9 w-9 items-center justify-center border transition-opacity hover:opacity-100 ${theme.border} ${theme.muted}`}
                >
                  <SocialIcon name={item.label} />
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className={`mt-10 flex flex-col gap-3 border-t pt-5 text-[10px] uppercase tracking-[0.14em] md:flex-row md:items-center md:justify-between ${theme.border} ${theme.dim}`}>
          <p>© {new Date().getFullYear()} anypercent</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
