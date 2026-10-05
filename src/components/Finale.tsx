import { Ambient, Leaf } from "./Decor";
import { Reveal } from "./Reveal";
import { EVENT } from "@/lib/event";

export function Finale() {
  return (
    <section
      id="finale"
      className="relative overflow-hidden bg-gradient-to-b from-[#f7d9b0] via-[#f4c7a8] to-[#a9bc96] px-5 pb-36 pt-24 text-center"
    >
      <Ambient tone="gold" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,240,190,0.95),rgba(255,214,150,0.4)_50%,transparent_70%)] animate-glow" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-2 text-5xl sm:text-7xl">
        <span>🌿</span>
        <span>⛰️</span>
        <span className="hidden sm:inline">🌲</span>
        <span>🌳</span>
        <span>🌲</span>
        <span>🌿</span>
      </div>
      <Leaf className="animate-sway absolute right-6 top-10 h-12 w-12 text-sage-deep/40" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal>
          <p className="font-display text-3xl font-semibold leading-snug text-ink sm:text-5xl">
            ONE YEAR OF LIFE.
          </p>
          <p className="font-display text-3xl font-semibold leading-snug text-ink sm:text-5xl">
            ONE YEAR OF LOVE.
          </p>
          <p className="font-display text-3xl font-semibold leading-snug text-white drop-shadow sm:text-5xl">
            ONE YEAR OF GOD&apos;S BLESSINGS.
          </p>
        </Reveal>
        <Reveal delay={200} className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-ink/80">Makarius Kleon Andrade</p>
          <p className="mt-3 font-script text-2xl leading-snug text-ink sm:text-4xl">“A little life, wonderfully created by God.”</p>
        </Reveal>
        <Reveal delay={300} className="mt-10">
          <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {EVENT.dateLabel} • {EVENT.timeLabel}
          </p>
          <p className="mt-1 font-display text-2xl text-ink/90 sm:text-3xl">{EVENT.venue}</p>
        </Reveal>
        <Reveal delay={400} className="mt-12">
          <p className="inline-block rounded-full bg-white/80 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-sage-deep shadow-xl backdrop-blur">
            See you at the celebration! 💚
          </p>
        </Reveal>
      </div>
    </section>
  );
}
