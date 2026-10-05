"use client";

import { useState } from "react";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { Section, SectionTitle } from "./Section";

// Bible character for each month. Leave empty ("") for months not decided yet.
const CHARACTERS = [
  "Adam",
  "Joseph the Dreamer",
  "Jonah",
  "Abel",
  "Noah",
  "Moses",
  "David",
  "Samson",
  "Jacob",
  "",
  "",
  "",
];

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export function MonthByMonth({ photos }: { photos: (string | null)[] }) {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  return (
    <Section id="months" className="bg-gradient-to-b from-cream to-ivory">
      <SectionTitle eyebrow="Month 1 to Month 12" title="12 MONTHS OF BLESSINGS" subtitle="Watch Makarius grow, one month at a time ? each month with a hero from God's Word." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {MONTHS.map((m, i) => (
          <Reveal key={m} delay={(i % 4) * 80} from="zoom">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View month ${m} photo`}
              className="group relative block w-full overflow-hidden rounded-2xl bg-white p-1.5 text-left shadow-lg shadow-sage-deep/15 ring-1 ring-beige transition active:scale-95 sm:rounded-3xl sm:p-2"
            >
              <Photo
                src={photos[i]}
                alt={`Makarius at ${m} ${m === 1 ? "month" : "months"}`}
                sizes="(max-width: 640px) 45vw, 260px"
                className="aspect-[4/5] w-full rounded-xl transition duration-500 group-hover:scale-[1.03] sm:rounded-2xl"
              />
              {CHARACTERS[i] && (
                <span className="block px-1 pb-1 pt-2 text-center font-display text-sm font-semibold leading-tight text-ink sm:text-base">
                  {CHARACTERS[i]}
                </span>
              )}
              <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#b8923a] to-[#dcbb64] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow sm:left-4 sm:top-4">
                {m === 12 ? "12 Months 🎂" : `Month ${m}`}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Month ${active + 1}`}
          className="animate-pop fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-3xl bg-white p-3 shadow-2xl">
              <Photo
                src={photos[active]}
                alt={`Makarius at ${active + 1} months`}
                sizes="(max-width: 640px) 90vw, 384px"
                className="aspect-[4/5] w-full rounded-2xl"
              />
              <p className="pb-1 pt-3 text-center font-display text-2xl font-semibold text-ink">
                {active === 11 ? "12 Months — ONE Year!" : `Month ${active + 1}`}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setActive((active + 11) % 12)}
                className="h-12 w-12 rounded-full bg-white text-2xl text-sage-deep shadow active:scale-90"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="min-h-12 rounded-full bg-white px-6 text-sm font-bold uppercase tracking-wider text-sage-deep shadow active:scale-95"
              >
                Close
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setActive((active + 1) % 12)}
                className="h-12 w-12 rounded-full bg-white text-2xl text-sage-deep shadow active:scale-90"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
