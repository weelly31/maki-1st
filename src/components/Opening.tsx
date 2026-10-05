"use client";

import { useEffect, useState } from "react";
import { Ambient } from "./Decor";
import { EVENT } from "@/lib/event";

type Phase = "closed" | "opening" | "leaving";

export function Opening({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    if (phase === "closed") return;
    const t1 = setTimeout(() => setPhase("leaving"), 2400);
    const t2 = setTimeout(onOpened, 3300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, onOpened]);

  const open = phase !== "closed";

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto bg-gradient-to-b from-sky via-[#eef6f6] to-cream transition-opacity duration-1000 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Ambient leaves />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] z-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,236,170,0.75),transparent_65%)] animate-glow" />

      <div className="relative z-10 mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-4 px-5 py-5 sm:gap-6 sm:py-8 text-center">
        <div
          className={`transition-all duration-700 ${open ? "-translate-y-2 opacity-0" : ""}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">You are invited</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink min-[400px]:text-4xl sm:text-5xl">
            MAKARIUS
            <br />
            KLEON ANDRADE
          </h1>
          <p className="mt-2 font-script text-xl leading-snug text-sage-deep min-[400px]:text-2xl">
            Celebrating ONE Beautiful Year of God&apos;s Blessings
          </p>
          <p className="mt-3 text-xs font-bold tracking-widest min-[400px]:text-sm text-ink/80">
            {EVENT.dateLabel} • {EVENT.timeLabel}
          </p>
          <p className="text-sm tracking-wide text-ink/70">{EVENT.venue}</p>
        </div>

        <div className="w-[min(72vw,340px,calc((100svh-330px)*1.5))] min-w-[170px] [perspective:1000px]">
          <div className="relative aspect-[3/2] drop-shadow-[0_18px_30px_rgba(95,122,84,0.25)]">
            <div className="absolute inset-0 rounded-md bg-[#d9c39b]" />
            <div
              className={`absolute inset-x-[7%] top-[8%] bottom-[8%] z-20 flex flex-col items-center justify-center rounded-sm bg-ivory text-center shadow-md transition-transform duration-[1300ms] ease-out ${
                open ? "-translate-y-[62%] delay-[900ms]" : ""
              }`}
            >
              <span className="font-script text-2xl text-gold-gradient">Makarius</span>
              <span className="font-display text-5xl font-semibold text-sage-deep">1</span>
            </div>
            <div
              className="absolute inset-0 z-30 rounded-md bg-[#e8d5ad]"
              style={{ clipPath: "polygon(0 100%, 0 0, 50% 66%, 100% 0, 100% 100%)" }}
            />
            <div
              className={`absolute inset-x-0 top-0 h-[66%] origin-top bg-[#efdfbb] transition-transform duration-[900ms] ease-in-out ${
                open ? "z-10 [transform:rotateX(180deg)]" : "z-40 delay-0"
              }`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transitionProperty: "transform",
              }}
            />
            <div
              className={`absolute left-1/2 top-[52%] z-50 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#dcbb64] to-[#a8802c] text-lg text-white shadow-lg transition-opacity duration-300 ${
                open ? "opacity-0" : "animate-bob"
              }`}
              aria-hidden
            >
              ✦
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPhase("opening")}
          disabled={open}
          className={`min-h-12 rounded-full bg-gradient-to-r from-[#b8923a] to-[#dcbb64] px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-gold/40 transition active:scale-95 ${
            open ? "scale-90 opacity-0" : "hover:brightness-105"
          }`}
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
