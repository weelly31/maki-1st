"use client";

import { Reveal } from "./Reveal";
import { Section, SectionTitle, buttonStyles } from "./Section";
import { EVENT } from "@/lib/event";

const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

function addToCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Makarius 1st Birthday//EN",
    "BEGIN:VEVENT",
    `UID:makarius-1st-birthday@invitation`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(EVENT.startsAt)}`,
    `DTEND:${fmt(EVENT.endsAt)}`,
    "SUMMARY:Makarius Kleon Andrade's 1st Birthday Celebration",
    `LOCATION:${EVENT.venue}`,
    "DESCRIPTION:Theme: Creation of God. Makarius's birthday is November 9 but we celebrate together on November 7.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "makarius-1st-birthday.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetails() {
  return (
    <Section id="details" className="bg-gradient-to-b from-ivory to-cream">
      <SectionTitle eyebrow="Mark your calendar" title="THE CELEBRATION" />
      <Reveal from="zoom">
        <div className="mx-auto max-w-lg rounded-[2rem] bg-white p-3 shadow-2xl shadow-sage-deep/15">
          <div className="rounded-[1.6rem] border-2 border-dashed border-gold/50 p-7 text-center">
            <p className="text-4xl">🎂</p>
            <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink">
              Makarius Kleon Andrade&apos;s 1st Birthday Celebration
            </h3>
            <dl className="mt-6 space-y-4 text-left">
              {[
                ["📅", "Date", EVENT.dateLabel],
                ["⏰", "Time", EVENT.timeLabel],
                ["📍", "Venue", EVENT.venue],
              ].map(([icon, k, v]) => (
                <div key={k} className="flex items-center gap-4 rounded-2xl bg-cream/70 px-4 py-3">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-sage-deep">{k}</dt>
                    <dd className="font-display text-xl font-semibold text-ink">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-3">
              <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
                📍 View Location
              </a>
              <button type="button" onClick={addToCalendar} className={buttonStyles.outline}>
                📅 Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="mx-auto mt-10 max-w-lg rounded-3xl bg-sage/25 p-6 text-center ring-1 ring-sage">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sage-deep">A little note</p>
          <p className="mt-3 font-display text-xl leading-relaxed text-ink">
            “Makarius&apos;s birthday is November 9, but we will be celebrating this beautiful milestone together on November 7.”
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
