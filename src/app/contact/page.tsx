import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-zinc-100">
      <section className="flex w-full flex-col gap-[10px] px-5 pb-24 pt-0 md:px-[60px]">
        <SiteHeader />
        <div className="animate-enter space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">contact</p>
          <h1 className="text-4xl font-semibold md:text-5xl">let’s build something clean.</h1>
          <p className="text-zinc-300">
            For project inquiries, include your timeline, budget range, and what success looks like.
          </p>
          <Link
            href="mailto:hello@anypercent.design?subject=Project%20Inquiry%20-%20anypercent"
            className="inline-block rounded-full border border-white/30 px-5 py-3 text-sm hover:bg-white hover:text-black transition-colors"
          >
            hello@anypercent.design
          </Link>
        </div>
      </section>
    </main>
  );
}
