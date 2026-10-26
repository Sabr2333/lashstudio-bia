"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Sparkles, Shield, Users, Calendar } from "lucide-react";
import BookingStepsSection from "../components/BookingStepsSection";

const whyItems = [
  {
    icon: Sparkles,
    title: "A-merk producten",
    text: "Alleen professionele middelen en technieken die veilig zijn voor lak, leer en interieur.",
  },
  {
    icon: Clock,
    title: "Tijdsbesparing",
    text: "Wij rijden naar jou toe. Geen wachtrij, geen rit naar de wasstraat.",
  },
  {
    icon: Users,
    title: "Ervaren team",
    text: "Detailers met oog voor detail en jarenlange ervaring in autoreiniging.",
  },
  {
    icon: Calendar,
    title: "Flexibel plannen",
    text: "Afspraak op een moment dat past bij jouw agenda, thuis of op werk.",
  },
  {
    icon: Shield,
    title: "Passie voor auto's",
    text: "Elke auto behandelen we alsof het onze eigen is, binnen én buiten.",
  },
];

const stats = [
  { value: "500+", label: "Auto's op locatie" },
  { value: "365", label: "Dagen boekbaar" },
  { value: "5+", label: "Jaar ervaring" },
];

export default function OverOnsPage() {
  return (
    <div className="ames-page-shell min-h-screen flex flex-col">
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
            src="/Gemini_Generated_Image_q9s8bpq9s8bpq9s8-removebg-preview.png"
            alt="Ames Car Detailing"
            width={873}
            height={229}
            className="h-8 w-auto md:h-9 object-contain"
          />
        </Link>
      </header>

      <main className="relative z-10 flex-1 px-6 md:px-8 max-w-[1100px] mx-auto w-full pb-24">
        <div className="pt-6 pb-12 md:pb-16">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/55 uppercase mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9220]" />
            Over ons
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9] mb-5 max-w-3xl">
            Premium detailing,{" "}
            <span className="italic font-normal text-[#FF9220]">wanneer het jou uitkomt</span>
          </h1>
          <p className="text-white/60 text-[15px] md:text-base leading-relaxed max-w-2xl">
            Ames detailing brengt professionele autowas en interieurreiniging naar jouw adres. Efficiënt,
            zorgvuldig en afgestemd op jouw drukke week, zonder concessies op kwaliteit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20 md:mb-28">
          <div className="order-2 lg:order-1">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold text-white mb-4">
              Geef je auto de zorg die het verdient
            </h2>
            <p className="text-white/55 text-[15px] leading-relaxed mb-4">
              Bij Ames detailing draait alles om vakmanschap, efficiëntie en een resultaat waar je trots
              op rijdt. We werken met bewezen methodes en premium producten om lak, velgen en interieur
              weer fris en verzorgd te maken.
            </p>
            <p className="text-white/55 text-[15px] leading-relaxed">
              Of je nu een snelle opfrisser nodig hebt of een grondige behandeling: wij komen naar jou toe
              in heel Zuid-Holland, zodat jij kunt blijven doen waar je mee bezig was.
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="service-card animate-float-slow w-full max-w-[420px] rounded-3xl p-[2px]">
              <div className="relative overflow-hidden rounded-[22px] bg-[#121218] aspect-[4/5] md:aspect-[3/4]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/videos/hero-car-wash-poster.jpg"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/videos/hero-car-wash.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.18em] text-white/50 uppercase mb-1">
                    Ames detailing
                  </p>
                  <p className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-white">
                    Autoreiniging op locatie
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            Waarom Ames
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-white mb-10">
            Autoreiniging aan huis, zonder gedoe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="service-card rounded-2xl bg-[#12121a]/80 p-6 border border-white/[0.06]"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 border border-[#1801AC]/30"
                  style={{ backgroundColor: "rgba(24, 1, 172, 0.12)" }}
                >
                  <item.icon className="w-4 h-4 text-[#8B7EFF]" strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-[13px] leading-relaxed">{item.text}</p>
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
          © {new Date().getFullYear()} Ames detailing. Autoreiniging op locatie.
        </p>
      </footer>
    </div>
  );
}
