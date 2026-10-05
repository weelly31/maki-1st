import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "photos");
const find = (name: string): string | null => {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(dir, `${name}.${ext}`))) return `/photos/${name}.${ext}`;
  }
  return null;
};
const many = (prefix: string, n: number) => Array.from({ length: n }, (_, i) => find(`${prefix}-${i + 1}`));

/** Resolved at build time: null means the photo hasn't been added yet, so a placeholder is shown. */
export function getPhotos() {
  return {
    hero: find("hero"),
    timeline: many("timeline", 5),
    journey: many("journey", 6),
  };
}

/** Optional background music: drop a file named celebration.mp3 / .m4a / .ogg / .wav into public/music/. */
export function getMusicSrc(): string | null {
  const musicDir = path.join(process.cwd(), "public", "music");
  for (const ext of ["mp3", "m4a", "ogg", "wav"]) {
    if (fs.existsSync(path.join(musicDir, `celebration.${ext}`))) return `/music/celebration.${ext}`;
  }
  return null;
}
