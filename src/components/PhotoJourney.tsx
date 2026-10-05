"use client";

import { useRef, useState } from "react";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { Section, SectionTitle } from "./Section";

const STAGES = [
  { label: "November 9 — His Beginning", short: "His Beginning" },
  { label: "Growing Up", short: "Growing Up" },
  { label: "First Smiles", short: "First Smiles" },
  { label: "Family Moments", short: "Family" },
  { label: "Little Adventures", short: "Adventures" },
  { label: "Today — One Beautiful Year", short: "Today" },
];

export function PhotoJourney({ photos }: { photos: (string | null)[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(i: number) {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2, behavior: "smooth" });
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const s = c as HTMLElement;
      const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }

  return (
    <Section id="journey" className="bg-gradient-to-b from-ivory to-cream px-0 sm:px-5">
      <SectionTitle eyebrow="Birth until today" title="LITTLE MOMENTS, BIG BLESSINGS" subtitle="Swipe through Makarius's journey." />

      <Reveal>
        <div
          ref={track}
          onScroll={onScroll}
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[10vw] pb-6 sm:px-[calc(50%-190px)]"
        >
          {STAGES.map((s, i) => (
            <figure
              key={s.label}
              className={`w-[80vw] max-w-[380px] shrink-0 snap-center transition duration-500 ${
                i === active ? "scale-100 opacity-100" : "scale-90 opacity-60"
              }`}
            >
              <div className="rounded-3xl bg-white p-3 shadow-xl shadow-sage-deep/15 ring-1 ring-beige">
                <Photo
                  src={photos[i]}
                  alt={s.label}
                  sizes="(max-width: 640px) 80vw, 380px"
                  className="aspect-[4/5] w-full rounded-2xl"
                />
                <figcaption className="px-2 pb-2 pt-4 text-center font-display text-2xl font-semibold text-ink">
                  {s.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 px-4">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(Math.max(0, active - 1))}
            className="h-11 w-11 rounded-full bg-white text-xl text-sage-deep shadow ring-1 ring-beige active:scale-90"
          >
            ‹
          </button>
          <div className="flex gap-2" role="tablist">
            {STAGES.map((s, i) => (
              <button
                key={s.short}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={s.short}
                onClick={() => goTo(i)}
                className="flex h-8 w-6 items-center justify-center"
              >
                <span className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-2.5 bg-sage/60"}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(Math.min(STAGES.length - 1, active + 1))}
            className="h-11 w-11 rounded-full bg-white text-xl text-sage-deep shadow ring-1 ring-beige active:scale-90"
          >
            ›
          </button>
        </div>
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-widest text-sage-deep">
          {STAGES[active].short}
        </p>
      </Reveal>
    </Section>
  );
}
