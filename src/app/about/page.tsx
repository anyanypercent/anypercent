import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-zinc-100">
      <section className="flex w-full flex-col gap-[10px] px-5 pb-24 pt-0 md:px-[60px]">
        <SiteHeader />
        <div className="animate-enter space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">about</p>
          <h1 className="text-4xl font-semibold md:text-5xl">anypercent</h1>
          <p className="text-zinc-300">
            anypercent is a design-led studio focused on helping founders look sharp and sell clearly.
            We combine identity, editorial web design, and product storytelling to make small teams feel premium.
          </p>
          <p className="text-zinc-300">
            Core capabilities: brand systems, portfolio sites, launch landing pages, and conversion-focused UX.
          </p>
        </div>
      </section>
    </main>
  );
}
