"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import ShowcaseStepsAnim, { type AgendaPick } from "./ShowcaseStepsAnim";
import AmesCurvedArrowLink from "./AmesCurvedArrowLink";

const trustItems = [
  "Soft",
  "Wispy",
  "Volume",
  "Vlaardingen",
];

/** Links uitgelijnd — andere opbouw dan gecentreerde hero */
function HeadlineBlock() {
  const gradDesktop = `showcaseOrangeGrad-${useId().replace(/:/g, "")}`;
  const gradMobile = `showcaseOrangeGradMob-${useId().replace(/:/g, "")}`;

  return (
    <div className="w-full text-left">
      <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-[#CD9861] uppercase mb-4 md:mb-5">
        Over ons
      </p>

      <svg
        viewBox="0 0 560 200"
        className="w-full max-w-[560px] hidden md:block overflow-visible"
        aria-label="Lash stylist in Vlaardingen"
      >
        <defs>
          <linearGradient id={gradDesktop} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CD9861" />
            <stop offset="45%" stopColor="#CD9861" />
            <stop offset="100%" stopColor="#CD9861" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="88"
          className="fill-[#1A0200] font-[family-name:var(--font-outfit)]"
          style={{ fontSize: 76, fontWeight: 900, textTransform: "uppercase" }}
        >
          LASH STYLIST
        </text>
        <text
          x="0"
          y="170"
          fill={`url(#${gradDesktop})`}
          className="font-[family-name:var(--font-outfit)] scan-headline-glow"
          style={{ fontSize: 52, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" }}
        >
          VLAARDINGEN
        </text>
      </svg>

      <svg
        viewBox="0 0 380 112"
        className="w-full max-w-[380px] md:hidden overflow-visible -mb-1"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradMobile} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CD9861" />
            <stop offset="45%" stopColor="#CD9861" />
            <stop offset="100%" stopColor="#CD9861" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="50"
          className="fill-[#1A0200] font-[family-name:var(--font-outfit)]"
          style={{ fontSize: 44, fontWeight: 900, textTransform: "uppercase" }}
        >
          LASH STYLIST
        </text>
        <text
          x="0"
          y="92"
          fill={`url(#${gradMobile})`}
          className="font-[family-name:var(--font-outfit)] scan-headline-glow"
          style={{ fontSize: 28, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" }}
        >
          VLAARDINGEN
        </text>
      </svg>
    </div>
  );
}

function CardPointer() {
  return (
    <p className="flex items-center gap-2.5 text-[13px] text-white/45 font-[family-name:var(--font-outfit)]">
      <span>Kies direct een datum</span>
      <ArrowRight className="w-4 h-4 text-[#CD9861] showcase-arrow-nudge shrink-0" strokeWidth={2.5} />
    </p>
  );
}

export default function Showcase() {
  const [pick, setPick] = useState<AgendaPick | null>(null);
  const bookHref = pick
    ? `/groei-scan?date=${pick.iso}&slot=${pick.slotValue}`
    : "/groei-scan";

  return (
    <section
      id="testimonials"
      className="luxe-light relative pt-14 md:pt-20 pb-10 md:pb-28 overflow-visible -mt-px"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 lg:gap-14 xl:gap-16 items-start md:items-center">
          <div className="order-1 flex flex-col gap-4 md:gap-5 items-start text-left w-full min-w-0 md:max-w-xl">
            <div className="w-full">
              <HeadlineBlock />
            </div>

            <div className="flex flex-wrap gap-2 justify-start">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="text-[11px] md:text-[12px] font-medium text-white/85 border border-[#CD9861]/35 bg-[#CD9861]/[0.1] rounded-full px-3.5 py-1.5 font-[family-name:var(--font-outfit)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-white/65 text-[16px] md:text-[17px] leading-relaxed max-w-lg">
              Lashstudio Bia zet luxury natural en glam lashes. Soft, wispy en volume.
              Pretty lashes for pretty girls.
            </p>

            <CardPointer />

            <Link
              href="/over-ons"
              className="inline-flex items-center pt-1 text-[13px] md:text-[14px] font-medium text-[#CD9861] hover:text-[#CD9861] font-[family-name:var(--font-outfit)] transition-colors"
            >
              Meer over Lashstudio Bia
            </Link>
          </div>

          <div className="order-2 flex w-full min-w-0 flex-col md:justify-self-end md:self-center md:max-w-[520px] lg:max-w-[560px] mx-auto md:mx-0">
            <ShowcaseStepsAnim onChange={setPick} />
            <Link
              href={bookHref}
              className="ames-btn-glow ames-btn-glow--blue relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-9 py-3.5 font-[family-name:var(--font-outfit)] text-[14px] font-semibold tracking-[0.02em] hover:scale-[1.02] transition-transform md:w-auto md:self-center"
            >
              <span className="relative z-[1] inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 shrink-0 opacity-90" strokeWidth={2.25} />
                Boek nu
              </span>
            </Link>
          </div>

          <AmesCurvedArrowLink
            href="/over-ons"
            line1="Bekijk hoe"
            line2="het werkt"
            variant="showcase"
            className="order-3 max-md:mx-auto max-md:mt-3 max-md:-translate-y-2 md:absolute md:z-20 ames-hero-arrow--grid-spot"
          />
        </div>
      </div>
    </section>
  );
}
