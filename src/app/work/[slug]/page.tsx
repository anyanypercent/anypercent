import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { WorkEditorialBoard } from "@/components/work-editorial-board";
import { WorkRotationPreview } from "@/components/work-rotation-preview";
import { workDetailBgBySlug, workDetailInkBySlug, workItems } from "@/data/site";

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = workItems.findIndex((entry) => entry.slug === slug);
  const item = currentIndex >= 0 ? workItems[currentIndex] : undefined;

  if (!item) return notFound();

  const dropNo = String(currentIndex + 1).padStart(3, "0");
  const total = workItems.length;
  const prev = workItems[(currentIndex - 1 + total) % total];
  const next = workItems[(currentIndex + 1) % total];
  const pageBg = workDetailBgBySlug[item.slug] ?? "#0d0d0d";
  const isDarkInk = (workDetailInkBySlug[item.slug] ?? "light") === "dark";
  const inkClass = isDarkInk ? "text-black" : "text-white";
  const mutedInkClass = isDarkInk ? "text-black/80" : "text-white/80";

  return (
    <main className={`min-h-screen ${inkClass}`} style={{ backgroundColor: pageBg }}>
      <section className="flex w-full flex-col gap-[10px] px-5 pb-10 pt-0 md:px-[60px]">
        <SiteHeader
          logoSrc={isDarkInk ? "/images/ap-logo-xeno-black.svg" : "/images/ap-logo-xeno.svg"}
          linkBaseClass={isDarkInk ? "text-black" : "text-zinc-200"}
          linkHoverClass="hover:text-[#ff3636]"
        />
        {!isDarkInk ? (
          <div className="mt-[60px] flex h-8 w-full items-center gap-[9px] overflow-hidden opacity-80">
            {Array.from({ length: 24 }).map((_, i) => (
              <img key={`top-${i}`} src="/images/xeno-logo-01-230px.svg" alt="anypercent" className="h-[18px] w-auto" />
            ))}
          </div>
        ) : null}
        <article className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden text-center">
          <p className={`font-mono text-xs uppercase tracking-[0.28em] ${inkClass}`}>{item.category}</p>
          <h1 className="relative z-10 mt-5 text-5xl font-semibold uppercase leading-none md:text-7xl">{item.title}</h1>

          <div className={`mt-8 border-y-2 border-dashed px-6 py-3 ${isDarkInk ? "border-black" : "border-white"}`}>
            <p className="font-mono text-2xl uppercase tracking-[0.08em] md:text-3xl">
              * DROP {dropNo} *
            </p>
          </div>

          <p className={`relative z-10 mt-8 max-w-3xl text-sm uppercase tracking-[0.06em] md:text-base ${inkClass}`}>{item.summary}</p>

          <div className={`relative z-10 mt-8 max-w-3xl space-y-3 text-xs uppercase tracking-[0.08em] md:text-sm ${mutedInkClass}`}>
            <p><span className="font-semibold">Challenge:</span> {item.challenge}</p>
            <p><span className="font-semibold">Solution:</span> {item.solution}</p>
            <p><span className="font-semibold">Outcome:</span> {item.outcome}</p>
          </div>

        </article>
        {currentIndex === 0 ? (
          <div className="my-[100px] w-full">
            <WorkRotationPreview />
          </div>
        ) : null}

        {!isDarkInk ? (
          <div className="flex h-8 w-full items-center gap-[9px] overflow-hidden opacity-80" style={{ backgroundColor: pageBg }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <img key={`bottom-${i}`} src="/images/xeno-logo-01-230px.svg" alt="anypercent" className="h-[18px] w-auto" />
            ))}
          </div>
        ) : null}

        <div className="mt-[10px]">
          <WorkEditorialBoard bgColor={pageBg} />
        </div>

        <div
          className={`flex items-center justify-between rounded-[3px] px-3 py-2 text-[8px] uppercase tracking-[0.08em] md:text-[8px] ${inkClass}`}
          style={{ backgroundColor: pageBg }}
        >
          <p className="px-0 text-left">{item.title}</p>
          <div className="flex items-center gap-4 text-base md:text-lg">
            <a href={`/work/${prev.slug}`} aria-label="Previous project" className="leading-none hover:text-[#ff3636]">←</a>
            <a href={`/work/${next.slug}`} aria-label="Next project" className="leading-none hover:text-[#ff3636]">→</a>
          </div>
        </div>
      </section>
    </main>
  );
}
