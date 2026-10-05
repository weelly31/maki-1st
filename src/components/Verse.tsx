import { Ambient, Leaf, Sun } from "./Decor";
import { Reveal } from "./Reveal";

export function Verse() {
  return (
    <section
      id="verse"
      className="relative overflow-hidden bg-gradient-to-b from-[#bcdcec] via-[#dcecec] to-[#c9dcb8] px-5 py-24 sm:py-32"
    >
      <Ambient />
      <Sun className="animate-glow absolute right-4 top-6 h-28 w-28 drop-shadow-[0_0_30px_rgba(255,226,140,0.9)] sm:right-16 sm:h-40 sm:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-2 text-5xl sm:text-7xl">
        <span>🌿</span>
        <span>⛰️</span>
        <span className="hidden sm:inline">🌲</span>
        <span>🌿</span>
        <span>🌲</span>
      </div>
      <Leaf className="animate-sway absolute left-4 top-1/3 h-12 w-12 text-sage-deep/40" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sage-deep">God&apos;s Word</p>
          <blockquote className="mt-6 rounded-3xl bg-white/55 px-6 py-10 shadow-xl shadow-sage-deep/10 backdrop-blur-sm sm:px-12">
            <p className="font-display text-3xl font-semibold leading-snug text-ink sm:text-5xl">
              “I praise you because I am fearfully and wonderfully made.”
            </p>
            <footer className="mt-5 font-script text-2xl text-sage-deep">— Psalm 139:14</footer>
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-md text-lg leading-relaxed text-ink/85">
            “We thank God for the gift of Makarius and for every beautiful moment of his first year.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
