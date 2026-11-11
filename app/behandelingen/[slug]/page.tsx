import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Check, Phone } from "lucide-react";
import Navbar from "../../components/Navbar";
import MobileMenu from "../../components/MobileMenu";
import Footer from "../../components/Footer";
import ChatbotButton from "../../components/ChatbotButton";
import {
  treatmentBookHref,
  treatmentBySlug,
  treatmentContact,
  treatmentPages,
} from "../../lib/luxeTreatments";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatmentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = treatmentBySlug(slug);
  if (!page) return { title: "Behandeling · Lashstudiobia" };
  return {
    title: `${page.title} ${page.italic} · Lashstudiobia`,
    description: page.intro,
  };
}

function euro(amount: number) {
  return `€${amount.toLocaleString("nl-NL")}`;
}

export default async function BehandelingPage({ params }: Props) {
  const { slug } = await params;
  const page = treatmentBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <main className="luxe-light min-h-screen px-5 pb-20 pt-28 md:px-8 md:pt-36">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <Link
              href="/#pakketten"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#1A0200]/55 transition-colors hover:text-[#1A0200]"
            >
              <ArrowLeft className="h-4 w-4" />
              Alle behandelingen
            </Link>
            <p className="mb-4 font-[family-name:var(--font-fragment-mono)] text-[11px] uppercase tracking-[0.22em] text-[#CD9861]">
              {page.tag}
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase leading-[0.92] tracking-tight text-[#E9E8E3] md:text-6xl">
              {page.title}{" "}
              <span className="font-normal italic text-[#CD9861]">{page.italic}</span>
            </h1>
            {(page.video || page.image) && (
              <div className="relative mt-8 aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-[28px] bg-[#161616]">
                {page.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label={page.imageAlt ?? page.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  >
                    <source src={page.video} type="video/mp4" />
                  </video>
                ) : page.image ? (
                  <Image
                    src={page.image}
                    alt={page.imageAlt ?? page.title}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                ) : null}
              </div>
            )}
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-base">
              {page.intro}
            </p>
            <div className="mt-8 space-y-4 max-w-2xl text-[15px] leading-relaxed text-white/55">
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-[13px] leading-snug text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#CD9861]" strokeWidth={2.5} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl border border-black/10 bg-white p-6 text-[#1a0200] shadow-[0_16px_40px_rgba(0,0,0,0.28)] lg:sticky lg:top-28">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] uppercase tracking-[0.2em] text-[#CD9861]">
              Plan je behandeling
            </p>
            {page.wasPrice != null && (
              <p className="mt-4 text-sm text-black/35 line-through">{euro(page.wasPrice)}</p>
            )}
            <p className="mt-1 font-[family-name:var(--font-outfit)] text-4xl font-bold text-[#1a0200]">
              {page.price != null ? euro(page.price) : "Op aanvraag"}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-black/55">{page.priceNote}</p>
            <ul className="mt-5 space-y-2.5">
              {page.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-[13px] leading-snug text-[#1a0200]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#CD9861]" strokeWidth={2.5} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href={treatmentBookHref(page)}
              className="ames-package-btn ames-package-btn--primary mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[12px] font-semibold uppercase tracking-wider"
            >
              <Calendar className="relative z-[1] h-4 w-4" strokeWidth={2.25} />
              <span className="relative z-[1]">{page.planLabel}</span>
            </Link>
            <a
              href={treatmentContact.whatsappHref}
              className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-full border border-black/15 text-[12px] font-semibold uppercase tracking-wider text-[#1a0200]"
            >
              App ons
            </a>
            <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-[13px] text-black/60">
              <a href={treatmentContact.phoneHref} className="flex items-center gap-2 hover:text-[#1a0200]">
                <Phone className="h-4 w-4 text-[#CD9861]" />
                {treatmentContact.phoneDisplay}
              </a>
              <p>Annuleren of verzetten kan kosteloos tot 24 uur van tevoren.</p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <Navbar />
      <MobileMenu />
      <ChatbotButton />
    </>
  );
}
