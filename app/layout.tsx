import type { Metadata, Viewport } from "next";
import { Inter, Fragment_Mono, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import AmesBookingHost from "./components/AmesBookingHost";
import MaLoadingScreen from "./components/MaLoadingScreen";

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
  title: "Lashstudio Bia · Wimperextensions in Vlaardingen",
  description:
    "Lash stylist in Vlaardingen. Luxury natural en glam lashes. Soft, wispy en volume.",
  icons: {
    icon: "/lashstudio-bia-logo.png",
    apple: "/lashstudio-bia-logo.png",
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
        className="min-h-screen flex flex-col font-[family-name:var(--font-inter)] bg-[#0a0a0a] text-[#F6EDE4]"
        style={{ backgroundColor: "#0a0a0a", color: "#F6EDE4" }}
      >
        <div id="ma-loader" className="ma-loader" role="status" aria-label="Lashstudio Bia">
          <img
            src="/lashstudio-bia-logo.png"
            alt=""
            width={512}
            height={512}
            className="ma-loader__logo"
          />
        </div>
        <MaLoadingScreen />
        {children}
        <AmesBookingHost />
        <CookieBanner />
      </body>
    </html>
  );
}
