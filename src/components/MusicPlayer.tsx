"use client";

import { useRef, useState } from "react";
import { createFileMusic, createMusic } from "@/lib/music";

export function MusicPlayer({ src }: { src: string | null }) {
  const music = useRef<ReturnType<typeof createMusic> | null>(null);
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    music.current ??= src ? createFileMusic(src) : createMusic();
    if (playing) {
      music.current.stop();
      setPlaying(false);
    } else {
      try {
        await music.current.start();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      className="fixed bottom-4 right-4 z-50 flex min-h-12 items-center gap-2 rounded-full bg-white/90 py-2 pl-3 pr-4 text-sm font-bold text-sage-deep shadow-lg shadow-black/10 ring-1 ring-gold/40 backdrop-blur transition active:scale-95"
    >
      <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-sage-deep text-white ${playing ? "animate-bob" : ""}`}>
        {playing ? "❚❚" : "♫"}
      </span>
      <span className="hidden min-[400px]:inline">{playing ? "Pause Music" : "Play Celebration Music"}</span>
      <span className="min-[400px]:hidden">{playing ? "Pause" : "Music"}</span>
    </button>
  );
}
