"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

const quickPrompts = [
  "Basic of Showroom, wat is het verschil?",
  "Alleen interieur of combo?",
  "Wat past bij een lease-auto?",
  "Wanneer kies ik Special?",
];

function botReply(input: string): string {
  const t = input.toLowerCase();

  if (t.includes("basic") && (t.includes("showroom") || t.includes("verschil")))
    return "Basic is een frisse onderhoudsbeurt: stofzuigen, dashboard, handwas — ideaal elke paar weken. Showroom gaat dieper (kleibehandeling, diep interieur, wax/sealant) en is onze meest gekozen stap voor een echt zichtbaar resultaat. Twijfel je? Meestal is Showroom de sweet spot.";

  if (t.includes("special"))
    return "Special is ons all-in pakket: alles van Showroom plus extra’s zoals geur/ozon, sterkere lakbescherming of polish waar nodig. Perfect vóór verkoop, lease-oplevering of als je het maximale wilt.";

  if (t.includes("combo") || t.includes("beide") || t.includes("binnen en buiten"))
    return "Combo = interieur én exterieur in één afspraak. Handig als je het hele voertuig in één keer showroomklaar wilt. Alleen vlekken binnen? Kies Interieur. Alleen lak/velgen? Kies Exterieur.";

  if (t.includes("interieur") && !t.includes("exterieur"))
    return "Kies Interieur als stoelen, geur, dashboard of matten je hoofdzorg zijn. Basic (vanaf €89) voor onderhoud, Showroom (€129) voor diep reinigen, Special (€199) voor geurbehandeling en maximale afwerking.";

  if (t.includes("exterieur") || t.includes("lak") || t.includes("velgen"))
    return "Exterieur richt zich op handwas, velgen en lak. Basic vanaf €69, Showroom €119 (decontaminatie + sealant), Special €169 (polish & langdurige bescherming). Veel klanten met parkschade of doffe lak gaan voor Showroom of Special.";

  if (t.includes("lease") || t.includes("oplever"))
    return "Voor lease-oplevering adviseren we vaak Showroom Combo (€229) of Special Combo (€299) — binnen & buiten grondig, met extra aandacht voor details die leasebedrijven checken. Via de boek scan kunnen we exact afstemmen op je auto.";

  if (t.includes("prijs") || t.includes("kost") || t.includes("euro") || t.includes("€"))
    return "Richtprijzen: Interieur Basic €89 · Showroom €129 · Special €199. Exterieur vanaf €69 · €119 · €169. Combo vanaf €129 · €229 · €299. Definitieve prijs hangt af van formaat en staat — na je scan geven we een duidelijke indicatie.";

  if (t.includes("polijst") || t.includes("ceramic") || t.includes("ppf") || t.includes("wrap"))
    return "Polijsten, ceramic coatings, PPF, wrappen en schadeherstel doen we op maat. Mail info@amesdetailing.nl of bel 06 40871617 met foto’s — dan stellen we een passend plan op.";

  if (t.includes("hoi") || t.includes("hallo") || t.includes("hey"))
    return "Hoi! Ik help je kiezen tussen Basic, Showroom en Special — voor interieur, exterieur of combo. Waar ligt je focus: binnen, buiten, of alles in één keer?";

  return "Vertel kort wat je auto nodig heeft (binnen, buiten, geur, lak, lease…) — dan wijs ik je naar Basic, Showroom of Special. Je kunt ook een van de suggesties hieronder tikken.";
}

type AmesPackageHelpModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AmesPackageHelpModal({ open, onClose }: AmesPackageHelpModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ik help je het juiste Ames-pakket kiezen. Interieur, exterieur of combo elk in Basic, Showroom of Special. Stel een vraag of kies een suggestie.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: botReply(trimmed) }]);
      setTyping(false);
    }, 450);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10020] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ames-help-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Sluiten"
        onClick={onClose}
      />

      <div className="ames-package-help-modal ames-package-card relative z-[1] w-full max-w-lg max-h-[min(640px,calc(100vh-2rem))] flex flex-col rounded-2xl md:rounded-3xl bg-[#0f0f0f] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1801AC]/25 border border-[#1801AC]/35">
              <MessageCircle className="w-4 h-4 text-white/80" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <h2
                id="ames-help-title"
                className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white truncate"
              >
                Vragen of hulp
              </h2>
              <p className="text-[11px] text-white/40 truncate">Kies het juiste pakket</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 h-9 w-9 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 flex items-center justify-center transition-colors"
            aria-label="Sluit venster"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 min-h-[200px]">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1801AC]/35 border border-[#1801AC]/30 text-white/90"
                    : "bg-white/[0.05] border border-white/[0.08] text-white/70"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <p className="text-[12px] text-white/35 font-[family-name:var(--font-fragment-mono)]">
              Ames assistent typt…
            </p>
          )}
        </div>

        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="text-left text-[11px] text-white/55 hover:text-white/85 border border-white/10 hover:border-[#FF9220]/30 rounded-full px-3 py-1.5 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          className="px-5 pb-5 pt-2 border-t border-white/[0.06]"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 pl-4 pr-1.5 py-1.5 focus-within:border-[#1801AC]/40 transition-colors">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Stel je vraag over pakketten…"
              className="flex-1 min-w-0 bg-transparent text-[13px] text-white placeholder:text-white/35 outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!draft.trim() || typing}
              className="shrink-0 h-9 w-9 rounded-full ames-package-btn ames-package-btn--primary flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Versturen"
            >
              <Send className="w-4 h-4 text-white/90" strokeWidth={2} />
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] text-white/30">
            Liever persoonlijk contact?{" "}
            <Link href="/groei-scan" className="text-[#FF9220]/80 hover:text-[#FF9220]">
              Start boek scan
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
