import { getMusicSrc, getPhotos } from "@/lib/photos";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  const photos = getPhotos();

  return <HomeClient photos={photos} musicSrc={getMusicSrc()} />;
}