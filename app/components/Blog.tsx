"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Hoe lang duurt het om een website of app te bouwen?",
    answer:
      "De doorlooptijd hangt af van de complexiteit. Een standaard website is in 4-6 weken klaar, een webapplicatie of automatisering duurt gemiddeld 6-12 weken. We geven altijd een duidelijke planning vooraf.",
  },
  {
    question: "Bouwen jullie op maat of gebruiken jullie templates?",
    answer:
      "Alles wordt op maat gebouwd. Wij gebruiken geen templates \u2014 elke oplossing wordt specifiek ontworpen en ontwikkeld voor jouw bedrijf en doelstellingen.",
  },
  {
    question: "Wat kosten jullie diensten?",
    answer:
      "Onze prijzen zijn projectgebonden en afhankelijk van de scope. Na een intakegesprek ontvang je een transparante offerte. Projecten starten vanaf \u20ac2.500.",
  },
  {
    question: "Bieden jullie ook onderhoud en support na oplevering?",
    answer:
      "Ja, wij bieden onderhoudspakketten aan inclusief updates, monitoring, bugfixes en technische support. Zo blijft jouw oplossing altijd up-to-date.",
  },
  {
    question: "Kunnen jullie bestaande systemen koppelen of automatiseren?",
    answer:
      "Absoluut. Wij zijn gespecialiseerd in het koppelen van bestaande tools en systemen. Denk aan CRM, boekhoudsoftware, e-mail en meer \u2014 alles naadloos ge\u00EFntegreerd.",
  },
  {
    question: "Voor welke sectoren werken jullie?",
    answer:
      "Wij werken voor diverse sectoren waaronder tech, gezondheidszorg, logistiek, finance en e-commerce. Onze aanpak past zich aan elke branche aan.",
  },
];

export default function Blog() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-12 md:py-20 bg-[#0e0e0e]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="font-[family-name:var(--font-fragment-mono)] text-xs tracking-widest text-white/40 uppercase mb-4">
              FAQ
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Veelgestelde vragen
            </h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Alles wat je wilt weten over samenwerken met ons. Staat je vraag er niet bij? Neem gerust contact op.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-t border-white/10"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
                  >
                    <span className="text-white/80 font-medium text-sm pr-8">
                      {faq.question}
                    </span>
                    {openIndex === i ? (
                      <Minus className="w-4 h-4 text-white shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/30 shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/40 text-sm leading-relaxed pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
