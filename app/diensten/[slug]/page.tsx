"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  X,
  Check,
  Smartphone,
  Bot,
  Globe,
  LayoutDashboard,
  Zap,
  Shield,
  Clock,
  Sparkles,
  Code2,
  Rocket,
  Users,
  TrendingUp,
} from "lucide-react";
import Footer from "../../components/Footer";
import { Reveal, Counter, ServiceMockup } from "./ui";

type Metric = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

type Service = {
  slug: string;
  tag: string;
  title: string;
  italic: string;
  tagline: string;
  intro: string;
  price: string;
  accent: string;
  icon: React.ElementType;
  metrics: Metric[];
  benefits: { icon: React.ElementType; title: string; desc: string; big?: boolean }[];
  compareTitle: string;
  without: string[];
  withUs: string[];
  process: { title: string; desc: string }[];
  tools: string[];
  faq: { q: string; a: string }[];
};

const services: Record<string, Service> = {
  "mobiele-apps": {
    slug: "mobiele-apps",
    tag: "Mobiele Apps",
    title: "Apps die mensen",
    italic: "dagelijks gebruiken",
    tagline:
      "Native en cross-platform apps voor iOS en Android, snel, intuïtief en gebouwd om te schalen.",
    intro:
      "Jouw klanten zitten de hele dag op hun telefoon. Een sterke app is niet zomaar een extraatje, het is hoe jouw merk relevant blijft en groeit.",
    price: "Vanaf €17.500",
    accent: "#f59e0b",
    icon: Smartphone,
    metrics: [
      { value: 17500, prefix: "€", label: "Vanaf" },
      { value: 60, suffix: " fps", label: "Vloeiend" },
      { value: 100, suffix: "%", label: "Op maat" },
    ],
    benefits: [
      { icon: Zap, title: "Razendsnel", desc: "Native performance met directe interacties en soepele 60fps animaties die je voelt.", big: true },
      { icon: Code2, title: "Cross-platform", desc: "Eén codebase voor iOS én Android." },
      { icon: Shield, title: "Veilig", desc: "Encryptie en privacy-by-design." },
      { icon: Sparkles, title: "Premium design", desc: "Intuïtieve UX, strak afgestemd op jouw merk." },
    ],
    compareTitle: "Waarom op maat?",
    without: ["Trage hybride apps", "Aparte iOS & Android teams", "Generieke templates", "Geen support na launch"],
    withUs: ["Native performance", "Eén codebase, lagere kosten", "100% op maat design", "Doorlopend onderhoud"],
    process: [
      { title: "Strategie & concept", desc: "Doelen, doelgroep en kernfuncties bepalen." },
      { title: "Design & prototype", desc: "Een klikbaar prototype vóór de bouw." },
      { title: "Ontwikkeling", desc: "Wekelijkse opleveringen en demo's." },
      { title: "Lancering & support", desc: "Publicatie in de stores plus onderhoud." },
    ],
    tools: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "App Store", "Google Play", "Figma"],
    faq: [
      { q: "Voor welke platformen bouwen jullie?", a: "Zowel iOS als Android, vanuit één codebase. Indien gewenst ook een webversie." },
      { q: "Hoe lang duurt de ontwikkeling?", a: "Een gemiddelde app is in 8-12 weken klaar, afhankelijk van de complexiteit." },
      { q: "Plaatsen jullie de app in de stores?", a: "Ja, wij regelen de volledige publicatie in de App Store en Google Play." },
    ],
  },
  "ai-automatisering": {
    slug: "ai-automatisering",
    tag: "AI Automatisering",
    title: "Jouw digitale",
    italic: "medewerker",
    tagline:
      "Een AI-agent die echte acties uitvoert: mails, CRM, rapportages en planning, 24/7 zonder pauze.",
    intro:
      "De slimste bedrijven laten technologie het zware werk doen. Automatisering geeft jouw team de ruimte om te focussen op wat écht waarde oplevert.",
    price: "Op maat",
    accent: "#22c55e",
    icon: Bot,
    metrics: [
      { value: 50, suffix: "+", label: "Integraties" },
      { value: 32, suffix: " uur", label: "Bespaard / week" },
      { value: 24, suffix: "/7", label: "Actief" },
    ],
    benefits: [
      { icon: Clock, title: "24/7 actief", desc: "Werkt door terwijl jij slaapt. Geen pauze, geen ziekteverlof, geen vakantie.", big: true },
      { icon: Zap, title: "Voert acties uit", desc: "Niet alleen antwoorden — echte handelingen." },
      { icon: Shield, title: "GDPR-proof", desc: "Afgeschermd en onder jouw controle." },
      { icon: TrendingUp, title: "Leert continu", desc: "Persistent geheugen, wordt slimmer." },
    ],
    compareTitle: "Andere AI praat. Wij handelen.",
    without: ["Handmatig repetitief werk", "Fouten door vermoeidheid", "Data naar externe servers", "Werk stopt om 17:00"],
    withUs: ["Volledig geautomatiseerd", "Consistent & foutloos", "Lokaal & GDPR-proof", "24/7 actief"],
    process: [
      { title: "Analyse & blueprint", desc: "Processen en tijdvreters in kaart." },
      { title: "Bouw op maat", desc: "Afgestemd op jouw workflow." },
      { title: "Koppelingen", desc: "Gmail, WhatsApp, agenda, CRM." },
      { title: "Live & support", desc: "Vanaf dag één actief, met begeleiding." },
    ],
    tools: ["OpenAI", "Gmail", "WhatsApp", "CRM", "Notion", "Zapier", "Slack", "Telegram"],
    faq: [
      { q: "Welke tools kunnen jullie koppelen?", a: "Gmail, WhatsApp, Telegram, agenda, CRM, documenten en 50+ andere tools." },
      { q: "Is mijn data veilig?", a: "Ja. Alles draait afgeschermd en GDPR-compliant, onder jouw controle." },
      { q: "Hoe geef ik de agent opdrachten?", a: "Simpelweg via een berichtje — bijvoorbeeld WhatsApp of Telegram." },
    ],
  },
  elara: {
    slug: "elara",
    tag: "Elara",
    title: "Jij appt.",
    italic: "Zij regelt het.",
    tagline:
      "Elara is jouw persoonlijke AI-agent die acties uitvoert op jouw computer, terwijl jij verder leeft.",
    intro:
      "Jouw tijd is te waardevol om te besteden aan terugkerend werk. Elara is gebouwd voor ondernemers die willen schalen zonder zichzelf te verliezen in de details.",
    price: "Vanaf €8.000",
    accent: "#f59e0b",
    icon: Globe,
    metrics: [
      { value: 7, suffix: " dgn", label: "Live binnen" },
      { value: 50, suffix: "+", label: "Integraties" },
      { value: 24, suffix: "/7", label: "Actief" },
    ],
    benefits: [
      { icon: Zap, title: "Handelt direct", desc: "Stuurt de mail, plant de afspraak, maakt het bestand — volledig zelfstandig.", big: true },
      { icon: Shield, title: "Lokaal & privé", desc: "Draait op jouw eigen machine." },
      { icon: Clock, title: "Nooit offline", desc: "Werkt 24/7 door, ook 's nachts." },
      { icon: Sparkles, title: "Onthoudt alles", desc: "Leert jouw voorkeuren kennen." },
    ],
    compareTitle: "Andere AI agents praten. Elara handelt.",
    without: ["AI die alleen advies geeft", "Jij blijft de uitvoerder", "Elke sessie opnieuw beginnen", "Data bij derden"],
    withUs: ["Voert acties zelf uit", "Jij appt, zij regelt", "Persistent geheugen", "Lokaal op jouw machine"],
    process: [
      { title: "Analyse & blueprint", desc: "Knelpunten in jouw processen in kaart." },
      { title: "Elara wordt gebouwd", desc: "Volledig op maat voor jouw bedrijf." },
      { title: "Koppelingen & activatie", desc: "Gmail, agenda, WhatsApp, CRM." },
      { title: "Elara gaat live", desc: "Vanaf dag één werkt zij voor jou." },
    ],
    tools: ["Gmail", "WhatsApp", "Telegram", "Agenda", "Notion", "CRM", "Google Docs", "Canva"],
    faq: [
      { q: "Heb ik technische kennis nodig?", a: "Nee. Wij regelen de volledige installatie, configuratie en koppeling." },
      { q: "Hoe snel is Elara operationeel?", a: "Binnen 7 werkdagen na akkoord is Elara gebouwd en live." },
      { q: "Wat maakt Elara anders?", a: "Andere AI's geven antwoorden — Elara voert de acties daadwerkelijk uit." },
    ],
  },
  "web-applicaties": {
    slug: "web-applicaties",
    tag: "Web Applicaties",
    title: "Software die",
    italic: "jouw bedrijf draait",
    tagline:
      "Op maat gemaakte webapplicaties die perfect aansluiten bij jouw processen. Schaalbaar, snel en betrouwbaar.",
    intro:
      "Goede software maakt jouw bedrijf sneller, overzichtelijker en klaar om te groeien. Wij bouwen de tools die jouw team elke dag sterker maken.",
    price: "Vanaf €10.000",
    accent: "#3b82f6",
    icon: LayoutDashboard,
    metrics: [
      { value: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
      { value: 200, prefix: "<", suffix: "ms", label: "Response" },
      { value: 100, suffix: "%", label: "Schaalbaar" },
    ],
    benefits: [
      { icon: Rocket, title: "Schaalbaar", desc: "Gebouwd op moderne cloud-infra die meegroeit met je succes — van 10 naar 100.000 gebruikers.", big: true },
      { icon: LayoutDashboard, title: "Op maat", desc: "Exact afgestemd op jouw workflow." },
      { icon: Users, title: "Multi-user", desc: "Rollen, rechten en teams ingebouwd." },
      { icon: Shield, title: "Betrouwbaar", desc: "Veilig, getest en gemonitord." },
    ],
    compareTitle: "Van chaos naar controle",
    without: ["Losse spreadsheets", "Niet schaalbaar", "Handmatige processen", "Geen overzicht"],
    withUs: ["Eén centraal platform", "Cloud-native schaalbaar", "Geautomatiseerde flows", "Realtime dashboards"],
    process: [
      { title: "Discovery", desc: "Processen en wensen in kaart." },
      { title: "Architectuur & design", desc: "Solide basis + strak interface." },
      { title: "Agile ontwikkeling", desc: "Sprints met wekelijkse demo's." },
      { title: "Launch & schaal", desc: "Live gaan, monitoren, doorontwikkelen." },
    ],
    tools: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Vercel", "TypeScript", "Tailwind"],
    faq: [
      { q: "Kunnen jullie koppelen met bestaande systemen?", a: "Ja, wij integreren naadloos met je huidige tools, API's en databases." },
      { q: "Hosten jullie de applicatie ook?", a: "Ja, wij regelen hosting, monitoring en onderhoud op moderne cloud-infra." },
      { q: "Wat kost een webapplicatie?", a: "Projecten starten vanaf €10.000, afhankelijk van de scope." },
    ],
  },
};

