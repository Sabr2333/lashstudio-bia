const items = [
  { title: "Handwas", sub: "Exterieur & velgen" },
  { title: "Interieur", sub: "Stofzuigen & dashboard" },
  { title: "Polijsten", sub: "Lak & diepe glans" },
  { title: "Bescherming", sub: "Wax & sealant" },
  { title: "Op locatie", sub: "Heel Zuid-Holland" },
  { title: "Premium", sub: "A-merk producten" },
  { title: "Planning", sub: "Snelle bevestiging" },
  { title: "Showroom", sub: "Finish kwaliteit" },
];

export default function AmesMarqueeBand() {
  const track = [...items, ...items];

  return (
    <section
      className="ames-marquee-band relative hidden md:block bg-[#0a0a0a] border-y border-white/[0.05] overflow-hidden py-3 md:py-4 -mt-px"
      aria-label="Ames detailing diensten"
    >
      <p className="text-center font-[family-name:var(--font-fragment-mono)] text-[9px] md:text-[10px] tracking-[0.22em] uppercase mb-2 md:mb-2.5 px-4 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9220]/70" aria-hidden />
        <span className="text-white/38">Wij werken met</span>
        <span className="text-white/55">premium</span>
      </p>

      <div className="ames-marquee-mask">
        <div className="flex w-max gap-0 animate-marquee ames-marquee-track">
          {track.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="flex items-center shrink-0 px-6 md:px-10 border-r border-white/[0.06] min-w-[168px] md:min-w-[200px]"
            >
              <div>
                <p className="font-[family-name:var(--font-outfit)] text-sm md:text-[15px] font-semibold text-[#E9E8E3]/90 uppercase tracking-wide leading-tight">
                  {item.title}
                </p>
                <p className="font-[family-name:var(--font-fragment-mono)] text-[8px] md:text-[9px] text-white/38 uppercase tracking-[0.14em] mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
