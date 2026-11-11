"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

const timeSlots = [
  { value: "consult", label: "Afspraak", hint: "Tijd stemmen we nog af" },
];

export type AgendaPick = {
  iso: string;
  label: string;
  slotValue: string;
  slotLabel: string;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDutch(date: Date) {
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function ShowcaseStepsAnim({
  onChange,
}: {
  onChange?: (pick: AgendaPick | null) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const monthLabel = cursor.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const items: Array<{ date: Date } | null> = [];
    for (let i = 0; i < lead; i++) items.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      items.push({ date: new Date(cursor.getFullYear(), cursor.getMonth(), day) });
    }
    while (items.length % 7 !== 0) items.push(null);
    return items;
  }, [cursor]);

  function emit(nextDate: Date | null, nextSlot: string | null) {
    if (!onChange) return;
    if (!nextDate || !nextSlot) {
      onChange(null);
      return;
    }
    const chosen = timeSlots.find((item) => item.value === nextSlot);
    onChange({
      iso: toIso(nextDate),
      label: formatDutch(nextDate),
      slotValue: nextSlot,
      slotLabel: chosen ? `${chosen.label}, ${chosen.hint}` : nextSlot,
    });
  }

  function pickDate(date: Date) {
    if (startOfDay(date) < today) return;
    setSelected(date);
    emit(date, slot);
  }

  function pickSlot(value: string) {
    setSlot(value);
    emit(selected, value);
  }

  const canPrev =
    cursor.getFullYear() > today.getFullYear() ||
    (cursor.getFullYear() === today.getFullYear() && cursor.getMonth() > today.getMonth());

  return (
    <div className="ames-live-card ames-steps-card relative w-full h-[500px] md:h-[540px] rounded-2xl md:rounded-3xl bg-[#0f0f0f]/95 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ffffff]/[0.04] via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 p-4 md:p-5 flex flex-col h-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] md:text-[11px] tracking-[0.2em] text-[#1A0200]/55 uppercase">
            Kies je datum
          </p>
          <span className="text-[10px] text-[#1A0200]/70 uppercase tracking-wider font-[family-name:var(--font-fragment-mono)]">
            Op locatie
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            aria-label="Vorige maand"
            disabled={!canPrev}
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="w-7 h-7 rounded-full border border-[#CD9861]/35 text-[#CD9861] flex items-center justify-center disabled:opacity-25 hover:border-[#CD9861]/70"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="font-[family-name:var(--font-outfit)] text-[14px] md:text-[15px] font-semibold text-[#1A0200] capitalize">
            {monthLabel}
          </p>
          <button
            type="button"
            aria-label="Volgende maand"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="w-7 h-7 rounded-full border border-[#CD9861]/35 text-[#CD9861] flex items-center justify-center hover:border-[#CD9861]/70"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((day) => (
            <span
              key={day}
              className="text-center text-[9px] md:text-[10px] uppercase tracking-wide text-[#1A0200]/40 font-[family-name:var(--font-fragment-mono)]"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, index) => {
            if (!cell) return <span key={`empty-${index}`} className="h-8 md:h-9" />;
            const past = startOfDay(cell.date) < today;
            const isSelected = selected ? toIso(selected) === toIso(cell.date) : false;
            const isToday = toIso(cell.date) === toIso(today);
            return (
              <button
                key={toIso(cell.date)}
                type="button"
                disabled={past}
                onClick={() => pickDate(cell.date)}
                className={`h-8 md:h-9 rounded-lg text-[12px] md:text-[13px] font-medium transition-colors ${
                  isSelected
                    ? "bg-[#CD9861] text-[#071018]"
                    : past
                      ? "text-[#1A0200]/25 cursor-not-allowed"
                      : "text-[#1A0200] hover:bg-[#1A0200]/[0.05]"
                } ${isToday && !isSelected ? "ring-1 ring-[#CD9861]/70" : ""}`}
              >
                {cell.date.getDate()}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#1A0200]/45 mb-2 font-[family-name:var(--font-fragment-mono)]">
            Tijdvak
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {timeSlots.map((item) => {
              const active = slot === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => pickSlot(item.value)}
                  className={`rounded-lg border px-2 py-1.5 text-left transition-colors ${
                    active
                      ? "border-[#CD9861]/60 bg-[#CD9861]/20 text-[#1A0200]"
                      : "border-[#1A0200]/10 bg-[#1A0200]/[0.03] text-[#1A0200]/70 hover:border-[#1A0200]/20"
                  }`}
                >
                  <span className="block text-[12px] font-semibold leading-tight">{item.label}</span>
                  <span className="block text-[10px] text-[#1A0200]/45 leading-tight">{item.hint}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-[#1A0200]/55 min-h-[16px]">
            {selected && slot
              ? `${formatDutch(selected)} · ${timeSlots.find((item) => item.value === slot)?.label}`
              : "Kies een datum en een tijdvak."}
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-[#1A0200]/45">
            Je voorkeursdatum is geen garantie. We bevestigen de afspraak nog.
          </p>
        </div>
      </div>
    </div>
  );
}
