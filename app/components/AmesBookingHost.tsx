"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import AmesBookingFlow from "./AmesBookingFlow";
import {
  AMES_BOOKING_EVENT,
  prefillFromSearch,
  type BookingPrefill,
} from "../lib/amesAvailability";

export default function AmesBookingHost() {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  const [session, setSession] = useState(0);

  useEffect(() => {
    const openWith = (next: BookingPrefill) => {
      setPrefill(next);
      setSession((value) => value + 1);
      setOpen(true);
    };

    const onCustom = (event: Event) => {
      openWith((event as CustomEvent<BookingPrefill>).detail ?? {});
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.location.pathname === "/groei-scan") return;
      const link = (event.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/groei-scan") return;
      event.preventDefault();
      event.stopPropagation();
      openWith(prefillFromSearch(url.searchParams));
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener(AMES_BOOKING_EVENT, onCustom);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(AMES_BOOKING_EVENT, onCustom);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10030] flex items-stretch justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-black/75" aria-label="Sluiten" onClick={() => setOpen(false)} />
      <div className="relative z-10 flex h-[100dvh] w-full max-w-4xl flex-col sm:h-[min(760px,92dvh)]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80"
          aria-label="Sluiten"
        >
          <X className="h-4 w-4" />
        </button>
        <AmesBookingFlow key={session} prefill={prefill} showLogo fill />
      </div>
    </div>
  );
}
