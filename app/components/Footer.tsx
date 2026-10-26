"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Send,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  AMES_CONTACT,
  formatPackageChoice,
  getBookingPackageOptions,
  packagePrices,
} from "../lib/amesPackages";

const contactFaqs = [
  {
    question: "Hoe werkt detailing op locatie bij Ames?",
    answer:
      "Jij kiest tijd en adres, wij komen met materiaal naar je toe. Thuis, op werk of een andere locatie in de regio.",
  },
  {
    question: "Heb ik water of stroom nodig?",
    answer:
      "Meestal niet. We nemen eigen voorzieningen mee. Vermeld bijzonderheden bij het boeken.",
  },
  {
    question: "Hoe snel kan ik een afspraak krijgen?",
    answer: "Binnen 24 uur na je aanvraag. Spoed? Bel of app direct via WhatsApp.",
  },
  {
    question: "Welk pakket past bij mijn auto?",
    answer:
      "Basic voor onderhoud, Showroom voor dieper resultaat, Special voor maximaal. Interieur, exterieur of combo.",
  },
  {
    question: "In welk gebied rijden jullie?",
    answer: "Heel Zuid-Holland. Buiten de provincie bespreken we eventuele reiskosten vooraf.",
  },
];

function ContactHeaderAside() {
  return (
    <div className="rounded-2xl md:rounded-3xl border border-white/[0.08] bg-[#111111] p-5 md:p-6 h-full w-full">
      <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-[#FF9220]/80 uppercase mb-3">
        Snel geregeld
      </p>
      <p className="font-[family-name:var(--font-outfit)] text-lg md:text-xl font-bold text-white leading-snug mb-4">
        Detailing op locatie. Jij blijft thuis of op werk.
      </p>
      <ul className="space-y-3 text-[13px] text-white/55 mb-6">
        <li className="flex gap-2.5">
          <Check className="w-4 h-4 text-[#FF9220] shrink-0 mt-0.5" strokeWidth={2.5} />
          9 pakketten vanaf €69: Basic, Showroom, Special
        </li>
        <li className="flex gap-2.5">
          <Check className="w-4 h-4 text-[#FF9220] shrink-0 mt-0.5" strokeWidth={2.5} />
          Boek scan: pakket, datum, locatie → WhatsApp
        </li>
        <li className="flex gap-2.5">
          <Check className="w-4 h-4 text-[#FF9220] shrink-0 mt-0.5" strokeWidth={2.5} />
          Bevestiging binnen 24 uur op werkdagen
        </li>
      </ul>
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
        ))}
        <span className="text-white font-semibold text-sm ml-1">4,9</span>
        <Link href="/#reviews" className="text-[12px] text-white/40 hover:text-[#FF9220] ml-2">
          klantreviews
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/groei-scan"
          className="ames-btn-glow ames-btn-glow--blue flex-1 flex items-center justify-center gap-2 rounded-full py-3 text-[12px] font-semibold uppercase tracking-wide"
        >
          <Calendar className="w-4 h-4" strokeWidth={2.25} />
          Start boek scan
        </Link>
        <Link
          href={AMES_CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-full py-3 text-[12px] font-semibold border border-[#25D366]/35 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/15"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Link>
      </div>
    </div>
  );
}

