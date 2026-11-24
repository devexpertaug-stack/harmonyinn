import { createFileRoute } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { PageHero, EmblemDivider } from "@/components/site/SiteChrome";
import { img, contact, pdas, weekly, seasonal, videos } from "@/lib/hotel";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Melting Pot Restaurant & Barrel Bar — Hotel Harmony Inn" },
      {
        name: "description",
        content:
          "Fine dining at Melting Pot — Indian, Chinese, Oriental and Continental — with private lounges, plus theme nights and Ladies Night at Barrel bar.",
      },
      { property: "og:title", content: "Dining & Bar — Hotel Harmony Inn" },
      { property: "og:description", content: "Melting Pot fine dining and Barrel, the bar, in Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dining,
});

function Dining() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero
        eyebrow="Dine · Melting Pot & Barrel"
        title="Savour. Linger. Celebrate."
        image={videos.evenings.poster}
        video={videos.evenings.src}
      >
        <a href={contact.phoneHref} className="btn btn-royal mt-8">
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
            <a href={contact.phoneHref} className="btn btn-royal">
              Reserve a Table
            </a>
            <button onClick={() => openBooking("event", "Melting Pot private dining")} className="btn btn-ghost">
              Book a Lounge
            </button>
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

      {/* Private dining */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-center" data-reveal>
            <div className="eyebrow">Private dining</div>
            <h2 className="mt-3 text-4xl text-ink sm:text-5xl">Three lounges for family dinners</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pdas.map((p) => (
              <article key={p.name} data-reveal>
                <div className="img-zoom aspect-[4/5]">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="text-2xl text-ink">{p.name}</h3>
                  <span className="num text-sm text-ink/60">{p.capacity}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Barrel */}
      <section className="bg-ink text-white">
        <div className="img-zoom aspect-[16/9] md:aspect-[21/8]">
          <img src={img.bar} alt="The bar counter at Barrel" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div data-reveal>
            <div className="eyebrow !text-powder">Barrel · The Bar</div>
            <h2 className="mt-3 text-4xl leading-[1.15] sm:text-5xl">Low light, good music, an honest pour.</h2>
          </div>
          <div data-reveal>
            <p className="leading-relaxed text-white/80">
              Barrel is a bar and lounge built on friendly, quick service and fair prices. It seats up
              to 75, has two private areas for 10 guests each, and a neon-lit smoking lounge.
            </p>
            <dl className="mt-10 grid grid-cols-3 border-t border-white/15 pt-6">
              {[
                ["75", "Guests"],
                ["2 × 10", "Private areas"],
                ["4", "Theme nights"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="num font-display text-3xl">{n}</dt>
                  <dd className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white/60">{l}</dd>
                </div>
              ))}
            </dl>
            <a href={contact.phoneHref} className="btn btn-white mt-10">
              Call to Reserve a Table
            </a>
          </div>
          <div className="grid grid-cols-12 gap-4 md:col-span-2">
            <div className="img-zoom col-span-7 aspect-[3/2]">
              <img src={img.bar2} alt="Barrel lounge seating" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="img-zoom col-span-5 aspect-[3/4]">
              <img src={img.bar3} alt="Barrel booth seating" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Weekly programme */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center" data-reveal>
          <div className="eyebrow">The weekly programme</div>
          <h2 className="mt-3 text-4xl text-ink sm:text-5xl">Evenings at Harmony</h2>
          <p className="mx-auto mt-5 max-w-lg text-ink/70">
            We also host {seasonal.join(", ")} parties each year. Call to hear about the next one.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {weekly.map((w) => (
            <article key={w.day} data-reveal>
              <div className="img-zoom aspect-[4/5]">
                <img src={w.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="eyebrow mt-5">
                {w.day} · {w.where}
              </div>
              <h3 className="mt-2 text-2xl text-ink">{w.name}</h3>
              <p className="mt-2 text-[0.88rem] text-ink/70">{w.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-20 text-royal-soft">
          <EmblemDivider />
        </div>
      </section>
    </>
  );
}
