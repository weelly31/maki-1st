"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Section, SectionTitle, buttonStyles } from "./Section";

type Message = { name: string; text: string; at: string };

const TILTS = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-[0.5deg]"];

export function WallOfBlessings() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const submitting = useRef(false);

  useEffect(() => {
    fetch("/api/messages")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load messages.");
        return (await response.json()) as Message[];
      })
      .then(setMessages)
      .catch(() => setError("Messages are temporarily unavailable."))
      .finally(() => setLoading(false));
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const text = String(data.get("text") ?? "").trim();
    if (!name || !text) {
      setError("Please add your name and a message.");
      return;
    }
    submitting.current = true;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });
      const result = (await response.json()) as Message | { error?: string };
      if (!response.ok || !("name" in result)) {
        throw new Error("error" in result ? result.error : "Unable to save message.");
      }
      setMessages((current) => [result, ...current]);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save message.");
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }

  return (
    <Section id="wall" className="bg-gradient-to-b from-[#e4eed9] to-ivory">
      <SectionTitle eyebrow="Wall of blessings" title="MESSAGES OF LOVE & BLESSINGS" subtitle="Leave a birthday message, prayer, or blessing for Makarius." />

      <Reveal className="mx-auto max-w-xl">
        <form onSubmit={submit} className="space-y-3 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-beige">
          <input
            name="name"
            maxLength={60}
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-2xl border border-beige bg-white px-4 py-3 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
          <textarea
            name="text"
            rows={3}
            maxLength={400}
            placeholder="May God continue to guide you, protect you, and bless you as you grow."
            className="w-full rounded-2xl border border-beige bg-white px-4 py-3 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={sending} className={`${buttonStyles.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}>
            {sending ? "Posting…" : "💌 Post Blessing"}
          </button>
        </form>
      </Reveal>

      {loading && <p className="mt-8 text-center text-sm text-ink/60">Loading messages…</p>}
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {messages.map((m, i) => (
          <li key={`${m.at}-${i}`} className="animate-pop">
            <div className={`h-full rounded-2xl border border-gold/30 bg-white p-6 shadow-lg shadow-sage-deep/10 ${TILTS[i % TILTS.length]}`}>
              <p className="text-2xl text-gold">❝</p>
              <p className="mt-1 font-display text-xl leading-relaxed text-ink">{m.text}</p>
              <p className="mt-4 text-sm font-bold text-sage-deep">— {m.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-ink/50">Your messages will be saved here."</p>
    </Section>
  );
}
