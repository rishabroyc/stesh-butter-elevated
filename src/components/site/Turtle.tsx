export function Turtle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden>
      <ellipse cx="100" cy="90" rx="60" ry="40" fill="#4A6741" />
      <path d="M50 90 Q100 30 150 90" fill="#5d7d54" />
      <circle cx="80" cy="70" r="8" fill="#3a5234" />
      <circle cx="120" cy="70" r="8" fill="#3a5234" />
      <circle cx="100" cy="90" r="10" fill="#3a5234" />
      <ellipse cx="170" cy="80" rx="18" ry="14" fill="#C8D8B0" />
      <circle cx="175" cy="76" r="2" fill="#1C1C1A" />
      <path d="M165 84 Q170 88 175 84" stroke="#1C1C1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="45" cy="115" rx="10" ry="6" fill="#C8D8B0" />
      <ellipse cx="155" cy="115" rx="10" ry="6" fill="#C8D8B0" />
      <ellipse cx="30" cy="95" rx="8" ry="10" fill="#C8D8B0" />
    </svg>
  );
}
