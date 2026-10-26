"use client";

import { Suspense, useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import {
  AMES_CONTACT,
  buildWhatsAppBookingUrl,
  categoryHints,
  categoryLabels,
  formatPackageChoice,
  isPackageCategory,
  isPackageTier,
  packagePrices,
  tierMeta,
  tierOrder,
  type PackageCategory,
  type PackageTier,
} from "../lib/amesPackages";

const SCAN_LABEL = "Boek scan";

type FlowStep = "category" | "tier" | "agenda" | "locatie" | "info" | "overzicht";

const stepOrder: FlowStep[] = ["category", "tier", "agenda", "locatie", "info", "overzicht"];

const stepTitles: Record<FlowStep, string> = {
  category: "Kies categorie",
  tier: "Kies pakket",
  agenda: "Datum & tijd",
  locatie: "Locatie",
  info: "Jouw gegevens",
  overzicht: "Controle & versturen",
};

const timeSlots = [
  { value: "09:00-12:00", label: "Ochtend · 09:00 – 12:00" },
  { value: "12:00-15:00", label: "Middag · 12:00 – 15:00" },
  { value: "15:00-18:00", label: "Namiddag · 15:00 – 18:00" },
  { value: "flex", label: "Flexibel — stemmen we af" },
];

const locationTypes = ["Thuis", "Werk / kantoor", "Parkeergarage", "Andere locatie"];

function OrangeHeadline({ text, compact = false }: { text: string; compact?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `scanOrangeGrad-${uid}`;
  const upper = text.toUpperCase();
  const len = upper.length;
  const fontSize = compact ? 48 : len > 32 ? 36 : len > 26 ? 42 : 48;
  const padX = 16;
  const padY = 24;
  const textWidth = len * fontSize * (compact ? 0.62 : 0.72);
  const viewWidth = Math.ceil(textWidth + padX * 2);
  const viewHeight = Math.ceil(fontSize + padY * 2);
  const textY = padY + fontSize * 0.88;

  return (
    <div className={`scan-headline-wrap ${compact ? "" : "mb-4 w-full"}`}>
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMinYMin meet"
        overflow="visible"
        className={`scan-headline-svg ${compact ? "max-w-[200px]" : ""}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD4A8" />
            <stop offset="45%" stopColor="#FF9220" />
            <stop offset="100%" stopColor="#FF5A10" />
          </linearGradient>
        </defs>
        <g className="scan-headline-glow">
          <text
            x={padX}
            y={textY}
            fill={`url(#${gradId})`}
            className="font-[family-name:var(--font-outfit)]"
            style={{ fontSize, fontWeight: 500, fontStyle: "italic", textTransform: "uppercase" }}
          >
            {upper}
          </text>
          <text
            x={padX}
            y={textY}
            className="letter-stroke-orange font-[family-name:var(--font-outfit)]"
            style={{ fontSize, fontWeight: 400, fontStyle: "italic", textTransform: "uppercase" }}
          >
            {upper}
          </text>
        </g>
      </svg>
    </div>
  );
}

function minBookingDate() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function buildBookingWhatsAppMessage(data: {
  category: PackageCategory;
  tier: PackageTier;
  date: string;
  timeSlot: string;
  locationType: string;
  adres: string;
  naam: string;
  telefoon: string;
  email: string;
  auto: string;
  opmerkingen: string;
}) {
  const pkg = formatPackageChoice(data.category, data.tier);
  const price = packagePrices[data.category][data.tier];
  const timeLabel = timeSlots.find((t) => t.value === data.timeSlot)?.label ?? data.timeSlot;
  const lines = [
    "🚗 *Nieuwe boekingsaanvraag — Ames detailing*",
    "",
    "*Pakket*",
    `${pkg} (vanaf €${price})`,
    "",
    "*Datum & tijd*",
    `${data.date} · ${timeLabel}`,
    "",
    "*Locatie*",
    `${data.locationType}`,
    data.adres,
    "",
    "*Contact*",
    `Naam: ${data.naam}`,
    `Telefoon: ${data.telefoon}`,
    `E-mail: ${data.email}`,
  ];
  if (data.auto.trim()) {
    lines.push("", "*Auto*", data.auto.trim());
  }
  if (data.opmerkingen.trim()) {
    lines.push("", "*Opmerkingen*", data.opmerkingen.trim());
  }
  lines.push("", "Verzonden via Boek scan op amesdetailing.nl");
  return lines.join("\n");
}

function GroeiScanInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<FlowStep>("category");
  const [category, setCategory] = useState<PackageCategory | null>(null);
  const [tier, setTier] = useState<PackageTier | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [locationType, setLocationType] = useState("");
  const [adres, setAdres] = useState("");
  const [info, setInfo] = useState({
    naam: "",
    telefoon: "",
    email: "",
    auto: "",
    opmerkingen: "",
  });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const c = searchParams.get("c");
    const t = searchParams.get("t");
    if (isPackageCategory(c)) {
      setCategory(c);
      if (isPackageTier(t)) {
        setTier(t);
        setStep("agenda");
      } else {
        setStep("tier");
      }
    }
  }, [searchParams]);

  const stepIndex = stepOrder.indexOf(step);
  const totalSteps = stepOrder.length;
  const pct = Math.round(((stepIndex + 1) / totalSteps) * 100);

  const price = category && tier ? packagePrices[category][tier] : null;

  const canNext = useMemo(() => {
    switch (step) {
      case "category":
        return category !== null;
      case "tier":
        return tier !== null;
      case "agenda":
        return date.length > 0 && timeSlot.length > 0;
      case "locatie":
        return locationType.length > 0 && adres.trim().length > 3;
      case "info":
        return (
          info.naam.trim().length > 1 &&
          info.telefoon.trim().length > 5 &&
          info.email.includes("@")
        );
      case "overzicht":
        return true;
      default:
        return false;
    }
  }, [step, category, tier, date, timeSlot, locationType, adres, info]);

  function goNext() {
    const i = stepOrder.indexOf(step);
    if (i < stepOrder.length - 1) setStep(stepOrder[i + 1]);
  }

  function goPrev() {
    const i = stepOrder.indexOf(step);
    if (i > 0) setStep(stepOrder[i - 1]);
  }

  function selectCategory(key: PackageCategory) {
    setCategory(key);
    setTier(null);
    setStep("tier");
  }

  function selectTier(t: PackageTier) {
    setTier(t);
    setStep("agenda");
  }

  async function handleWhatsAppSend() {
    if (!category || !tier) return;
    setSending(true);

    const message = buildBookingWhatsAppMessage({
      category,
      tier,
      date,
      timeSlot,
      locationType,
      adres,
      ...info,
    });

    const payload = {
      type: "ames-boek-scan",
      package: { category, tier, price: packagePrices[category][tier] },
      agenda: { date, timeSlot },
      locatie: { locationType, adres },
      contact: info,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* optional backup */
    }

    window.open(buildWhatsAppBookingUrl(message), "_blank", "noopener,noreferrer");
    setSending(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="ames-page-shell min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="relative z-10 flex flex-col items-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center mb-8">
            <MessageCircle className="w-8 h-8 text-[#25D366]" />
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-black text-white uppercase tracking-tight text-center mb-4">
            Naar WhatsApp
          </h1>
          <p className="text-white/50 text-center text-[15px] leading-relaxed mb-8">
            Je boeking staat klaar in WhatsApp. Verstuur het bericht naar Ames detailing — dan
            bevestigen we je afspraak zo snel mogelijk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="ames-btn-glow ames-btn-glow--blue px-8 py-3.5 rounded-full text-[14px] font-semibold text-center"
            >
              Terug naar home
            </Link>
            <Link
              href={buildWhatsAppBookingUrl(
                category && tier
                  ? buildBookingWhatsAppMessage({
                      category,
                      tier,
                      date,
                      timeSlot,
                      locationType,
                      adres,
                      ...info,
                    })
                  : "Hoi Ames detailing, ik wil graag een afspraak maken."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-semibold border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
            >
              Open WhatsApp opnieuw
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ames-page-shell min-h-screen flex flex-col relative">
      <header className="relative z-10 flex items-center justify-between px-6 md:px-8 py-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[14px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>
        <Link href="/" className="opacity-95 hover:opacity-100 transition-opacity">
          <Image
            src="/Gemini_Generated_Image_q9s8bpq9s8bpq9s8-removebg-preview.png"
            alt="Ames Car Detailing"
            width={873}
            height={229}
            className="h-8 w-auto md:h-9 object-contain"
          />
        </Link>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center px-6 max-w-[780px] mx-auto w-full pb-16">
        <div className="w-full mb-10 md:mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.15em]">
              Stap {stepIndex + 1}/{totalSteps} · {stepTitles[step]}
            </span>
            <span className="text-[12px] font-semibold text-[#8B7EFF]">{pct}%</span>
          </div>
          <div className="flex gap-2">
            {stepOrder.map((s, i) => (
              <div key={s} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500 ames-progress-glow"
                  style={{ width: i <= stepIndex ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-8">
          <p className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9220]" />
            {SCAN_LABEL}
          </p>
          <h2 className="sr-only">{stepTitles[step]}</h2>
          <OrangeHeadline text={stepTitles[step]} />
          <p className="text-white/50 text-[14px] leading-relaxed max-w-lg">
            {step === "category" &&
              "Interieur, exterieur of combo — zelfde pakketten als op de homepage."}
            {step === "tier" &&
              category &&
              `Kies Basic, Showroom of Special voor ${categoryLabels[category].toLowerCase()}.`}
            {step === "agenda" && "Kies je voorkeursdatum en tijdvak. We bevestigen definitief via WhatsApp."}
            {step === "locatie" &&
              "Ames komt naar jou toe. Waar mogen we de behandeling uitvoeren?"}
            {step === "info" && "Wie mogen we bereiken en welke auto gaat het om?"}
            {step === "overzicht" && "Klopt alles? Verstuur je aanvraag direct naar Ames via WhatsApp."}
          </p>
        </div>

        <div className="w-full mb-10">
          {step === "category" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(categoryLabels) as PackageCategory[]).map((key) => {
                const selected = category === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectCategory(key)}
                    className={`text-left rounded-xl border px-5 py-5 transition-all duration-200 cursor-pointer ${
                      selected
                        ? "bg-[#FF9220]/10 border-[#FF9220]/45 ames-choice-glow"
                        : "bg-white/[0.03] border-white/8 hover:border-white/15"
                    }`}
                  >
                    <p className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white">
                      {categoryLabels[key]}
                    </p>
                    <p className="text-[12px] text-white/45 mt-2">{categoryHints[key]}</p>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setCategory("combo");
                  setTier("showroom");
                  setStep("agenda");
                }}
                className="sm:col-span-3 text-left rounded-xl border border-dashed border-white/15 px-5 py-4 text-[13px] text-white/45 hover:border-[#FF9220]/35 hover:text-white/65 transition-colors"
              >
                Maatwerk (polijst, coating, PPF)? Stuur foto&apos;s via WhatsApp of kies combo Showroom
                als startpunt.
              </button>
            </div>
          )}

          {step === "tier" && category && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setStep("category")}
                className="text-[12px] text-white/45 hover:text-white/70 mb-2 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Andere categorie
              </button>
              {tierOrder.map((t) => {
                const meta = tierMeta[t];
                const p = packagePrices[category][t];
                const popular = t === "showroom";
                const selected = tier === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => selectTier(t)}
                    className={`w-full text-left rounded-xl border px-5 py-4 transition-all cursor-pointer ${
                      selected
                        ? "border-[#1801AC]/50 bg-white/[0.06] ames-choice-glow"
                        : popular
                          ? "border-[#FF9220]/30 bg-[#FF9220]/[0.05] hover:border-[#FF9220]/45"
                          : "border-white/8 bg-white/[0.03] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-[family-name:var(--font-outfit)] text-[16px] font-semibold text-white">
                          {meta.title}
                        </p>
                        <p className="text-[12px] text-white/45 mt-1">{meta.description}</p>
                        {popular && (
                          <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-[#FF9220]">
                            {meta.tag}
                          </span>
                        )}
                      </div>
                      <p className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white shrink-0">
                        €{p}
                        <span className="block text-[10px] font-normal text-white/35 text-right">
                          vanaf
                        </span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === "agenda" && (
            <div className="space-y-6">
              {category && tier && (
                <div className="rounded-xl border border-[#FF9220]/25 bg-[#FF9220]/[0.06] px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-[13px] text-white/80">{formatPackageChoice(category, tier)}</span>
                  <span className="text-[13px] font-semibold text-white">vanaf €{price}</span>
                </div>
              )}
              <div>
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Gewenste datum *
                </label>
                <input
                  type="date"
                  required
                  min={minBookingDate()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] focus:outline-none focus:border-[#1801AC]/50 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-3">
                  Gewenste tijd *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => {
                    const selected = timeSlot === slot.value;
                    return (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => setTimeSlot(slot.value)}
                        className={`px-4 py-3.5 rounded-xl border text-left text-[13px] font-medium transition-all cursor-pointer ${
                          selected
                            ? "border-[#1801AC]/45 bg-white/[0.06] text-white ames-choice-glow"
                            : "border-white/8 bg-white/[0.03] text-white/55 hover:border-white/15"
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === "locatie" && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  Type locatie *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {locationTypes.map((loc) => {
                    const selected = locationType === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setLocationType(loc)}
                        className={`px-4 py-3.5 rounded-xl border text-[13px] font-medium transition-all cursor-pointer ${
                          selected
                            ? "border-[#1801AC]/45 bg-white/[0.06] text-white ames-choice-glow"
                            : "border-white/8 bg-white/[0.03] text-white/55 hover:border-white/15"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                  Volledig adres op locatie *
                </label>
                <textarea
                  rows={3}
                  required
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                  placeholder="Straat, huisnummer, postcode, plaats"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#1801AC]/50 resize-none"
                />
                <p className="text-[12px] text-white/35 mt-2">{AMES_CONTACT.area}</p>
              </div>
            </div>
          )}

          {step === "info" && (
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-1">
                <User className="w-3.5 h-3.5" />
                Contact & auto
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Naam *"
                  value={info.naam}
                  onChange={(e) => setInfo({ ...info, naam: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#1801AC]/50"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefoon *"
                  value={info.telefoon}
                  onChange={(e) => setInfo({ ...info, telefoon: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#1801AC]/50"
                />
              </div>
              <input
                type="email"
                required
                placeholder="E-mail *"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#1801AC]/50"
              />
              <input
                type="text"
                placeholder="Auto (merk, model, kleur)"
                value={info.auto}
                onChange={(e) => setInfo({ ...info, auto: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#1801AC]/50"
              />
              <textarea
                rows={3}
                placeholder="Opmerkingen (parkeerplek, toegang, hondenharen…)"
                value={info.opmerkingen}
                onChange={(e) => setInfo({ ...info, opmerkingen: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#1801AC]/50 resize-none"
              />
            </div>
          )}

          {step === "overzicht" && category && tier && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/[0.06] overflow-hidden">
              {[
                {
                  title: "Pakket",
                  body: `${formatPackageChoice(category, tier)} · vanaf €${packagePrices[category][tier]}`,
                },
                {
                  title: "Agenda",
                  body: `${date} · ${timeSlots.find((t) => t.value === timeSlot)?.label ?? timeSlot}`,
                },
                {
                  title: "Locatie",
                  body: `${locationType}\n${adres}`,
                },
                {
                  title: "Contact",
                  body: `${info.naam}\n${info.telefoon}\n${info.email}${info.auto ? `\nAuto: ${info.auto}` : ""}${info.opmerkingen ? `\n\n${info.opmerkingen}` : ""}`,
                },
              ].map((block) => (
                <div key={block.title} className="px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF9220]/80 mb-1.5">
                    {block.title}
                  </p>
                  <p className="text-[14px] text-white/75 whitespace-pre-line leading-relaxed">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-between mt-auto">
          <button
            type="button"
            onClick={goPrev}
            disabled={stepIndex === 0}
            className={`text-[13px] text-white/40 hover:text-white transition-colors cursor-pointer ${
              stepIndex === 0 ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            ← Vorige
          </button>

          {step === "overzicht" ? (
            <button
              type="button"
              onClick={handleWhatsAppSend}
              disabled={sending || !category || !tier}
              className="flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider cursor-pointer bg-[#25D366] text-[#0a0a0a] hover:bg-[#2ee06a] transition-colors disabled:opacity-50"
            >
              {sending ? "Openen..." : "Verstuur via WhatsApp"}
              <MessageCircle className="w-4 h-4" />
            </button>
          ) : step === "category" || step === "tier" ? (
            <p className="text-[12px] text-white/30 max-w-[200px] text-right">
              {step === "category" ? "Klik een categorie om verder te gaan" : "Klik een pakket"}
            </p>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                canNext ? "ames-btn-glow ames-btn-glow--dark" : "ames-btn-glow ames-btn-glow--disabled"
              }`}
            >
              Volgende
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GroeiScan() {
  return (
    <Suspense
      fallback={
        <div className="ames-page-shell min-h-screen flex items-center justify-center text-white/40 text-sm">
          Boek scan laden…
        </div>
      }
    >
      <GroeiScanInner />
    </Suspense>
  );
}
