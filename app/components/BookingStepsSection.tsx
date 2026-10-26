import Link from "next/link";
import { ArrowRight, CalendarCheck, Car, CreditCard, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { num: string; icon: LucideIcon; title: string; text: string }[] = [
  {
    num: "01",
    icon: Package,
    title: "Kies je pakket",
    text: "De juiste reiniging voor jouw auto — op jouw adres, wanneer het jou uitkomt.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Boek een afspraak",
    text: "Snel via onze boek scan. Wij bevestigen datum, tijd en locatie binnen 24 uur.",
  },
  {
    num: "03",
    icon: Car,
    title: "Wij komen langs",
    text: "Ames detailing arriveert volledig uitgerust op de afgesproken plek.",
  },
  {
    num: "04",
    icon: CreditCard,
    title: "Betaling",
    text: "Na afloop betaal je eenvoudig — pin of contant, zonder verrassingen.",
  },
];

export default function BookingStepsSection() {
  return (
    <section className="relative mt-4 md:mt-8 pt-16 md:pt-20 border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1801AC]/40 to-transparent" />

      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 px-2">
        <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.22em] text-[#FF9220]/90 uppercase mb-4">
          Afspraak maken
        </p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-[2.75rem] font-black text-white uppercase tracking-tight leading-[0.95]">
          Zo boek je{" "}
          <span className="italic font-normal text-[#FF9220]">Ames detailing</span>
        </h2>
        <p className="mt-4 text-white/50 text-[15px] leading-relaxed">
          Vier duidelijke stappen — van pakket tot glanzend resultaat op locatie.
        </p>
      </div>

      <div className="relative hidden lg:block mb-2 px-4">
        <div className="absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-[#1801AC]/10 via-[#1801AC]/45 to-[#1801AC]/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7 transition-all duration-300 hover:border-[#1801AC]/40 hover:bg-[#1801AC]/[0.06] hover:shadow-[0_0_40px_rgba(24,1,172,0.12)]"
          >
            <div className="flex items-start justify-between mb-5">
              <span className="font-[family-name:var(--font-fragment-mono)] text-[11px] text-[#FF9220]/90 tracking-wider">
                {step.num}
              </span>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#1801AC]/35 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "linear-gradient(145deg, rgba(24,1,172,0.35) 0%, rgba(48,32,220,0.15) 100%)",
                  boxShadow: "0 0 24px rgba(24, 1, 172, 0.25)",
                }}
              >
                <step.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
            </div>
            <h3 className="font-[family-name:var(--font-outfit)] text-[15px] md:text-base font-bold text-white uppercase tracking-wide mb-2.5">
              {step.title}
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed">{step.text}</p>
            {i < steps.length - 1 && (
              <div className="lg:hidden flex justify-end mt-4 text-[#1801AC]/50">
                <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
              </div>
            )}
          </div>
        ))}
      </div>

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
