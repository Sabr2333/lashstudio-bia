"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AmesBookingFlow from "../components/AmesBookingFlow";
import { prefillFromSearch } from "../lib/amesAvailability";

function ScanBody() {
  const params = useSearchParams();
  const prefill = prefillFromSearch(params);

  return (
    <div className="ames-page-shell luxe-light min-h-screen">
      <header className="flex items-center justify-between px-6 py-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-[14px] text-white/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Terug naar home
        </Link>
        <Link href="/">
          <Image
            src="/lashstudio-bia-logo.png"
            alt="Lashstudio Bia"
            width={488}
            height={200}
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>
      </header>
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 md:px-6">
        <AmesBookingFlow prefill={prefill} />
      </main>
    </div>
  );
}

export default function GroeiScanPage() {
  return (
    <Suspense fallback={<div className="luxe-light min-h-screen" />}>
      <ScanBody />
    </Suspense>
  );
}
