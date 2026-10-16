import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { Section, SectionTitle } from "./Section";

const FUNNY_PHOTOS = [
  { image: "/photos/funny1.jpg", title: "The gigil face", caption: "Oh, try me one more time!" },
  { image: "/photos/funny2.jpg", title: "Taste Test", caption: "Oops, did I just eat all of that?" },
  { image: "/photos/funny3.jpg", title: "Crying Face", caption: "Tata made me cry." },

];

export function FunnyPhotos() {
  return (
    <Section id="funny" className="bg-cream">
      <SectionTitle
        eyebrow="Giggles welcome"
        title="FUNNY PHOTO CORNER"
        subtitle="Bring your best silly faces and capture the little moments everyone will laugh about later."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {FUNNY_PHOTOS.map((photo, index) => (
          <Reveal key={photo.title} delay={index * 80} from="zoom">
            <article className="overflow-hidden rounded-3xl bg-white p-2 shadow-lg shadow-sage-deep/10 ring-1 ring-beige">
              <Photo
                src={photo.image}
                alt={photo.title}
                sizes="(max-width: 640px) 90vw, 280px"
                className="aspect-[4/5] w-full rounded-2xl"
              />
              <div className="px-3 pb-3 pt-4">
                <h3 className="font-display text-xl font-semibold text-ink">{photo.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{photo.caption}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
