import { createFileRoute, Link } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { PageHero, SectionTitle } from "@/components/site/SiteChrome";
import { heroes, img, rooms, silentFeatures, policies, extraBed, inr, roomSlug } from "@/lib/hotel";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — Hotel Harmony Inn, Meerut" },
      { name: "description", content: "Executive Twin, Deluxe, Harmony Suite and Presidential Suite from ₹4,499 + GST, with complimentary breakfast and free valet parking." },
      { property: "og:title", content: "Rooms & Suites — Hotel Harmony Inn" },
      { property: "og:description", content: "Four refined room categories, from ₹4,499 + GST with breakfast included." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rooms,
});

function Rooms() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero eyebrow="Accommodation · Four categories" title="Rooms & Suites" image={heroes.rooms} />
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="grid grid-cols-12 gap-6 border-b pb-16">
          <p className="col-span-12 font-display text-3xl leading-snug md:col-span-7">
            From a 280 sq ft twin room for the working traveller to a 560 sq ft suite with its own salon. Every rate includes buffet breakfast and valet parking.
          </p>
          <dl className="col-span-12 grid grid-cols-2 gap-6 self-end text-sm md:col-span-4 md:col-start-9">
            <div><dt className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Check-in</dt><dd className="num mt-1 text-2xl">12:00</dd></div>
            <div><dt className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Check-out</dt><dd className="num mt-1 text-2xl">12:00</dd></div>
            <div><dt className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Extra bed</dt><dd className="num mt-1 text-2xl">{inr(extraBed)}</dd></div>
            <div><dt className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">From</dt><dd className="num mt-1 text-2xl">{inr(rooms[0]!.price)}</dd></div>
          </dl>
        </div>
      </section>
      <nav className="sticky top-[60px] z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-4">
          {rooms.map((r) => (
            <a key={r.name} href={`#${r.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex shrink-0 items-baseline gap-3 text-[0.65rem] uppercase tracking-[0.25em] hover:text-gold">
              {r.name}<span className="num text-muted-foreground">{inr(r.price)}</span>
            </a>
          ))}
        </div>
      </nav>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="space-y-32">
          {rooms.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={r.name} id={r.name.toLowerCase().replace(/\s+/g, "-")} className="grid scroll-mt-40 grid-cols-12 gap-6">
                <div className={`col-span-12 md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="img-zoom col-span-3 aspect-[3/4]"><img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover" /></div>
                    <div className="img-zoom col-span-2 mt-16 aspect-[3/4]"><img src={r.alt} alt={`${r.name} detail`} loading="lazy" className="h-full w-full object-cover" /></div>
                  </div>
                </div>
                <div className={`col-span-12 self-center md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                  <div className="eyebrow"><span className="num">{r.size}</span> · {r.bed}</div>
                  <h2 className="mt-4 text-4xl sm:text-5xl">{r.name}</h2>
                  <p className="mt-6 leading-relaxed text-muted-foreground">{r.text}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {r.amenities.map((a) => <li key={a} className="border-l border-gold pl-3">{a}</li>)}
                  </ul>
                  <div className="mt-8 border-t pt-6">
                    <span className="num text-3xl">{inr(r.price)}</span> <span className="text-sm text-muted-foreground">+ GST, per night</span>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-6"><button onClick={() => openBooking("room", r.name)} className="btn-outline-dark">Reserve this room</button><Link to="/rooms/$slug" params={{ slug: roomSlug(r.name) }} className="border-b border-gold pb-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold">View room</Link></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow">With every stay</div>
            <h2 className="mt-4 text-4xl md:text-5xl">Included, without asking.</h2>
          </div>
          <ul className="col-span-12 columns-1 gap-10 sm:columns-2 md:col-span-7 md:col-start-6">
            {silentFeatures.map((f) => <li key={f} className="break-inside-avoid border-b border-ink-foreground/15 py-4 font-display text-xl">{f}</li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24">
        <div className="col-span-12 md:col-span-4">
          <div className="eyebrow">Before you arrive</div>
          <h2 className="mt-4 text-4xl">Reservation policy</h2>
        </div>
        <div className="col-span-12 space-y-5 text-muted-foreground md:col-span-7 md:col-start-6">
          {policies.map((p) => <p key={p} className="border-t pt-5 leading-relaxed">{p}</p>)}
        </div>
      </section>
    </>
  );
}
