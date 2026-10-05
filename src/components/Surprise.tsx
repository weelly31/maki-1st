"use client";

import { useState, type CSSProperties } from "react";
import { Section, SectionTitle } from "./Section";

const COLORS = ["#c9a24a", "#e3c777", "#a9bc96", "#7fb2d1", "#9cc3dd", "#ffffff"];

type Piece = { x: number; y: number; r: number; color: string; size: number; round: boolean; star: boolean };

function makePieces(): Piece[] {
  return Array.from({ length: 46 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 170;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 70,
      r: (Math.random() - 0.5) * 720,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      round: Math.random() > 0.5,
      star: Math.random() > 0.8,
    };
  });
}

export function Surprise() {
  const [open, setOpen] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);

  function openGift() {
    if (open) return;
    setOpen(true);
    setPieces(makePieces());
  }

  return (
    <Section id="surprise" className="bg-gradient-to-b from-sky/60 via-[#f6efe0] to-ivory">
      <SectionTitle eyebrow="Tap the gift" title="A LITTLE SURPRISE" />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <button
          type="button"
          onClick={openGift}
          aria-label="Open the gift"
          disabled={open}
          className={`relative h-44 w-44 ${open ? "" : "animate-wiggle"}`}
        >
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,226,140,0.9),transparent_70%)] transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
          />
          {/* box */}
          <div className="absolute inset-x-3 bottom-0 h-28 rounded-b-xl bg-gradient-to-b from-sage to-sage-deep shadow-xl">
            <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-gradient-to-b from-[#e3c777] to-[#b88f33]" />
          </div>
          {/* lid */}
          <div
            className={`absolute inset-x-0 top-[34px] z-10 h-16 origin-bottom-left rounded-md bg-gradient-to-b from-[#b8cca3] to-sage shadow-lg transition-all duration-700 ease-out ${
              open ? "-translate-y-14 translate-x-12 rotate-[32deg] opacity-0" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-gradient-to-b from-[#e3c777] to-[#b88f33]" />
            <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 gap-0.5">
              <span className="h-7 w-9 -rotate-[25deg] rounded-full border-[5px] border-[#d9b45a]" />
              <span className="h-7 w-9 rotate-[25deg] rounded-full border-[5px] border-[#d9b45a]" />
            </div>
          </div>
          {/* confetti */}
          {pieces.map((p, i) => (
            <span
              key={i}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/3 z-20"
              style={
                {
                  "--x": `${p.x}px`,
                  "--y": `${p.y + 220}px`,
                  "--r": `${p.r}deg`,
                  width: p.size,
                  height: p.size,
                  background: p.star ? "transparent" : p.color,
                  borderRadius: p.round ? "50%" : "2px",
                  animation: `confetti ${1.6 + (i % 5) * 0.25}s ease-out forwards`,
                } as CSSProperties
              }
            >
              {p.star && <span className="text-base leading-none" style={{ color: p.color }}>✦</span>}
            </span>
          ))}
        </button>

        <p className={`mt-4 text-sm font-semibold uppercase tracking-widest text-sage-deep ${open ? "invisible" : "animate-bob"}`}>
          Tap to open
        </p>

        <div
          aria-live="polite"
          className={`mt-4 rounded-3xl bg-white p-7 text-center shadow-xl ring-1 ring-gold/40 transition-all duration-1000 ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none h-0 translate-y-6 overflow-hidden p-0 opacity-0"
          }`}
        >
          <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
            “Thank you for being part of Makarius&apos;s first year of blessings. We can&apos;t wait to celebrate this special day with you!”
          </p>
          <p className="mt-3 text-2xl">✨💚✨</p>
        </div>
      </div>
    </Section>
  );
}
