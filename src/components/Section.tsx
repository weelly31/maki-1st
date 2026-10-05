import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  className = "",
  backdrop,
  children,
}: {
  id?: string;
  className?: string;
  backdrop?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative overflow-hidden px-5 py-20 sm:py-28 ${className}`}>
      {backdrop}
      <div className="relative z-10 mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.35em] ${light ? "text-white/80" : "text-gold"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-4xl font-semibold leading-tight sm:text-5xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-12 bg-current/50" />
        <span aria-hidden>✦</span>
        <span className="h-px w-12 bg-current/50" />
      </div>
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-white/90" : "text-ink/75"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export const buttonStyles = {
  primary: `${buttonBase} bg-sage-deep text-white shadow-lg shadow-sage-deep/25 hover:bg-[#244b5c]`,
  gold: `${buttonBase} bg-gradient-to-r from-[#b8923a] to-[#dcbb64] text-white shadow-lg shadow-gold/30 hover:brightness-105`,
  outline: `${buttonBase} border-2 border-sage-deep/40 bg-white/60 text-sage-deep hover:bg-white`,
};

