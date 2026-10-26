"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
    >
      <p className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-[#E9E8E3]">
        Pagina kon niet laden
      </p>
      <p className="text-sm text-white/45 max-w-sm">
        Vernieuw de pagina. Op telefoon via het LAN: stop oude dev-servers en start opnieuw met{" "}
        <code className="text-white/60">npm run dev</code>.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0a0a0a]"
      >
        Opnieuw proberen
      </button>
      {process.env.NODE_ENV === "development" && error?.message ? (
        <p className="mt-4 max-w-md text-left text-[11px] text-red-300/80 break-words">{error.message}</p>
      ) : null}
    </div>
  );
}
