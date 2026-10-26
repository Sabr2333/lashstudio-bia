"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const services = [
  {
    tag: null,
    tagColor: null,
    title: "Mobiele Apps",
    description:
      "Native en cross-platform apps voor iOS en Android. Intuïtief design met krachtige functionaliteit.",
    price: "Vanaf €17.500",
    cta: "Meer info",
    href: "/diensten/mobiele-apps",
    visual: "mobile",
    cardBg: "#100d0b",
    wide: false,
  },
  {
    tag: "NIEUW",
    tagColor: "#22c55e",
    title: "AI Automatisering",
    description:
      "Jouw digitale medewerker: echte acties op je systemen, van mail en CRM tot data-analyse en rapportages.",
    price: "Op maat",
    cta: "Meer info",
    href: "/diensten/ai-automatisering",
    visual: "ai-crm",
    cardBg: "linear-gradient(135deg, #0d1a12 0%, #111a15 35%, #0f1612 65%, #0d1a12 100%)",
    wide: true,
  },
  {
    tag: null,
    tagColor: null,
    title: "Elara",
    description:
      "Professionele websites die niet alleen mooi zijn, maar ook converteren. Van landingspagina tot platform.",
    price: "Vanaf €8.000",
    cta: "Meer info",
    href: "/diensten/elara",
    visual: "website",
    cardBg: "#16120f",
    wide: false,
  },
  {
    tag: null,
    tagColor: null,
    title: "Web Applicaties",
    description:
      "Op maat gemaakte webapplicaties die perfect aansluiten bij jouw bedrijfsprocessen. Schaalbaar en snel.",
    price: "Vanaf €10.000",
    cta: "Meer info",
    href: "/diensten/web-applicaties",
    visual: "web-app",
    cardBg: "#0a0d12",
    wide: false,
  },
];

