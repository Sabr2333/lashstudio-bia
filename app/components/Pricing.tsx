import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type Review = {
  name: string;
  when: string;
  rating: number;
  text: string;
  tag: string;
  initial: string;
};

const reviews: Review[] = [
  {
    name: "Mark van der Berg",
    when: "3 weken geleden",
    rating: 5,
    text: "Showroom Combo laten doen op locatie in Kralingen. Binnen en buiten ziet er weer showroom uit — stoelen, dashboard en lak allemaal top. Afspraak snel bevestigd.",
    tag: "Showroom Combo",
    initial: "M",
  },
  {
    name: "Sofia Jansen",
    when: "1 maand geleden",
    rating: 5,
    text: "Interieur Special na hondenharen en geur in de auto. Geur weg, matten en stoelen grondig schoon. Vriendelijk team, premium producten merk je echt.",
    tag: "Special Interieur",
    initial: "S",
  },
  {
    name: "Youssef Alami",
    when: "2 maanden geleden",
    rating: 5,
    text: "Exterieur Showroom — velgen, decontaminatie en sealant. Auto glanst weer als nieuw. Handwas zonder krassen, precies wat ik zocht.",
    tag: "Showroom Exterieur",
    initial: "Y",
  },
  {
    name: "Emma de Wit",
    when: "6 weken geleden",
    rating: 5,
    text: "Lease-auto oplevering: combo pakket geboekt via de scan. Alles netjes afgewerkt, ook kleine details in deurklinken en ventilatie. Aanrader.",
    tag: "Lease-oplevering",
    initial: "E",
  },
  {
    name: "Daan Vermeer",
    when: "2 weken geleden",
    rating: 5,
    text: "Basic onderhoud elke paar weken — altijd netjes, altijd op tijd in Rotterdam. Geen wasstraat meer voor mij.",
    tag: "Basic Interieur",
    initial: "D",
  },
  {
    name: "Fatima El Idrissi",
    when: "3 maanden geleden",
    rating: 5,
    text: "Wij komen langs op de oprit, dat scheelt enorm. Interieur Showroom: leer gevoed, naden schoon. Prijs duidelijk vooraf.",
    tag: "Op locatie",
    initial: "F",
  },
  {
    name: "Rick Hoogland",
    when: "1 week geleden",
    rating: 5,
    text: "Special Exterieur met polish — doffe lak veel levendiger. Hydrofobe finish houdt langer schoon. Professionele uitleg bij oplevering.",
    tag: "Special Exterieur",
    initial: "R",
  },
  {
    name: "Noor Bakker",
    when: "5 weken geleden",
    rating: 5,
    text: "Eerste keer detailing geboekt. Basic Combo was perfect om te proberen. Volgende keer ga ik voor Showroom — zelfde kwaliteit, meer diepte.",
    tag: "Basic Combo",
    initial: "N",
  },
  {
    name: "Jasper Mulder",
    when: "2 maanden geleden",
    rating: 5,
    text: "Snelle planning, duidelijke communicatie via WhatsApp. Auto binnen en buiten klaar terwijl ik thuis werkte. Ames is echt detailing op maat.",
    tag: "Showroom Combo",
    initial: "J",
  },
  {
    name: "Laura Pietersen",
    when: "4 weken geleden",
    rating: 5,
    text: "Dashboard, ramen en geur — alles fris. Geen chemische lucht achteraf. Voelt als premium service zonder premium-gedoe.",
    tag: "Showroom Interieur",
    initial: "L",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-white/10 text-white/10"}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="ames-review-card shrink-0 w-[min(88vw,320px)] md:w-[340px] rounded-2xl border border-white/[0.08] bg-[#111111] p-5 md:p-6 flex flex-col min-h-[220px]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4]/25 to-[#34A853]/20 border border-white/10 text-[13px] font-semibold text-white/90">
            {review.initial}
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white truncate">{review.name}</p>
            <p className="text-[11px] text-white/35">{review.when}</p>
          </div>
        </div>
        <span
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] border border-white/10"
          title="Google-review"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </span>
      </div>

      <Stars count={review.rating} />

      <p className="mt-3 text-[13px] leading-relaxed text-white/55 flex-1">&ldquo;{review.text}&rdquo;</p>

      <p className="mt-4 pt-3 border-t border-white/[0.06] font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.12em] uppercase text-[#FF9220]/75">
        {review.tag}
      </p>
    </article>
  );
}

function ReviewMarquee({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className="ames-marquee-mask py-1">
      <div
        className={`flex w-max gap-4 md:gap-5 ames-marquee-track ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: reverse ? "44s" : "38s" }}
      >
        {track.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  const rowA = reviews.slice(0, 5);
  const rowB = reviews.slice(5);

  return (
    <section id="reviews" className="relative py-14 md:py-20 bg-[#0a0a0a] -mt-px overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,146,32,0.05),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 mb-10 md:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-xl">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-[#FF9220]/85 uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9220]" aria-hidden />
              Google reviews
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl lg:text-[3.25rem] font-[900] text-[#E9E8E3] uppercase leading-[0.92] tracking-tight">
              Wat klanten{" "}
              <span className="italic font-normal text-[#FF9220]">zeggen</span>
            </h2>
            <p className="mt-4 text-white/50 text-[15px] md:text-base leading-relaxed max-w-lg">
              Detailing op locatie in heel Zuid-Holland. Dit zijn ervaringen van klanten na
              interieur, exterieur en combo behandelingen bij Ames.
            </p>
          </div>

          <div className="ames-review-google-badge shrink-0 rounded-2xl border border-white/[0.08] bg-[#111111] px-5 py-4 md:px-6 md:py-5">
            <div className="flex items-center gap-2 mb-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-white/90">
                Google
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white">4,9</span>
              <Stars count={5} />
            </div>
            <p className="mt-2 text-[11px] text-white/40 leading-snug max-w-[220px]">
              Gebaseerd op klantbeoordelingen. Stijl Google Reviews, Ames detailing Zuid-Holland.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-4 md:space-y-5 mb-10 md:mb-12">
        <ReviewMarquee items={rowA} />
        <ReviewMarquee items={rowB} reverse />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-5">
        <Link
          href="/groei-scan"
          className="ames-btn-glow ames-btn-glow--blue relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[14px] font-semibold hover:scale-[1.02] transition-transform"
        >
          <span className="relative z-[1]">Boek je behandeling</span>
        </Link>
        <Link
          href="/#pakketten"
          className="inline-flex items-center gap-2 text-[13px] text-white/45 hover:text-[#FF9220] transition-colors"
        >
          Bekijk pakketten
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
