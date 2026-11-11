"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Siren, X } from "lucide-react";
import { buildWhatsAppBookingUrl } from "../lib/amesPackages";

type Step = "klacht" | "wanneer" | "gegevens";

const stepIndex: Record<Step, number> = { klacht: 0, wanneer: 1, gegevens: 2 };

const klachten = [
  "Gevoelige tanden na het bleken",
  "Vraag over het resultaat",
  "Afspraak verzetten",
  "Iets anders dat niet kan wachten",
] as const;

const wanneerOpties = ["Zo snel mogelijk", "Vandaag", "Morgen"] as const;

type SpoedModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SpoedModal({ open, onClose }: SpoedModalProps) {
  const [step, setStep] = useState<Step>("klacht");
  const [klacht, setKlacht] = useState<string | null>(null);
  const [wanneer, setWanneer] = useState<string | null>(null);
  const [naam, setNaam] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [toelichting, setToelichting] = useState("");

  const reset = () => {
    setStep("klacht");
    setKlacht(null);
    setWanneer(null);
    setNaam("");
    setTelefoon("");
    setToelichting("");
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(reset, 280);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const phoneDigits = telefoon.replace(/\D/g, "");
  const canSend = naam.trim().length >= 2 && phoneDigits.length >= 8 && Boolean(klacht) && Boolean(wanneer);
  const progress = ((stepIndex[step] + 1) / 3) * 100;

  const whatsappLines = [
    "Spoedaanvraag Smile to Shine",
    "",
    `Klacht: ${klacht ?? ""}`,
    `Wanneer: ${wanneer ?? ""}`,
    `Naam: ${naam.trim()}`,
    `Telefoon: ${telefoon.trim()}`,
  ];
  if (toelichting.trim()) whatsappLines.push(`Toelichting: ${toelichting.trim()}`);
  const whatsappUrl = buildWhatsAppBookingUrl(whatsappLines.join("\n"));

  return (
    <div
      className="luxe-keep-dark fixed inset-0 z-[10020] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spoed-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Sluiten"
        onClick={handleClose}
      />

      <div className="relative z-[1] flex w-full max-w-md max-h-[min(720px,calc(100dvh-1.5rem))] flex-col rounded-2xl bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.65)] md:rounded-3xl">
        <div className="border-b border-white/[0.06] px-5 pb-4 pt-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#CD9861]/40 bg-[#CD9861]/20">
                <Siren className="h-4 w-4 text-[#CD9861]" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <h2
                  id="spoed-title"
                  className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white"
                >
                  Spoed
                </h2>
                <p className="text-[11px] text-white/40">Stap {stepIndex[step] + 1} van 3</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
              aria-label="Sluit venster"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#CD9861] to-[#CD9861] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "klacht" && (
            <div className="space-y-3">
              <p className="mb-4 text-[13px] leading-relaxed text-white/55">
                Wat is er aan de hand? We nemen je aanvraag mee naar de salon in De Meern.
              </p>
              {klachten.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setKlacht(item);
                    setStep("wanneer");
                  }}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                    klacht === item
                      ? "border-[#CD9861]/60 bg-[#CD9861]/10"
                      : "border-white/10 bg-white/[0.03] hover:border-[#CD9861]/35"
                  }`}
                >
                  <p className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white">
                    {item}
                  </p>
                </button>
              ))}
            </div>
          )}

          {step === "wanneer" && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setStep("klacht")}
                className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-white/45 transition-colors hover:text-white/70"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Terug
              </button>
              <p className="mb-3 text-[13px] leading-relaxed text-white/55">
                Wanneer kun je langskomen?
              </p>
              {wanneerOpties.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setWanneer(item);
                    setStep("gegevens");
                  }}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                    wanneer === item
                      ? "border-[#CD9861]/60 bg-[#CD9861]/10"
                      : "border-white/10 bg-white/[0.03] hover:border-[#CD9861]/35"
                  }`}
                >
                  <p className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white">
                    {item}
                  </p>
                </button>
              ))}
            </div>
          )}

          {step === "gegevens" && (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSend) return;
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
              }}
            >
              <button
                type="button"
                onClick={() => setStep("wanneer")}
                className="inline-flex items-center gap-1.5 text-[12px] text-white/45 transition-colors hover:text-white/70"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Terug
              </button>
              <p className="text-[13px] leading-relaxed text-white/55">
                {klacht}. {wanneer}. Laat je naam en nummer achter, dan openen we WhatsApp met je aanvraag.
              </p>
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-white/45">
                  Naam
                </span>
                <input
                  value={naam}
                  onChange={(event) => setNaam(event.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Je naam"
                  className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-[14px] text-white outline-none focus:border-[#CD9861]/60"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-white/45">
                  Telefoon
                </span>
                <input
                  value={telefoon}
                  onChange={(event) => setTelefoon(event.target.value)}
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="06 12345678"
                  className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-[14px] text-white outline-none focus:border-[#CD9861]/60"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-white/45">
                  Toelichting
                </span>
                <textarea
                  value={toelichting}
                  onChange={(event) => setToelichting(event.target.value)}
                  rows={3}
                  placeholder="Kort wat er speelt, als je dat wilt"
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-[14px] text-white outline-none focus:border-[#CD9861]/60"
                />
              </label>
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-[#CD9861] via-[#CD9861] to-[#CD9861] px-6 py-3.5 font-[family-name:var(--font-outfit)] text-[13px] font-semibold uppercase tracking-wider text-[#071018] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verstuur via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
