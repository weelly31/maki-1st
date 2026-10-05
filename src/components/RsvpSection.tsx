"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Section, SectionTitle, buttonStyles } from "./Section";
import { useStoredList } from "@/lib/storage";

type Rsvp = {
  attending: boolean;
  name: string;
  guests: number;
  message: string;
  at: string;
};

const field =
  "w-full rounded-2xl border border-beige bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

export function RsvpSection() {
  const [, addRsvp] = useStoredList<Rsvp>("maki-rsvps");
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const [done, setDone] = useState<"yes" | "no" | null>(null);
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const rsvp: Rsvp = {
      attending: choice === "yes",
      name: String(data.get("name") ?? "").trim(),
      guests: choice === "yes" ? Number(data.get("guests") ?? 1) : 0,
      message: String(data.get("message") ?? "").trim(),
      at: new Date().toISOString(),
    };
    setSending(true);
    addRsvp(rsvp);
    const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(rsvp),
        });
      } catch {
        /* the local copy is kept even if the network fails */
      }
    }
    setSending(false);
    setDone(choice);
  }

  return (
    <Section id="rsvp" className="bg-gradient-to-b from-cream to-[#e4eed9]">
      <SectionTitle
        eyebrow="RSVP"
        title="WILL YOU CELEBRATE WITH US?"
        subtitle="“We would be blessed to have you join us as we celebrate Makarius's first year of life.”"
      />
      <Reveal className="mx-auto max-w-md">
        {done ? (
          <div className="animate-pop rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-gold/40">
            <p className="text-5xl">{done === "yes" ? "💚" : "🤍"}</p>
            <p className="mt-4 font-display text-3xl font-semibold text-ink">
              {done === "yes"
                ? "Thank you! We can't wait to celebrate with you! 💚"
                : "Thank you for letting us know. You'll be in our hearts! 🤍"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => setChoice("yes")}
                aria-pressed={choice === "yes"}
                className={`${buttonStyles.primary} ${choice === "yes" ? "ring-4 ring-gold/50" : ""}`}
              >
                💚 Yes, I&apos;ll be there!
              </button>
              <button
                type="button"
                onClick={() => setChoice("no")}
                aria-pressed={choice === "no"}
                className={`${buttonStyles.outline} ${choice === "no" ? "ring-4 ring-gold/50" : ""}`}
              >
                🤍 Sorry, I can&apos;t attend
              </button>
            </div>

            {choice && (
              <form key={choice} onSubmit={submit} className="animate-pop mt-6 space-y-4 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-beige">
                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-sage-deep">Full Name</span>
                  <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
                </label>
                {choice === "yes" && (
                  <label className="block">
                    <span className="mb-1 block text-sm font-bold text-sage-deep">Number of Guests</span>
                    <input name="guests" type="number" inputMode="numeric" min={1} max={20} defaultValue={1} required className={field} />
                  </label>
                )}
                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-sage-deep">
                    {choice === "yes" ? "Message for Makarius" : "Message (optional)"}
                  </span>
                  <textarea name="message" rows={3} maxLength={400} className={field} placeholder="Write a little note…" />
                </label>
                <button type="submit" disabled={sending} className={`${buttonStyles.gold} w-full disabled:opacity-60`}>
                  {sending ? "Sending…" : "Send RSVP"}
                </button>
              </form>
            )}
          </>
        )}
      </Reveal>
    </Section>
  );
}
