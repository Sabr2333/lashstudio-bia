import {
  buildWhatsAppBookingUrl,
  categoryLabels,
  formatEuro,
  isMaPackageId,
  maPackageById,
  type MaPackageId,
} from "./amesPackages";

/** Servicegebied voor consultaanvragen. */
export const AMES_SERVICE_AREA = "nederland";

export const AMES_TIME_SLOTS = [
  { id: "consult", label: "Afspraak", hint: "Tijd stemmen we nog af" },
] as const;

export type AmesSlotId = (typeof AMES_TIME_SLOTS)[number]["id"];

export type AmesBookingDraft = {
  regionId: string;
  date: string;
  slotId: AmesSlotId;
  packageId: MaPackageId;
  extras: string[];
  naam: string;
  telefoon: string;
  email: string;
};

export type AmesBookingRecord = AmesBookingDraft & {
  id: string;
  status: "aangevraagd";
  priceFrom: number;
  createdAt: string;
  /** Blijft leeg tot de echte agenda gekoppeld is. Dan komt hier het event-id en de uitnodiging voor de klant. */
  calendarSync: null | {
    provider: string;
    eventId: string;
    customerNotifiedAt?: string;
  };
};

export type BookingPrefill = {
  regionId?: string;
  date?: string;
  slotId?: string;
  packageId?: MaPackageId;
  extras?: string[];
  naam?: string;
  telefoon?: string;
  email?: string;
  adres?: string;
  aandacht?: string;
};

export const AMES_BOOKING_EVENT = "ames-open-booking";

export function openAmesBooking(prefill?: BookingPrefill) {
  window.dispatchEvent(new CustomEvent(AMES_BOOKING_EVENT, { detail: prefill ?? {} }));
}

export function prefillFromSearch(params: URLSearchParams): BookingPrefill {
  const packageId = params.get("p");
  return {
    regionId: params.get("region") ?? undefined,
    date: params.get("date") ?? undefined,
    slotId: params.get("slot") ?? undefined,
    packageId: isMaPackageId(packageId) ? packageId : undefined,
  };
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/**
 * Vrije tijdvakken voor een dag.
 * Vrijblijvend consult, ook op avonden en in het weekend.
 */
export function getAvailableSlots(regionId: string, isoDate: string): AmesSlotId[] {
  void regionId;
  if (!isoDate) return [];
  const date = parseIso(isoDate);
  const today = startOfToday();
  if (Number.isNaN(date.getTime()) || date < today) return [];
  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + 60);
  if (date > horizon) return [];
  return ["consult"];
}

export function slotLabel(id: string) {
  const slot = AMES_TIME_SLOTS.find((item) => item.id === id);
  return slot ? `${slot.label}, ${slot.hint}` : id;
}

export function formatBookingDate(iso: string) {
  return parseIso(iso).toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function bookingWhatsAppMessage(draft: AmesBookingDraft, bookingId?: string) {
  const pack = maPackageById(draft.packageId);
  const prijs = pack ? formatEuro(pack.price) : "";
  const lines = [
    "Nieuwe boeking via de site",
    "",
    "Klant",
    `Naam: ${draft.naam}`,
    `Telefoon: ${draft.telefoon}`,
    `E-mail: ${draft.email}`,
    "",
    "Pakket",
    pack?.title ?? draft.packageId,
    ...(pack?.description ? [pack.description] : []),
    ...(prijs ? [`Totaal: ${prijs}`] : []),
    "",
    "Voorkeursdatum",
    formatBookingDate(draft.date),
    "Voorkeurstijd: nog af te stemmen",
    "Het exacte tijdstip bevestigen jullie nog.",
    "",
    "Extra",
    draft.extras.length ? draft.extras.join(", ") : "Geen extra's",
    "",
    "Dit is een aanvraag, nog geen bevestigde afspraak.",
  ];
  if (bookingId) lines.push("", `Kenmerk: ${bookingId}`);
  return lines.join("\n");
}

export function bookingWhatsAppUrl(draft: AmesBookingDraft, bookingId?: string) {
  return buildWhatsAppBookingUrl(bookingWhatsAppMessage(draft, bookingId));
}

export async function submitAmesBooking(draft: AmesBookingDraft) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (!response.ok) throw new Error("Boeking opslaan lukte niet");
  return (await response.json()) as { id: string };
}

export { categoryLabels };
