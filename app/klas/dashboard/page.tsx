"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LogOut, RefreshCw, Mail, Phone, Building2, Clock, Search } from "lucide-react";

interface Aanmelding {
  id: string;
  naam: string;
  email: string;
  bedrijf: string;
  submittedAt: string;
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Zojuist";
  if (mins < 60) return `${mins}m geleden`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}u geleden`;
  const days = Math.floor(hours / 24);
  return `${days}d geleden`;
}

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username === "BusinessMinds" && password === "BM2026!") {
      localStorage.setItem("bm-dashboard-token", "bm-dashboard-token");
      onLogin("bm-dashboard-token");
    } else {
      setError("Ongeldige inloggegevens");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-10">
          <Image src="/bm-logo.png" alt="Business Minds" width={60} height={60} className="w-16 h-16 object-contain" />
        </div>

        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-amber-400/50 uppercase mb-4">
            Dashboard
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white uppercase tracking-tight">
            Inloggen
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
              Gebruikersnaam
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Gebruikersnaam"
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.06] transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2.5">
              Wachtwoord
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[13px] text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-[#0a0a0a] text-[13px] font-semibold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all cursor-pointer"
          >
            {loading ? "Laden..." : "Inloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardScreen({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [items, setItems] = useState<Aanmelding[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/klas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      }
    } catch {}
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = items.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.naam.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.bedrijf?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col text-white">
      <header className="border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/bm-logo.png" alt="Business Minds" width={36} height={36} className="w-9 h-9 object-contain" />
          <div>
            <p className="text-white font-semibold text-[14px]">Business Minds</p>
            <p className="text-amber-400/50 text-[11px]">Klas aanmeldingen</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchData}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[12px] hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Uitloggen
          </button>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto w-full px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl bg-[#111] border border-white/5 p-5">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2">
              Totaal
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">{items.length}</p>
          </div>
          <div className="rounded-2xl bg-[#111] border border-white/5 p-5">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2">
              Vandaag
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
              {items.filter((a) => new Date(a.submittedAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="rounded-2xl bg-[#111] border border-white/5 p-5">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2">
              Deze week
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
              {items.filter((a) => {
                const d = new Date(a.submittedAt);
                return d >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
              }).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op naam, e-mail of bedrijf..."
            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-20">
              <RefreshCw className="w-6 h-6 text-white/20 animate-spin mx-auto mb-4" />
              <p className="text-white/30 text-[14px]">Laden...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-[14px]">
                {search ? "Geen resultaten gevonden" : "Nog geen aanmeldingen"}
              </p>
            </div>
          ) : (
            filtered.map((a) => {
              const date = new Date(a.submittedAt);
              return (
                <div
                  key={a.id}
                  className="rounded-2xl bg-[#111] border border-white/5 p-5 flex items-center justify-between hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-400/20 flex items-center justify-center text-amber-400 text-[13px] font-bold uppercase">
                      {a.naam.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-[14px]">{a.naam}</p>
                      <div className="flex items-center gap-4 mt-0.5">
                        <span className="text-white/30 text-[12px] flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {a.email}
                        </span>
                        {a.bedrijf && (
                          <span className="text-white/30 text-[12px] flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {a.bedrijf}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/20 text-[11px]">
                    <span className="hidden sm:flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {date.toLocaleDateString("nl-NL")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(date)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default function KlasDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bm-dashboard-token");
    if (saved) setToken(saved);
    setChecking(false);
  }, []);

  function handleLogout() {
    localStorage.removeItem("bm-dashboard-token");
    setToken(null);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-white/20 animate-spin" />
      </div>
    );
  }

  if (!token) return <LoginScreen onLogin={setToken} />;
  return <DashboardScreen token={token} onLogout={handleLogout} />;
}
