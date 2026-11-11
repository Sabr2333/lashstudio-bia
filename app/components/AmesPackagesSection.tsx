"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, HelpCircle, Phone } from "lucide-react";
import AmesPackageHelpModal from "./AmesPackageHelpModal";
import MobilePayBadges from "./MobilePayBadges";
import { AMES_CONTACT, lashHouseRules, maPackages } from "../lib/amesPackages";

type Category = "interieur" | "exterieur" | "combo";
type Tier = "basic" | "showroom" | "special";

type PackageTier = {
  tier: Tier;
  label: string;
  tag: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
};

const categoryLabels: Record<Category, string> = {
  interieur: "Interieur",
  exterieur: "Exterieur",
  combo: "Combo",
};

const tierMeta: Record<
  Tier,
  { title: string; tag: string; description: string }
> = {
  basic: {
    title: "Basic Pack",
    tag: "Instap",
    description: "Een frisse, nette basis, ideaal voor onderhoud tussen grotere beurten door.",
  },
  showroom: {
    title: "Showroom Pack",
    tag: "Populair",
    description: "Diepere reiniging en bescherming voor een zichtbaar showroom-resultaat.",
  },
  special: {
    title: "Special Pack",
    tag: "All-in",
    description: "Ons meest complete pakket: maximale glans, bescherming en afwerking.",
  },
};

const prices: Record<Category, Record<Tier, number>> = {
  interieur: { basic: 89, showroom: 129, special: 199 },
  exterieur: { basic: 69, showroom: 119, special: 169 },
  combo: { basic: 129, showroom: 229, special: 299 },
};

const features: Record<Category, Record<Tier, string[]>> = {
  interieur: {
    basic: [
      "Interieur uitblazen & stofzuigen",
      "Dashboard, middenconsole & deurpanelen",
      "Ramen en spiegels binnen",
      "Matten en vloer oppervlakkig reinigen",
      "Afwerking met microvezel & detailing brush",
    ],
    showroom: [
      "Alles van Basic Interieur",
      "Dieptereiniging stoelen (stof of leer)",
      "Tapijt & voetmatten grondig behandeld",
      "Ventilatie- en luchtroosters",
      "Leer voeden waar nodig",
      "Extra aandacht voor naden & opbergvakken",
    ],
    special: [
      "Alles van Showroom Interieur",
      "Grondige geur- & ozonbehandeling",
      "Interieurbescherming / coating waar mogelijk",
      "Kofferbak & complete interieurnaden",
      "Premium afwerklaag op kunststof & leer",
      "Showroom-finish met eindcontrole",
    ],
  },
  exterieur: {
    basic: [
      "Handwas exterieur (pH-neutraal)",
      "Velgen, wielkasten & banden dressing",
      "Ramen en ruitenwisser-vlakken buiten",
      "Deurklinken & emblemen",
      "Droogtechniek zonder krassen",
    ],
    showroom: [
      "Alles van Basic Exterieur",
      "Kleibehandeling / decontaminatie lak",
      "Wax of sealant voor langere glans",
      "Rubber & kunststof exterieur verzorgd",
      "Extra aandacht voor uitlaat & details",
    ],
    special: [
      "Alles van Showroom Exterieur",
      "Machine polish (licht tot medium)",
      "Langdurige lakbescherming",
      "Dieptereiniging motorruimte (oppervlakkig)",
      "Showroom-glans & hydrofobe finish",
      "Eindinspectie met foto-overzicht",
    ],
  },
  combo: {
    basic: [
      "Volledige Basic Interieur + Basic Exterieur",
      "Eén afspraak, één team op locatie",
      "Binnen & buiten netjes en verzorgd",
      "Ideaal als periodieke onderhoudsbeurt",
    ],
    showroom: [
      "Volledige Showroom Interieur + Exterieur",
      "Decontaminatie binnen & buiten",
      "Bescherming lak + diep interieur",
      "Onze meest gekozen totaalbehandeling",
    ],
    special: [
      "Volledige Special Interieur + Exterieur",
      "Maximale correctie, bescherming & geur",
      "Premium producten door het hele voertuig",
      "Voor liefhebbers & lease-oplevering",
    ],
  },
};

const tierNames: Record<Tier, string> = {
  basic: "Basic",
  showroom: "Showroom",
  special: "Special",
};

function buildPackages(category: Category): PackageTier[] {
  const tiers: Tier[] = ["basic", "showroom", "special"];
  return tiers.map((tier) => ({
    tier,
    label: `${tierNames[tier]} ${categoryLabels[category]}`,
    tag: tierMeta[tier].tag,
    title: tierMeta[tier].title,
    price: prices[category][tier],
    description: tierMeta[tier].description,
    features: features[category][tier],
    popular: tier === "showroom",
  }));
}

