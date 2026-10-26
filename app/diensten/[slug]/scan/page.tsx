"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";

type Step = {
  label: string;
  question: string;
  description: string;
  options: string[];
  multiple: boolean;
  freeText?: boolean;
  freeTextPlaceholder?: string;
};

type ScanConfig = {
  tag: string;
  accent: string;
  steps: Step[];
};

const scanConfigs: Record<string, ScanConfig> = {
  "mobiele-apps": {
    tag: "Mobiele Apps",
    accent: "#f59e0b",
    steps: [
      {
        label: "App Scan",
        question: "Wat voor app heb je nodig?",
        description: "Elk project is anders. Laat ons weten wat het beste bij jou past.",
        options: [
          "Een nieuwe app vanaf scratch",
          "Een bestaande app verbeteren",
          "Een MVP / prototype",
          "Een app voor intern gebruik",
          "Een klantgerichte app",
        ],
        multiple: false,
      },
      {
        label: "App Scan",
        question: "Beschrijf je app idee",
        description: "Vertel ons in het kort wat de app moet doen en voor wie het bedoeld is.",
        options: [],
        multiple: false,
        freeText: true,
        freeTextPlaceholder: "Bijv. een bestel-app voor restaurants waar klanten direct kunnen bestellen en betalen...",
      },
      {
        label: "App Scan",
        question: "Voor welke platformen?",
        description: "Selecteer alle platformen waarop de app beschikbaar moet zijn.",
        options: [
          "iOS (iPhone & iPad)",
          "Android",
          "Beide (cross-platform)",
          "Ook een webversie",
          "Weet ik nog niet",
        ],
        multiple: true,
      },
      {
        label: "App Scan",
        question: "Welke functies zijn belangrijk?",
        description: "Kies alles wat van toepassing is op jouw app.",
        options: [
          "Gebruikersaccounts & login",
          "Push notificaties",
          "Betalingen / abonnementen",
          "Locatie / kaarten",
          "Chat of berichten",
          "Camera / media uploads",
          "Offline functionaliteit",
          "Koppelingen met bestaande systemen",
        ],
        multiple: true,
      },
      {
        label: "App Scan",
        question: "Wat is jullie budget?",
        description: "Geen zorgen, dit is vrijblijvend. Het helpt ons realistisch te adviseren.",
        options: [
          "€8.000 – €15.000",
          "€15.000 – €25.000",
          "€25.000 – €40.000",
          "€40.000+",
          "Weet ik nog niet",
        ],
        multiple: false,
      },
      {
        label: "App Scan",
        question: "Hoe snel willen jullie starten?",
        description: "Wanneer zou het project idealiter moeten beginnen?",
        options: [
          "Zo snel mogelijk",
          "Binnen 1 maand",
          "Binnen 3 maanden",
          "Geen haast, oriënterend",
        ],
        multiple: false,
      },
    ],
  },
  "ai-automatisering": {
    tag: "AI Automatisering",
    accent: "#22c55e",
    steps: [
      {
        label: "AI Scan",
        question: "Wat wil je automatiseren?",
        description: "Selecteer alles wat tijd kost en geautomatiseerd kan worden.",
        options: [
          "E-mails beantwoorden of versturen",
          "CRM en klantbeheer",
          "Rapportages en data-analyse",
          "Planning en agenda",
          "Social media beheer",
          "Facturatie en administratie",
          "Klantenservice / support",
          "Iets anders",
        ],
        multiple: true,
      },
      {
        label: "AI Scan",
        question: "Welke tools gebruik je nu?",
        description: "Selecteer de systemen waarmee de AI moet integreren.",
        options: [
          "Gmail / Outlook",
          "WhatsApp / Telegram",
          "Notion / Google Docs",
          "CRM (HubSpot, Pipedrive, etc.)",
          "Slack / Teams",
          "Excel / Google Sheets",
          "Eigen software / API's",
        ],
        multiple: true,
      },
      {
        label: "AI Scan",
        question: "Hoeveel uur besteed je wekelijks aan repetitief werk?",
        description: "Dit helpt ons inschatten hoeveel tijd je kunt besparen.",
        options: [
          "Minder dan 5 uur",
          "5 – 15 uur",
          "15 – 30 uur",
          "Meer dan 30 uur",
          "Geen idee, maar te veel",
        ],
        multiple: false,
      },
      {
        label: "AI Scan",
        question: "Hoe belangrijk is privacy voor jullie?",
        description: "Dit bepaalt hoe we de architectuur opzetten.",
        options: [
          "Alles moet lokaal draaien (GDPR-strikt)",
          "Cloud is prima, mits veilig",
          "Geen specifieke eisen",
        ],
        multiple: false,
      },
      {
        label: "AI Scan",
        question: "Hoe snel willen jullie starten?",
        description: "Wanneer zou de automatisering idealiter live moeten zijn?",
        options: [
          "Zo snel mogelijk",
          "Binnen 1 maand",
          "Binnen 3 maanden",
          "Geen haast, oriënterend",
        ],
        multiple: false,
      },
    ],
  },
  elara: {
    tag: "Elara",
    accent: "#f59e0b",
    steps: [
      {
        label: "Elara Scan",
        question: "Waarvoor wil je Elara inzetten?",
        description: "Selecteer alles wat Elara voor jou zou moeten regelen.",
        options: [
          "E-mails lezen, beantwoorden en sturen",
          "Afspraken plannen en agenda beheren",
          "Documenten en bestanden aanmaken",
          "CRM bijwerken en klantinfo beheren",
          "Berichten sturen via WhatsApp / Telegram",
          "Samenvattingen en rapportages maken",
          "Iets anders",
        ],
        multiple: true,
      },
      {
        label: "Elara Scan",
        question: "Hoe communiceer je het liefst met Elara?",
        description: "Elara past zich aan jouw voorkeur aan.",
        options: [
          "WhatsApp",
          "Telegram",
          "E-mail",
          "Spraak / voice",
          "Maakt niet uit",
        ],
        multiple: false,
      },
      {
        label: "Elara Scan",
        question: "Welke systemen gebruik je dagelijks?",
        description: "Dit helpt ons Elara goed te koppelen aan jouw workflow.",
        options: [
          "Gmail / Outlook",
          "Google Agenda / Calendly",
          "Notion / Google Docs",
          "CRM systeem",
          "Slack / Teams",
          "Boekhoudsoftware",
        ],
        multiple: true,
      },
      {
        label: "Elara Scan",
        question: "Hoe groot is jullie team?",
        description: "Elara kan ook voor meerdere teamleden werken.",
        options: [
          "Alleen voor mij",
          "2-5 personen",
          "6-20 personen",
          "20+ personen",
        ],
        multiple: false,
      },
      {
        label: "Elara Scan",
        question: "Wanneer wil je starten?",
        description: "Elara is binnen 7 dagen operationeel na akkoord.",
        options: [
          "Zo snel mogelijk",
          "Binnen 1 maand",
          "Binnen 3 maanden",
          "Geen haast, oriënterend",
        ],
        multiple: false,
      },
    ],
  },
  "web-applicaties": {
    tag: "Web Applicaties",
    accent: "#3b82f6",
    steps: [
      {
        label: "Web App Scan",
        question: "Wat voor web applicatie heb je nodig?",
        description: "Elk project is uniek. Vertel ons wat het beste past.",
        options: [
          "Een intern dashboard / portal",
          "Een klantgericht platform",
          "Een SaaS product",
          "Een bestaand systeem vervangen",
          "Een koppeling tussen systemen",
          "Iets anders",
        ],
        multiple: false,
      },
      {
        label: "Web App Scan",
        question: "Welke functionaliteiten zijn essentieel?",
        description: "Selecteer alles wat van toepassing is.",
        options: [
          "Gebruikersaccounts en rollen",
          "Realtime data / dashboards",
          "Betalingen / facturatie",
          "Formulieren en workflows",
          "API koppelingen",
          "Bestanden uploaden / beheren",
          "Notificaties (mail / push)",
          "Rapportages en exports",
        ],
        multiple: true,
      },
      {
        label: "Web App Scan",
        question: "Hoeveel gebruikers verwacht je?",
        description: "Dit bepaalt de schaalbaarheidseisen.",
        options: [
          "1 – 50 gebruikers",
          "50 – 500 gebruikers",
          "500 – 5.000 gebruikers",
          "5.000+ gebruikers",
          "Weet ik nog niet",
        ],
        multiple: false,
      },
      {
        label: "Web App Scan",
        question: "Wat is jullie budget?",
        description: "Geen zorgen, dit is vrijblijvend. Het helpt ons realistisch te adviseren.",
        options: [
          "€8.000 – €15.000",
          "€15.000 – €25.000",
          "€25.000 – €40.000",
          "€40.000+",
          "Weet ik nog niet",
        ],
        multiple: false,
      },
      {
        label: "Web App Scan",
        question: "Hoe snel willen jullie starten?",
        description: "Wanneer zou het project idealiter moeten beginnen?",
        options: [
          "Zo snel mogelijk",
          "Binnen 1 maand",
          "Binnen 3 maanden",
          "Geen haast, oriënterend",
        ],
        multiple: false,
      },
    ],
  },
};

