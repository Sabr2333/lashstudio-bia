"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Check, X } from "lucide-react";
import {
  categoryHints,
  categoryLabels,
  formatPackageChoice,
  packagePrices,
  tierMeta,
  tierOrder,
  type PackageCategory,
  type PackageTier,
} from "../lib/amesPackages";

type Step = "category" | "tier" | "confirm";

type AmesBookPackageModalProps = {
  open: boolean;
  onClose: () => void;
};

const stepIndex: Record<Step, number> = { category: 0, tier: 1, confirm: 2 };

export default function AmesBookPackageModal({ open, onClose }: AmesBookPackageModalProps) {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<PackageCategory | null>(null);
  const [tier, setTier] = useState<PackageTier | null>(null);

  const reset = () => {
    setStep("category");
    setCategory(null);
    setTier(null);
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(reset, 280);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        window.setTimeout(reset, 280);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const progress = ((stepIndex[step] + 1) / 3) * 100;
  const price =
    category && tier ? packagePrices[category][tier] : null;

  const scanHref =
    category && tier
      ? `/groei-scan?c=${category}&t=${tier}`
      : "/groei-scan";

  return (
    <div
      className="fixed inset-0 z-[10020] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ames-book-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Sluiten"
        onClick={handleClose}
      />

      <div className="ames-package-help-modal ames-package-card relative z-[1] w-full max-w-md max-h-[min(680px,calc(100vh-2rem))] flex flex-col rounded-2xl md:rounded-3xl bg-[#0f0f0f] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1801AC]/25 border border-[#1801AC]/35 shrink-0">
                <Calendar className="w-4 h-4 text-white/80" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <h2
                  id="ames-book-title"
                  className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white"
                >
                  Boek je behandeling
                </h2>
                <p className="text-[11px] text-white/40">Stap {stepIndex[step] + 1} van 3</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="shrink-0 h-9 w-9 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 flex items-center justify-center transition-colors"
              aria-label="Sluit venster"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1801AC] to-[#FF9220]/80 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "category" && (
            <div className="space-y-3">
              <p className="text-[13px] text-white/55 mb-4 leading-relaxed">
                Waar wil je mee starten? Kies interieur, exterieur of combo.
              </p>
              {(Object.keys(categoryLabels) as PackageCategory[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setCategory(key);
                    setStep("tier");
                  }}
                  className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#FF9220]/35 hover:bg-[#FF9220]/[0.06] px-4 py-4 transition-all duration-200 group"
                >
                  <p className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white group-hover:text-[#E9E8E3]">
                    {categoryLabels[key]}
                  </p>
                  <p className="text-[12px] text-white/45 mt-1">{categoryHints[key]}</p>
                </button>
              ))}
            </div>
          )}

          {step === "tier" && category && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setStep("category");
                  setTier(null);
                }}
                className="inline-flex items-center gap-1.5 text-[12px] text-white/45 hover:text-white/70 mb-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Terug
              </button>
              <p className="text-[13px] text-white/55 mb-3 leading-relaxed">
                Kies je pakket voor{" "}
                <span className="text-[#FF9220]/90">{categoryLabels[category]}</span>.
              </p>
              {tierOrder.map((t) => {
                const meta = tierMeta[t];
                const p = packagePrices[category][t];
                const popular = t === "showroom";
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTier(t);
                      setStep("confirm");
                    }}
                    className={`w-full text-left rounded-2xl border px-4 py-4 transition-all duration-200 ${
                      popular
                        ? "border-[#FF9220]/35 bg-[#FF9220]/[0.06] hover:border-[#FF9220]/50"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white">
                          {meta.title}
                        </p>
                        <p className="text-[11px] text-white/45 mt-0.5">{meta.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {popular && (
                          <span className="text-[9px] uppercase tracking-wider text-[#FF9220] block mb-1">
                            {meta.tag}
                          </span>
                        )}
                        <span className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white">
                          €{p}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === "confirm" && category && tier && price !== null && (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setStep("tier")}
                className="inline-flex items-center gap-1.5 text-[12px] text-white/45 hover:text-white/70 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Ander pakket
              </button>

              <div className="rounded-2xl border border-[#FF9220]/25 bg-[#FF9220]/[0.06] p-4">
                <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.18em] text-[#FF9220]/80 uppercase mb-2">
                  Jouw keuze
                </p>
                <p className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white leading-snug">
                  {formatPackageChoice(category, tier)}
                </p>
                <p className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white mt-2">
                  €{price}
                  <span className="text-sm font-normal text-white/40 ml-1">vanaf</span>
                </p>
                <p className="text-[12px] text-white/50 mt-3 leading-relaxed">
                  {tierMeta[tier].description}
                </p>
              </div>

              <ul className="space-y-2 text-[12px] text-white/55">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[#FF9220] shrink-0" strokeWidth={2.5} />
                  Op locatie in heel Zuid-Holland
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[#FF9220] shrink-0" strokeWidth={2.5} />
                  Datum, locatie & WhatsApp in de boek scan
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 pt-2 border-t border-white/[0.06] flex flex-col gap-2.5">
          {step === "confirm" && category && tier ? (
            <>
              <Link
                href={scanHref}
                onClick={handleClose}
                className="ames-btn-glow ames-btn-glow--blue relative flex items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-semibold hover:scale-[1.02] transition-transform"
              >
                <span className="relative z-[1] inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0 opacity-90" strokeWidth={2.25} />
                  Verder met boek scan
                </span>
              </Link>
              <Link
                href={`/pakketten?c=${category}`}
                onClick={handleClose}
                className="text-center text-[12px] text-white/40 hover:text-[#FF9220]/85 transition-colors py-1"
              >
                Bekijk pakketdetails
              </Link>
            </>
          ) : (
            <p className="text-center text-[11px] text-white/30 py-2">
              Vragen?{" "}
              <Link href="/contact" onClick={handleClose} className="text-[#FF9220]/75 hover:text-[#FF9220]">
                Neem contact op
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
