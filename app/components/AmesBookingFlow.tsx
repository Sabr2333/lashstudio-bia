"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  isMaPackageId,
  maExtraGroups,
  maPackageById,
  maPackages,
  type MaPackageId,
} from "../lib/amesPackages";
import {
  AMES_SERVICE_AREA,
  AMES_TIME_SLOTS,
  bookingWhatsAppUrl,
  formatBookingDate,
  getAvailableSlots,
  submitAmesBooking,
  type AmesSlotId,
  type BookingPrefill,
} from "../lib/amesAvailability";

const STEPS = ["pakket", "extra", "datum", "gegevens"] as const;
type StepId = (typeof STEPS)[number];

const STEP_COPY: Record<StepId, { title: string; text: string }> = {
  pakket: {
    title: "Kies je pakket",
    text: "Kies one by one of een volume set. De prijs op de kaart is het bedrag van de prijslijst.",
  },
  extra: {
    title: "Erbij",
    text: "Er staan geen extra's op de prijslijst. Je kunt deze stap overslaan.",
  },
  datum: {
    title: "Kies een datum",
    text: "Kies je voorkeursdatum. Deze is nog geen bevestigde afspraak.",
  },
  gegevens: {
    title: "Jouw contactgegevens",
    text: "Vul je gegevens in. We openen WhatsApp met je aanvraag, zodat je die direct naar Lashstudiobia kunt sturen.",
  },
};

const WEEKDAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fieldClass() {
  return "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#CD9861]/70";
}

