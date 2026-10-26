"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Mail,
  Calendar,
  FileText,
  MessageCircle,
  Bot,
  Wifi,
  Battery,
  Search,
  Bell,
  Home,
  BarChart3,
  Settings,
  Layers,
} from "lucide-react";

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    obs.observe(el);
    const fallback = setTimeout(() => setShown(true), 1200);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Count-up number ---------- */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("nl-NL", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------- Big mockups ---------- */
export function ServiceMockup({ slug }: { slug: string }) {
  if (slug === "web-applicaties") return <DashboardMockup />;
  if (slug === "mobiele-apps") return <PhoneMockup />;
  if (slug === "ai-automatisering") return <TerminalMockup />;
  if (slug === "elara") return <ChatMockup />;
  return null;
}

/* Dashboard — web-applicaties */
function DashboardMockup() {
  const bars = [40, 65, 35, 80, 55, 92, 60, 75];
  return (
    <div className="relative w-full">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0b0e14] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
        {/* top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] text-[10px] text-white/30">
            app.vanthom.nl/dashboard
          </div>
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden sm:flex flex-col gap-1 w-[150px] p-3 border-r border-white/[0.06]">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-blue-500/15 text-blue-300">
              <Home className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Overzicht</span>
            </div>
            {[
              { icon: BarChart3, label: "Analytics" },
              { icon: Layers, label: "Projecten" },
              { icon: Settings, label: "Instellingen" },
            ].map((it, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-lg text-white/35">
                <it.icon className="w-3.5 h-3.5" />
                <span className="text-[11px]">{it.label}</span>
              </div>
            ))}
            <div className="mt-auto rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
              <div className="h-1.5 w-12 rounded-full bg-white/15 mb-1.5" />
              <div className="h-1 w-16 rounded-full bg-white/8" />
            </div>
          </div>

          {/* main */}
          <div className="flex-1 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 w-24 rounded-full bg-white/20 mb-1.5" />
                <div className="h-1.5 w-16 rounded-full bg-white/8" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <Search className="w-3.5 h-3.5 text-white/30" />
                </span>
                <span className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-white/30" />
                </span>
              </div>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { v: "€48.2K", l: "Omzet", c: "text-white" },
                { v: "1.284", l: "Gebruikers", c: "text-blue-400" },
                { v: "+24%", l: "Groei", c: "text-green-400" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className={`text-[15px] font-bold ${s.c}`}>{s.v}</p>
                  <p className="text-[8px] text-white/30 uppercase tracking-wider mt-1">{s.l}</p>
                </div>
              ))}
            </div>

            {/* line chart */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Omzet · 30d</span>
                <span className="flex items-center gap-1 text-[9px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> live
                </span>
              </div>
              <svg className="w-full h-[64px]" viewBox="0 0 320 64" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 52 L45 40 L90 46 L135 24 L180 32 L225 14 L270 24 L320 8"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  className="animate-line-draw"
                />
                <path
                  d="M0 52 L45 40 L90 46 L135 24 L180 32 L225 14 L270 24 L320 8 L320 64 L0 64 Z"
                  fill="url(#dashFill)"
                />
              </svg>
            </div>

            {/* bars */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
              <div className="flex items-end justify-between gap-1.5 h-[48px]">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-blue-500/40 to-blue-400/80 animate-bar-grow"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating badge */}
      <div className="absolute -bottom-4 -right-3 sm:-right-5 rounded-xl bg-[#111] border border-white/10 px-4 py-3 shadow-2xl animate-float-slow">
        <p className="text-[9px] text-white/30 uppercase tracking-wider mb-0.5">Uptime</p>
        <p className="text-[16px] font-bold text-green-400">99.9%</p>
      </div>
    </div>
  );
}

