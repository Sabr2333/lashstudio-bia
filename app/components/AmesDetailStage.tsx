"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const steps = [
  { id: "01", label: "Was", sub: "Handwas & velgen" },
  { id: "02", label: "Poets", sub: "Interieur & dashboard" },
  { id: "03", label: "Glans", sub: "Polijst & bescherming" },
];

const stats = [
  { value: 100, suffix: "%", label: "Op locatie" },
  { value: 24, suffix: "u", label: "Planning" },
  { value: 5, suffix: "★", label: "Premium finish" },
];

function useInViewCountUp(active: boolean, target: number, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return n;
}

function FlowVisual({ activeStep, progress }: { activeStep: number; progress: number }) {
  const accent = "#FF9220";
  const blue = "rgba(24,1,172,0.35)";

  return (
    <div className="relative h-[220px] md:h-[260px] w-full flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" fill="none" aria-hidden>
        <path d="M200 20 V95" stroke={blue} strokeWidth="1.5" opacity="0.5" />
        <circle r="3" fill={accent}>
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M200,20 L200,95" />
        </circle>

        <path d="M30 130 H115 V130 H170" stroke={blue} strokeWidth="1.5" opacity="0.45" />
        <circle r="3" fill={accent}>
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M30,130 L115,130 L170,130" />
        </circle>

        <path d="M370 130 H285 V130 H230" stroke={blue} strokeWidth="1.5" opacity="0.45" />
        <circle r="3" fill={accent}>
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M370,130 L285,130 L230,130" />
        </circle>

        <path d="M70 230 H130 V155 H170" stroke={blue} strokeWidth="1.5" opacity="0.4" />
        <circle r="3" fill={accent}>
          <animateMotion dur="4s" repeatCount="indefinite" path="M70,230 L130,230 L130,155 L170,155" />
        </circle>

        <path d="M330 230 H270 V155 H230" stroke={blue} strokeWidth="1.5" opacity="0.4" />
        <circle r="3" fill={accent}>
          <animateMotion dur="4.2s" repeatCount="indefinite" path="M330,230 L270,230 L270,155 L230,155" />
        </circle>
      </svg>

      {steps.map((s, i) => {
        const positions = [
          "left-[4%] top-[8%] md:left-[6%]",
          "right-[4%] top-[8%] md:right-[6%]",
          "left-1/2 -translate-x-1/2 bottom-[6%]",
        ];
        const active = i === activeStep;
        return (
          <div
            key={s.id}
            className={`absolute ${positions[i]} z-10 rounded-xl border px-2.5 py-2 md:px-3 md:py-2.5 transition-all duration-500 ${
              active
                ? "border-[#FF9220]/50 bg-[#FF9220]/10 shadow-[0_0_24px_rgba(255,146,32,0.2)] scale-105"
                : "border-white/10 bg-white/[0.03] opacity-70 scale-100"
            }`}
          >
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] text-[#FF9220]">{s.id}</p>
            <p className="text-[11px] md:text-xs font-semibold text-white">{s.label}</p>
          </div>
        );
      })}

      <div
        className="relative z-20 w-[108px] h-[108px] md:w-[128px] md:h-[128px] rounded-[28px] md:rounded-[32px] flex flex-col items-center justify-center border border-white/10"
        style={{
          background: "linear-gradient(145deg, #1a120c 0%, #FF9220 45%, #c45a10 100%)",
          boxShadow: "0 24px 60px rgba(255, 146, 32, 0.28), 0 0 40px rgba(24, 1, 172, 0.12)",
        }}
      >
        <span className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-black text-white tabular-nums">
          {progress}
          <span className="text-lg md:text-xl font-bold opacity-90">%</span>
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/80 mt-0.5">
          Behandeling
        </span>
      </div>
    </div>
  );
}

const logLines = [
  "Velgen gereinigd",
  "Interieur gestofzuigd",
  "Lak gepolijst",
  "Showroom finish",
];

export default function AmesDetailStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(12);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const stepTimer = window.setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 3200);
    const progressTimer = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 18;
        return p + Math.floor(Math.random() * 8) + 4;
      });
    }, 900);
    const logTimer = window.setInterval(() => {
      setLogIndex((i) => (i + 1) % logLines.length);
    }, 2800);
    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearInterval(logTimer);
    };
  }, [inView]);

  const c100 = useInViewCountUp(inView, stats[0].value);
  const c24 = useInViewCountUp(inView, stats[1].value);
  const c5 = useInViewCountUp(inView, stats[2].value);
  const counted = [c100, c24, c5];

  return (
    <div
      ref={rootRef}
      className="ames-live-card relative w-full min-h-[320px] md:min-h-[380px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08]"
      style={{
        background:
          "linear-gradient(160deg, #14100e 0%, #0f0d0b 40%, #121018 100%)",
        boxShadow: "0 0 0 1px rgba(255,146,32,0.06), 0 28px 80px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-40"
        style={{ background: "rgba(255, 146, 32, 0.35)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 rounded-full blur-[70px] opacity-30"
        style={{ background: "rgba(24, 1, 172, 0.4)" }}
        aria-hidden
      />

      <div className="relative z-10 px-5 pt-5 md:px-6 md:pt-6">
        <div className="flex items-center justify-between gap-3 mb-1">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] md:text-[11px] tracking-[0.2em] text-white/50 uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9220] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9220]" />
            </span>
            Behandeling • live
          </p>
          <p className="text-[10px] text-[#FF9220]/80 uppercase tracking-wider hidden sm:block">
            Heel Zuid-Holland
          </p>
        </div>

        <FlowVisual activeStep={activeStep} progress={Math.min(progress, 100)} />

        <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2 mb-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-2 py-3 md:px-3 md:py-3.5 text-center"
            >
              <p className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl font-black text-white tabular-nums">
                <span className="text-[#FF9220]">{counted[i]}</span>
                {s.suffix}
              </p>
              <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-wide mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-black/30 px-3 py-2.5 md:px-4 md:py-3">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[9px] text-white/35 uppercase tracking-widest mb-2">
            Live log
          </p>
          <ul className="space-y-1.5 min-h-[52px]">
            {[0, 1].map((offset) => {
              const idx = (logIndex + logLines.length - offset) % logLines.length;
              return (
                <li
                  key={`${idx}-${offset}`}
                  className="flex items-center gap-2 text-[11px] md:text-xs text-white/70 ames-log-line"
                  style={{ animationDelay: `${offset * 0.1}s` }}
                >
                  <Check className="w-3 h-3 text-[#FF9220] shrink-0" strokeWidth={2.5} />
                  {logLines[idx]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
