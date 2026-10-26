import type { Metadata, Viewport } from "next";
import { Inter, Fragment_Mono, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Ames detailing – Auto poetsen & reiniging op locatie",
  description:
    "Professionele auto detailing en reiniging op locatie. Ames detailing komt naar jou toe zodat jouw auto weer showroomklaar is.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${fragmentMono.variable} ${outfit.variable} ${playfair.variable} antialiased`}
    >
      <body
        className="min-h-screen flex flex-col font-[family-name:var(--font-inter)] bg-[#0a0a0a] text-white"
        style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
