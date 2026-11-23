import { createFileRoute } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { PageHero } from "@/components/site/SiteChrome";
import { heroes, img, venues, contact } from "@/lib/hotel";

export const Route = createFileRoute("/banquets")({
  head: () => ({
    meta: [
      { title: "Banquets & Wedding Venues in Meerut — Hotel Harmony Inn" },
      { name: "description", content: "Petals Banquet for up to 500 guests, Royal Casa terrace venue, Ivory and Bluebell party halls — weddings, sangeet, parties and conferences." },
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
      <PageHero eyebrow="Banquets & Events" title="Celebrations, dressed for royalty." image={heroes.banquets} />
      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24 md:py-32">
        <div className="col-span-12 md:col-span-5">
          <div className="eyebrow">{lead!.capacity}</div>
          <h2 className="mt-4 text-5xl md:text-7xl">{lead!.name}</h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{lead!.text}</p>
          <p className="mt-6 text-sm uppercase tracking-[0.25em]">{lead!.for.join(" · ")}</p>
          <button onClick={() => openBooking("event", lead!.name)} className="btn-gold mt-10">Enquire for Royal Casa</button>
        </div>
        <div className="col-span-12 grid grid-cols-6 gap-4 md:col-span-7">
          <div className="img-zoom col-span-6 aspect-[3/2]"><img src={lead!.image} alt="Royal Casa under gold drapes and chandeliers" loading="lazy" className="h-full w-full object-cover" /></div>
          <div className="img-zoom col-span-4 col-start-3 aspect-[3/2]"><img src={lead!.image2!} alt="Royal Casa buffet gallery" loading="lazy" className="h-full w-full object-cover" /></div>
        </div>
      </section>
      <section className="border-t">
        {rest.map((v, i) => (
          <article key={v.name} className="mx-auto grid max-w-7xl grid-cols-12 gap-6 border-b px-6 py-16">
            <div className={`img-zoom col-span-12 aspect-[16/10] md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
              <img src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className={`col-span-12 self-end md:col-span-5 ${i % 2 ? "md:order-1" : "md:col-start-8"}`}>
              <div className="eyebrow num">{v.capacity}</div>
              <h3 className="mt-3 text-4xl sm:text-5xl">{v.name}</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">{v.text}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.25em]">{v.for.join(" · ")}</p>
              <button onClick={() => openBooking("event", v.name)} className="btn-outline-dark mt-8">Enquire</button>
            </div>
          </article>
        ))}
      </section>
      <section className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-6 px-6 py-24">
        <div className="img-zoom col-span-12 aspect-[4/5] md:col-span-4"><img src={img.conference} alt="Conference room" loading="lazy" className="h-full w-full object-cover" /></div>
        <div className="col-span-12 md:col-span-6 md:col-start-6">
          <div className="eyebrow">Business</div>
          <h2 className="mt-4 text-4xl md:text-5xl">A conference room, fully equipped.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">For board meetings, training days and product launches, with catering from Melting Pot and rooms upstairs for out-of-town delegates.</p>
          <button onClick={() => openBooking("event")} className="btn-outline-dark mt-8">Plan a meeting</button>
        </div>
      </section>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24">
          <h2 className="col-span-12 text-5xl md:col-span-6">Tell us the date.<br /><em>We'll handle the rest.</em></h2>
          <div className="col-span-12 self-end md:col-span-5 md:col-start-8">
            <p className="opacity-80">Share your date, guest count and preferred hall. Our events team will reply with menus and availability.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => openBooking("event")} className="btn-gold">Send an enquiry</button>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-outline-light">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
