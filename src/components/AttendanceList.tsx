"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Rsvp = {
  attending: boolean;
  name: string;
  guests: number;
  message: string;
  at: string;
};

export function AttendanceList() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/rsvps")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load attendance.");
        return (await response.json()) as Rsvp[];
      })
      .then(setRsvps)
      .catch(() => setError("Hindi ma-load ang attendance list ngayon."));
  }, []);

  const attendingCount = rsvps.reduce(
    (total, rsvp) => total + (rsvp.attending ? rsvp.guests : 0),
    0,
  );
  const notAttendingCount = rsvps.filter((rsvp) => !rsvp.attending).length;

  return (
    <main className="min-h-screen bg-ivory px-5 py-12 text-ink">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-bold text-sage-deep">← Back to invitation</Link>
        <h1 className="mt-6 font-display text-4xl font-semibold">Attendance List</h1>
        <p className="mt-2 text-ink/70">Makarius&apos;s 1st Birthday Celebration</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Summary label="Total responses" value={rsvps.length} />
          <Summary label="Will attend" value={attendingCount} />
          <Summary label="Cannot attend" value={notAttendingCount} />
        </div>

        {error && <p className="mt-8 rounded-2xl bg-red-50 p-4 text-red-700">{error}</p>}
        {!error && rsvps.length === 0 && (
          <p className="mt-8 rounded-2xl bg-white p-6 shadow ring-1 ring-beige">No attendance responses yet.</p>
        )}
        <div className="mt-8 space-y-4">
          {rsvps.map((rsvp) => (
            <article key={`${rsvp.at}-${rsvp.name}`} className="rounded-3xl bg-white p-5 shadow ring-1 ring-beige">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-semibold">{rsvp.name}</h2>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${rsvp.attending ? "bg-sage/40 text-sage-deep" : "bg-cream text-ink/70"}`}>
                  {rsvp.attending ? `Yes · ${rsvp.guests} ${rsvp.guests === 1 ? "person" : "people"}` : "No · Cannot attend"}
                </span>
              </div>
              {rsvp.message && <p className="mt-3 text-ink/75">{rsvp.message}</p>}
              <p className="mt-3 text-xs text-ink/50">{new Date(rsvp.at).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow ring-1 ring-beige">
      <p className="text-sm text-ink/60">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-sage-deep">{value}</p>
    </div>
  );
}
