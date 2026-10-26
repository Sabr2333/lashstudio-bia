"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Check, Users, Calendar, UtensilsCrossed, Sparkles, Heart, MessageCircle, UserPlus, TrendingUp } from "lucide-react";

const takeaways = [
  "Persoonlijk branding op sociale media",
  "Strategie voor je bedrijf",
  "Content die converteert",
  "Authenticiteit vs. algoritme",
  "Q&A met Xavier",
  "Netwerken in klein gezelschap",
];

const fanCards = [
  { id: 1, rotate: -18, x: -500, y: 50, video: "/videos/klas/klas1.mp4" },
  { id: 2, rotate: -11, x: -305, y: 10, video: "/videos/klas/klas2.mp4" },
  { id: 3, rotate: -4, x: -105, y: -15, video: "/videos/klas/klas3.mp4" },
  { id: 4, rotate: 4, x: 105, y: -15, video: "/videos/klas/klas4.mp4" },
  { id: 5, rotate: 11, x: 305, y: 10, video: "/videos/klas/klas5.mp4" },
  { id: 6, rotate: 18, x: 500, y: 50, video: "/videos/klas/klas6.mp4" },
];

const perks = [
  { label: "Hapjes inbegrepen", icon: UtensilsCrossed },
  { label: "Drankjes inbegrepen", icon: UtensilsCrossed },
  { label: "Kleinschalig & exclusief", icon: Sparkles },
];

const marqueePhrases = [
  "Persoonlijk merk",
  "Content die converteert",
  "Instagram",
  "LinkedIn",
  "TikTok",
  "Strategie",
  "Authenticiteit",
  "Netwerken",
  "Xavier Molijn",
  "Business Minds",
];

const liveNotifs = [
  { icon: Heart, text: "24 nieuwe likes op je post", delay: "0s" },
  { icon: UserPlus, text: "Nieuwe volger · Amsterdam", delay: "1.3s" },
  { icon: MessageCircle, text: "DM: 'Wanneer is de volgende klas?'", delay: "2.6s" },
];

const liveStats = [
  { value: "+847", label: "Bereik" },
  { value: "12%", label: "Engagement" },
  { value: "Beperkt", label: "Plekken" },
];