export default function DienstScan() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const config = scanConfigs[slug];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [done, setDone] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({
    naam: "",
    email: "",
    telefoon: "",
    bedrijf: "",
  });

  if (!config) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-white mb-4">Scan niet gevonden</h1>
        <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Terug naar home
        </Link>
      </div>
    );
  }

  const steps = config.steps;
  const current = steps[step];
  const totalSteps = steps.length;
  const totalWithContact = totalSteps + 1;
  const currentStep = showContactForm ? totalSteps + 1 : step + 1;
  const pct = Math.round((currentStep / totalWithContact) * 100);
  const selected = answers[step] || [];

  function toggle(option: string) {
    const cur = answers[step] || [];
    if (current.multiple) {
      if (cur.includes(option)) {
        setAnswers({ ...answers, [step]: cur.filter((o) => o !== option) });
      } else {
        setAnswers({ ...answers, [step]: [...cur, option] });
      }
    } else {
      setAnswers({ ...answers, [step]: [option] });
    }
  }

  function next() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowContactForm(true);
    }
  }

  function prev() {
    if (showContactForm) {
      setShowContactForm(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      dienst: config.tag,
      contact,
      answers: Object.entries(answers).map(([i, vals]) => ({
        question: steps[Number(i)].question,
        answers: vals,
      })),
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // silently continue
    }

    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
          style={{ background: `${config.accent}20` }}
        >
          <Check className="w-8 h-8" style={{ color: config.accent }} />
        </div>
        <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-black text-white uppercase tracking-tight text-center mb-4">
          Bedankt!
        </h1>
        <p className="text-white/50 text-center text-[15px] leading-relaxed max-w-md mb-10">
          We hebben je {config.tag.toLowerCase()} scan ontvangen. Ons team neemt zo snel mogelijk
          contact met je op met een advies op maat.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/diensten/${slug}`}
            className="px-8 py-3.5 rounded-full bg-white text-[#0a0a0a] text-[14px] font-semibold hover:bg-white/90 transition-colors"
          >
            Terug naar {config.tag}
          </Link>
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full border border-white/15 text-white text-[14px] font-semibold hover:bg-white/5 transition-colors"
          >
            Naar home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <Link
          href={`/diensten/${slug}`}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[14px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar {config.tag}
        </Link>
        <Image
          src="/logo.png"
          alt="Vanthom"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-[780px] mx-auto w-full">
        {/* Progress */}
        <div className="w-full mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em]" style={{ color: `${config.accent}99` }}>
              Stap {currentStep}/{totalWithContact}
            </span>
            <span className="text-[12px] text-white/30">{pct}%</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalWithContact }).map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: i < currentStep ? "100%" : "0%",
                    background: config.accent,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {showContactForm ? (
          <div className="w-full">
            <div className="w-full mb-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: `${config.accent}99` }}>
                <span className="w-2 h-2 rounded-full" style={{ background: config.accent }} />
                Laatste stap
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[0.9] mb-4">
                Jouw <span className="italic font-normal text-white/60">gegevens</span>
              </h2>
              <p className="text-white/40 text-[14px] leading-relaxed max-w-lg">
                Vul je contactgegevens in zodat we je {config.tag.toLowerCase()} scan kunnen analyseren en contact met je opnemen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-5 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                    Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact.naam}
                    onChange={(e) => setContact({ ...contact, naam: e.target.value })}
                    placeholder="Je volledige naam"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="naam@bedrijf.nl"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                    Telefoon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contact.telefoon}
                    onChange={(e) => setContact({ ...contact, telefoon: e.target.value })}
                    placeholder="+31 6 12 34 56 78"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
                    Bedrijf
                  </label>
                  <input
                    type="text"
                    value={contact.bedrijf}
                    onChange={(e) => setContact({ ...contact, bedrijf: e.target.value })}
                    placeholder="Bedrijfsnaam"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={prev}
                  className="text-[13px] text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  ← Vorige
                </button>
                <button
                  type="submit"
                  disabled={submitting || !contact.naam || !contact.email || !contact.telefoon}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    contact.naam && contact.email && contact.telefoon
                      ? "bg-white text-[#0a0a0a] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                      : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  {submitting ? "Versturen..." : "Verstuur scan"}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="w-full mb-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4 flex items-center gap-2" style={{ color: `${config.accent}99` }}>
                <span className="w-2 h-2 rounded-full" style={{ background: config.accent }} />
                {current.label}
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[0.9] mb-4">
                {current.question}
              </h2>
              <p className="text-white/40 text-[14px] leading-relaxed max-w-lg">
                {current.description}
              </p>
            </div>

            {/* Options or free text */}
            {current.freeText ? (
              <div className="w-full mb-10">
                <textarea
                  rows={5}
                  value={selected[0] || ""}
                  onChange={(e) => setAnswers({ ...answers, [step]: e.target.value ? [e.target.value] : [] })}
                  placeholder={current.freeTextPlaceholder || "Beschrijf hier..."}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-none leading-relaxed"
                />
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {current.options.map((option, i) => {
                  const isSelected = selected.includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => toggle(option)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-white/30 text-white"
                          : "bg-white/[0.03] border-white/8 text-white/60 hover:bg-white/[0.06] hover:border-white/15"
                      }`}
                      style={isSelected ? { background: `${config.accent}15`, borderColor: `${config.accent}50` } : {}}
                    >
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${
                          isSelected ? "text-[#0a0a0a]" : "bg-white/10 text-white/30"
                        }`}
                        style={isSelected ? { background: config.accent } : {}}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] font-medium">{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="w-full flex items-center justify-between">
              <button
                onClick={prev}
                disabled={step === 0}
                className={`text-[13px] text-white/40 hover:text-white transition-colors cursor-pointer ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}
              >
                ← Vorige
              </button>
              <button
                onClick={next}
                disabled={selected.length === 0}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selected.length > 0
                    ? "bg-white/10 border border-white/20 text-white hover:bg-white/15"
                    : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                Volgende
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
