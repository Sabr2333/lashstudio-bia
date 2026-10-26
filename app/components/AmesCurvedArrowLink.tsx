"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type AmesCurvedArrowLinkProps = {
  href?: string;
  line1?: string;
  line2?: string;
  variant?: "default" | "showcase";
  className?: string;
};

export default function AmesCurvedArrowLink({
  href = "/over-ons",
  line1 = "Bekijk hoe",
  line2 = "het werkt",
  variant = "default",
  className = "",
}: AmesCurvedArrowLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const play = () => setAnimate(true);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px 48px 0px" }
    );
    obs.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) play();

    return () => obs.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={`ames-hero-arrow group inline-flex w-max ${variant === "showcase" ? "ames-hero-arrow--showcase" : ""} ${className}`}
      aria-label={`${line1} ${line2}`}
    >
      <span className={`ames-hero-arrow__inner ${animate ? "ames-hero-arrow__inner--play" : ""}`}>
        <span className="ames-hero-arrow__label">
          {line1}
          <br />
          {line2}
        </span>
        <svg className="ames-hero-arrow__svg" viewBox="0 0 170 130" fill="none" aria-hidden>
          <path
            className="ames-hero-arrow__curve"
            d="M14 118 C 58 128, 120 112, 150 30"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            className="ames-hero-arrow__head"
            d="M126 36 L152 24 L160 52"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
