"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  Car,
  CreditCard,
  Package,
  type LucideIcon,
} from "lucide-react";

const steps: { num: string; icon: LucideIcon; title: string; text: string }[] = [
  {
    num: "01",
    icon: Package,
    title: "Kies je pakket",
    text: "De reiniging die past bij jouw auto en planning.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Boek een afspraak",
    text: "Via de boek scan — wij bevestigen binnen 24 uur.",
  },
  {
    num: "03",
    icon: Car,
    title: "Wij komen langs",
    text: "Volledig uitgerust op jouw adres in heel Zuid-Holland.",
  },
  {
    num: "04",
    icon: CreditCard,
    title: "Betaling",
    text: "Na afloop eenvoudig betalen — pin of contant.",
  },
];

export default function ShowcaseStepsAnim() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 3500);
    return () => clearInterval(t);
  }, [inView]);

  const current = steps[active];
  const Icon = current.icon;

  return (
    <div
      ref={rootRef}
      className="ames-live-card ames-steps-card relative w-full min-h-[340px] md:min-h-[400px] rounded-2xl md:rounded-3xl bg-[#0f0f0f]/95 backdrop-blur-xl"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF9220]/[0.04] via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 p-5 md:p-7 flex flex-col h-full">
        <div className="flex items-center justify-between gap-2 mb-6">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] md:text-[11px] tracking-[0.2em] text-white/50 uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9220] opacity-35" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9220]/80" />
            </span>
            In 4 stappen
          </p>
          <span className="text-[10px] text-[#FF9220]/85 uppercase tracking-wider font-[family-name:var(--font-fragment-mono)]">
            Op locatie
          </span>
        </div>

        {/* Voortgangsbalk */}
        <div className="flex items-center w-full mb-8">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div
                className={`relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] font-bold font-[family-name:var(--font-fragment-mono)] transition-all duration-500 ${
                  i <= active
                    ? "bg-[#FF9220]/15 text-[#E9E8E3] border border-[#FF9220]/35 scale-100"
                    : "bg-white/[0.04] text-white/28 border border-white/[0.08] scale-95"
                } ${i === active ? "ring-1 ring-[#FF9220]/40 ring-offset-2 ring-offset-[#0c0c0c]" : ""}`}
              >
                {step.num}
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-1 md:mx-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full ames-progress-glow--subtle transition-all duration-700 ease-out"
                    style={{ width: i < active ? "100%" : i === active ? "55%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actieve stap */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 min-h-[160px]">
          <div key={active} className="showcase-step-enter w-full max-w-sm">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-[#FF9220]/20 bg-[#FF9220]/[0.06]">
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-2">
              {current.title}
            </h3>
            <p className="text-white/55 text-[13px] md:text-sm leading-relaxed">{current.text}</p>
          </div>
        </div>

        {/* Compacte lijst */}
        <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
          {steps.map((step, i) => (
            <li
              key={step.num}
              className={`flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-400 ${
                i === active ? "bg-white/[0.04] border border-[#FF9220]/20" : "opacity-40"
              }`}
            >
              <step.icon className="w-3.5 h-3.5 shrink-0 text-[#FF9220]" strokeWidth={2} />
              <span className="text-[11px] md:text-xs text-white/80 font-medium">{step.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
