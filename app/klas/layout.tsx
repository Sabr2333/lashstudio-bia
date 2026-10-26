import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Minds · Exclusieve Klas met Xavier Molijn",
  description:
    "Sociale media als krachtig instrument — voor jou én je merk. Editie 01 · Max. 15 plekken.",
};

export default function KlasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
