"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LogOut, RefreshCw, Mail, Phone, Building2, Clock, ChevronDown, ChevronUp, Search } from "lucide-react";

interface Scan {
  id: string;
  contact: {
    naam: string;
    email: string;
    telefoon: string;
    bedrijf: string;
  };
  answers: { question: string; answers: string[] }[];
  submittedAt: string;
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

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("dashboard-token", data.token);
        onLogin(data.token);
      } else {
        setError("Ongeldige inloggegevens");
      }
    } catch {
      setError("Er ging iets mis");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="Vanthom" width={48} height={48} className="w-12 h-12 object-contain" />
        </div>

        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-fragment-mono)] text-[11px] tracking-[0.2em] text-white/30 uppercase mb-4">
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
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
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
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[13px] text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-white text-[#0a0a0a] text-[13px] font-semibold uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer"
          >
            {loading ? "Laden..." : "Inloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ScanCard({ scan }: { scan: Scan }) {
  const [open, setOpen] = useState(false);
  const date = new Date(scan.submittedAt);
  const timeAgo = getTimeAgo(date);

  return (
    <div className="rounded-2xl bg-[#111] border border-white/5 overflow-hidden hover:border-white/10 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-[13px] font-bold uppercase">
            {scan.contact.naam.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="text-white font-semibold text-[15px]">{scan.contact.naam}</p>
            <p className="text-white/30 text-[12px] flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {scan.contact.email}
              </span>
              {scan.contact.bedrijf && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {scan.contact.bedrijf}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/20 text-[11px] flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {timeAgo}
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-white/30" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/30" />
          )}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-white/5 pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
              <Phone className="w-4 h-4 text-white/30" />
              <span className="text-white/60 text-[13px]">{scan.contact.telefoon}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
              <Mail className="w-4 h-4 text-white/30" />
              <span className="text-white/60 text-[13px]">{scan.contact.email}</span>
            </div>
          </div>

          <div className="space-y-4">
            {scan.answers.map((a, i) => (
              <div key={i}>
                <p className="text-[11px] font-semibold text-white/25 uppercase tracking-[0.15em] mb-2">
                  {a.question}
                </p>
                <div className="flex flex-wrap gap-2">
                  {a.answers.map((ans) => (
                    <span
                      key={ans}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/60 text-[12px]"
                    >
                      {ans}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-white/15 text-[11px] font-[family-name:var(--font-fragment-mono)]">
            {date.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })} om{" "}
            {date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      )}
    </div>
  );
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

function DashboardScreen({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchScans = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setScans(data);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  const filtered = scans.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.contact.naam.toLowerCase().includes(q) ||
      s.contact.email.toLowerCase().includes(q) ||
      s.contact.bedrijf?.toLowerCase().includes(q) ||
      s.contact.telefoon.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Vanthom" width={36} height={36} className="w-9 h-9 object-contain" />
          <div>
            <p className="text-white font-semibold text-[14px]">Vanthom Dashboard</p>
            <p className="text-white/30 text-[11px]">Groei Scan aanvragen</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchScans}
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
              Totaal aanvragen
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
              {scans.length}
            </p>
          </div>
          <div className="rounded-2xl bg-[#111] border border-white/5 p-5">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2">
              Vandaag
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
              {scans.filter((s) => new Date(s.submittedAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="rounded-2xl bg-[#111] border border-white/5 p-5">
            <p className="font-[family-name:var(--font-fragment-mono)] text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2">
              Deze week
            </p>
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
              {scans.filter((s) => {
                const d = new Date(s.submittedAt);
                const now = new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return d >= weekAgo;
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

        {/* Scan list */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-20">
              <RefreshCw className="w-6 h-6 text-white/20 animate-spin mx-auto mb-4" />
              <p className="text-white/30 text-[14px]">Laden...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-[14px]">
                {search ? "Geen resultaten gevonden" : "Nog geen scan aanvragen ontvangen"}
              </p>
            </div>
          ) : (
            filtered.map((scan) => <ScanCard key={scan.id} scan={scan} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard-token");
    if (saved) setToken(saved);
    setChecking(false);
  }, []);

  function handleLogout() {
    localStorage.removeItem("dashboard-token");
    setToken(null);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-white/20 animate-spin" />
      </div>
    );
  }

  if (!token) {
    return <LoginScreen onLogin={setToken} />;
  }

  return <DashboardScreen token={token} onLogout={handleLogout} />;
}
