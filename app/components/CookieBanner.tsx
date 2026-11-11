"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

function hasCookieConsent(): boolean {
  try {
    return !!localStorage.getItem("cookie-consent");
  } catch {
    return false;
  }
}

export default function CookieBanner() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const openPanel = useCallback(() => {
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setAnimateIn(false);
    window.setTimeout(() => setPanelOpen(false), 300);
  }, []);

  useEffect(() => {
    if (hasCookieConsent()) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) {
      setPanelOpen(true);
      return;
    }

    const timer = window.setTimeout(() => setPanelOpen(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!panelOpen) {
      setAnimateIn(false);
      return;
    }
    const timer = window.setTimeout(() => setAnimateIn(true), 40);
    return () => window.clearTimeout(timer);
  }, [panelOpen]);

  const accept = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {
      /* ignore */
    }
    closePanel();
  };

  const reject = () => {
    try {
      localStorage.setItem("cookie-consent", "rejected");
    } catch {
      /* ignore */
    }
    closePanel();
  };

  return (
    <>
      {!panelOpen && (
        <button
          type="button"
          onClick={openPanel}
          className="ames-cookie-fab group fixed left-4 z-[9998] flex items-center justify-center touch-manipulation active:scale-95 transition-transform bottom-[max(1rem,env(safe-area-inset-bottom))] md:left-6 md:bottom-6"
          aria-label="Cookies en privacy openen"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center md:h-12 md:w-12">
            <Cookie
              className="h-[1.35rem] w-[1.35rem] text-white/70 group-hover:text-white/90 transition-colors md:h-[1.45rem] md:w-[1.45rem]"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </button>
      )}

      {panelOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[10010] flex items-end justify-center sm:justify-start pointer-events-none p-0 max-md:bottom-[max(4.5rem,calc(env(safe-area-inset-bottom)+4rem))] max-md:justify-start max-md:px-5 sm:p-0">
          <div
            className={`cookie-card pointer-events-auto relative z-[1] w-full max-md:max-w-none max-md:rounded-2xl sm:max-w-[400px] sm:m-6 bg-[#0f0f0f]/95 backdrop-blur-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-300 ${
              animateIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            role="dialog"
            aria-labelledby="cookie-banner-title"
          >
            <div className="relative z-[1] px-6 pt-5 pb-5">
              <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.18em] text-white/25 uppercase mb-2">
                Lashstudio Bia
              </p>
              <h3
                id="cookie-banner-title"
                className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white mb-1.5"
              >
                Cookies & privacy
              </h3>
              <p className="text-white/40 text-[12px] leading-[1.7] mb-5">
                We gebruiken cookies om bezoek te meten en de site soepel te laten werken. Kies
                &ldquo;Accepteren&rdquo; om akkoord te gaan.{" "}
                <Link
                  href="/privacy"
                  className="text-white/60 underline underline-offset-2 hover:text-white transition-colors"
                >
                  Meer info
                </Link>
              </p>
              <div className="flex flex-col gap-2.5 max-md:flex-row max-md:gap-2">
                <button
                  type="button"
                  onClick={reject}
                  className="w-full max-md:flex-1 py-2.5 rounded-full border border-white/10 text-white/50 text-[12px] font-medium hover:border-white/20 hover:text-white/70 hover:bg-white/[0.03] transition-all cursor-pointer"
                >
                  Weigeren
                </button>
                <button
                  type="button"
                  onClick={accept}
                  className="w-full max-md:flex-1 py-2.5 rounded-full bg-white text-[#0a0a0a] text-[12px] font-semibold hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Accepteren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
