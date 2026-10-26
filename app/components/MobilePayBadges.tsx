type MobilePayBadgesProps = {
  className?: string;
  size?: "sm" | "md";
};

/** iDEAL + Apple Pay — compact naast o.a. “Boek via scan”. */
export default function MobilePayBadges({ className = "", size = "sm" }: MobilePayBadgesProps) {
  const md = size === "md";
  return (
    <span
      className={`inline-flex items-center shrink-0 gap-1 ${md ? "gap-1.5" : "gap-1"} ${className}`}
      aria-label="Betalen met iDEAL of Apple Pay mogelijk"
    >
      <span className="ames-pay-badge ames-pay-badge--ideal inline-flex overflow-hidden rounded-[4px]" title="iDEAL">
        <svg
          viewBox="0 0 52 18"
          className={md ? "h-[1.15rem] w-[2.55rem]" : "h-[1.05rem] w-[2.35rem]"}
          aria-hidden
        >
          <rect width="52" height="18" rx="4" fill="#CC0066" />
          <text
            x="26"
            y="12.5"
            textAnchor="middle"
            fill="#fff"
            fontSize="10"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            iDEAL
          </text>
        </svg>
      </span>
      <span
        className={`ames-pay-badge ames-pay-badge--apple inline-flex items-center gap-0.5 rounded-[4px] bg-black px-1.5 py-[3px] ${md ? "h-[1.15rem] px-2" : "h-[1.05rem]"}`}
        title="Apple Pay"
      >
        <svg viewBox="0 0 14 16" className={`shrink-0 ${md ? "h-3 w-3" : "h-2.5 w-2.5"}`} aria-hidden>
          <path
            fill="#fff"
            d="M11.4 8.4c0-1.65 1.35-2.45 1.4-2.5-0.76-1.1-1.95-1.25-2.37-1.27-1.01-0.1-1.97 0.6-2.48 0.6-0.51 0-1.3-0.58-2.14-0.56-1.1 0.02-2.12 0.64-2.69 1.63-1.15 1.99-0.29 4.93 0.82 6.55 0.55 0.8 1.21 1.7 2.08 1.67 0.83-0.03 1.15-0.54 2.15-0.54 1 0 1.28 0.54 2.15 0.52 0.89-0.02 1.45-0.82 1.99-1.63 0.63-0.92 0.89-1.81 0.9-1.86-0.02-0.01-1.73-0.66-1.75-2.61zM9.5 2.6c0.46-0.55 0.76-1.32 0.68-2.08-0.66 0.03-1.45 0.44-1.92 0.99-0.42 0.49-0.79 1.28-0.69 2.03 0.73 0.06 1.48-0.37 1.93-0.94z"
          />
        </svg>
        <span className="text-[8px] font-semibold text-white leading-none tracking-tight">Pay</span>
      </span>
    </span>
  );
}
