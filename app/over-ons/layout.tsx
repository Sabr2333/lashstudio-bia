import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons – Ames detailing",
  description:
    "Leer Ames detailing kennen: premium autowas en detailing op locatie in heel Zuid-Holland. Vakmanschap, flexibiliteit en showroom-resultaat.",
};

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