export default function KlasPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ naam: "", email: "", bedrijf: "" });

  const scrollRef = useRef<HTMLDivElement>(null);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/klas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[family-name:var(--font-inter)] overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-center px-6 pt-6 pb-3 md:py-8">
        <Image
          src="/bm-logo.png"
          alt="Business Minds"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </header>

      <div className="max-w-[1100px] mx-auto px-5 md:px-6 pb-24">
        {/* Hero */}
        <div className="text-center mb-8 md:mb-20">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[9px] md:text-[12px] tracking-[0.2em] text-amber-400/70 uppercase mb-5 md:mb-10">
            Editie 01 · Exclusieve klas · Beperkt aantal plekken
          </p>

          <h1 className="font-[family-name:var(--font-outfit)] text-[1.75rem] md:text-6xl lg:text-7xl font-[900] text-[#E9E8E3] uppercase leading-[0.9] tracking-tight mb-4 md:mb-8">
            Sociale media als
            <br />
            krachtig <span className="italic font-normal text-white/50">instrument</span>
          </h1>

          <p className="text-white/40 text-[12px] md:text-[16px] leading-relaxed max-w-2xl mx-auto">
            Xavier Molijn deelt zijn persoonlijke ervaringen en bewezen strategieën
            over hoe je sociale media inzet als persoonlijk merk én als zakelijk
            groeimiddel. Klein gezelschap, grote inzichten.
          </p>
        </div>

        {/* Fan cards — desktop: boog, mobiel: swipeable */}
        {/* Desktop boog */}
        <div className="hidden md:flex relative h-[340px] items-center justify-center mb-20 -mt-14">
          {fanCards.map((card) => (
            <div
              key={card.id}
              className="absolute w-[170px] h-[270px] rounded-2xl bg-[#111] border border-white/5 shadow-2xl transition-transform duration-300 hover:scale-105 overflow-hidden"
              style={{
                transform: `translateX(${card.x}px) translateY(${card.y}px) rotate(${card.rotate}deg)`,
              }}
            >
              <video
                src={card.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Mobiel: swipeable */}
        <div className="md:hidden mb-12 mt-4 -mx-6" style={{ overflowX: "clip", overflowY: "visible" }}>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto py-6 px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingRight: "5rem" }}
          >
            {fanCards.map((card) => (
              <div
                key={card.id}
                className="shrink-0 w-[38vw] max-w-[150px] aspect-[9/14] rounded-2xl bg-[#111] border border-white/5 shadow-2xl overflow-hidden"
                style={{ transform: `rotate(-6deg)` }}
              >
                <video
                  src={card.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info + Form side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Left: alle info in 1 card */}
          <div className="service-card rounded-2xl bg-[#111] border border-white/5 p-6 md:p-10">
            <h3 className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl font-bold text-white mb-6">
              Over de <span className="italic font-normal text-white/50">klas</span>
            </h3>

            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
              <Image
                src="/xavier.png"
                alt="Xavier Molijn"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-white font-semibold text-[15px]">Xavier Molijn</p>
                <p className="text-white/30 text-[13px]">Strateeg, creator en expert in sociale media</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-3 mb-6 pb-6 border-b border-white/5 text-[13px]">
              <span className="flex items-center gap-2 text-white/50">
                <Calendar className="w-3.5 h-3.5 text-amber-400/60" /> Binnenkort bekend
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <Users className="w-3.5 h-3.5 text-amber-400/60" /> Beperkt aantal plekken
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400/60" /> Hapjes & drankjes
              </span>
            </div>

            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/25 uppercase mb-4">
              Wat je meeneemt
            </p>
            <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
              {takeaways.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white/60 text-[13px]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {perks.map((perk) => (
                <span key={perk.label} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/50 text-[12px]">
                  <perk.icon className="w-3.5 h-3.5 text-amber-400/60" />
                  {perk.label}
                </span>
              ))}
            </div>

          </div>

          {/* Right: formulier card */}
          <div className="service-card rounded-2xl bg-[#111] border border-white/5 p-6 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-10">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mb-3 text-center">
                  Je plek is gereserveerd!
                </h3>
                <p className="text-white/40 text-[14px] text-center max-w-sm">
                  Je ontvangt een bevestigingsmail met alle details. Tot snel!
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-bold text-white mb-2">
                  Meld je <span className="italic font-normal text-white/50">aan</span>
                </h2>
                <div className="mb-6" />

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                      Voornaam & achternaam *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.naam}
                      onChange={(e) => setForm({ ...form, naam: e.target.value })}
                      placeholder="Jouw naam"
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jij@bedrijf.nl"
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                      Bedrijf of persoonlijk merk (optioneel)
                    </label>
                    <input
                      type="text"
                      value={form.bedrijf}
                      onChange={(e) => setForm({ ...form, bedrijf: e.target.value })}
                      placeholder="Bedrijfsnaam of eigen naam"
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !form.naam || !form.email}
                    className={`w-full py-4 rounded-xl text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      form.naam && form.email
                        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-[#0a0a0a] hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                  >
                    {submitting ? "Reserveren..." : "Reserveer mijn plek"}
                  </button>
                </form>

                <p className="mt-6 text-white/20 text-[12px] text-center leading-relaxed">
                  Na aanmelding ontvang je een bevestigingsmail met alle details
                  van de eerste klas. Vrijblijvend, je ontvangt altijd een herinnering
                  voor de datum.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Social pulse — closing animation */}
        <section className="relative mt-6 mb-14 pt-12 pb-6">
          <div className="text-center mb-8 md:mb-10 relative px-2">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[9px] md:text-[11px] tracking-[0.2em] text-amber-400/60 uppercase mb-3">
              Jouw merk in beweging
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] text-[1.5rem] md:text-4xl font-[900] text-[#E9E8E3] uppercase leading-tight tracking-tight">
              Social media <span className="italic font-normal text-white/45">werkt</span>
            </h2>
          </div>

          {/* Phone mockup + notificaties */}
          <div className="relative max-w-[340px] md:max-w-[480px] mx-auto">
            {/* Desktop: zwevende notificaties */}
            <div className="hidden md:block">
              <div
                className="klas-notif absolute -left-2 top-8 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#161616] border border-white/10 shadow-xl max-w-[200px]"
                style={{ animationDelay: liveNotifs[0].delay }}
              >
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-amber-400 animate-klas-heart" />
                </span>
                <span className="text-[11px] text-white/70 leading-snug">{liveNotifs[0].text}</span>
              </div>
              <div
                className="klas-notif absolute -right-4 top-24 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#161616] border border-white/10 shadow-xl max-w-[210px]"
                style={{ animationDelay: liveNotifs[1].delay }}
              >
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4 text-amber-400" />
                </span>
                <span className="text-[11px] text-white/70 leading-snug">{liveNotifs[1].text}</span>
              </div>
              <div
                className="klas-notif absolute -left-6 bottom-16 z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#161616] border border-white/10 shadow-xl max-w-[220px]"
                style={{ animationDelay: liveNotifs[2].delay }}
              >
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                </span>
                <span className="text-[11px] text-white/70 leading-snug">{liveNotifs[2].text}</span>
              </div>
            </div>

            {/* Telefoon */}
            <div className="relative mx-auto w-full max-w-[220px] md:max-w-[210px]">
              <div className="relative mx-auto w-[172px] sm:w-[185px] md:w-[210px] animate-klas-float-mobile md:animate-klas-float z-[1]">
                <div className="relative rounded-[34px] md:rounded-[36px] p-[2px] md:p-[3px] border border-white/[0.08] md:border-transparent md:[background:linear-gradient(145deg,#333,#0a0a0a)] md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="relative rounded-[31px] md:rounded-[33px] overflow-hidden bg-[#0a0a0a] aspect-[9/19]">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[52px] h-[14px] rounded-full bg-black z-20" />

                    {/* iOS-notificaties — mobiel (cyclisch, zelfde plek) */}
                    <div className="md:hidden absolute top-9 inset-x-2 z-30 h-[38px] pointer-events-none">
                      {liveNotifs.map((n, i) => {
                        const Icon = n.icon;
                        return (
                          <div
                            key={i}
                            className="klas-notif-drop absolute inset-x-0 top-0 flex items-center gap-2 px-2.5 py-2 rounded-2xl bg-[#111]/90 border border-white/[0.08]"
                            style={{ animationDelay: `${i * 3}s` }}
                          >
                            <span className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                              <Icon className={`w-3 h-3 text-amber-400 ${i === 0 ? "animate-klas-heart" : ""}`} />
                            </span>
                            <span className="text-[9px] text-white/75 leading-snug truncate">{n.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* status bar */}
                    <div className="flex items-center justify-between px-4 pt-3 pb-1">
                      <span className="text-[7px] font-semibold text-white/50">9:41</span>
                      <span className="flex gap-0.5">
                        <span className="w-2.5 h-1 rounded-sm bg-white/30" />
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                      </span>
                    </div>

                    {/* app header */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04]">
                      <Image src="/xavier.png" alt="" width={24} height={24} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-[9px] font-semibold text-white/80">businessminds</span>
                    </div>

                    {/* stories */}
                    <div className="flex gap-2 px-3 py-2.5 overflow-hidden">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="shrink-0 flex flex-col items-center gap-1">
                          <div
                            className={`w-9 h-9 rounded-full p-[2px] ${i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600 animate-klas-ring" : "bg-white/10"}`}
                          >
                            <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden">
                              {i === 0 ? (
                                <Image src="/xavier.png" alt="" width={32} height={32} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-white/[0.06]" />
                              )}
                            </div>
                          </div>
                          {i === 0 && <span className="text-[6px] text-white/35">Jij</span>}
                        </div>
                      ))}
                    </div>

                    {/* post */}
                    <div className="mx-2 rounded-xl overflow-hidden">
                      <div className="aspect-square relative overflow-hidden klas-post-shimmer">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-[#0a0a0a] to-[#0a0a0a] animate-klas-post-glow" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-[family-name:var(--font-outfit)] text-[11px] font-black uppercase text-white/85 tracking-wider text-center px-2 leading-tight">
                            BM<br />Klas
                          </span>
                        </div>
                        <Heart
                          className="md:hidden absolute right-3 bottom-3 w-4 h-4 text-amber-400/80 klas-like-pop"
                          style={{ animationDelay: "0s" }}
                        />
                        <Heart
                          className="md:hidden absolute right-7 bottom-8 w-3 h-3 text-amber-400/50 klas-like-pop"
                          style={{ animationDelay: "0.8s" }}
                        />
                      </div>
                      <div className="flex items-center gap-3 px-2.5 py-2">
                        <Heart className="w-3.5 h-3.5 text-amber-400 animate-klas-heart" />
                        <MessageCircle className="w-3.5 h-3.5 text-white/25" />
                        <TrendingUp className="w-3.5 h-3.5 text-white/25 ml-auto" />
                      </div>
                      <p className="px-2.5 pb-2 text-[8px] text-white/45">
                        <span className="text-amber-400/80 font-semibold animate-klas-count">847 likes</span>
                        {" · "}Sociale media als krachtig instrument
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="relative mt-10 md:mt-14 overflow-hidden">
            <div className="flex w-max animate-marquee-klas gap-5 md:gap-8">
              {[...marqueePhrases, ...marqueePhrases].map((phrase, i) => (
                <span
                  key={i}
                  className="flex items-center gap-5 md:gap-8 text-[11px] md:text-[13px] font-[family-name:var(--font-fragment-mono)] text-white/25 uppercase tracking-[0.15em] whitespace-nowrap"
                >
                  {phrase}
                  <span className="w-1 h-1 rounded-full bg-amber-400/40 shrink-0" />
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>

          {/* Live stats */}
          <div className="mt-8 grid grid-cols-3 gap-2 max-w-[320px] md:max-w-md mx-auto px-2">
            {liveStats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/[0.02] border border-white/[0.06] py-3 px-2 text-center"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <p className="font-[family-name:var(--font-outfit)] text-base md:text-xl font-bold text-amber-400/90 animate-klas-count">
                  {s.value}
                </p>
                <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-white/15 text-[11px] font-[family-name:var(--font-fragment-mono)] tracking-wider">
            © {new Date().getFullYear()} Business Minds. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
