import type { CSSProperties } from "react";

type SvgProps = { className?: string; style?: CSSProperties };

export function Cloud({ className = "", style }: SvgProps) {
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} aria-hidden fill="currentColor">
      <path d="M40 70a26 26 0 0 1-2-52 36 36 0 0 1 68-8 30 30 0 0 1 48 20 24 24 0 0 1 2 40z" />
    </svg>
  );
}

export function Leaf({ className = "", style }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      <path d="M8 56C8 26 26 8 56 8c0 30-18 48-48 48z" fill="currentColor" />
      <path d="M8 56 40 24" stroke="#fbf7ee" strokeOpacity=".55" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Sun({ className = "", style }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <g stroke="#d9b45a" strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2="18" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="22" fill="#f1d27f" />
    </svg>
  );
}

const SPARKLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 3 + (i % 4) * 2,
  delay: (i % 7) * 0.6,
}));

const LEAVES = [
  { left: 6, dur: 19, delay: 0, size: 22, dx: 40 },
  { left: 24, dur: 24, delay: 6, size: 18, dx: -30 },
  { left: 47, dur: 21, delay: 3, size: 26, dx: 50 },
  { left: 66, dur: 26, delay: 10, size: 20, dx: -45 },
  { left: 85, dur: 22, delay: 2, size: 24, dx: 30 },
];

/** Decorative drifting clouds, glowing sparkles and (optionally) falling leaves. */
export function Ambient({
  clouds = true,
  sparkles = true,
  leaves = false,
  tone = "white",
}: {
  clouds?: boolean;
  sparkles?: boolean;
  leaves?: boolean;
  tone?: "white" | "gold";
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {clouds && (
        <>
          <Cloud className="animate-drift absolute -left-10 top-[8%] w-56 text-white/70 sm:w-80" />
          <Cloud
            className="animate-drift absolute -right-16 top-[38%] w-44 text-white/60 sm:w-64"
            style={{ animationDuration: "32s", animationDirection: "alternate-reverse" }}
          />
          <Cloud
            className="animate-drift absolute bottom-[6%] left-[10%] w-40 text-white/50 sm:w-56"
            style={{ animationDuration: "28s" }}
          />
        </>
      )}
      {sparkles &&
        SPARKLES.map((s, i) => (
          <span
            key={i}
            className={`animate-twinkle absolute rounded-full ${tone === "gold" ? "bg-gold" : "bg-white"} shadow-[0_0_10px_3px_rgba(255,236,170,0.8)]`}
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
      {leaves &&
        LEAVES.map((l, i) => (
          <Leaf
            key={i}
            className="animate-fall absolute top-0 text-sage/60"
            style={
              {
                left: `${l.left}%`,
                width: l.size,
                height: l.size,
                animationDuration: `${l.dur}s`,
                animationDelay: `${l.delay}s`,
                "--dx": `${l.dx}px`,
              } as CSSProperties
            }
          />
        ))}
    </div>
  );
}
