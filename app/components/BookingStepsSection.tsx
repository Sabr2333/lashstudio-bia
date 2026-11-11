import Link from "next/link";
import { ArrowRight, CalendarCheck, Car, CreditCard, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { num: string; icon: LucideIcon; title: string; text: string }[] = [
  {
    num: "01",
    icon: Package,
    title: "Kies je pakket",
    text: "One by one of een volume set. Nieuwe set, of opvullen na 2, 3 of 4 weken.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Plan je afspraak",
    text: "Kies een voorkeursdatum. Het tijdstip stemmen we nog af.",
  },
  {
    num: "03",
    icon: Car,
    title: "Je komt langs",
    text: "Je komt langs bij Lashstudio Bia in Vlaardingen.",
  },
  {
    num: "04",
    icon: CreditCard,
    title: "Betaling",
    text: "Na afloop betaal je eenvoudig, pin of contant, zonder verrassingen.",
  },
];

export default function BookingStepsSection() {
  return (
    <section className="relative mt-4 md:mt-8 pt-16 md:pt-20 border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9861]/40 to-transparent" />

      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 px-2">
        <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.22em] text-[#ffffff]/90 uppercase mb-4">
          Afspraak maken
        </p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-[2.75rem] font-black text-white uppercase tracking-tight leading-[0.95]">
          Zo boek je{" "}
            <span className="italic font-normal text-[#CD9861]">Lashstudio Bia</span>
        </h2>
        <p className="mt-4 text-white/50 text-[15px] leading-relaxed">
          Vier stappen, van behandeling tot een glimlach die bij jou past.
        </p>
      </div>

      <ol className="mx-auto flex max-w-3xl flex-col gap-3">
        {steps.map((step) => (
          <li
            key={step.title}
            className="group flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:gap-5 md:p-6 transition-all duration-300 hover:border-[#CD9861]/40 hover:bg-[#CD9861]/[0.06]"
          >
            <span className="pt-2.5 font-[family-name:var(--font-fragment-mono)] text-[12px] tracking-wider text-[#CD9861]">
              {step.num}
            </span>
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#CD9861]/35"
              style={{
                background: "linear-gradient(145deg, rgba(212,175,55,0.35) 0%, rgba(140,106,31,0.16) 100%)",
              }}
            >
              <step.icon className="h-5 w-5 text-[#1A0200]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-outfit)] text-[15px] md:text-base font-bold uppercase tracking-wide text-white">
                {step.title}
              </h3>
              <p className="mt-1 text-[13px] md:text-[14px] leading-relaxed text-white/50">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-center mt-10 md:mt-12">
        <Link
          href="/groei-scan"
          className="ames-btn-glow ames-btn-glow--blue inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-wider"
        >
          Start boek scan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
