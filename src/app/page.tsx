import { getMusicSrc, getPhotos } from "@/lib/photos";
import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { Finale } from "@/components/Finale";
import { Hero } from "@/components/Hero";
import { InvitationShell } from "@/components/InvitationShell";
import { MusicPlayer } from "@/components/MusicPlayer";
import { NavBar } from "@/components/NavBar";
import { PhotoJourney } from "@/components/PhotoJourney";
import { RsvpSection } from "@/components/RsvpSection";
import { Surprise } from "@/components/Surprise";
import { Verse } from "@/components/Verse";
import { WallOfBlessings } from "@/components/WallOfBlessings";
import { YearOfBlessings } from "@/components/YearOfBlessings";

export default function Home() {
  return (
    <InvitationShell>
      <NavBar />
      <main>
        <Hero />
        <Verse />
        <YearOfBlessings />
        <PhotoJourney photos={getPhotos().journey} />
        <Countdown />
        <Surprise />
        <EventDetails />
        <RsvpSection />
        <WallOfBlessings />
        <Finale />
      </main>
      <MusicPlayer src={getMusicSrc()} />
    </InvitationShell>
  );
}
