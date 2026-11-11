"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { maPackages } from "../lib/amesPackages";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

const packageItems = [
  ...maPackages.map((item) => ({ label: item.title, href: item.href })),
  { label: "Alle pakketten", href: "/pakketten" },
];

export default function MobileMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [packagesOpen, setPackagesOpen] = useState(false);

  const closeMenu = () => {
    detailsRef.current?.removeAttribute("open");
    setPackagesOpen(false);
  };

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const onToggle = () => {
      document.body.style.overflow = details.open ? "hidden" : "";
    };

    details.addEventListener("toggle", onToggle);
    return () => {
      details.removeEventListener("toggle", onToggle);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <details ref={detailsRef} className="mobile-menu md:hidden">
      {/* Native summary = betrouwbaar openen op iPhone */}
      <summary
        className="mobile-menu-trigger fixed right-5 z-[10006] flex h-11 w-11 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-full bg-white touch-manipulation [&::-webkit-details-marker]:hidden"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        aria-label="Menu openen"
      >
        <span className="pointer-events-none h-[1.5px] w-4 rounded-full bg-[#0a0a0a]" />
        <span className="pointer-events-none h-[1.5px] w-4 rounded-full bg-[#0a0a0a]" />
        <span className="pointer-events-none h-[1.5px] w-4 rounded-full bg-[#0a0a0a]" />
      </summary>

      <div
        className="fixed inset-0 z-[10005] flex flex-col bg-[#0a0a0a]"
        role="dialog"
        aria-modal="true"
        aria-label="Navigatiemenu"
      >
        <div
          className="flex items-center justify-end px-5 pb-2"
          style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
        >
          <button
            type="button"
            onClick={closeMenu}
            className="flex items-center gap-3 touch-manipulation"
            aria-label="Menu sluiten"
          >
            <X className="pointer-events-none h-5 w-5 text-white" />
            <span className="pointer-events-none text-[13px] uppercase tracking-widest text-white/60">
              Sluiten
            </span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-5 pb-16">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => window.setTimeout(closeMenu, 0)}
              className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase tracking-tight text-white/80 touch-manipulation"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex flex-col items-center">
            <button
              type="button"
              aria-expanded={packagesOpen}
              aria-controls="mobile-package-links"
              onClick={() => setPackagesOpen((open) => !open)}
              className="flex items-center gap-2 font-[family-name:var(--font-outfit)] text-4xl font-black uppercase tracking-tight text-white/80 touch-manipulation"
            >
              Pakketten
              <ChevronDown
                className={`h-6 w-6 transition-transform ${packagesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {packagesOpen && (
              <div id="mobile-package-links" className="mt-4 grid w-full justify-items-center gap-3 text-center">
                {packageItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => window.setTimeout(closeMenu, 0)}
                    className="block font-[family-name:var(--font-outfit)] text-lg font-semibold text-white/60 touch-manipulation"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/groei-scan"
            onClick={() => window.setTimeout(closeMenu, 0)}
            className="ames-btn-glow ames-btn-glow--blue mt-4 flex items-center justify-center gap-2.5 rounded-full px-10 py-4 text-[14px] font-semibold touch-manipulation"
          >
            <Calendar className="relative z-[1] w-4 h-4 shrink-0 opacity-90" strokeWidth={2.25} />
            <span className="relative z-[1]">Boek nu</span>
          </Link>
        </nav>
      </div>
    </details>
  );
}
