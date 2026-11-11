"use client";

import { useEffect, useRef } from "react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/lashstudiobia/", icon: InstagramIcon },
];

const VIDEOS: { src: string; label: string }[] = [
  { src: "/videos/lash-stock.mp4", label: "Soft 5D lashes, C curl" },
  { src: "/videos/lash-stock.mp4", label: "Good lashes. Good mood." },
  { src: "/videos/lash-stock.mp4", label: "Say it with lashes" },
];

function VideoCard({ src, label }: { src?: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el || !src) return;
    const play = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    el.addEventListener("loadeddata", play);
    return () => {
      observer.disconnect();
      el.removeEventListener("loadeddata", play);
    };
  }, [src]);

  return (
    <article
      data-video-card
      className="aspect-[3/5] w-[58vw] max-w-[210px] shrink-0 snap-start overflow-hidden rounded-[22px] border border-white/10 bg-[#111111] sm:w-[240px] sm:max-w-[250px]"
      aria-label={label}
    >
      {src ? (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : null}
    </article>
  );
}

export default function VideoCardsSection() {
  const slots = VIDEOS;

  return (
    <section id="videos" className="luxe-light relative pt-4 pb-12 md:pb-16 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 mb-6 md:mb-8">
        <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] md:text-xs tracking-[0.22em] text-[#CD9861]/80 uppercase mb-3">
          Volg ons
        </p>
        <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl lg:text-[3.25rem] font-[900] text-[#E9E8E3] uppercase leading-[0.92] tracking-tight">
          In <span className="italic font-normal text-[#CD9861]">beeld</span>
        </h2>
        <div className="mt-5 flex items-center gap-2.5">
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-[#CD9861]"
              >
                <item.icon />
              </a>
            ))}
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1320px] gap-4 overflow-x-auto pl-5 pr-5 pb-2 snap-x snap-mandatory scroll-pl-5 md:px-8 md:scroll-pl-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slots.map((item, index) => (
          <VideoCard key={"src" in item && item.src ? item.src : index} src={"src" in item ? item.src : undefined} label={item.label} />
        ))}
      </div>
    </section>
  );
}
