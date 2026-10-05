import { Ambient, Leaf } from "./Decor";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { EVENT } from "@/lib/event";
import { getPhotos } from "@/lib/photos";

export function Hero() {
  const PHOTOS = getPhotos();
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-sky via-[#f1f6f2] to-ivory px-5 pb-20 pt-24 sm:pt-28"
    >
      <Ambient leaves />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,236,170,0.8),transparent_65%)] animate-glow" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal from="zoom" className="relative">
          <div className="rounded-t-full border-[6px] border-white bg-white p-2 shadow-2xl shadow-sage-deep/20 ring-1 ring-gold/50">
            <Photo
              src={PHOTOS.hero}
              alt="Makarius Kleon Andrade"
              priority
              sizes="(max-width: 640px) 80vw, 360px"
              className="h-[min(52svh,360px)] w-[min(72vw,280px)] rounded-t-full sm:h-[460px] sm:w-[360px]"
            />
          </div>
          <Leaf className="absolute -left-6 bottom-6 h-14 w-14 -rotate-45 text-sage" />
          <Leaf className="absolute -right-6 bottom-12 h-12 w-12 rotate-[60deg] text-sage-deep/70" />
        </Reveal>

        <Reveal delay={150} className="mt-10">
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            MAKARIUS KLEON ANDRADE
          </h1>
          <p className="mt-2 font-script text-4xl font-bold sm:text-6xl">
            <span className="text-gold-gradient">Turning ONE!</span> <span aria-hidden>🎂</span>
          </p>
        </Reveal>

        <Reveal delay={250}>
          <blockquote className="mx-auto mt-6 max-w-lg font-display text-xl leading-relaxed text-ink/80 sm:text-2xl">
            “One year of life, one year of love, and countless blessings from God.”
          </blockquote>
        </Reveal>

        <Reveal delay={350} className="mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-5">
          <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-beige sm:col-span-2 sm:flex sm:flex-col sm:justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ink/50">Born</p>
            <p className="mt-1 font-display text-2xl text-ink/80">{EVENT.birthdayLabel}</p>
          </div>
          <div className="relative rounded-2xl bg-white p-5 shadow-xl shadow-gold/20 ring-2 ring-gold sm:col-span-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#b8923a] to-[#dcbb64] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
              Save the date
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sage-deep">Celebration</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {EVENT.shortDate}
            </p>
            <p className="text-lg font-bold text-gold">{EVENT.timeLabel}</p>
          </div>
        </Reveal>

        <a
          href="#verse"
          aria-label="Scroll down"
          className="animate-bob mt-12 text-3xl text-sage-deep/70"
        >
          ⌄
        </a>
      </div>
    </section>
  );
}



