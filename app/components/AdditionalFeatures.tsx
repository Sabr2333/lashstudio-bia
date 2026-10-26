"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "JEX",
    category: "Applicatie",
    year: "2026",
  },
  {
    title: "Business Minds",
    category: "Landingspagina",
    year: "2026",
  },
  {
    title: "SteamyDetails",
    category: "Applicatie",
    year: "2026",
  },
];

function ProjectRow({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played.current) return;
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          setTimeout(() => {
            setActive(true);
            setTimeout(() => setActive(false), 800);
          }, index * 200);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <Link
      ref={ref}
      key={project.title}
      href="#"
      className={`group flex items-center justify-between py-8 border-t border-white/10 hover:px-4 transition-all duration-500 ${active ? "px-4" : ""}`}
    >
      <div className="flex items-center gap-6 md:gap-12">
        <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-white/20 hidden md:block">
          0{index + 1}
        </span>
        <h3 className={`text-xl md:text-2xl font-semibold transition-colors duration-500 ${active ? "text-white/80" : "text-white group-hover:text-white/80"}`}>
          {project.title}
        </h3>
      </div>
      <div className="flex items-center gap-6 md:gap-12">
        <span className="text-sm text-white/30 hidden md:block">
          {project.category}
        </span>
        <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-white/20">
          {project.year}
        </span>
        <ArrowUpRight className={`w-4 h-4 transition-colors duration-500 ${active ? "text-white/40" : "text-white/10 group-hover:text-white/40"}`} />
      </div>
    </Link>
  );
}

export default function AdditionalFeatures() {
  return (
    <section id="work" className="relative py-12 md:py-20 bg-[#0e0e0e] -mt-px overflow-hidden">
      <div className="section-edge-fade-top section-edge-fade-top--from-black" aria-hidden />
      <div className="relative z-10 mx-auto px-8 max-md:px-5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 pl-0">
          <div>
            <p className="font-[family-name:var(--font-fragment-mono)] text-xs tracking-widest text-white/40 uppercase mb-4">
              Geselecteerd werk
            </p>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-bold text-white leading-tight">
              Recente <span className="italic font-normal text-[#FF9220]">projecten</span>
            </h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1.5 text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            Bekijk alle projecten
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
