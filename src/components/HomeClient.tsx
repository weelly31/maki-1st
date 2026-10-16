"use client";

import { useState } from "react";
import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { Finale } from "@/components/Finale";
import { Hero } from "@/components/Hero";
import { InvitationShell } from "@/components/InvitationShell";
import { MusicPlayer } from "@/components/MusicPlayer";
import { NavBar } from "@/components/NavBar";
import { MonthByMonth } from "@/components/MonthByMonth";
import { PhotoJourney } from "@/components/PhotoJourney";
import { RsvpSection } from "@/components/RsvpSection";
import { Surprise } from "@/components/Surprise";
import { Verse } from "@/components/Verse";
import { WallOfBlessings } from "@/components/WallOfBlessings";
import { YearOfBlessings } from "@/components/YearOfBlessings";
import { FunnyPhotos } from "@/components/FunnyPhotos";

type Photos = {
  months: (string | null)[];
  journey: (string | null)[];
};

export function HomeClient({ photos, musicSrc }: { photos: Photos; musicSrc: string | null }) {
  const [playTrigger, setPlayTrigger] = useState(0);

  return (
    <InvitationShell onOpenInvitation={() => setPlayTrigger((prev) => prev + 1)}>
      <NavBar />
      <main>
        <Hero />
        <Verse />
        <YearOfBlessings />
        <MonthByMonth photos={photos.months} />
        <FunnyPhotos />
        <PhotoJourney photos={photos.journey} />
        <Countdown />
        <Surprise />
        <EventDetails />
        <RsvpSection />
        <WallOfBlessings />
        <Finale />
      </main>
      <MusicPlayer src={musicSrc} playTrigger={playTrigger} />
    </InvitationShell>
  );
}
