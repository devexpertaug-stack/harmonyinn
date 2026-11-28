import { createFileRoute } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { PageHero } from "@/components/site/SiteChrome";
import { img, venues, contact, videos } from "@/lib/hotel";

export const Route = createFileRoute("/banquets")({
  head: () => ({
    meta: [
      { title: "Banquets & Wedding Venues in Meerut — Hotel Harmony Inn" },
      {
        name: "description",
        content:
          "Royal Casa, Petals Hall and Conference (up to 500 guests), Ivory Hall and Bluebell Hall: weddings, sangeet, parties and conferences at Hotel Harmony Inn, Meerut.",
      },
      { property: "og:title", content: "Banquets & Celebrations — Hotel Harmony Inn" },
      { property: "og:description", content: "Meerut's finest venues for weddings, parties and conferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Banquets,
});

function Banquets() {
  const { openBooking } = useBooking();
  const [lead, ...rest] = venues;
  return (
    <>
      <PageHero
        eyebrow="Celebrate · Banquets & Events"
        title="Celebrations, dressed for royalty."
        image={videos.celebrations.poster}
        video={videos.celebrations.src}
      >
        <button onClick={() => openBooking("event")} className="btn btn-gold mt-8">
          Plan Your Event
        </button>
      </PageHero>

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.3fr] md:py-28">
        <div data-reveal>
          <div className="eyebrow">{lead!.capacity}</div>
          <h2 className="mt-3 text-5xl text-ink md:text-6xl">{lead!.name}</h2>
          <p className="mt-6 leading-relaxed text-ink/75">{lead!.text}</p>
          <p className="mt-5 text-[0.8rem] font-medium text-gold">{lead!.for.join(" · ")}</p>
          <button onClick={() => openBooking("event", lead!.name)} className="btn btn-gold mt-8">
            Enquire for Royal Casa
          </button>
        </div>
        <div className="grid grid-cols-6 gap-4" data-reveal>
          <div className="img-zoom col-span-6 aspect-[3/2]">
            <img src={lead!.image} alt="Royal Casa under gold drapes and chandeliers" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="img-zoom col-span-3 aspect-[4/3]">
            <img src={lead!.image2!} alt="Royal Casa buffet gallery" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="img-zoom col-span-3 aspect-[4/3]">
            <img src={img.banquet4} alt="Royal Casa chandeliers" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-sand py-6">
        {rest.map((v, i) => (
          <article
            key={v.name}
            className="mx-auto grid max-w-6xl items-center gap-10 border-b border-ink/10 px-6 py-16 last:border-0 md:grid-cols-2"
            data-reveal
          >
            <div className={`img-zoom aspect-[16/11] ${i % 2 ? "md:order-2" : ""}`}>
              <img src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="eyebrow num">{v.capacity}</div>
              <h3 className="mt-3 text-4xl text-ink sm:text-5xl">{v.name}</h3>
              <p className="mt-5 leading-relaxed text-ink/75">{v.text}</p>
              <p className="mt-5 text-[0.8rem] font-medium text-gold">{v.for.join(" · ")}</p>
              <button onClick={() => openBooking("event", v.name)} className="btn btn-ghost mt-8">
                Enquire
              </button>
            </div>
          </article>
        ))}
      </section>

      <section
        id="conference"
        className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.3fr]"
      >
        <div className="img-zoom aspect-[4/5]" data-reveal>
          <img src={img.conference} alt="Conference room" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div data-reveal>
          <div className="eyebrow">Conference</div>
          <h2 className="mt-3 text-4xl text-ink md:text-5xl">A conference room, fully equipped.</h2>
          <p className="mt-6 leading-relaxed text-ink/75">
            For board meetings, training days and product launches, with catering from Melting Pot
            and rooms upstairs for out-of-town delegates.
          </p>
          <button onClick={() => openBooking("event")} className="btn btn-gold mt-8">
            Plan a Meeting
          </button>
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-6 py-24 md:grid-cols-2">
          <h2 className="text-4xl leading-[1.15] sm:text-5xl">
            Tell us the date.
            <br />
            <em className="accent text-gold">We'll handle the rest.</em>
          </h2>
          <div>
            <p className="text-ink-foreground/80">
              Share your date, guest count and preferred hall. Our events team will reply with menus
              and availability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openBooking("event")} className="btn btn-white">
                Send an Enquiry
              </button>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn-light">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