function AICRMVisual() {
  return (
    <div className="mt-6 relative h-[280px] rounded-2xl overflow-hidden flex items-center justify-center max-md:mt-4 max-md:h-[200px]">
      {/* Connection lines with moving dots */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 280"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0 40 H80 V140 H130" stroke="rgba(34,197,94,0.15)" strokeWidth="2" />
        <circle r="3" fill="rgba(34,197,94,0.6)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M0,40 L80,40 L80,140 L130,140" />
        </circle>

        <path d="M0 240 H60 V140 H130" stroke="rgba(34,197,94,0.15)" strokeWidth="2" />
        <circle r="3" fill="rgba(34,197,94,0.6)">
          <animateMotion dur="4s" repeatCount="indefinite" path="M0,240 L60,240 L60,140 L130,140" />
        </circle>

        <path d="M400 60 H320 V140 H270" stroke="rgba(34,197,94,0.15)" strokeWidth="2" />
        <circle r="3" fill="rgba(34,197,94,0.6)">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,60 L320,60 L320,140 L270,140" />
        </circle>

        <path d="M400 220 H340 V140 H270" stroke="rgba(34,197,94,0.15)" strokeWidth="2" />
        <circle r="3" fill="rgba(34,197,94,0.6)">
          <animateMotion dur="4.5s" repeatCount="indefinite" path="M400,220 L340,220 L340,140 L270,140" />
        </circle>

        <path d="M200 0 V90" stroke="rgba(34,197,94,0.15)" strokeWidth="2" />
        <circle r="3" fill="rgba(34,197,94,0.6)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,0 L200,90" />
        </circle>

        <path d="M200 280 V190" stroke="rgba(34,197,94,0.15)" strokeWidth="2" />
        <circle r="3" fill="rgba(34,197,94,0.6)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M200,280 L200,190" />
        </circle>
      </svg>

      {/* AI icon box with slow spin */}
      <div
        className="relative z-10 w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-[32px] flex items-center justify-center animate-[spin_12s_linear_infinite]"
        style={{
          background: "linear-gradient(135deg, #166534, #22c55e, #15803d)",
          boxShadow: "0 20px 60px rgba(34, 197, 94, 0.25)",
        }}
      >
        <span className="text-3xl md:text-[3.5rem] font-[800] text-white animate-[spin_12s_linear_infinite_reverse]">AI</span>
      </div>
    </div>
  );
}

function CardVisual({ type }: { type: string }) {
  if (type === "ai-crm") return <AICRMVisual />;

  if (type === "web-app") return <DashboardVisual />;

  if (type === "website") return <ElaraVisual />;

  if (type === "mobile") return <MobileVisual />;

  return null;
}

function ElaraVisual() {
  const lines: { content: React.ReactNode; delay: number }[] = [
    { content: <span className="text-white/25">// WhatsApp — 02:14</span>, delay: 0 },
    {
      content: (
        <span>
          <span className="text-amber-400">jij</span>
          <span className="text-white/30"> → </span>
          <span className="text-white/80">Stuur offerte naar elara@vanthom.nl</span>
        </span>
      ),
      delay: 0.8,
    },
    { content: <CheckLine text="Gmail geopend" />, delay: 1.8 },
    { content: <CheckLine text="Offerte template geladen" />, delay: 2.5 },
    { content: <CheckLine text="Klantdata ingevuld vanuit CRM" />, delay: 3.2 },
    { content: <CheckLine text="Mail verzonden" />, delay: 3.9 },
    {
      content: (
        <span className="text-white/70">
          Elara: &ldquo;Klaar. Follow-up over 3 dagen inplannen?&rdquo;
        </span>
      ),
      delay: 4.8,
    },
    {
      content: (
        <span>
          <span className="text-amber-400">jij</span>
          <span className="text-white/30"> → </span>
          <span className="text-white/80">Ja doe dat</span>
        </span>
      ),
      delay: 5.8,
    },
    { content: <CheckLine text="Afspraak ingepland in agenda" />, delay: 6.6 },
    {
      content: (
        <span className="text-white/25 italic">
          // Jij sliep. Zij werkte.
          <span className="elara-cursor text-amber-400 not-italic"> ▍</span>
        </span>
      ),
      delay: 7.6,
    },
  ];

  return (
    <div className="mt-6 overflow-hidden max-md:mt-4">
      {/* Title bar */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] text-white/40 font-[family-name:var(--font-fragment-mono)]">
            Elara · actief
          </span>
        </div>
      </div>

      {/* Log body */}
      <div className="pt-4 h-[230px] font-[family-name:var(--font-fragment-mono)] text-[11px] leading-relaxed space-y-1.5 max-md:pt-3 max-md:h-[180px] max-md:text-[10px]">
        {lines.map((line, i) => (
          <div key={i} className="elara-line" style={{ animationDelay: `${line.delay}s` }}>
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Check className="w-3 h-3 text-green-400 shrink-0" />
      <span className="text-green-400/80">{text}</span>
    </span>
  );
}

function DashboardVisual() {
  const bars = [45, 70, 38, 88, 62, 95, 55];
  return (
    <div className="mt-6 overflow-hidden max-md:mt-4">
      {/* Top bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-white/60">Dashboard</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-8 h-2 rounded-full bg-white/[0.08]" />
          <span className="w-4 h-2 rounded-full bg-white/[0.08]" />
        </div>
      </div>

      <div className="pt-4 space-y-3">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "€48.2K", l: "Omzet", c: "text-white" },
            { v: "1.284", l: "Gebruikers", c: "text-blue-400" },
            { v: "+24%", l: "Groei", c: "text-green-400" },
          ].map((s, i) => (
            <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-2.5 py-2">
              <p className={`text-[14px] font-bold ${s.c} animate-count-pulse`} style={{ animationDelay: `${i * 0.4}s` }}>
                {s.v}
              </p>
              <p className="text-[8px] text-white/30 uppercase tracking-wider mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Line chart */}
        <div className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-white/30 uppercase tracking-wider">Activiteit</span>
            <span className="text-[9px] text-green-400">live</span>
          </div>
          <svg className="w-full h-[50px]" viewBox="0 0 280 50" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>
            <path
              d="M0 40 L40 28 L80 34 L120 18 L160 26 L200 10 L240 20 L280 6"
              stroke="#3b82f6"
              strokeWidth="2"
              className="animate-line-draw"
            />
            <path
              d="M0 40 L40 28 L80 34 L120 18 L160 26 L200 10 L240 20 L280 6 L280 50 L0 50 Z"
              fill="url(#lineFill)"
            />
          </svg>
        </div>

        {/* Bar chart */}
        <div className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-3">
          <div className="flex items-end justify-between gap-1.5 h-[44px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-500/40 to-blue-400/80 animate-bar-grow"
                style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="mt-6 relative h-[300px] rounded-2xl overflow-hidden flex items-center justify-center max-md:mt-4 max-md:h-[280px]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-amber-500/10 blur-[60px] animate-screen-glow" />

      {/* Phone */}
      <div className="relative animate-phone-float">
        <div className="animate-phone-shake">
          <div
            className="relative w-[130px] h-[260px] rounded-[30px] p-[3px] max-md:w-[110px] max-md:h-[220px]"
            style={{
              background: "linear-gradient(145deg, #2a2a2a, #0a0a0a)",
              boxShadow:
                "0 30px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Screen */}
            <div
              className="relative w-full h-full rounded-[27px] overflow-hidden"
              style={{ background: "#100d0b" }}
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[50px] h-[16px] rounded-full bg-black z-20 flex items-center justify-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="w-3 h-1 rounded-full bg-white/10" />
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-[7px] font-semibold text-white/50">9:41</span>
                <div className="flex gap-0.5">
                  <span className="w-2.5 h-1.5 rounded-[1px] bg-white/30" />
                </div>
              </div>

              {/* App content */}
              <div className="px-3 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <span className="text-[9px] font-black text-black">V</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 w-12 rounded-full bg-white/20" />
                    <div className="h-1 w-8 rounded-full bg-white/10 mt-1" />
                  </div>
                </div>

                {/* Hero card */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/5 border border-amber-500/15 p-3 mb-2.5">
                  <div className="h-1.5 w-16 rounded-full bg-amber-400/40 mb-2" />
                  <div className="h-3 w-20 rounded-full bg-white/25 mb-1" />
                  <div className="h-1.5 w-14 rounded-full bg-white/10" />
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2">
                    <div className="h-3 w-8 rounded-full bg-white/20 mb-1" />
                    <div className="h-1 w-10 rounded-full bg-white/10" />
                  </div>
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2">
                    <div className="h-3 w-6 rounded-full bg-amber-400/40 mb-1" />
                    <div className="h-1 w-10 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* List rows */}
                <div className="space-y-1.5">
                  {[0, 1, 2].map((r) => (
                    <div key={r} className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-1.5">
                      <span className="w-4 h-4 rounded-md bg-white/10 shrink-0" />
                      <div className="flex-1">
                        <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="absolute bottom-0 inset-x-0 h-9 bg-black/40 backdrop-blur-sm border-t border-white/5 flex items-center justify-around px-4">
                <span className="w-4 h-4 rounded-md bg-amber-400/60" />
                <span className="w-4 h-4 rounded-md bg-white/10" />
                <span className="w-4 h-4 rounded-md bg-white/10" />
              </div>

              {/* Floating notification */}
              <div className="absolute top-9 left-2 right-2 z-30 animate-notif-pop">
                <div className="rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15 p-2 flex items-center gap-2 shadow-xl">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shrink-0" />
                  <div className="flex-1">
                    <div className="h-1.5 w-12 rounded-full bg-white/40 mb-1" />
                    <div className="h-1 w-16 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[70px] w-[3px] h-6 rounded-l bg-[#1a1a1a]" />
          <div className="absolute -left-[3px] top-[100px] w-[3px] h-10 rounded-l bg-[#1a1a1a]" />
          <div className="absolute -right-[3px] top-[90px] w-[3px] h-12 rounded-r bg-[#1a1a1a]" />
        </div>
      </div>
    </div>
  );
}

type Service = (typeof services)[number];

function MobileServiceCard({ service }: { service: Service }) {
  return (
    <div
      className="service-card group relative p-5 rounded-2xl cursor-pointer overflow-hidden h-full"
      style={{ background: service.cardBg }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-3">
          <h3 className="text-[17px] font-bold text-white font-[family-name:var(--font-outfit)] leading-tight">
            {service.title}
          </h3>
          {service.tag && (
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shrink-0"
              style={{ backgroundColor: service.tagColor ?? undefined }}
            >
              {service.tag}
            </span>
          )}
        </div>

        <p className="text-white/55 text-[13px] leading-relaxed max-w-sm">{service.description}</p>

        <p className="mt-2.5 text-[11px] font-[family-name:var(--font-fragment-mono)] tracking-[0.08em] text-white/35">
          {service.price}
        </p>

        <Link
          href={service.href}
          className="inline-block mt-4 px-4 py-2 rounded-full bg-[#111] border border-white/15 text-white text-[12px] font-semibold active:scale-[0.98] transition-all duration-300"
        >
          {service.cta}
        </Link>

        <CardVisual type={service.visual} />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="services" className="relative pt-28 md:pt-36 pb-12 md:pb-20 bg-[#0a0a0a] -mt-px overflow-hidden">
      <div className="section-edge-fade-bottom section-edge-fade-bottom--to-muted" aria-hidden />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 max-md:px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 max-md:mb-8 max-md:gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-6xl font-[900] text-[#E9E8E3] uppercase leading-[0.85] tracking-tight max-md:text-[1.85rem] max-md:leading-[0.92]">
              Gebouwd om te <span className="italic font-normal text-[#FF9220]">groeien</span>
            </h2>
            <p className="mt-4 text-white/35 text-[14px] md:text-[15px] max-w-md">
              Technologie die jouw bedrijf niet alleen laat groeien, maar laat domineren.
            </p>
          </div>
          <Link
            href="#contact"
            className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors max-md:text-[13px]"
          >
            Alle diensten
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobiel: swipe carousel */}
        <div className="md:hidden -mx-5 mb-2">
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 pb-3"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {services.map((service, i) => (
              <div key={i} className="snap-center shrink-0 w-[86vw] max-w-[340px]">
                <MobileServiceCard service={service} />
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] font-[family-name:var(--font-fragment-mono)] tracking-[0.15em] text-white/20 uppercase mt-2">
            Swipe voor diensten
          </p>
        </div>

        {/* Desktop: originele grid */}
        <div className="hidden md:flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">
            {services.slice(0, 2).map((service, i) => (
              <div
                key={i}
                className="service-card group relative p-10 rounded-3xl cursor-pointer overflow-hidden"
                style={{ background: service.cardBg }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-outfit)]">
                      {service.title}
                    </h3>
                    {service.tag && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: service.tagColor ?? undefined }}
                      >
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-white/50 text-[14px] leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  <p className="mt-3 text-[11px] font-[family-name:var(--font-fragment-mono)] tracking-[0.1em] text-white/20">
                    {service.price}
                  </p>

                  <Link
                    href={service.href}
                    className="inline-block mt-5 px-5 py-2.5 rounded-full bg-[#111] border border-white/15 text-white text-[13px] font-semibold hover:bg-[#222] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {service.cta}
                  </Link>

                  <CardVisual type={service.visual} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.slice(2).map((service, i) => (
              <div
                key={i}
                className="service-card group relative p-10 rounded-3xl cursor-pointer overflow-hidden"
                style={{ background: service.cardBg }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-outfit)]">
                      {service.title}
                    </h3>
                    {service.tag && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: service.tagColor ?? undefined }}
                      >
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-white/50 text-[14px] leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  <p className="mt-3 text-[11px] font-[family-name:var(--font-fragment-mono)] tracking-[0.1em] text-white/20">
                    {service.price}
                  </p>

                  <Link
                    href={service.href}
                    className="inline-block mt-5 px-5 py-2.5 rounded-full bg-[#111] border border-white/15 text-white text-[13px] font-semibold hover:bg-[#222] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {service.cta}
                  </Link>

                  <CardVisual type={service.visual} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
