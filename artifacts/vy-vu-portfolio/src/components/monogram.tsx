/**
 * The Vy Vu mark: a record whose "VV" is drawn as one waveform zigzag.
 * The sheen sweeps around on hover/focus of the nearest `.group`, so it reads as a spin
 * without rotating the letters.
 */
export function Monogram({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19.5" fill="hsl(var(--cocoa))" />
      <g className="monogram-sheen">
        <path d="M20 3 A17 17 0 0 1 35.5 13" fill="none" stroke="hsl(var(--cream) / .35)" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <circle cx="20" cy="20" r="14" fill="none" stroke="hsl(var(--cream) / .12)" />
      <circle cx="20" cy="20" r="10.5" fill="none" stroke="hsl(var(--cream) / .12)" />
      <circle cx="20" cy="20" r="7.5" fill="hsl(var(--coral))" />
      <polyline points="7,14 13.5,26 20,14 26.5,26 33,14" fill="none" stroke="hsl(var(--cream))" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
