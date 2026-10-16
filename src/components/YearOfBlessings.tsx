import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { Section, SectionTitle } from "./Section";

const ITEMS = [
  { icon: "🌱", title: "A New Beginning", text: "The day God blessed our family with Makarius.", image: "/photos/1st.jpg" },
  { icon: "☀️", title: "Growing in Love", text: "His first smiles, laughs, and precious moments.", image: "/photos/grow.jpg" },
  { icon: "🌿", title: "Little Discoveries", text: "Every new experience and little adventure.", image: "/photos/discoveries.jpg" },
  { icon: "🏞️", title: "Precious Memories", text: "Moments shared with family and loved ones.", image: "/photos/precious.jpg" },
  { icon: "🎂", title: "ONE BEAUTIFUL YEAR", text: "Celebrating his first year of life.", image: "/photos/one-year.jpg" },
];

export function YearOfBlessings() {
  return (
    <Section id="blessings" className="bg-ivory">
      <SectionTitle eyebrow="His first year" title="A YEAR OF BLESSINGS" />
      <div className="relative">
        <div aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-transparent via-sage to-transparent md:left-1/2" />
        <ol className="space-y-12">
          {ITEMS.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <li key={item.title} className="relative pl-16 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="absolute left-0 top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg ring-2 ring-gold/60 md:left-1/2 md:-translate-x-1/2">
                  {item.icon}
                </span>
                <Reveal from={right ? "right" : "left"} className={right ? "md:col-start-2" : "md:col-start-1"}>
                  <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-sage-deep/10 ring-1 ring-beige">
                    <Photo
                      src={item.image}
                      alt={item.title}
                      sizes="(max-width: 768px) 80vw, 400px"
                      className="aspect-[4/3] w-full"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-2xl font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-ink/75">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}