"use client";

import { FormEvent, Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function PasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = searchParams.get("from") || "/";

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/site-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Password did not match.");
        return;
      }

      router.replace(from.startsWith("/") ? from : "/");
      router.refresh();
    } catch {
      setError("Could not unlock the site. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f7f3e8]">
      <section className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col items-center justify-center px-6 py-20 text-center">
        <Image
          src="/images/ap-logo-xeno.svg"
          alt="anypercent"
          width={230}
          height={82}
          priority
          className="mb-12 h-auto w-[180px]"
        />
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">Private Preview</p>
        <h1 className="mb-8 text-4xl uppercase leading-none tracking-normal sm:text-6xl">Access Required</h1>
        <form onSubmit={submitPassword} className="grid w-full gap-3">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            placeholder="Password"
            className="min-h-14 w-full border border-white/18 bg-white/[0.06] px-4 text-center font-mono text-base text-[#f7f3e8] outline-none transition focus:border-white/55"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-14 border border-white/18 bg-[#f7f3e8] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0d0d0d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? "Checking" : "Enter"}
          </button>
          {error ? <p className="min-h-5 font-mono text-xs text-[#ff6060]">{error}</p> : <p className="min-h-5" />}
        </form>
      </section>
    </main>
  );
}

export default function PasswordPage() {
  return (
    <Suspense>
      <PasswordForm />
    </Suspense>
  );
}
