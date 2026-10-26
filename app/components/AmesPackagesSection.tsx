"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Check, HelpCircle, Mail, Phone } from "lucide-react";
import AmesPackageHelpModal from "./AmesPackageHelpModal";
import MobilePayBadges from "./MobilePayBadges";

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
    description: "Een frisse, nette basis — ideaal voor onderhoud tussen grotere beurten door.",
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
  const [category, setCategory] = useState<Category>("interieur");
  const [helpOpen, setHelpOpen] = useState(false);
  const [maatwerkVisible, setMaatwerkVisible] = useState(false);
  const maatwerkRef = useRef<HTMLDivElement>(null);
  const packages = buildPackages(category);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c") as Category | null;
    if (c && c in categoryLabels) setCategory(c);
  }, []);

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
      className={`ames-packages-section relative scroll-mt-20 pt-10 md:pt-32 pb-28 md:pb-24 ${className}`}
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 lg:px-8">
        <div className="ames-packages-intro flex flex-col items-start">
          <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6 mb-7 md:mb-12">
            <div className="w-full min-w-0 text-left">
              <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-[#FF9220]/85 uppercase mb-3 md:mb-4 flex items-center gap-2">
                <span className="w-2 h-2 shrink-0 rounded-full bg-[#FF9220]" aria-hidden />
                Onze pakketten
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-[2.35rem] leading-[0.9] sm:text-4xl md:text-6xl font-[900] text-[#E9E8E3] uppercase tracking-tight">
                Kies jouw{" "}
                <span className="italic font-normal text-[#FF9220]">behandeling</span>
              </h2>
              <p className="mt-4 md:mt-5 text-white/50 text-[15px] md:text-base max-w-lg leading-relaxed">
                Interieur, exterieur of combo elk in Basic, Showroom of Special. Wij komen naar jou
                toe in heel Zuid-Holland.
              </p>
              <div className="md:hidden mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <Link
                  href="/groei-scan"
                  className="inline-flex items-center gap-2 text-[#FF9220]/85 text-sm font-medium hover:text-[#FF9220] transition-colors"
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
                className="inline-flex items-center gap-2 text-[#FF9220]/80 text-sm hover:text-[#FF9220] transition-colors"
              >
                <Calendar className="w-4 h-4 shrink-0 opacity-85" strokeWidth={2.25} />
                Boek via scan
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <MobilePayBadges size="md" />
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-start gap-2 mb-10 md:mb-12">
            {(Object.keys(categoryLabels) as Category[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`rounded-full px-5 py-2.5 text-[12px] md:text-[13px] font-semibold uppercase tracking-wide transition-all duration-300 border ${
                category === key
                  ? "bg-[#FF9220]/12 border-[#FF9220]/45 text-[#E9E8E3]"
                  : "bg-white/[0.03] border-white/10 text-white/45 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {categoryLabels[key]}
            </button>
            ))}
            <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:w-auto max-md:mt-1.5 max-md:w-full">
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="ames-help-tab-btn rounded-full px-5 py-2.5 text-[12px] md:text-[13px] font-bold uppercase tracking-wide transition-all duration-300 border bg-[#1801AC]/22 border-[#1801AC]/55 text-white hover:bg-[#1801AC]/28 hover:border-[#6B5CFF]/65 inline-flex items-center gap-2 max-md:w-full max-md:justify-center max-md:shadow-[0_0_20px_rgba(24,1,172,0.2)]"
            >
              <HelpCircle className="w-4 h-4 text-[#8B7EFF] shrink-0" strokeWidth={2.25} />
              Vragen of hulp
            </button>
            <p className="ames-help-tab-hint hidden sm:flex items-center gap-2 text-[12px] md:text-[13px] text-white/45 max-w-[280px] leading-snug pl-0.5">
              <ArrowRight
                className="w-4 h-4 shrink-0 text-[#FF9220] rotate-180 showcase-arrow-nudge"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="font-[family-name:var(--font-playfair)] italic text-[#FF9220]/85">
                Mocht je vragen hebben of kom je er niet uit
              </span>
            </p>
            </div>
          </div>
        </div>

        <AmesPackageHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {packages.map((pkg) => (
            <article
              key={pkg.tier}
              className={`ames-package-card relative flex flex-col rounded-2xl md:rounded-3xl p-6 md:p-7 bg-[#0f0f0f] min-h-full ${
                pkg.popular ? "ames-package-card--featured md:-translate-y-1" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <p className="font-[family-name:var(--font-fragment-mono)] text-[9px] md:text-[10px] tracking-[0.18em] text-[#FF9220]/80 uppercase">
                  {pkg.label}
                </p>
                <span
                  className={`text-[10px] font-medium uppercase tracking-wider rounded-full px-2.5 py-1 ${
                    pkg.popular
                      ? "bg-[#FF9220]/15 text-[#FF9220] border border-[#FF9220]/30"
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
                €{pkg.price}
                <span className="text-sm font-normal text-white/35 ml-1">vanaf</span>
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[12px] md:text-[13px] text-white/55 leading-snug">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? "text-[#FF9220]" : "text-white/35"}`}
                      strokeWidth={2.5}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/groei-scan"
                className={`ames-package-btn w-full flex items-center justify-center rounded-full px-4 py-3.5 min-h-[52px] text-[11px] font-semibold uppercase tracking-wider hover:scale-[1.02] ${
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
                    Vanaf €{pkg.price}
                  </span>
                </span>
              </Link>
            </article>
          ))}
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
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#FF9220]/[0.06] via-transparent to-[#1801AC]/[0.05] ames-maatwerk-card__glow"
              aria-hidden
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-7 space-y-4 md:space-y-5">
                <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/35 uppercase">
                  Maatwerk
                </p>
                <h3 className="font-[family-name:var(--font-outfit)] text-xl md:text-2xl lg:text-[1.65rem] font-bold text-white leading-snug">
                  Speciale behandelingen op aanvraag
                </h3>
                <p className="text-white/45 text-sm md:text-[15px] leading-relaxed max-w-xl">
                  Voor polijsten, ceramic coatings, PPF, wrappen en schadeherstel maken we een plan
                  op maat. Stuur ons de details van je auto — wij reageren met een voorstel en prijs.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6 md:gap-7 lg:items-end lg:text-right">
                <ul className="flex flex-wrap gap-2 lg:justify-end">
                  {maatwerkItems.map((item, i) => (
                    <li
                      key={item}
                      className="ames-maatwerk-tag text-[11px] text-white/60 border border-white/10 rounded-full px-3.5 py-2"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row flex-wrap gap-3 lg:justify-end w-full sm:w-auto">
                  <Link
                    href="mailto:info@amesdetailing.nl"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-medium border border-[#FF9220]/30 text-[#FF9220] hover:bg-[#FF9220]/10 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@amesdetailing.nl
                  </Link>
                  <Link
                    href="tel:+31640871617"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-medium border border-white/15 text-white/70 hover:text-white hover:border-white/25 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    06 40871617
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
