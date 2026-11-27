import { createFileRoute } from "@tanstack/react-router";
import { PageHero, EmblemDivider } from "@/components/site/SiteChrome";
import { img, contact, weekly, seasonal, videos } from "@/lib/hotel";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Melting Pot Restaurant — Hotel Harmony Inn, Meerut" },
      {
        name: "description",
        content:
          "Fine dining at Melting Pot, the restaurant at Hotel Harmony Inn: Indian, Chinese, Oriental and Continental, with Ladies Night, Ghazal Night, Retro Night and Bollywood Night every week.",
      },
      { property: "og:title", content: "Melting Pot Restaurant — Hotel Harmony Inn" },
      { property: "og:description", content: "Fine dining and weekly music nights at Melting Pot, Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dining,
});

function Dining() {
  return (
    <>
      <PageHero
        eyebrow="Dine · Melting Pot Restaurant"
        title="Savour. Linger. Celebrate."
        image={videos.evenings.poster}
        video={videos.evenings.src}
      >
        <a href={contact.phoneHref} className="btn btn-gold mt-8">
          Book Your Table
        </a>
      </PageHero>

      {/* Melting Pot */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.15fr] md:py-28">
        <div data-reveal>
          <div className="eyebrow">Melting Pot · Restaurant</div>
          <h2 className="mt-3 text-4xl leading-[1.15] text-ink sm:text-5xl">Indian, Oriental, Continental.</h2>
          <p className="mt-6 leading-relaxed text-ink/75">
            Fine dining with room to spread out. The kitchen is known across Meerut for its dal
            makhani, paneer lababdar and butter chicken, and each dish is cooked to order.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className="btn btn-gold">
              Reserve a Table
            </a>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4" data-reveal>
          <div className="img-zoom col-span-4 aspect-[3/4]">
            <img src={img.dining3} alt="Melting Pot banquette seating" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="img-zoom col-span-2 mt-20 aspect-[2/3]">
            <img src={img.meltingpot} alt="Melting Pot entrance" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="img-zoom col-span-6 aspect-[16/9]">
            <img src={img.dining} alt="Melting Pot main hall" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Weekly programme */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center" data-reveal>
            <div className="eyebrow">The weekly programme</div>
            <h2 className="mt-3 text-4xl text-ink sm:text-5xl">Evenings at Melting Pot</h2>
            <p className="mx-auto mt-5 max-w-lg text-ink/70">
              Every week, at the Melting Pot restaurant. We also host {seasonal.join(", ")} parties
              each year. Call to hear about the next one.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {weekly.map((w) => (
              <article key={w.name} data-reveal>
                <div className="img-zoom aspect-[4/5]">
                  <img src={w.image} alt={`${w.name} at ${w.where}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="eyebrow mt-5">
                  {w.day} · {w.where}
                </div>
                <h3 className="mt-2 text-2xl text-ink">{w.name}</h3>
                <p className="mt-2 text-[0.88rem] text-ink/70">{w.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a href={contact.phoneHref} className="btn btn-gold">
              Call to Reserve
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 text-gold">
        <EmblemDivider />
      </div>
    </>
  );
}
