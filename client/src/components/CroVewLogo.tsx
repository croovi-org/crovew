export function CroVewLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="CroVew logo"
    >
      {/* Eye shape — representing "view" / observation */}
      <path
        d="M16 8C9 8 4 16 4 16s5 8 12 8 12-8 12-8-5-8-12-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner circle — the pupil / data point */}
      <circle
        cx="16"
        cy="16"
        r="4"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Signal lines radiating — real-time pulse */}
      <path
        d="M16 4v2M16 26v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