const maatwerkItems = [
  "Polijsten",
  "Ceramic coatings",
  "PPF (paint protection film)",
  "Wrappen",
  "Schadeherstel",
];

type AmesPackagesSectionProps = {
  showMaatwerk?: boolean;
  className?: string;
};

export default function AmesPackagesSection({
  showMaatwerk = true,
  className = "",
}: AmesPackagesSectionProps) {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);
  const [maatwerkVisible, setMaatwerkVisible] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const maatwerkRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const sync = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  function scrollCards(direction: 1 | -1) {
    const el = rowRef.current;
    if (!el) return;
    const gap = 20;
    const card = (el.clientWidth - gap * 2) / 3;
    el.scrollBy({ left: direction * (card + gap), behavior: "smooth" });
  }
  useEffect(() => {
    const el = maatwerkRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMaatwerkVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) setMaatwerkVisible(true);
    return () => obs.disconnect();
  }, [showMaatwerk]);

  return (
    <section
      id="pakketten"
      className={`ames-packages-section luxe-light relative scroll-mt-20 pt-10 md:pt-32 pb-28 md:pb-24 ${className}`}
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 lg:px-8">
        <div className="ames-packages-intro flex flex-col items-start">
          <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6 mb-7 md:mb-12">
            <div className="w-full min-w-0 text-left">
              <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-[#CD9861] uppercase mb-3 md:mb-4">
                Behandelingen
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-[2.35rem] leading-[0.9] sm:text-4xl md:text-6xl font-[900] text-[#E9E8E3] uppercase tracking-tight">
                Kies jouw{" "}
                <span className="italic font-normal text-[#CD9861]">behandeling</span>
              </h2>
              <p className="mt-4 md:mt-5 text-white/50 text-[15px] md:text-base max-w-lg leading-relaxed">
                One by one en alle volume sets. Nieuwe set, of opvullen na 2, 3 of 4 weken.
              </p>
              <div className="md:hidden mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <Link
                  href="/groei-scan"
                  className="inline-flex items-center gap-2 text-[#ffffff]/85 text-sm font-medium hover:text-[#ffffff] transition-colors"
                >
                  <Calendar className="w-4 h-4 shrink-0 opacity-85" strokeWidth={2.25} />
                  Boek via scan
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
                <MobilePayBadges />
              </div>
            </div>
            <div className="hidden md:flex flex-wrap items-center justify-end gap-x-3 gap-y-2 shrink-0">
              <Link
                href="/groei-scan"
                className="inline-flex items-center gap-2 text-[#ffffff]/80 text-sm hover:text-[#ffffff] transition-colors"
              >
                <Calendar className="w-4 h-4 shrink-0 opacity-85" strokeWidth={2.25} />
                Boek via scan
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <MobilePayBadges size="md" />
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-start gap-2 mb-10 md:mb-12">
            <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:w-auto max-md:mt-1.5 max-md:w-full">
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="ames-help-tab-btn rounded-full px-5 py-2.5 text-[12px] md:text-[13px] font-bold uppercase tracking-wide transition-all duration-300 border bg-[#CD9861]/15 border-[#CD9861]/45 text-white hover:bg-[#CD9861]/25 hover:border-[#CD9861]/70 inline-flex items-center gap-2 max-md:w-full max-md:justify-center max-md:shadow-[0_0_20px_rgba(212,175,55,0.28)]"
            >
              <HelpCircle className="w-4 h-4 text-[#CD9861] shrink-0" strokeWidth={2.25} />
              Vragen of hulp
            </button>
            <p className="ames-help-tab-hint hidden sm:flex items-center gap-2 text-[12px] md:text-[13px] text-white/45 max-w-[280px] leading-snug pl-0.5">
              <ArrowRight
                className="w-4 h-4 shrink-0 text-[#CD9861] rotate-180 showcase-arrow-nudge"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="font-[family-name:var(--font-playfair)] italic text-[#CD9861]">
                Mocht je vragen hebben of kom je er niet uit
              </span>
            </p>
            </div>
          </div>
        </div>

        <AmesPackageHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />

        <div className="relative">
        <div
          ref={rowRef}
          className="flex flex-col gap-4 md:flex-row md:gap-5 md:overflow-x-auto md:snap-x md:snap-mandatory md:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {maPackages.map((pkg, index) => (
            <article
              id={pkg.id}
              key={pkg.id}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("[data-book]")) return;
                router.push(pkg.href);
              }}
              className={`ames-package-card relative flex w-full shrink-0 cursor-pointer scroll-mt-32 flex-col rounded-2xl bg-[#0f0f0f] p-6 md:w-[calc((100%-2.5rem)/3)] md:snap-start md:rounded-3xl md:p-7 min-h-full ${
                pkg.popular ? "ames-package-card--featured" : ""
              } ${!showAllPackages && index >= 3 ? "max-md:hidden" : ""}`}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <p className="font-[family-name:var(--font-fragment-mono)] text-[9px] md:text-[10px] tracking-[0.18em] text-[#ffffff]/80 uppercase">
                  {pkg.tag}
                </p>
                <span
                  className={`text-[10px] font-medium uppercase tracking-wider rounded-full px-2.5 py-1 ${
                    pkg.popular
                      ? "bg-[#CD9861]/18 text-[#CD9861] border border-[#CD9861]/35"
                      : "bg-white/[0.04] text-white/40 border border-white/[0.08]"
                  }`}
                >
                  {pkg.tag}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-outfit)] text-2xl md:text-[1.65rem] font-bold text-white uppercase tracking-wide mb-2">
                {pkg.title}
              </h3>
              <p className="text-white/45 text-[13px] leading-relaxed mb-5">{pkg.description}</p>

              <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white mb-6">
                €{pkg.price.toLocaleString("nl-NL")}
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[12px] md:text-[13px] text-white/55 leading-snug">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? "text-[#CD9861]" : "text-white/35"}`}
                      strokeWidth={2.5}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Link
                data-book
                href={`/groei-scan?p=${pkg.id}`}
                className={`ames-package-btn relative z-[2] w-full flex items-center justify-center rounded-full px-4 py-3.5 min-h-[52px] text-[11px] font-semibold uppercase tracking-wider hover:scale-[1.02] ${
                  pkg.popular ? "ames-package-btn--primary" : "ames-package-btn--secondary"
                }`}
              >
                <span className="ames-package-btn__label flex flex-col items-center gap-1 leading-tight text-center">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0 opacity-80" strokeWidth={2.25} />
                    Boek {pkg.title}
                  </span>
                  <span
                    className={`text-[10px] font-medium tracking-wide normal-case ${
                      pkg.popular ? "text-white/60" : "text-white/55"
                    }`}
                  >
                    €{pkg.price.toLocaleString("nl-NL")}
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
        {!showAllPackages && (
          <button
            type="button"
            onClick={() => setShowAllPackages(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#CD9861]/50 bg-[#CD9861] px-5 py-3.5 text-[13px] font-semibold text-[#1a0200] md:hidden"
          >
            Tik voor meer
            <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
          </button>
        )}
        {canPrev && (
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#CD9861]/40 bg-[#111111]/95 text-[#CD9861] shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:flex"
            aria-label="Vorige behandeling"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        {canNext && (
          <button
            type="button"
            onClick={() => scrollCards(1)}
            className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#CD9861]/40 bg-[#111111]/95 text-[#CD9861] shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:flex"
            aria-label="Volgende behandeling"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
        </div>

        {showMaatwerk && (
          <div
            ref={maatwerkRef}
            id="maatwerk"
            className={`ames-maatwerk-card mt-14 md:mt-16 rounded-2xl md:rounded-3xl ames-package-card ames-package-card--flat bg-[#0f0f0f] scroll-mt-28 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14 ${
              maatwerkVisible ? "ames-maatwerk-card--visible" : ""
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#ffffff]/[0.06] via-transparent to-[#CD9861]/[0.05] ames-maatwerk-card__glow"
              aria-hidden
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-7 space-y-4 md:space-y-5">
                <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-[#CD9861]/80 uppercase">
                  Prijslijst
                </p>
                <h3 className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl lg:text-[1.65rem] font-bold text-white leading-snug">
                  Goed om te weten
                </h3>
                <div className="space-y-4 max-w-xl">
                  {lashHouseRules.map((rule) => (
                    <p key={rule.title} className="text-white/55 text-sm md:text-[15px] leading-relaxed">
                      <span className="block font-semibold text-white/80">{rule.title}</span>
                      {rule.text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6 md:gap-7 lg:items-end lg:text-right">
                <ul className="flex flex-wrap gap-2 lg:justify-end">
                  {["One by one €30 tot €50", "Volume €35 tot €65", "24 uur van tevoren", "15 minuten te laat"].map((item, i) => (
                    <li
                      key={item}
                      className="ames-maatwerk-tag text-[11px] text-white/60 border border-white/10 rounded-full px-3.5 py-2"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={AMES_CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-medium border border-[#CD9861]/40 text-[#CD9861] hover:border-[#CD9861] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {AMES_CONTACT.phoneDisplay}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