/* Phone — mobiele-apps */
function PhoneMockup() {
  return (
    <div className="relative w-full flex justify-center">
      <div className="relative animate-phone-float">
        <div
          className="relative w-[230px] h-[470px] rounded-[44px] p-[4px]"
          style={{
            background: "linear-gradient(145deg, #2a2a2a, #0a0a0a)",
            boxShadow: "0 50px 100px -20px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)",
          }}
        >
          <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#0e0b09]">
            {/* notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[80px] h-[22px] rounded-full bg-black z-20" />
            {/* status */}
            <div className="flex items-center justify-between px-6 pt-4 pb-1">
              <span className="text-[9px] font-semibold text-white/60">9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-white/40" />
                <Battery className="w-3.5 h-3.5 text-white/40" />
              </div>
            </div>

            <div className="px-4 pt-5">
              {/* header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[9px] text-amber-400/70 uppercase tracking-wider">Welkom terug</p>
                  <p className="text-[15px] font-bold text-white">Dashboard</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
              </div>

              {/* balance card */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-500/25 to-amber-700/5 border border-amber-500/20 p-4 mb-3">
                <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Totaal saldo</p>
                <p className="text-[24px] font-black text-white mb-3">€12.480</p>
                <div className="flex gap-2">
                  <div className="flex-1 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                    <span className="text-[9px] font-semibold text-white">Verzenden</span>
                  </div>
                  <div className="flex-1 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
                    <span className="text-[9px] font-semibold text-black">Ontvangen</span>
                  </div>
                </div>
              </div>

              {/* list */}
              <div className="space-y-2">
                {[
                  { n: "Spotify", v: "-€9,99" },
                  { n: "Salaris", v: "+€2.400" },
                  { n: "Albert Heijn", v: "-€47,20" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-2.5">
                    <span className="w-7 h-7 rounded-lg bg-white/10 shrink-0" />
                    <span className="text-[11px] text-white/70 flex-1">{t.n}</span>
                    <span className={`text-[11px] font-semibold ${t.v.startsWith("+") ? "text-green-400" : "text-white/50"}`}>
                      {t.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom nav */}
            <div className="absolute bottom-0 inset-x-0 h-14 bg-black/50 backdrop-blur border-t border-white/5 flex items-center justify-around px-6">
              <Home className="w-5 h-5 text-amber-400" />
              <BarChart3 className="w-5 h-5 text-white/25" />
              <Bell className="w-5 h-5 text-white/25" />
              <Settings className="w-5 h-5 text-white/25" />
            </div>
          </div>
        </div>

        {/* floating notification */}
        <div className="absolute -left-8 top-24 hidden sm:block rounded-2xl bg-[#1a1a1a] border border-white/10 p-3 w-[170px] shadow-2xl animate-float-slow">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600" />
            <span className="text-[10px] font-semibold text-white">Betaling ontvangen</span>
          </div>
          <p className="text-[9px] text-white/40">+ €2.400 zojuist bijgeschreven</p>
        </div>
      </div>
    </div>
  );
}

/* Terminal — ai-automatisering */
function TerminalMockup() {
  const lines = [
    { t: "agent", text: "Nieuwe taak ontvangen: maandrapportage", delay: 200 },
    { t: "ok", text: "Data opgehaald uit CRM (1.284 records)", delay: 700 },
    { t: "ok", text: "Analyse uitgevoerd · 3 inzichten", delay: 1200 },
    { t: "ok", text: "PDF gegenereerd: rapport-mei.pdf", delay: 1700 },
    { t: "ok", text: "Verstuurd naar 4 teamleden", delay: 2200 },
    { t: "wait", text: "Wacht op volgende opdracht…", delay: 2700 },
  ];
  return (
    <div className="relative w-full">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f0c] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 flex items-center gap-1.5 text-[11px] text-white/40 font-[family-name:var(--font-fragment-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> agent · running
          </span>
        </div>
        <div className="p-5 font-[family-name:var(--font-fragment-mono)] text-[12px] leading-relaxed min-h-[220px]">
          {lines.map((l, i) => (
            <div key={i} className="animate-bubble-in flex items-start gap-2 mb-2" style={{ animationDelay: `${l.delay}ms` }}>
              {l.t === "ok" && <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />}
              {l.t === "agent" && <Bot className="w-3.5 h-3.5 text-emerald-300 mt-0.5 shrink-0" />}
              {l.t === "wait" && <span className="text-emerald-400 mt-0.5">⟳</span>}
              <span className={l.t === "ok" ? "text-green-400/80" : l.t === "wait" ? "text-white/30" : "text-white/80"}>
                {l.text}
              </span>
            </div>
          ))}
          <span className="elara-cursor text-emerald-400">▍</span>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-3 sm:-left-5 rounded-xl bg-[#111] border border-white/10 px-4 py-3 shadow-2xl animate-float-slow">
        <p className="text-[9px] text-white/30 uppercase tracking-wider mb-0.5">Bespaard / week</p>
        <p className="text-[16px] font-bold text-emerald-400">32 uur</p>
      </div>
    </div>
  );
}

/* Chat — elara */
function ChatMockup() {
  const msgs = [
    { from: "user", text: "Stuur offerte naar Dijkstra BV", delay: 200 },
    { from: "elara", action: true, text: "Gmail geopend", delay: 800 },
    { from: "elara", action: true, text: "Template geladen · CRM-data ingevuld", delay: 1300 },
    { from: "elara", action: true, text: "Mail verzonden", delay: 1800 },
    { from: "elara", text: "Klaar! Follow-up over 3 dagen inplannen?", delay: 2400 },
    { from: "user", text: "Ja, doe maar", delay: 3100 },
    { from: "elara", action: true, text: "Afspraak ingepland · di 14:00", delay: 3700 },
  ];
  return (
    <div className="relative w-full">
      <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d0b09] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
        {/* header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-black" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white">Elara</p>
            <p className="text-[10px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> online
            </p>
          </div>
        </div>

        {/* messages */}
        <div className="p-4 space-y-2.5 min-h-[280px]">
          {msgs.map((m, i) =>
            m.action ? (
              <div
                key={i}
                className="animate-bubble-in flex items-center gap-2 ml-2"
                style={{ animationDelay: `${m.delay}ms` }}
              >
                <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="text-[12px] text-green-400/80 font-[family-name:var(--font-fragment-mono)]">
                  {m.text}
                </span>
              </div>
            ) : (
              <div
                key={i}
                className={`animate-bubble-in flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                style={{ animationDelay: `${m.delay}ms` }}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 text-[12.5px] leading-snug ${
                    m.from === "user"
                      ? "bg-amber-500 text-black rounded-2xl rounded-br-md font-medium"
                      : "bg-white/[0.06] text-white/85 rounded-2xl rounded-bl-md border border-white/[0.06]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            )
          )}
        </div>

        {/* input */}
        <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-2">
          <div className="flex-1 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center px-4">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 typing-dot" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 typing-dot" style={{ animationDelay: "0.4s" }} />
            </span>
          </div>
          <span className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-black" />
          </span>
        </div>
      </div>

      {/* floating integration chips */}
      <div className="absolute -right-3 sm:-right-6 top-16 hidden sm:flex flex-col gap-2">
        {[Mail, Calendar, FileText].map((Ic, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-xl bg-[#161310] border border-white/10 flex items-center justify-center shadow-xl animate-float-slow"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <Ic className="w-4 h-4 text-amber-400/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
