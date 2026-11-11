"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Sparkles, Shield, Users, Calendar } from "lucide-react";
import BookingStepsSection from "../components/BookingStepsSection";

const whyItems = [
  {
    icon: Sparkles,
    title: "Soft, wispy en volume",
    text: "Van een zachte set tot glam. One by one of alle volume sets.",
  },
  {
    icon: Clock,
    title: "Luxury natural en glam",
    text: "Lashstudio Bia werkt met luxury natural en glam lashes.",
  },
  {
    icon: Users,
    title: "Lash stylist",
    text: "Bia is lash stylist in Vlaardingen.",
  },
  {
    icon: Calendar,
    title: "Afspraak via WhatsApp",
    text: "Boek op 06 2048 5783. Annuleren of verzetten kan kosteloos tot 24 uur van tevoren.",
  },
  {
    icon: Shield,
    title: "Nazorg",
    text: "Vermijd de eerste 24 uur water, stoom, sauna en oogmake-up.",
  },
];

const stats = [
  { value: "Soft", label: "Natuurlijk" },
  { value: "Wispy", label: "Luchtig" },
  { value: "Volume", label: "Glam" },
];

export default function OverOnsPage() {
  return (
    <div className="ames-page-shell luxe-light min-h-screen flex flex-col">
      <header className="relative z-10 flex items-center justify-between px-6 md:px-8 py-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[14px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>
        <Link href="/" className="opacity-95 hover:opacity-100 transition-opacity">
          <Image
            src="/lashstudio-bia-logo.png"
            alt="Lashstudio Bia"
            width={488}
            height={200}
            className="h-9 w-auto md:h-10 object-contain"
          />
        </Link>
      </header>

      <main className="relative z-10 flex-1 px-6 md:px-8 max-w-[1100px] mx-auto w-full pb-24">
        <div className="pt-6 pb-12 md:pb-16">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/55 uppercase mb-5">
            Over ons
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9] mb-5 max-w-3xl">
            Luxury lashes,{" "}
            <span className="italic font-normal text-[#CD9861]">soft en wispy</span>
          </h1>
          <p className="text-white/60 text-[15px] md:text-base leading-relaxed max-w-2xl">
            Lashstudio Bia is lash stylist in Vlaardingen. Luxury natural en glam lashes.
            Soft, wispy en volume.
          </p>
        </div>

        <div className="max-w-2xl mb-8 md:mb-10">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold text-white mb-4">
            Say it with lashes
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed mb-4">
            Pretty lashes for pretty girls. Soft 5D lashes met een C curl, of een volume set
            als je meer glam wilt.
          </p>
          <p className="text-white/55 text-[15px] leading-relaxed">
            Good lashes. Good mood. Every time. Boek je afspraak via WhatsApp op 06 2048 5783.
          </p>
        </div>

        <div className="mx-auto mb-20 md:mb-28 flex w-full max-w-[320px] items-center justify-center">
          <Image
            src="/lashstudio-bia-logo.png"
            alt="Lashstudio Bia"
            width={512}
            height={512}
            className="h-auto w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-28 border-y border-white/[0.06] py-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-white mb-1">
                {s.value}
              </p>
              <p className="text-[11px] md:text-xs text-white/45 uppercase tracking-wider font-[family-name:var(--font-fragment-mono)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <section className="mb-20 md:mb-28">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/55 uppercase mb-3">
            Waarom Lashstudio Bia
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-white mb-10">
            Een set die bij jou past
          </h2>
          <div className="flex flex-col gap-3">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="service-card flex items-start gap-4 rounded-2xl bg-[#12121a]/80 p-5 md:p-6 border border-white/[0.06]"
              >
                <div
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center border border-[#CD9861]/30"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.12)" }}
                >
                  <item.icon className="w-4 h-4 text-[#CD9861]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-[13px] md:text-[14px] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <BookingStepsSection />

        <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12 text-center mt-16 md:mt-20">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold text-white mb-4">
            Klaar om te boeken?
          </h2>
          <p className="text-white/55 text-[15px] max-w-lg mx-auto mb-8 leading-relaxed">
            Start met onze boek scan voor een snelle aanvraag, of neem direct contact op voor vragen en
            maatwerk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/groei-scan"
              className="ames-btn-glow ames-btn-glow--blue inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider"
            >
              Boek scan starten
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-[13px] font-semibold uppercase tracking-wider transition-all"
            >
              Contact
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center">
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} Lashstudio Bia. Wimperextensions in Vlaardingen.
        </p>
      </footer>
    </div>
  );
}
