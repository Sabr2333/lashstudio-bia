"use client";

import { useEffect } from "react";

const MIN_VISIBLE_MS = 1400;
const FADE_MS = 560;
const MAX_WAIT_MS = 2600;

export default function MaLoadingScreen() {
  useEffect(() => {
    const el = document.getElementById("ma-loader");
    if (!el) return;

    const path = window.location.pathname;
    if (path.startsWith("/dashboard") || path.startsWith("/klas")) {
      el.remove();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minVisible = reduced ? 400 : MIN_VISIBLE_MS;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let closed = false;
    let fadeTimer = 0;
    let removeTimer = 0;

    const close = () => {
      if (closed) return;
      closed = true;
      const wait = Math.max(0, minVisible - (performance.now() - started));
      fadeTimer = window.setTimeout(() => {
        el.classList.add("ma-loader--out");
        el.setAttribute("aria-hidden", "true");
        removeTimer = window.setTimeout(() => {
          document.body.style.overflow = previousOverflow;
        }, reduced ? 0 : FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") close();
    else window.addEventListener("load", close, { once: true });

    const cap = window.setTimeout(close, reduced ? 500 : MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", close);
      window.clearTimeout(cap);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return null;
}
