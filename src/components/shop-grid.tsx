"use client";

import type { HeadlessProduct } from "@/lib/shopify";

type ShopGridProps = {
  items: HeadlessProduct[];
};

export function ShopGrid({ items }: ShopGridProps) {
  const layoutVariants = [
    "md:col-span-2",
    "md:col-span-1 md:translate-y-8",
    "md:col-span-1",
    "md:col-span-2 md:-translate-y-6",
    "md:col-span-1 md:translate-y-4",
    "md:col-span-1",
  ];

  return (
    <>
      <div className="mb-4 h-8" aria-hidden="true" />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 animate-enter delay-1">
        {items.map((p, i) => (
          <article
            key={p.id}
            className={`group rounded-[3px] bg-transparent p-3 transition-transform duration-300 hover:-translate-y-1 ${layoutVariants[i % layoutVariants.length]}`}
          >
            <div className="relative mb-3 aspect-square overflow-hidden rounded-[3px] border-[0.5px] border-black/10 bg-transparent">
              {p.image ? (
                <>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-0"
                  />
                  <img
                    src={p.hoverImage ?? p.image}
                    alt={`${p.name} alt view`}
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                </>
              ) : null}
            </div>

            <p className="text-sm text-zinc-600">{p.price}</p>
            <h2 className="mt-2 text-lg font-medium text-zinc-900">{p.name}</h2>
            <p className="mt-2 text-sm text-zinc-700">{p.desc}</p>
            <a
              href={p.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-[3px] border-[0.5px] border-black/10 px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              buy now
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
