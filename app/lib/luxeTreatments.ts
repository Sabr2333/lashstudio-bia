import { AMES_CONTACT, maPackages, type MaPackageId } from "./amesPackages";

export type TreatmentSlug = MaPackageId;

export type TreatmentPage = {
  slug: TreatmentSlug;
  packageId?: MaPackageId;
  tag: string;
  title: string;
  italic: string;
  intro: string;
  paragraphs: string[];
  points: string[];
  price: number | null;
  wasPrice: number | null;
  priceNote: string;
  planLabel: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  videoPoster?: string;
};

const shared = [
  "Bij minder dan 40% van de wimpers nog aanwezig, wordt er een nieuwe set in rekening gebracht. Zo kan ik de kwaliteit en het eindresultaat blijven garanderen.",
  "Annuleren of verzetten kan kosteloos tot 24 uur van tevoren. Bij annulering binnen 24 uur wordt 50% van de behandeling in rekening gebracht.",
  "Kom je meer dan 15 minuten te laat? Dan kan ik helaas niet garanderen dat we de volledige behandeling kunnen uitvoeren.",
  "Vermijd de eerste 24 uur water, stoom, sauna en oogmake-up. Gebruik geen oliehoudende producten rondom de ogen. Zo geniet je extra lang van mooie wimpers.",
];

export const treatmentPages: TreatmentPage[] = maPackages.map((pkg) => {
  const [title, ...rest] = pkg.title.split(" · ");
  return {
    slug: pkg.id,
    packageId: pkg.id,
    tag: pkg.tag,
    title,
    italic: rest.join(" · "),
    intro: pkg.description,
    paragraphs: shared,
    points: pkg.features,
    price: pkg.price,
    wasPrice: null,
    priceNote: "Prijs van de prijslijst.",
    planLabel: `Plan ${pkg.title}`,
  };
});

export function treatmentBySlug(slug: string) {
  return treatmentPages.find((page) => page.slug === slug) ?? null;
}

export function treatmentBookHref(page: TreatmentPage) {
  return page.packageId ? `/groei-scan?p=${page.packageId}` : "/groei-scan";
}

export const treatmentContact = AMES_CONTACT;
