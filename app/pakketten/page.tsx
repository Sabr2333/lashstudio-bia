import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AmesPackagesSection from "../components/AmesPackagesSection";
import Navbar from "../components/Navbar";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";

export const metadata = {
  title: "Pakketten – Ames detailing",
  description:
    "Basic, Showroom en Special voor interieur, exterieur en combo. Autodetailing op locatie in heel Zuid-Holland.",
};

export default function PakkettenPage() {
  return (
    <>
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 pt-24 md:pt-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/45 text-sm hover:text-white/75 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>
      </div>
      <AmesPackagesSection showMaatwerk className="!pt-8 md:!pt-10" />
      <Footer />
      <Navbar />
      <MobileMenu />
      <ChatbotButton />
    </>
  );
}
