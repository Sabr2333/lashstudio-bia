"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, Lightbulb } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-6 pt-20 max-md:min-h-[100dvh] max-md:justify-center max-md:px-5 max-md:pt-[max(7rem,env(safe-area-inset-top)+5.5rem)] max-md:pb-[max(7rem,env(safe-area-inset-bottom)+5rem)]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-car-wash-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0 pointer-events-none"
      >
        <source src="/videos/hero-car-wash.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a] z-[1] pointer-events-none" />

      <div className="relative z-[2] flex flex-col items-center text-center w-full max-w-xl max-md:max-w-[380px] max-md:mt-0">
        {/* Desktop hero text */}
        <svg
          viewBox="0 0 1100 248"
          className="w-full max-w-[1100px] hidden md:block -mb-3"
          aria-label="Auto poetsen op jouw locatie"
        >
          <defs>
            <linearGradient id="heroOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD4A8" />
              <stop offset="45%" stopColor="#FF9220" />
              <stop offset="100%" stopColor="#FF5A10" />
            </linearGradient>
          </defs>
          <text x="50%" y="120" textAnchor="middle" className="fill-[#E9E8E3] font-[family-name:var(--font-outfit)]" style={{ fontSize: 120, fontWeight: 900, textTransform: "uppercase" as const }}>
            AUTO POETSEN
          </text>
          <text x="50%" y="120" textAnchor="middle" className="letter-stroke font-[family-name:var(--font-outfit)]" style={{ fontSize: 120, fontWeight: 900, textTransform: "uppercase" as const }}>
            AUTO POETSEN
          </text>
          <g className="hero-orange-glow">
            <text x="50%" y="240" textAnchor="middle" fill="url(#heroOrangeGrad)" className="font-[family-name:var(--font-outfit)]" style={{ fontSize: 108, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" as const }}>
              OP JOUW LOCATIE
            </text>
            <text x="50%" y="240" textAnchor="middle" className="letter-stroke-orange font-[family-name:var(--font-outfit)]" style={{ fontSize: 108, fontWeight: 400, fontStyle: "italic", textTransform: "uppercase" as const }}>
              OP JOUW LOCATIE
            </text>
          </g>
        </svg>

        {/* Mobile hero text */}
        <svg
          viewBox="0 0 320 96"
          className="w-full max-w-[320px] md:hidden -mb-1"
          aria-label="Auto poetsen op jouw locatie"
        >
          <defs>
            <linearGradient id="heroOrangeGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD4A8" />
              <stop offset="45%" stopColor="#FF9220" />
              <stop offset="100%" stopColor="#FF5A10" />
            </linearGradient>
          </defs>
          <text x="50%" y="40" textAnchor="middle" className="fill-[#E9E8E3] font-[family-name:var(--font-outfit)]" style={{ fontSize: 38, fontWeight: 900, textTransform: "uppercase" as const }}>
            AUTO POETSEN
          </text>
          <text x="50%" y="40" textAnchor="middle" className="letter-stroke font-[family-name:var(--font-outfit)]" style={{ fontSize: 38, fontWeight: 900, textTransform: "uppercase" as const }}>
            AUTO POETSEN
          </text>
          <g className="hero-orange-glow">
            <text x="50%" y="88" textAnchor="middle" fill="url(#heroOrangeGradMobile)" className="font-[family-name:var(--font-outfit)]" style={{ fontSize: 30, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" as const }}>
              OP JOUW LOCATIE
            </text>
            <text x="50%" y="88" textAnchor="middle" className="letter-stroke-orange font-[family-name:var(--font-outfit)]" style={{ fontSize: 30, fontWeight: 400, fontStyle: "italic", textTransform: "uppercase" as const }}>
              OP JOUW LOCATIE
            </text>
          </g>
        </svg>

        <p className="mt-5 md:mt-6 text-[15px] md:text-base text-white/50 leading-relaxed max-md:mt-4 max-md:text-[15px] max-md:leading-[1.65]">
          Professionele auto detailing op locatie, showroomklaar zonder de wasstraat.
          <br className="hidden md:block" /> Boek vandaag je afspraak bij Ames detailing.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 max-md:mt-6 max-md:gap-3.5 max-md:w-full">
          <Link
            href="/groei-scan"
            className="group ames-btn-glow ames-btn-glow--blue relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-semibold hover:scale-[1.03] max-md:px-8 max-md:py-3.5 max-md:text-[14px]"
          >
            <span className="relative z-[1] inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0 opacity-90" strokeWidth={2.25} />
              Boek nu
            </span>
          </Link>
          <Link
            href="#pakketten"
            className="group inline-flex items-center gap-2.5 text-white/50 hover:text-white transition-all duration-300"
          >
            <div className="flex w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 items-center justify-center border border-transparent group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 max-md:w-7 max-md:h-7">
              <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 max-md:w-3 max-md:h-3 text-white/70 group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-[13px] md:text-[14px] max-md:text-[15px]">Onze pakketten</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
