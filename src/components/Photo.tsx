"use client";

import Image from "next/image";
import { useState } from "react";
import { Leaf, Sun } from "./Decor";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Shows the real photo when it exists in /public/photos, otherwise a soft placeholder. */
export function Photo({ src, alt, className = "", sizes = "(max-width: 768px) 90vw, 480px", priority }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      {failed || !src ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-sky via-ivory to-sage/50 text-sage-deep"
        >
          <Sun className="h-14 w-14 opacity-80" />
          <Leaf className="absolute bottom-3 left-3 h-10 w-10 rotate-[-30deg] opacity-60" />
          <Leaf className="absolute bottom-3 right-3 h-8 w-8 rotate-[40deg] opacity-50" />
          <span className="px-4 text-center font-display text-sm opacity-80">
            Photo coming soon
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

