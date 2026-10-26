"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const rotatingTexts = [
  { top: "150+", bottom: "Projecten" },
  { top: "5+ Jaar", bottom: "Ervaring" },
  { top: "100%", bottom: "Op Maat" },
  { top: "Premium", bottom: "Kwaliteit" },
];

const DURATION = 3000;
const CIRCUMFERENCE = 2 * Math.PI * 26;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    startRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        setFade(false);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
          setProgress(0);
          startRef.current = Date.now();
          setFade(true);
        }, 300);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-5 max-md:px-5 max-md:py-0 max-md:min-h-[max(3.25rem,calc(env(safe-area-inset-top)+3.25rem))] max-md:items-center md:grid md:grid-cols-3">
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              </svg>
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56" fill="none">
                <circle
                  cx="28" cy="28" r="26"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "none" }}
                />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
              </svg>
            </div>
            <div className={`flex flex-col transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
              <span className="text-[14px] font-bold text-white leading-tight">
                {rotatingTexts[textIndex].top}
              </span>
              <span className="text-[13px] text-white/50 leading-tight">
                {rotatingTexts[textIndex].bottom}
              </span>
            </div>
          </div>

          <div className="flex justify-start md:justify-center shrink-0 max-md:flex-1 max-md:items-center max-md:justify-start max-md:pl-0">
            <Link
              href="/"
              className="inline-flex items-center justify-start opacity-95 hover:opacity-100 transition-opacity duration-300 max-md:h-11 max-md:-ml-9"
              aria-label="Ames Car Detailing home"
            >
              <Image
                src="/Gemini_Generated_Image_q9s8bpq9s8bpq9s8-removebg-preview.png"
                alt="Ames Car Detailing"
                width={873}
                height={229}
                priority
                className="h-9 w-auto md:h-10 object-contain object-left max-md:h-[2.125rem]"
                sizes="(max-width: 768px) 150px, 175px"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end">
            <div className={`flex items-center gap-8 transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none absolute" : "opacity-100"}`}>
              <Link href="/" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <div className="relative group">
                <Link href="/#pakketten" className="text-[14px] text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
                  Pakketten
                  <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-[#111] border border-white/[0.08] rounded-2xl p-2 min-w-[220px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    {[
                      { label: "Interieur", href: "/pakketten?c=interieur" },
                      { label: "Exterieur", href: "/pakketten?c=exterieur" },
                      { label: "Combo", href: "/pakketten?c=combo" },
                      { label: "Alle pakketten", href: "/pakketten" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 rounded-xl text-[13px] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/over-ons" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Over ons
              </Link>
              <Link href="/contact" className="text-[14px] text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={`w-12 h-12 flex flex-col items-center justify-center gap-[6px] rounded-full bg-white hover:bg-white/90 transition-all duration-500 cursor-pointer ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none absolute"}`}
            >
              <span className="w-5 h-[1.5px] bg-[#0a0a0a] rounded-full" />
              <span className="w-5 h-[1.5px] bg-[#0a0a0a] rounded-full" />
              <span className="w-5 h-[1.5px] bg-[#0a0a0a] rounded-full" />
            </button>
          </div>

          {/* Spacer voor vaste mobiele menu-knop (MobileMenu.tsx) */}
          <div className="md:hidden w-11 h-11 shrink-0" aria-hidden />
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0a0a0a] hidden md:flex flex-col">
          <div className="flex items-center justify-end px-8 py-5 max-md:px-5">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 cursor-pointer touch-manipulation"
            >
              <X className="w-5 h-5 text-white" />
              <span className="text-[13px] uppercase tracking-widest text-white/60">Sluiten</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-10 pb-16">
            {[
              { label: "Home", href: "/" },
              { label: "Over ons", href: "/over-ons" },
              { label: "Pakketten", href: "/#pakketten" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl md:text-6xl font-black text-white/80 hover:text-white uppercase tracking-tight font-[family-name:var(--font-outfit)]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/groei-scan"
              onClick={() => setMenuOpen(false)}
              className="ames-btn-glow ames-btn-glow--blue mt-4 px-10 py-4 text-[14px] font-semibold rounded-full flex items-center justify-center gap-2.5"
            >
              <Calendar className="relative z-[1] w-4 h-4 shrink-0 opacity-90" strokeWidth={2.25} />
              <span className="relative z-[1]">Boek nu</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
