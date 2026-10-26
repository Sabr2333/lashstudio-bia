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
    description: "Frisse basis — ideaal voor onderhoud tussen grotere beurten.",
  },
  showroom: {
    title: "Showroom Pack",
    tag: "Populair",
    description: "Diepere reiniging en bescherming — onze meest gekozen stap.",
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
  email: "info@amesdetailing.nl",
  emailHref: "mailto:info@amesdetailing.nl",
  phoneDisplay: "06 40871617",
  phoneHref: "tel:+31640871617",
  whatsappHref: "https://wa.me/31640871617",
  area: "Heel Zuid-Holland",
} as const;

export function isPackageCategory(value: string | null): value is PackageCategory {
  return value === "interieur" || value === "exterieur" || value === "combo";
}

export function isPackageTier(value: string | null): value is PackageTier {
  return value === "basic" || value === "showroom" || value === "special";
}

export function buildWhatsAppBookingUrl(message: string) {
  return `${AMES_CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export function getBookingPackageOptions() {
  const options: { value: string; label: string }[] = [];
  (Object.keys(categoryLabels) as PackageCategory[]).forEach((cat) => {
    tierOrder.forEach((tier) => {
      options.push({
        value: `${cat}-${tier}`,
        label: `${categoryLabels[cat]} · ${tierMeta[tier].title} (vanaf €${packagePrices[cat][tier]})`,
      });
    });
  });
  options.push({ value: "maatwerk", label: "Maatwerk (polijst, coating, PPF, wrap…)" });
  options.push({ value: "onbekend", label: "Weet ik nog niet — graag advies" });
  return options;
}
