import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Telefoon op LAN-IP: zonder dit blokkeert Next 16 /_next/* → wit scherm (geen JS/CSS).
   * Alleen hostnaam, geen http:// of poort.
   */
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.2.3",
    "192.168.2.5",
    "192.168.2.1",
    "192.168.2.2",
    "192.168.2.4",
    "192.168.2.6",
    "192.168.2.7",
    "192.168.2.8",
    "192.168.2.9",
    "192.168.2.10",
  ],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