function ContactFormFaq({
  openIndex,
  setOpenIndex,
}: {
  openIndex: number;
  setOpenIndex: (i: number) => void;
}) {
  const featuredLabel = formatPackageChoice("combo", "showroom");
  const featuredPrice = packagePrices.combo.showroom;

  return (
    <aside id="faq" className="lg:sticky lg:top-28 scroll-mt-28 flex flex-col gap-5 min-w-0">
      <div>
        <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-[#FF9220]/80 uppercase mb-2">
          FAQ
        </p>
        <h3 className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl font-bold text-white leading-snug">
          Veelgestelde vragen
        </h3>
        <p className="text-white/45 text-[13px] mt-2 leading-relaxed">
          Twijfel je over pakket of locatie?{" "}
          <Link href="/contact" className="text-[#FF9220]/85 hover:text-[#FF9220]">
            Meer op contact
          </Link>
        </p>
      </div>

      <div className="rounded-2xl md:rounded-3xl border border-white/[0.08] bg-[#111111] px-4 md:px-5">
        {contactFaqs.map((faq, i) => (
          <div key={faq.question} className="border-b border-white/[0.06] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 py-4 text-left cursor-pointer"
            >
              <span className="text-[13px] md:text-[14px] font-medium text-white/80">{faq.question}</span>
              {openIndex === i ? (
                <Minus className="w-4 h-4 shrink-0 text-[#6B5CFF]" />
              ) : (
                <Plus className="w-4 h-4 shrink-0 text-white/30" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? "max-h-44 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-[13px] text-white/45 leading-relaxed pr-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="ames-package-card rounded-2xl border border-[#FF9220]/20 bg-[#0f0f0f] p-4 md:p-5">
        <p className="text-[9px] tracking-[0.18em] text-[#FF9220]/85 uppercase mb-1">Meest gekozen</p>
        <p className="font-[family-name:var(--font-outfit)] text-sm font-bold text-white uppercase">
          {featuredLabel}
        </p>
        <p className="text-white/40 text-xs mt-1">vanaf €{featuredPrice}</p>
        <Link
          href="/groei-scan?c=combo&t=showroom"
          className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-[#FF9220] hover:text-[#FF9220]/90"
        >
          Boek dit pakket <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}

const bookingPackageOptions = getBookingPackageOptions();

const diensten = [
  { label: "Interieur", href: "/pakketten?c=interieur" },
  { label: "Exterieur", href: "/pakketten?c=exterieur" },
  { label: "Combo", href: "/pakketten?c=combo" },
  { label: "Maatwerk", href: "/pakketten#maatwerk" },
];

const sitemap = [
  { label: "Home", href: "/" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Pakketten", href: "/#pakketten" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Boek scan", href: "/groei-scan" },
];

const contactMethods = [
  { icon: Mail, value: AMES_CONTACT.email, href: AMES_CONTACT.emailHref },
  { icon: Phone, value: AMES_CONTACT.phoneDisplay, href: AMES_CONTACT.phoneHref },
  { icon: MapPin, value: AMES_CONTACT.area, href: undefined },
];

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    adres: "",
    pakket: "",
    bericht: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function fieldBorder(field: string) {
    return focusedField === field ? "border-[#1801AC]/55" : "border-white/[0.06]";
  }

  return (
    <footer id="contact" className="relative bg-[#0a0a0a] -mt-px scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-8 md:mb-10">
          <div className="lg:col-span-7 ames-packages-intro flex flex-col items-start min-w-0">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-[#FF9220]/85 uppercase mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 shrink-0 rounded-full bg-[#FF9220]" aria-hidden />
              Boek & contact
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] text-[2.35rem] leading-[0.9] sm:text-4xl md:text-[2.75rem] lg:text-5xl font-[900] text-[#E9E8E3] uppercase tracking-tight">
              Plan jouw{" "}
              <span className="italic font-normal text-[#FF9220]">behandeling</span>
            </h2>
            <p className="mt-4 md:mt-5 text-white/50 text-[15px] md:text-base max-w-lg leading-relaxed">
              Kies je pakket, vul adres en contactgegevens in. Wij komen naar jou toe voor detailing
              op locatie. Binnen 24 uur bevestigen we datum en tijd.
            </p>
            <Link
              href="/groei-scan"
              className="inline-flex items-center gap-2 mt-5 text-[#FF9220]/85 text-sm font-medium hover:text-[#FF9220] transition-colors"
            >
              <Calendar className="w-4 h-4 shrink-0 opacity-85" strokeWidth={2.25} />
              Liever snel boeken? Scan & kies pakket
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-5 hidden lg:block min-w-0">
            <ContactHeaderAside />
          </div>
        </div>
        <div className="lg:hidden mb-6">
          <ContactHeaderAside />
        </div>

        <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
          {contactMethods.map((m) => {
            const inner = (
              <>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-[#1801AC]/25"
                  style={{ backgroundColor: "rgba(24, 1, 172, 0.12)" }}
                >
                  <m.icon className="w-3.5 h-3.5 text-[#6B5CFF] group-hover:text-[#8B7EFF] transition-colors" />
                </div>
                <span className="text-white/60 text-[13px] font-medium group-hover:text-white/80 transition-colors">
                  {m.value}
                </span>
              </>
            );
            const cls =
              "flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:border-[#1801AC]/35 hover:bg-[#1801AC]/[0.06] transition-all group";
            return m.href ? (
              <Link key={m.value} href={m.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <div key={m.value} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 min-w-0">
            {submitted ? (
              <div className="flex flex-col items-start py-8 md:py-12">
                <div
                  className="w-16 h-16 rounded-full border flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: "rgba(24, 1, 172, 0.15)",
                    borderColor: "rgba(24, 1, 172, 0.35)",
                  }}
                >
                  <Check className="w-7 h-7 text-[#8B7EFF]" />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mb-2">
                  Aanvraag ontvangen!
                </h3>
                <p className="text-white/40 text-[14px] max-w-sm">
                  Bedankt. We nemen binnen 24 uur contact op om je pakket, locatie en afspraak te
                  bevestigen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0">
                <div className={`border-b transition-colors duration-200 ${fieldBorder("naam")}`}>
                  <label className="block pt-5 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">
                    Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.naam}
                    onFocus={() => setFocusedField("naam")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, naam: e.target.value })}
                    placeholder="Je volledige naam"
                    className="w-full bg-transparent text-white text-[16px] md:text-[18px] font-medium py-3 placeholder:text-white/10 focus:outline-none"
                  />
                </div>

                <div className={`border-b transition-colors duration-200 ${fieldBorder("email")}`}>
                  <label className="block pt-5 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="naam@voorbeeld.nl"
                    className="w-full bg-transparent text-white text-[16px] md:text-[18px] font-medium py-3 placeholder:text-white/10 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div
                    className={`border-b sm:border-r transition-colors duration-200 ${fieldBorder("telefoon")}`}
                  >
                    <label className="block pt-5 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">
                      Telefoon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.telefoon}
                      onFocus={() => setFocusedField("telefoon")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                      placeholder="06 12345678"
                      className="w-full bg-transparent text-white text-[16px] md:text-[18px] font-medium py-3 pr-4 placeholder:text-white/10 focus:outline-none"
                    />
                  </div>
                  <div className={`border-b transition-colors duration-200 ${fieldBorder("pakket")}`}>
                    <label className="block pt-5 pb-1 sm:pl-4 text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">
                      Pakket *
                    </label>
                    <select
                      required
                      value={form.pakket}
                      onFocus={() => setFocusedField("pakket")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, pakket: e.target.value })}
                      className={`w-full bg-transparent text-[16px] md:text-[18px] font-medium py-3 sm:pl-4 focus:outline-none appearance-none cursor-pointer ${
                        form.pakket ? "text-white" : "text-white/40"
                      }`}
                    >
                      <option value="" className="bg-[#0a0a0a] text-white/30">
                        Kies een pakket
                      </option>
                      {bookingPackageOptions.map((o) => (
                        <option key={o.value} value={o.value} className="bg-[#0a0a0a] text-white">
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={`border-b transition-colors duration-200 ${fieldBorder("adres")}`}>
                  <label className="block pt-5 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">
                    Adres op locatie *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.adres}
                    onFocus={() => setFocusedField("adres")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, adres: e.target.value })}
                    placeholder="Straat, postcode en plaats"
                    className="w-full bg-transparent text-white text-[16px] md:text-[18px] font-medium py-3 placeholder:text-white/10 focus:outline-none"
                  />
                </div>

                <div className={`border-b transition-colors duration-200 ${fieldBorder("bericht")}`}>
                  <label className="block pt-5 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">
                    Extra info
                  </label>
                  <textarea
                    rows={3}
                    value={form.bericht}
                    onFocus={() => setFocusedField("bericht")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, bericht: e.target.value })}
                    placeholder="Automerk, gewenste datum/tijd, bijzonderheden..."
                    className="w-full bg-transparent text-white text-[16px] md:text-[18px] font-medium py-3 placeholder:text-white/10 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="group ames-btn-glow ames-btn-glow--blue flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Boekingsaanvraag versturen
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-7 min-w-0">
            <ContactFormFaq openIndex={faqOpen} setOpenIndex={setFaqOpen} />
          </div>
        </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 lg:px-8 pt-14 md:pt-16 pb-10 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4 flex flex-col">
            <p className="text-white/45 text-[13px] leading-relaxed max-w-[300px] mb-6">
              Auto poetsen en detailing op locatie in heel Zuid-Holland. Interieur, exterieur en
              combo: Basic, Showroom of Special.
            </p>
            <Link
              href="/#pakketten"
              className="ames-package-btn ames-package-btn--primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider w-fit mb-6"
            >
              Bekijk pakketten
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <p className="text-white/25 text-[12px] mb-8">
              Vragen?{" "}
              <Link
                href={AMES_CONTACT.emailHref}
                className="text-white/50 hover:text-white transition-colors"
              >
                {AMES_CONTACT.email}
              </Link>
            </p>
            <Link
              href="/"
              className="mt-auto pt-6 border-t border-white/[0.06] inline-flex opacity-90 hover:opacity-100 transition-opacity w-fit"
            >
              <Image
                src="/Gemini_Generated_Image_q9s8bpq9s8bpq9s8-removebg-preview.png"
                alt="Ames Car Detailing"
                width={873}
                height={229}
                className="h-10 md:h-11 w-auto object-contain object-left"
              />
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-[#FF9220]/70 uppercase mb-6">
              Pakketten
            </p>
            <div className="flex flex-col gap-1">
              {diensten.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between py-2.5 border-b border-white/5 hover:border-white/15 transition-all"
                >
                  <span className="text-white/60 text-[13px] font-medium group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-white/15 group-hover:text-[#FF9220]/70 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/30 uppercase mb-6">
              Sitemap
            </p>
            <div className="flex flex-col gap-3">
              {sitemap.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/30 uppercase mb-6">
              Direct contact
            </p>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <Link href={AMES_CONTACT.phoneHref} className="hover:text-white transition-colors">
                {AMES_CONTACT.phoneDisplay}
              </Link>
              <Link href={AMES_CONTACT.emailHref} className="hover:text-white transition-colors">
                {AMES_CONTACT.email}
              </Link>
              <span>{AMES_CONTACT.area}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-white/20">
            © {new Date().getFullYear()} Ames Car Detailing. All rights reserved.
          </span>
          <span className="text-[11px] text-white/25 font-[family-name:var(--font-fragment-mono)] tracking-wider">
            Detailing op locatie · Zuid-Holland
          </span>
        </div>
      </div>
    </footer>
  );
}
