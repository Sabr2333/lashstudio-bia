import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AmesPackagesSection from "../components/AmesPackagesSection";
import Navbar from "../components/Navbar";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";

export const metadata = {
  title: "Pakketten · Lashstudiobia",
  description:
    "Prijslijst van Lashstudiobia. One by one en alle volume sets.",
};

export default function PakkettenPage() {
  return (
    <div className="luxe-light min-h-screen">
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 pt-24 md:px-8 md:pt-28">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#1A0200]/55 transition-colors hover:text-[#1A0200]"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>
      </div>
      <AmesPackagesSection showMaatwerk className="luxe-light !pt-8 md:!pt-10" />
      <Footer />
      <Navbar />
      <MobileMenu />
      <ChatbotButton />
    </div>
  );
}