function BenefitAnimation({ index, accent, big }: { index: number; accent: string; big?: boolean }) {
  if (index === 0 && big) {
    return (
      <div className="absolute right-4 bottom-4 w-[140px] h-[180px] opacity-[0.12]">
        <svg viewBox="0 0 140 180" fill="none" className="w-full h-full">
          <path d="M70 10 L85 70 L110 70 L60 120 L75 85 L50 85 Z" stroke={accent} strokeWidth="1.5" fill="none" className="animate-bolt-draw" />
          <path d="M70 10 L85 70 L110 70 L60 120 L75 85 L50 85 Z" fill={accent} className="animate-bolt-pulse" />
          <circle cx="70" cy="65" r="40" stroke={accent} strokeWidth="0.5" className="animate-bolt-ring" fill="none" />
          <circle cx="70" cy="65" r="55" stroke={accent} strokeWidth="0.3" className="animate-bolt-ring-2" fill="none" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle key={deg} r="2" fill={accent} className="animate-bolt-spark">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${deg / 360}s`}
                path={`M70,65 L${70 + 50 * Math.cos((deg * Math.PI) / 180)},${65 + 50 * Math.sin((deg * Math.PI) / 180)}`} />
            </circle>
          ))}
        </svg>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[100px] h-[100px] opacity-[0.1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="15" y="20" width="30" height="60" rx="4" stroke={accent} strokeWidth="1" className="animate-code-blink" />
          <rect x="55" y="20" width="30" height="60" rx="4" stroke={accent} strokeWidth="1" className="animate-code-blink-2" />
          <path d="M45 50 L55 50" stroke={accent} strokeWidth="1.5" className="animate-code-connect">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </path>
          <circle cx="30" cy="40" r="2" fill={accent}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="40" r="2" fill={accent}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="30" cy="55" r="1.5" fill={accent}>
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          <circle cx="70" cy="55" r="1.5" fill={accent}>
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" begin="0.8s" />
          </circle>
        </svg>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[100px] h-[100px] opacity-[0.1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="30" stroke={accent} strokeWidth="0.8" strokeDasharray="4 4">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="20" stroke={accent} strokeWidth="0.6" strokeDasharray="3 6">
            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="8" fill={accent} className="animate-bolt-pulse" />
          <circle cx="50" cy="20" r="3" fill={accent}>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="80" r="2" fill={accent}>
            <animateTransform attributeName="transform" type="rotate" from="180 50 50" to="540 50 50" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[100px] h-[100px] opacity-[0.1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 80 Q35 30 50 50 Q65 70 80 20" stroke={accent} strokeWidth="1.2" fill="none" strokeLinecap="round">
            <animate attributeName="d" values="M20 80 Q35 30 50 50 Q65 70 80 20;M20 70 Q35 40 50 35 Q65 30 80 25;M20 80 Q35 30 50 50 Q65 70 80 20" dur="4s" repeatCount="indefinite" />
          </path>
          {[25, 40, 55, 70].map((x, idx) => (
            <circle key={x} cx={x} cy="50" r="2.5" fill={accent}>
              <animate attributeName="cy" values={`${60 - idx * 5};${45 - idx * 5};${60 - idx * 5}`} dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
            </circle>
          ))}
          <circle cx="80" cy="20" r="4" fill="none" stroke={accent} strokeWidth="1">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    );
  }

  return null;
}

export default function DienstPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const service = services[slug];
  const [openIndex, setOpenIndex] = useState(0);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-white mb-4">Dienst niet gevonden</h1>
        <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Terug naar home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const accent = service.accent;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col selection:bg-white/20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/#services" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[14px]">
            <ArrowLeft className="w-4 h-4" />
            Diensten
          </Link>
          <Link href="/">
            <Image src="/logo.png" alt="Vanthom" width={32} height={32} className="w-8 h-8 object-contain" />
          </Link>
          <Link
            href={`/diensten/${service.slug}/scan`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#0a0a0a] text-[12px] font-semibold hover:bg-white/90 transition-colors"
          >
            Start {service.tag} Scan
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <div className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none animate-float-slow"
            style={{ background: accent }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none animate-grid-pan"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 pt-14 md:pt-20 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div>
              <Reveal>
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-7"
                  style={{ borderColor: `${accent}33`, background: `${accent}11` }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                  <span className="text-[12px] font-semibold tracking-wide" style={{ color: accent }}>
                    {service.tag}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-[family-name:var(--font-outfit)] text-5xl md:text-6xl lg:text-7xl font-black text-[#E9E8E3] uppercase tracking-tight leading-[0.85] mb-6">
                  {service.title}
                  <br />
                  <span className="italic font-normal text-white/40">{service.italic}</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-white/45 text-[15px] md:text-[17px] leading-relaxed max-w-xl mb-9">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/diensten/${service.slug}/scan`}
                    className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0a0a0a] text-[13px] font-semibold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center gap-3">
                      Start {service.tag} Scan
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white text-[13px] font-semibold uppercase tracking-wider hover:bg-white/5 hover:border-white/25 transition-all duration-300"
                  >
                    Neem contact op
                  </Link>
                  <Link
                    href="https://wa.me/31685115915"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="lg:pl-6">
              <ServiceMockup slug={service.slug} />
            </Reveal>
          </div>
        </section>

        {/* Metrics */}
        <section className="border-y border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-3 divide-x divide-white/[0.06]">
            {service.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 100} className="py-6 md:py-8 px-4 text-center">
                <p className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-extralight text-[#E9E8E3] tracking-tight mb-1">
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
                </p>
                <p className="text-[9px] md:text-[10px] font-[family-name:var(--font-fragment-mono)] text-white/25 uppercase tracking-[0.2em]">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <Reveal>
            <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/30 uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
              Waarom Vanthom
            </p>
          </Reveal>
          <Reveal delay={100}>
            <blockquote className="relative max-w-3xl">
              <span className="absolute -top-6 -left-2 font-[family-name:var(--font-outfit)] text-7xl md:text-8xl font-black leading-none select-none" style={{ color: `${accent}20` }}>&ldquo;</span>
              <p className="font-[family-name:var(--font-outfit)] text-2xl md:text-[2.5rem] font-bold text-[#E9E8E3] leading-snug italic">
                {service.intro}
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-8 h-[1px]" style={{ background: accent }} />
                <span className="font-[family-name:var(--font-outfit)] text-[14px] font-semibold text-white/60">Vanthom</span>
              </footer>
            </blockquote>
          </Reveal>
        </section>

        {/* Benefits bento */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.benefits.map((b, i) => {
              const BIcon = b.icon;
              return (
                <Reveal key={i} delay={i * 80} className={b.big ? "md:col-span-3 lg:col-span-1 lg:row-span-2" : ""}>
                  <div
                    className={`group relative h-full rounded-3xl border border-white/[0.06] p-8 hover:border-white/12 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${
                      b.big ? "lg:flex lg:flex-col lg:justify-between min-h-[320px]" : "min-h-[220px]"
                    }`}
                    style={{ background: b.big ? `linear-gradient(135deg, ${accent}08, #0e0e0e 60%)` : "#0e0e0e" }}
                  >
                    {/* Animated SVG decoration */}
                    <BenefitAnimation index={i} accent={accent} big={b.big} />

                    {/* Animated progress bar */}
                    {!b.big && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03]">
                        <div
                          className="h-full rounded-full animate-benefit-fill"
                          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`, animationDelay: `${i * 0.4}s` }}
                        />
                      </div>
                    )}

                    <div className="relative z-10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-6"
                        style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
                      >
                        <BIcon className="w-4.5 h-4.5" style={{ color: accent }} />
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className={`font-[family-name:var(--font-outfit)] font-semibold text-[#E9E8E3] mb-2.5 ${b.big ? "text-2xl" : "text-[17px]"}`}>
                        {b.title}
                      </h3>
                      <p className={`text-white/35 leading-relaxed ${b.big ? "text-[15px]" : "text-[13px]"}`}>{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Mid CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 pb-10 md:pb-14">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/[0.06] bg-[#0e0e0e] px-8 py-7">
              <div>
                <p className="font-[family-name:var(--font-outfit)] text-[18px] md:text-[20px] font-semibold text-[#E9E8E3] mb-1">
                  Benieuwd wat {service.tag.toLowerCase()} voor jou kan betekenen?
                </p>
                <p className="text-white/35 text-[13px]">Doe de gratis scan en ontvang een advies op maat.</p>
              </div>
              <Link
                href={`/diensten/${service.slug}/scan`}
                className="group shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#0a0a0a] text-[12px] font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] transition-all duration-300"
              >
                Start Scan
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Comparison */}
        <section className="border-t border-white/[0.06] bg-[#0c0c0c]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
            <Reveal>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-[#E9E8E3] uppercase tracking-tight mb-12 text-center">
                {service.compareTitle}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Reveal>
                <div className="rounded-3xl border border-white/[0.06] bg-[#0e0e0e] p-8">
                  <p className="text-[11px] font-[family-name:var(--font-fragment-mono)] text-white/25 uppercase tracking-[0.2em] mb-6">Zonder Vanthom</p>
                  <div className="space-y-4">
                    {service.without.map((w, i) => (
                      <div key={i} className="flex items-center gap-3.5">
                        <span className="w-5 h-5 rounded-full bg-red-500/8 flex items-center justify-center shrink-0">
                          <X className="w-3 h-3 text-red-400/50" />
                        </span>
                        <span className="text-white/35 text-[14px]">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div
                  className="rounded-3xl border p-8"
                  style={{ borderColor: `${accent}25`, background: `${accent}06` }}
                >
                  <p className="text-[11px] font-[family-name:var(--font-fragment-mono)] uppercase tracking-[0.2em] mb-6" style={{ color: `${accent}cc` }}>
                    Met Vanthom
                  </p>
                  <div className="space-y-4">
                    {service.withUs.map((w, i) => (
                      <div key={i} className="flex items-center gap-3.5">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${accent}18` }}
                        >
                          <Check className="w-3 h-3" style={{ color: accent }} />
                        </span>
                        <span className="text-white/70 text-[14px] font-medium">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Inline CTA after comparison */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 pb-6 -mt-8">
          <Reveal>
            <div className="text-center">
              <Link
                href={`/diensten/${service.slug}/scan`}
                className="inline-flex items-center gap-2 text-[13px] font-medium hover:text-white transition-colors"
                style={{ color: `${accent}cc` }}
              >
                Ontdek wat wij voor jou kunnen doen
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Process */}
        <section id="process" className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <Reveal>
            <div className="mb-14">
              <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
                Werkwijze
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-[#E9E8E3] uppercase tracking-tight">
                Van idee tot <span className="italic font-normal text-white/40">oplevering</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative h-full rounded-3xl bg-[#0e0e0e] border border-white/[0.06] p-7 hover:border-white/10 transition-all duration-500 group">
                  <span
                    className="font-[family-name:var(--font-outfit)] text-6xl font-extralight tracking-tight block mb-5 transition-opacity duration-500 group-hover:opacity-25"
                    style={{ color: accent, opacity: 0.15 }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-[16px] font-semibold text-[#E9E8E3] mb-2">{p.title}</h3>
                  <p className="text-white/35 text-[13px] leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA after process */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 pb-14">
          <Reveal>
            <div className="text-center">
              <p className="text-white/30 text-[14px] mb-4">Klinkt goed? Begin direct.</p>
              <Link
                href={`/diensten/${service.slug}/scan`}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-white text-[12px] font-semibold hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              >
                Gratis {service.tag} Scan
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Tools marquee */}
        <section className="border-y border-white/[0.06] py-14 overflow-hidden">
          <Reveal>
            <p className="text-center font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.25em] text-white/20 uppercase mb-10">
              Tech & integraties
            </p>
          </Reveal>
          <div className="relative">
            <div className="flex w-max animate-marquee gap-4">
              {[...service.tools, ...service.tools, ...service.tools, ...service.tools].map((t, i) => (
                <span
                  key={i}
                  className="px-6 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/40 text-[13px] font-medium whitespace-nowrap hover:text-white/60 hover:border-white/12 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5">
                  FAQ
                </p>
                <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-[#E9E8E3] leading-tight mb-4">
                  Veelgestelde <span className="italic font-normal text-white/40">vragen</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Staat jouw vraag er niet bij?{" "}
                  <Link href="/contact" className="text-white/70 underline hover:text-white transition-colors">
                    Neem contact op
                  </Link>
                  .
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex flex-col">
                  {service.faq.map((f, i) => (
                    <div key={i} className="border-t border-white/[0.06]">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                        className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
                      >
                        <span className="text-[#E9E8E3]/70 font-medium text-[15px] pr-8">{f.q}</span>
                        {openIndex === i ? (
                          <Minus className="w-4 h-4 text-white shrink-0" />
                        ) : (
                          <Plus className="w-4 h-4 text-white/30 shrink-0" />
                        )}
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                        <p className="text-white/40 text-[14px] leading-relaxed pr-12">{f.a}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-white/[0.06]" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 pb-24">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 md:p-16 text-center"
              style={{ background: `radial-gradient(circle at 50% 0%, ${accent}1f, #0d0d0d 60%)` }}
            >
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[120px] blur-[80px] opacity-30 pointer-events-none"
                style={{ background: accent }}
              />
              <h2 className="relative font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-[#E9E8E3] uppercase tracking-tight mb-5">
                Klaar om te <span className="italic font-normal text-white/40">starten?</span>
              </h2>
              <p className="relative text-white/40 text-[15px] md:text-[16px] max-w-xl mx-auto mb-9">
                Plan een vrijblijvend gesprek en ontdek wat wij voor jouw bedrijf kunnen bouwen.
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/diensten/${service.slug}/scan`}
                  className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0a0a0a] text-[13px] font-semibold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-3">
                    Start {service.tag} Scan
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white text-[13px] font-semibold uppercase tracking-wider hover:bg-white/5 hover:border-white/25 transition-all duration-300"
                >
                  Neem contact op
                </Link>
                <Link
                  href="https://wa.me/31685115915"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </div>
  );
}
