export type PackageCategory = "interieur" | "exterieur" | "combo";
export type PackageTier = "basic" | "showroom" | "special";

export const categoryLabels: Record<PackageCategory, string> = {
  interieur: "Interieur",
  exterieur: "Exterieur",
  combo: "Combo",
};

export const categoryHints: Record<PackageCategory, string> = {
  interieur: "Stoelen, dashboard, geur & matten",
  exterieur: "Handwas, velgen, lak & glans",
  combo: "Binnen & buiten in één afspraak",
};

export const tierMeta: Record<
  PackageTier,
  { title: string; tag: string; description: string }
> = {
  basic: {
    title: "Basic Pack",
    tag: "Instap",
    description: "Frisse basis, ideaal voor onderhoud tussen grotere beurten.",
  },
  showroom: {
    title: "Showroom Pack",
    tag: "Populair",
    description: "Diepere reiniging en bescherming, onze meest gekozen stap.",
  },
  special: {
    title: "Special Pack",
    tag: "All-in",
    description: "Maximale glans, bescherming en afwerking.",
  },
};

export const packagePrices: Record<PackageCategory, Record<PackageTier, number>> = {
  interieur: { basic: 89, showroom: 129, special: 199 },
  exterieur: { basic: 69, showroom: 119, special: 169 },
  combo: { basic: 129, showroom: 229, special: 299 },
};

export const tierOrder: PackageTier[] = ["basic", "showroom", "special"];

export function formatPackageChoice(category: PackageCategory, tier: PackageTier) {
  return `${tierMeta[tier].title} · ${categoryLabels[category]}`;
}

export const AMES_CONTACT = {
  email: "info.smiletoshinenl@gmail.com",
  emailHref: "mailto:info.smiletoshinenl@gmail.com",
  phoneDisplay: "06 2048 5783",
  phoneHref: "tel:+31620485783",
  whatsappDisplay: "06 2048 5783",
  whatsappHref: "https://wa.me/31620485783",
  area: "Vlaardingen",
  instagramHref: "https://www.instagram.com/lashstudiobia/",
} as const;

export const DRIVE_CLEAN_HOURS = [
  "Maandag t/m zondag, 13:00 tot 22:00",
  "Alleen op afspraak",
] as const;

export const DRIVE_CLEAN_TRAVEL = [
  "Lash stylist in Vlaardingen",
  "Luxury natural en glam lashes",
  "Soft, wispy en volume",
  "Afspraak via WhatsApp",
] as const;

export function formatEuro(amount: number) {
  return `€${amount.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function isPackageCategory(value: string | null): value is PackageCategory {
  return value === "interieur" || value === "exterieur" || value === "combo";
}

export function isPackageTier(value: string | null): value is PackageTier {
  return value === "basic" || value === "showroom" || value === "special";
}

export function buildWhatsAppBookingUrl(message: string) {
  return `${AMES_CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export type MaPackageId =
  | "one-nieuwe"
  | "one-2"
  | "one-3"
  | "one-4"
  | "volume-nieuwe"
  | "volume-2"
  | "volume-3"
  | "volume-4";

export const maPackages: Array<{
  id: MaPackageId;
  title: string;
  price: number;
  tag: string;
  description: string;
  features: string[];
  href: string;
  popular?: boolean;
}> = [
  {
    id: "one-nieuwe",
    href: "/behandelingen/one-nieuwe",
    title: "One by one · nieuwe set",
    price: 50,
    tag: "One by one",
    description: "Nieuwe set, one by one.",
    features: ["Nieuwe set", "One by one", "€50"],
  },
  {
    id: "one-2",
    href: "/behandelingen/one-2",
    title: "One by one · 2 weken",
    price: 30,
    tag: "One by one",
    description: "Opvullen na 2 weken, one by one.",
    features: ["2 weken opvullen", "One by one", "€30"],
  },
  {
    id: "one-3",
    href: "/behandelingen/one-3",
    title: "One by one · 3 weken",
    price: 40,
    tag: "One by one",
    description: "Opvullen na 3 weken, one by one.",
    features: ["3 weken opvullen", "One by one", "€40"],
  },
  {
    id: "one-4",
    href: "/behandelingen/one-4",
    title: "One by one · 4 weken",
    price: 50,
    tag: "One by one",
    description: "Opvullen na 4 weken, one by one.",
    features: ["4 weken opvullen", "One by one", "€50"],
  },
  {
    id: "volume-nieuwe",
    href: "/behandelingen/volume-nieuwe",
    title: "Volume · nieuwe set",
    price: 65,
    tag: "Alle volume sets",
    description: "Nieuwe set, alle volume sets.",
    features: ["Nieuwe set", "Alle volume sets", "€65"],
  },
  {
    id: "volume-2",
    href: "/behandelingen/volume-2",
    title: "Volume · 2 weken",
    price: 35,
    tag: "Alle volume sets",
    description: "Opvullen na 2 weken, alle volume sets.",
    features: ["2 weken opvullen", "Alle volume sets", "€35"],
  },
  {
    id: "volume-3",
    href: "/behandelingen/volume-3",
    title: "Volume · 3 weken",
    price: 45,
    tag: "Alle volume sets",
    description: "Opvullen na 3 weken, alle volume sets.",
    features: ["3 weken opvullen", "Alle volume sets", "€45"],
  },
  {
    id: "volume-4",
    href: "/behandelingen/volume-4",
    title: "Volume · 4 weken",
    price: 55,
    tag: "Alle volume sets",
    description: "Opvullen na 4 weken, alle volume sets.",
    features: ["4 weken opvullen", "Alle volume sets", "€55"],
  },
];

export const lashHouseRules = [
  {
    title: "40% regel",
    text: "Bij minder dan 40% van de wimpers nog aanwezig, wordt er een nieuwe set in rekening gebracht. Zo kan ik de kwaliteit en het eindresultaat blijven garanderen.",
  },
  {
    title: "Afspraken en annuleren",
    text: "Annuleren of verzetten kan kosteloos tot 24 uur van tevoren. Bij annulering binnen 24 uur wordt 50% van de behandeling in rekening gebracht.",
  },
  {
    title: "Te laat",
    text: "Kom je meer dan 15 minuten te laat? Dan kan ik helaas niet garanderen dat we de volledige behandeling kunnen uitvoeren.",
  },
  {
    title: "Nazorg",
    text: "Vermijd de eerste 24 uur water, stoom, sauna en oogmake-up. Gebruik geen oliehoudende producten rondom de ogen. Zo geniet je extra lang van mooie wimpers.",
  },
] as const;

export const maExtraGroups: ReadonlyArray<{
  id: string;
  title: string;
  items: readonly string[];
}> = [];

export function isMaPackageId(value: string | null | undefined): value is MaPackageId {
  return maPackages.some((item) => item.id === value);
}

export function maPackageById(id: string | null | undefined) {
  return maPackages.find((item) => item.id === id) ?? null;
}

export function getBookingPackageOptions() {
  return [
    ...maPackages.map((item) => ({
      value: item.id,
      label: `${item.title} (€${item.price.toLocaleString("nl-NL")})`,
    })),
    { value: "onbekend", label: "Weet ik nog niet, graag advies" },
  ];
}
