"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

const quickPrompts = [
  "Wat kost een nieuwe set?",
  "Wat kost opvullen?",
  "Wat is de 40% regel?",
  "Hoe laat annuleren?",
];

function botReply(input: string): string {
  const t = input.toLowerCase();

  if (t.includes("40") || t.includes("regel"))
    return "Bij minder dan 40% van de wimpers nog aanwezig, wordt er een nieuwe set in rekening gebracht.";

  if (t.includes("annul") || t.includes("verzet") || t.includes("24"))
    return "Annuleren of verzetten kan kosteloos tot 24 uur van tevoren. Binnen 24 uur wordt 50% van de behandeling in rekening gebracht.";

  if (t.includes("laat") || t.includes("15"))
    return "Kom je meer dan 15 minuten te laat? Dan kan ik helaas niet garanderen dat we de volledige behandeling kunnen uitvoeren.";

  if (t.includes("nazorg") || t.includes("water") || t.includes("sauna"))
    return "Vermijd de eerste 24 uur water, stoom, sauna en oogmake-up. Gebruik geen oliehoudende producten rondom de ogen.";

  if (t.includes("volume"))
    return "Alle volume sets: nieuwe set €65. Opvullen na 2 weken €35, na 3 weken €45, na 4 weken €55.";

  if (t.includes("one") || t.includes("opvul") || t.includes("prijs") || t.includes("kost") || t.includes("€") || t.includes("euro"))
    return "One by one: nieuwe set €50, 2 weken €30, 3 weken €40, 4 weken €50. Volume: nieuwe set €65, 2 weken €35, 3 weken €45, 4 weken €55.";

  if (t.includes("hoi") || t.includes("hallo") || t.includes("hey"))
    return "Hoi. Ik help je een set kiezen. Bellen of appen kan op 06 2048 5783.";

  return "Lashstudiobia: one by one vanaf €30 en volume vanaf €35. Bellen of appen kan op 06 2048 5783.";
}

type AmesPackageHelpModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AmesPackageHelpModal({ open, onClose }: AmesPackageHelpModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "One by one: nieuwe set €50, opvullen €30, €40 of €50. Volume: nieuwe set €65, opvullen €35, €45 of €55.",
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
      className="fixed inset-0 z-[10020] flex items-stretch justify-center sm:items-center sm:p-6"
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

      <div className="ames-package-help-modal ames-package-card relative z-[1] flex h-[100dvh] w-full max-h-[100dvh] flex-col bg-[#0f0f0f] shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:h-auto sm:max-h-[min(640px,92dvh)] sm:max-w-lg sm:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-5 sm:pt-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CD9861]/25 border border-[#CD9861]/35">
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Sluit venster"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#CD9861]/35 border border-[#CD9861]/30 text-white/90"
                    : "bg-white/[0.05] border border-white/[0.08] text-white/70"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <p className="text-[12px] text-white/35 font-[family-name:var(--font-fragment-mono)]">
              Lashstudiobia typt…
            </p>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:flex-wrap sm:px-5">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="shrink-0 text-left text-[12px] text-white/55 hover:text-white/85 border border-white/10 hover:border-[#ffffff]/30 rounded-full px-3 py-2 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          className="border-t border-white/[0.06] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-5"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 pl-4 pr-1.5 py-1.5 focus-within:border-[#CD9861]/40 transition-colors">
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
            <Link href="/groei-scan" className="text-[#ffffff]/80 hover:text-[#ffffff]">
              Start boek scan
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
