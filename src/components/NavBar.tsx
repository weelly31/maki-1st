"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/event";

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between p-3">
      <a
        href="#hero"
        className="rounded-full bg-white/80 px-4 py-2 font-script text-base text-sage-deep shadow backdrop-blur"
      >
        Makarius · 1
      </a>
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/80 shadow backdrop-blur"
        >
          <span className={`h-0.5 w-5 bg-sage-deep transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-sage-deep transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-sage-deep transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
        {open && (
          <nav className="animate-pop absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 p-2 shadow-xl backdrop-blur">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-ink hover:bg-cream"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
