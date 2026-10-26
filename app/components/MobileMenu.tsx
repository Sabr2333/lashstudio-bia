"use client";

import { useEffect, useRef } from "react";
import { Calendar, X } from "lucide-react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Pakketten", href: "/#pakketten" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const overlay = overlayRef.current;
    const details = detailsRef.current;
    if (!overlay || !details) return;

    let lastTap = 0;

    const closeMenu = () => {
      details.removeAttribute("open");
    };

    const handleInteraction = (e: Event) => {
      const now = Date.now();
      if (now - lastTap < 350) return;
      lastTap = now;

      const target = e.target as HTMLElement;
      if (target.closest("[data-menu-close]")) {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (target.closest("[data-menu-link]")) {
        closeMenu();
      }
    };

    overlay.addEventListener("touchend", handleInteraction, { passive: false });
    overlay.addEventListener("click", handleInteraction);

    return () => {
      overlay.removeEventListener("touchend", handleInteraction);
      overlay.removeEventListener("click", handleInteraction);
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
        ref={overlayRef}
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
            data-menu-close
            className="flex items-center gap-3 touch-manipulation"
            aria-label="Menu sluiten"
          >
            <X className="pointer-events-none h-5 w-5 text-white" />
            <span className="pointer-events-none text-[13px] uppercase tracking-widest text-white/60">
              Sluiten
            </span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-10 pb-16">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-menu-link
              className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase tracking-tight text-white/80 touch-manipulation"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/groei-scan"
            data-menu-link
            className="ames-btn-glow ames-btn-glow--blue mt-4 flex items-center justify-center gap-2.5 rounded-full px-10 py-4 text-[14px] font-semibold touch-manipulation"
          >
            <Calendar className="relative z-[1] w-4 h-4 shrink-0 opacity-90" strokeWidth={2.25} />
            <span className="relative z-[1]">Boek nu</span>
          </a>
        </nav>
      </div>
    </details>
  );
}