export default function AmesBookingFlow({
  prefill,
  showLogo = false,
  fill = false,
}: {
  prefill?: BookingPrefill;
  showLogo?: boolean;
  fill?: boolean;
}) {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const [step, setStep] = useState<StepId>(prefill?.packageId ? "extra" : "pakket");
  const regionId = AMES_SERVICE_AREA;
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState(prefill?.date ?? "");
  const [slotId, setSlotId] = useState<AmesSlotId | "">(
    AMES_TIME_SLOTS.some((slot) => slot.id === prefill?.slotId) ? (prefill?.slotId as AmesSlotId) : "",
  );
  const [packageId, setPackageId] = useState<MaPackageId | null>(
    isMaPackageId(prefill?.packageId) ? prefill.packageId : null,
  );
  const [extras, setExtras] = useState<string[]>(prefill?.extras ?? []);
  const [naam, setNaam] = useState(prefill?.naam ?? "");
  const [telefoon, setTelefoon] = useState(prefill?.telefoon ?? "");
  const [email, setEmail] = useState(prefill?.email ?? "");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [doneId, setDoneId] = useState<string | null>(null);

  const stepIndex = STEPS.indexOf(step);
  const slotsForDay = regionId && date ? getAvailableSlots(regionId, date) : [];
  const selectedPackage = maPackageById(packageId);

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7;
    const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const items: Array<Date | null> = [];
    for (let i = 0; i < lead; i++) items.push(null);
    for (let day = 1; day <= days; day++) items.push(new Date(cursor.getFullYear(), cursor.getMonth(), day));
    while (items.length % 7 !== 0) items.push(null);
    return items;
  }, [cursor]);

  const canNext = (() => {
    if (step === "pakket") return Boolean(packageId);
    if (step === "extra") return true;
    if (step === "datum") return Boolean(date && slotId && slotsForDay.includes(slotId));
    if (step === "gegevens") {
      return naam.trim().length > 1 && telefoon.trim().length > 5 && email.includes("@");
    }
    return true;
  })();

  function goNext() {
    if (!canNext) return;
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
    else void confirm();
  }

  function goBack() {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  }

  async function confirm() {
    if (!canNext || !regionId || !slotId || !packageId) return;
    setSending(true);
    setError("");
    const draft = {
      regionId,
      date,
      slotId,
      packageId,
      extras,
      naam: naam.trim(),
      telefoon: telefoon.trim(),
      email: email.trim(),
    };
    window.open(bookingWhatsAppUrl(draft), "_blank", "noopener,noreferrer");
    try {
      const saved = await submitAmesBooking(draft);
      setDoneId(saved.id);
    } catch {
      setError("WhatsApp is geopend. De aanvraag kon niet worden opgeslagen, maar je kunt het bericht daar wel versturen.");
    } finally {
      setSending(false);
    }
  }

  if (doneId && packageId && regionId && slotId) {
    return (
      <div className={`flex items-center justify-center bg-[#111] p-6 text-center md:p-8 ${fill ? "h-full min-h-0" : "rounded-3xl border border-white/10"}`}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CD9861]/20 text-[#CD9861]">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-black uppercase text-white">
          WhatsApp staat klaar
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-white/55">
          WhatsApp is geopend met je aanvraag voor {selectedPackage?.title} op {formatBookingDate(date)}.
          Verstuur het bericht daar om je aanvraag naar Lashstudiobia te sturen.
        </p>
        <p className="mt-4 text-[12px] text-white/35">Aanvraag {doneId.slice(0, 8)}</p>
      </div>
    );
  }

  const copy = STEP_COPY[step];

  const progress = (
    <div>
      <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] uppercase tracking-[0.18em] text-[#CD9861]">
        Stap {stepIndex + 1} / {STEPS.length}
      </p>
      <div className="mt-2 flex gap-1.5">
        {STEPS.map((item, index) => (
          <span
            key={item}
            className={`h-1.5 flex-1 rounded-full ${index <= stepIndex ? "bg-[#CD9861]" : "bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`luxe-keep-dark flex min-h-0 flex-col overflow-hidden bg-[#111] text-white sm:rounded-3xl sm:border sm:border-[#CD9861]/25 sm:shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${
        fill ? "h-full" : "rounded-3xl border border-[#CD9861]/25"
      }`}
    >
      {showLogo && (
        <div className="flex shrink-0 items-center border-b border-white/[0.06] px-4 py-3 pr-16 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3 md:px-6">
          <span className="font-[family-name:var(--font-outfit)] text-lg font-semibold tracking-tight">
            Lashstudiobia
          </span>
        </div>
      )}

      <div className="grid min-h-0 flex-1 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden flex-col border-r border-white/[0.06] px-5 py-6 md:flex">
          <p className="font-[family-name:var(--font-outfit)] text-lg font-bold leading-snug">{copy.title}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/45">{copy.text}</p>
          <div className="mt-auto pt-8">{progress}</div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <div className="shrink-0 border-b border-white/[0.06] px-4 py-3 md:hidden">
            {progress}
            <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-xl font-bold leading-snug">{copy.title}</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-white/45">{copy.text}</p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-6 md:py-5">
            {step === "datum" && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Vorige maand"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CD9861]/40 text-[#CD9861]"
                    onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="font-[family-name:var(--font-outfit)] font-semibold capitalize">
                    {cursor.toLocaleDateString("nl-NL", { month: "long", year: "numeric" })}
                  </p>
                  <button
                    type="button"
                    aria-label="Volgende maand"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CD9861]/40 text-[#CD9861]"
                    onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-white/35">
                  {WEEKDAYS.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {cells.map((cell, index) => {
                    if (!cell) return <span key={`e-${index}`} className="h-11" />;
                    const iso = toIso(cell);
                    const openSlots = regionId ? getAvailableSlots(regionId, iso) : [];
                    const selected = date === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={openSlots.length === 0}
                        onClick={() => {
                          setDate(iso);
                          setSlotId("");
                        }}
                        className={`h-11 rounded-lg text-[14px] font-medium ${
                          selected
                            ? "bg-[#CD9861] text-[#071018]"
                            : openSlots.length === 0
                              ? "cursor-not-allowed text-white/20"
                              : "text-white/80 hover:bg-white/[0.06]"
                        }`}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {AMES_TIME_SLOTS.map((slot) => {
                    const open = slotsForDay.includes(slot.id);
                    const selected = slotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!open}
                        onClick={() => setSlotId(slot.id)}
                        className={`rounded-xl border px-3 py-2 text-left ${
                          selected
                            ? "border-[#CD9861]/60 bg-[#CD9861]/20"
                            : open
                              ? "border-white/10 text-white/70"
                              : "cursor-not-allowed border-white/5 text-white/25"
                        }`}
                      >
                        <span className="block text-[13px] font-semibold">{slot.label}</span>
                        <span className="block text-[11px] text-white/40">{open ? slot.hint : "Bezet"}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-white/45">
                  Je voorkeursdatum is geen garantie of bevestigde afspraak. We nemen contact met je op om de afspraak te bevestigen.
                </p>
              </div>
            )}

            {step === "pakket" && (
              <div className="grid gap-2">
                {maPackages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPackageId(item.id)}
                    className={`rounded-xl border px-4 py-4 text-left ${
                      packageId === item.id ? "border-[#CD9861]/70 bg-[#CD9861]/15" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block font-[family-name:var(--font-outfit)] text-[16px] font-semibold">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[12px] text-white/45">{item.description}</span>
                      </span>
                      <span className={`shrink-0 text-right font-[family-name:var(--font-outfit)] text-lg font-bold ${packageId === item.id ? "text-[#CD9861]" : ""}`}>
                        €{item.price}
                      </span>
                    </span>
                    <span className="mt-2 block text-[12px] leading-relaxed text-white/40">
                      {item.features.join(" · ")}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === "extra" && (
              <div className="grid gap-4">
                {maExtraGroups.map((group) => (
                  <div key={group.id}>
                    <p className="mb-2 font-[family-name:var(--font-outfit)] text-[13px] font-semibold uppercase tracking-wide text-[#CD9861]">
                      {group.title}
                    </p>
                    <div className="grid gap-2">
                      {group.items.map((item) => {
                        const on = extras.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              setExtras((current) =>
                                current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
                              )
                            }
                            className={`rounded-xl border px-4 py-3 text-left text-[14px] ${
                              on ? "border-[#CD9861]/70 bg-[#CD9861]/15" : "border-white/10 bg-white/[0.03] text-white/75"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <p className="text-[12px] text-white/40">Je kunt deze stap overslaan.</p>
              </div>
            )}

            {step === "gegevens" && (
              <div className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input autoComplete="name" className={fieldClass()} placeholder="Naam" value={naam} onChange={(e) => setNaam(e.target.value)} />
                  <input autoComplete="tel" type="tel" className={fieldClass()} placeholder="Telefoon" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} />
                </div>
                <input autoComplete="email" type="email" className={fieldClass()} placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && <p className="text-[13px] text-red-300">{error}</p>}
              </div>
            )}

          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] md:px-6">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="min-h-11 px-2 text-[14px] text-[#CD9861]/80 disabled:opacity-30"
            >
              Terug
            </button>
            {step === "gegevens" ? (
              <button
                type="button"
                onClick={() => void confirm()}
                disabled={sending || !canNext}
                className="ames-btn-glow ames-btn-glow--blue min-h-11 rounded-full px-6 text-[14px] font-semibold disabled:opacity-50"
              >
                {sending ? "Bezig..." : "Verstuur via WhatsApp"}
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext}
                className="ames-btn-glow ames-btn-glow--blue min-h-11 rounded-full px-6 text-[14px] font-semibold disabled:opacity-40"
              >
                Volgende
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
