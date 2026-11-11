const items = [
  { title: "One by one", sub: "Nieuwe set €50" },
  { title: "One by one", sub: "2 weken €30" },
  { title: "One by one", sub: "3 weken €40" },
  { title: "One by one", sub: "4 weken €50" },
  { title: "Volume", sub: "Nieuwe set €65" },
  { title: "Volume", sub: "2 weken €35" },
  { title: "Volume", sub: "3 weken €45" },
  { title: "Volume", sub: "4 weken €55" },
];

export default function AmesMarqueeBand() {
  const track = [...items, ...items];

  return (
    <section
      className="ames-marquee-band luxe-light relative border-y border-[#1A0200]/10 overflow-hidden py-3 md:py-4 -mt-px"
      aria-label="Prijslijst van Lashstudiobia"
    >
      <p className="text-center font-[family-name:var(--font-fragment-mono)] text-[9px] md:text-[10px] tracking-[0.22em] uppercase mb-2 md:mb-2.5 px-4 flex items-center justify-center gap-2">
        <span className="text-[#CD9861]">Lashstudiobia</span>
        <span className="text-white/55">prijslijst</span>
      </p>

      <div className="ames-marquee-mask">
        <div className="flex w-max gap-0 animate-marquee ames-marquee-track">
          {track.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="flex items-center shrink-0 px-5 md:px-10 border-r border-white/[0.06] min-w-[148px] md:min-w-[200px]"
            >
              <div>
                <p className="font-[family-name:var(--font-outfit)] text-[13px] md:text-[15px] font-semibold text-[#E9E8E3]/90 uppercase tracking-wide leading-tight">
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
