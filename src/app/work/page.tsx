import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { workItems } from "@/data/site";

type RGB = [number, number, number];

const RED: RGB = [255, 54, 54];
const ORANGE: RGB = [255, 138, 54];
const RAINBOW_STOPS: RGB[] = [
  ORANGE,
  [255, 225, 54],
  [54, 255, 138],
  [54, 138, 255],
  [255, 54, 225],
  RED,
];

function mixColor(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function toHex([r, g, b]: RGB) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function hoverColorAt(index: number, total: number) {
  if (index === 0) return "#ff3636";

  // 20% steps from red -> orange across the next 5 titles
  if (index <= 5) return toHex(mixColor(RED, ORANGE, index / 5));

  // Then continue orange -> yellow -> green -> blue -> magenta -> red
  const t = (index - 5) / (total - 1 - 5);
  const segment = (RAINBOW_STOPS.length - 1) * t;
  const i = Math.min(Math.floor(segment), RAINBOW_STOPS.length - 2);
  const localT = segment - i;
  return toHex(mixColor(RAINBOW_STOPS[i], RAINBOW_STOPS[i + 1], localT));
}

export default function WorkPage() {
  const demoItems = Array.from({ length: 2 }, (_, i) => {
    const real = workItems[i];
    if (real) {
      return {
        key: real.slug,
        href: `/work/${real.slug}`,
        title: real.title,
        category: real.category,
      };
    }

    const n = String(i + 1).padStart(3, "0");
    return {
      key: `placeholder-${n}`,
      href: "#",
      title: `title placeholder ${n}`,
      category: "identity + web",
    };
  });

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-zinc-300">
      <section className="flex w-full flex-col gap-[10px] px-5 pb-24 pt-0 md:px-[60px]">
        <SiteHeader />

        <section className="animate-enter">
          <ul className="space-y-1">
            {demoItems.map((item, i) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  style={{ ["--hover-color" as string]: hoverColorAt(i, demoItems.length) }}
                  className="group grid grid-cols-[64px_1fr] items-start gap-6 rounded-[3px] px-1 py-2 transition-colors hover:bg-white/5 md:grid-cols-[84px_1fr]"
                >
                  <span className="pt-1 font-mono text-[15px] leading-none text-zinc-500 md:text-[30px]">
                    {String(i + 1).padStart(3, "0")}
                  </span>
                  <div>
                    <h2 className="font-mono text-[23px] uppercase leading-[1] tracking-tight text-zinc-400 transition-colors group-hover:text-[var(--hover-color)] md:text-[46px]">
                      {`ANYPERCENT EVENT ${String(i + 1).padStart(3, "0")}`}
                    </h2>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-zinc-600 md:text-xs">
                      {item.category}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
