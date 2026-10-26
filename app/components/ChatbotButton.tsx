"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import AmesBookPackageModal from "./AmesBookPackageModal";

const HINT_STORAGE_KEY = "ames-floating-book-hint-dismissed";

export default function ChatbotButton() {
  const [bookOpen, setBookOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(HINT_STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setHintOpen(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const dismissHint = () => {
    setHintOpen(false);
    try {
      sessionStorage.setItem(HINT_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const openBook = () => {
    dismissHint();
    setBookOpen(true);
  };

  return (
    <>
      <div className="ames-float-dock fixed bottom-6 right-5 sm:right-6 z-[9999] flex flex-col items-end gap-3 max-md:right-4 max-md:bottom-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="ames-float-dock__bar flex flex-col items-end gap-3 max-md:flex-row max-md:items-center max-md:gap-0">
          <div className="ames-floating-book-cluster">
            {hintOpen && (
              <div
                className="ames-floating-book-pop hidden md:block pr-6"
                role="status"
                aria-live="polite"
              >
                <button
                  type="button"
                  className="ames-floating-book-pop__dismiss"
                  onClick={dismissHint}
                  aria-label="Hint sluiten"
                >
                  ×
                </button>
                <p className="ames-floating-book-pop__title">Boek hier</p>
                <p className="ames-floating-book-pop__text">
                  Snel en eenvoudig. Kies je pakket in een paar klikken.
                </p>
              </div>
            )}

            <div className="ames-floating-book-mascot hidden md:block" aria-hidden />

            <button
              type="button"
              onClick={openBook}
              className="ames-floating-book-v2 touch-manipulation"
              aria-label="Boek een behandeling"
            >
              <span className="ames-floating-book-v2__icon">
                <Calendar className="w-4 h-4" strokeWidth={2.25} />
              </span>
              Boek
            </button>
          </div>

          <div className="ames-float-dock__divider hidden max-md:block" aria-hidden />

          <div className="relative shrink-0">
            <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 pointer-events-none max-md:hidden" />
            <span className="absolute -inset-1 rounded-full border border-[#25D366]/25 animate-pulse pointer-events-none max-md:hidden" />
            <Link
              href="https://wa.me/31640871617"
              target="_blank"
              rel="noopener noreferrer"
              className="ames-float-dock__wa relative w-12 h-12 sm:w-14 sm:h-14 max-md:w-11 max-md:h-11 rounded-full bg-[#25D366] border-2 border-white/20 hover:border-white/50 flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-105 transition-all duration-300 touch-manipulation"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 max-md:w-[1.35rem] max-md:h-[1.35rem] fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <AmesBookPackageModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
}
