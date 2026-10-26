"use client";

import { useId } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import ShowcaseStepsAnim from "./ShowcaseStepsAnim";
import AmesCurvedArrowLink from "./AmesCurvedArrowLink";

const trustItems = [
  "Heel Zuid-Holland",
  "100% op locatie",
  "Premium producten",
  "Snelle planning",
];

/** Links uitgelijnd — andere opbouw dan gecentreerde hero */
function HeadlineBlock() {
  const gradDesktop = `showcaseOrangeGrad-${useId().replace(/:/g, "")}`;
  const gradMobile = `showcaseOrangeGradMob-${useId().replace(/:/g, "")}`;

  return (
    <div className="w-full text-left">
      <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-white/55 uppercase mb-4 md:mb-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF9220]" />
        Over ons
      </p>

      <svg
        viewBox="0 0 560 200"
        className="w-full max-w-[560px] hidden md:block overflow-visible"
        aria-label="Over Ames op jouw locatie"
      >
        <defs>
          <linearGradient id={gradDesktop} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD4A8" />
            <stop offset="45%" stopColor="#FF9220" />
            <stop offset="100%" stopColor="#FF5A10" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="88"
          className="fill-[#E9E8E3] font-[family-name:var(--font-outfit)]"
          style={{ fontSize: 76, fontWeight: 900, textTransform: "uppercase" }}
        >
          OVER AMES
        </text>
        <text
          x="0"
          y="170"
          fill={`url(#${gradDesktop})`}
          className="font-[family-name:var(--font-outfit)] scan-headline-glow"
          style={{ fontSize: 58, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" }}
        >
          OP JOUW LOCATIE
        </text>
      </svg>

      <svg
        viewBox="0 0 380 112"
        className="w-full max-w-[380px] md:hidden overflow-visible -mb-1"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradMobile} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD4A8" />
            <stop offset="45%" stopColor="#FF9220" />
            <stop offset="100%" stopColor="#FF5A10" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="50"
          className="fill-[#E9E8E3] font-[family-name:var(--font-outfit)]"
          style={{ fontSize: 44, fontWeight: 900, textTransform: "uppercase" }}
        >
          OVER AMES
        </text>
        <text
          x="0"
          y="92"
          fill={`url(#${gradMobile})`}
          className="font-[family-name:var(--font-outfit)] scan-headline-glow"
          style={{ fontSize: 32, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" }}
        >
          OP JOUW LOCATIE
        </text>
      </svg>
    </div>
  );
}

function CardPointer() {
  return (
    <p className="flex items-center gap-2.5 text-[13px] text-white/45 font-[family-name:var(--font-outfit)]">
      <span>Zo werkt het in 4 stappen</span>
      <ArrowRight className="w-4 h-4 text-[#FF9220] showcase-arrow-nudge shrink-0" strokeWidth={2.5} />
    </p>
  );
}

export default function Showcase() {
  return (
    <section
      id="testimonials"
      className="relative pt-14 md:pt-20 pb-10 md:pb-28 bg-[#0a0a0a] overflow-visible -mt-px"
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
                  className="text-[11px] md:text-[12px] font-medium text-white/85 border border-[#FF9220]/30 bg-[#FF9220]/[0.08] rounded-full px-3.5 py-1.5 font-[family-name:var(--font-outfit)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-white/65 text-[16px] md:text-[17px] leading-relaxed max-w-lg">
              Ames detailing komt naar jou toe voor professionele autowas en detailing. Wij werken
              zorgvuldig met premium producten — showroomklaar, zonder de wasstraat.
            </p>

            <CardPointer />

            <Link
              href="/over-ons"
              className="inline-flex items-center pt-1 text-[13px] md:text-[14px] font-medium text-[#FF9220]/90 hover:text-[#FF9220] font-[family-name:var(--font-outfit)] transition-colors"
            >
              Meer over Ames
            </Link>
          </div>

          <div className="order-2 flex w-full min-w-0 flex-col md:justify-self-end md:self-center md:max-w-[520px] lg:max-w-[560px] mx-auto md:mx-0">
            <ShowcaseStepsAnim />
            <Link
              href="/groei-scan"
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
