"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Minus, Send, Check, Phone, MapPin } from "lucide-react";
import { AMES_CONTACT, getBookingPackageOptions, isMaPackageId } from "../lib/amesPackages";
import { openAmesBooking } from "../lib/amesAvailability";
import luxeAlignFaqs from "../lib/amesFaqs";

const AMES_BLUE = "#CD9861";
const bookingPackageOptions = getBookingPackageOptions();

const contactMethods = [
  { icon: Phone, value: AMES_CONTACT.phoneDisplay, href: AMES_CONTACT.phoneHref },
  { icon: MapPin, value: AMES_CONTACT.area, href: undefined },
];

export default function Contact() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [submitted] = useState(false);
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
    openAmesBooking({
      packageId: isMaPackageId(form.pakket) ? form.pakket : undefined,
      naam: form.naam,
      telefoon: form.telefoon,
      email: form.email,
      adres: form.adres,
      aandacht: form.bericht,
    });
  }

  function fieldBorder(field: string) {
    return focusedField === field
      ? "border-[#CD9861]/55"
      : "border-white/[0.06]";
  }

  return (
    <div className="ames-page-shell luxe-light min-h-screen flex flex-col">
      {/* Header */}
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

      <div className="relative z-10 flex-1 px-6 md:px-8 max-w-[1100px] mx-auto w-full pb-20">
        {/* Hero */}
        <div className="pt-10 pb-16 md:pb-20">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A0200]" />
            Contact
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[0.85] mb-5">
            Neem contact
            <br />
            met{" "}
            <span className="italic font-normal text-[#CD9861]">Lashstudiobia</span>
          </h1>
          <p className="text-white/40 text-[15px] leading-relaxed max-w-lg">
            Vragen over een set? Bel of app op 06 2048 5783.
          </p>
        </div>

        {/* Contact pills */}
        <div className="flex flex-wrap gap-3 mb-14">
          {contactMethods.map((m) => {
            const inner = (
              <>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-white/20 bg-white/10"
                >
                  <m.icon className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <span className="text-white/60 text-[13px] font-medium group-hover:text-white/80 transition-colors">
                  {m.value}
                </span>
              </>
            );
            const cls =
              "flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] transition-all group";
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

        {/* Form */}
        <div className="max-w-[580px] mb-28">
          {submitted ? (
            <div className="flex flex-col items-center py-20">
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  borderColor: "rgba(212, 175, 55, 0.35)",
                }}
              >
                <Check className="w-7 h-7 text-[#CD9861]" />
              </div>
              <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mb-2">
                Aanvraag ontvangen!
              </h3>
              <p className="text-white/40 text-[14px] text-center max-w-sm">
                Bedankt voor je boeking. We nemen binnen 24 uur contact op om datum, tijd en
                locatie te bevestigen.
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
                <div className={`border-b sm:border-r transition-colors duration-200 ${fieldBorder("telefoon")}`}>
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
                  placeholder="Je vraag of eventuele bijzonderheden over je behandeling..."
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

        {/* FAQ Section */}
        <div className="border-t border-white/[0.06] pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="font-[family-name:var(--font-fragment-mono)] text-xs tracking-widest text-[#ffffff]/80 uppercase mb-4">
                FAQ
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Veelgestelde vragen
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Alles over wimperextensions, pakketten en afspraken bij Lashstudio Bia.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="flex flex-col">
                {luxeAlignFaqs.map((faq, i) => (
                  <div key={i} className="border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                      className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
                    >
                      <span className="text-white/80 font-medium text-sm pr-8">{faq.question}</span>
                      {openIndex === i ? (
                        <Minus className="w-4 h-4 shrink-0" style={{ color: AMES_BLUE }} />
                      ) : (
                        <Plus className="w-4 h-4 text-white/30 shrink-0" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === i ? "max-h-48 pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-white/40 text-sm leading-relaxed pr-12">{faq.answer}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/[0.06]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-white tracking-tight">Lashstudio Bia</span>
            <span className="text-xs text-white/30">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "Instagram", href: "https://www.instagram.com/lashstudiobia/" },
              { label: "WhatsApp", href: AMES_CONTACT.whatsappHref },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/30 hover:text-[#CD9861] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
