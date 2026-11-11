import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons · Lashstudio Bia",
  description:
    "Lash stylist in Vlaardingen. Luxury natural en glam lashes. Soft, wispy en volume.",
};

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
