"use client";

import { useSyncExternalStore } from "react";
import { Ambient } from "./Decor";
import { Reveal } from "./Reveal";
import { Section, SectionTitle } from "./Section";
import { EVENT } from "@/lib/event";

const TARGET = new Date(EVENT.startsAt).getTime();

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000) * 1000;

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/80 px-1 py-4 shadow-lg shadow-sage-deep/10 ring-1 ring-gold/30 backdrop-blur sm:py-6">
      <span className="font-display text-4xl font-semibold tabular-nums text-sage-deep sm:text-6xl">{value}</span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60 sm:text-xs">{label}</span>
    </div>
  );
}

export function Countdown() {
  // null on the server / first paint avoids hydration mismatches
  const now = useSyncExternalStore(subscribe, getNow, () => null);
  const diff = now === null ? null : TARGET - now;
  const done = diff !== null && diff <= 0;

  const pad = (n: number) => String(n).padStart(2, "0");
  const parts =
    diff === null || done
      ? null
      : {
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };

  return (
    <Section id="countdown" className="bg-gradient-to-b from-cream via-[#e6f0ea] to-sky/60" backdrop={<Ambient />}>
      <SectionTitle eyebrow={`${EVENT.dateLabel} • ${EVENT.timeLabel}`} title="COUNTING DOWN TO A DAY OF JOY" />
      <Reveal>
        {done ? (
          <p className="animate-pop text-center font-display text-4xl font-semibold sm:text-6xl">
            <span className="text-gold-gradient">TODAY WE CELEBRATE!</span> <span aria-hidden>🎉</span>
          </p>
        ) : (
          <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-5" role="timer" aria-live="off">
            <Unit value={parts ? String(parts.days) : "--"} label="Days" />
            <Unit value={parts ? pad(parts.hours) : "--"} label="Hours" />
            <Unit value={parts ? pad(parts.minutes) : "--"} label="Minutes" />
            <Unit value={parts ? pad(parts.seconds) : "--"} label="Seconds" />
          </div>
        )}
      </Reveal>
    </Section>
  );
}
