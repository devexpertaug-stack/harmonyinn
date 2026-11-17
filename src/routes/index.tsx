import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/site/Booking";
import { posts, postImage } from "@/lib/journal";
import { img, rooms, testimonials, inr, contact, venues, weekly, roomSlug } from "@/lib/hotel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotel Harmony Inn — 4-Star Luxury Hotel in Meerut" },
      { name: "description", content: "A newly renovated four-star grand luxury hotel on Garh Road, Meerut. Elegant rooms and suites, Melting Pot restaurant, Barrel bar and grand banquets." },
      { property: "og:title", content: "Hotel Harmony Inn — 4-Star Luxury in Meerut" },
      { property: "og:description", content: "Elegant suites, fine dining and Meerut's finest banquet venues." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

function Home() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);
  const [q, setQ] = useState(0);
  const [dates, setDates] = useState<[string, string]>(["", ""]);
  useEffect(() => {
    const a = new Date(), b = new Date(); b.setDate(a.getDate() + 1);
    setDates([fmt(a), fmt(b)]);
    const t = setInterval(() => setQ((x) => (x + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="grain relative h-[100svh] min-h-[680px] overflow-hidden bg-ink text-ink-foreground">
        <img src={img.facade} alt="Hotel Harmony Inn façade lit at dusk" className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-40 md:pb-48">
          <div className="animate-rise max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="gold-rule !w-10" />
              <span className="eyebrow">Main Garh Road · Meerut</span>
            </div>
            <h1 className="mt-6 text-5xl leading-[1] sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem]">
              Hotel Harmony Inn
            </h1>
            <p className="animate-rise-late mt-6 max-w-lg font-display text-xl italic opacity-85 sm:text-2xl">
              Carved stone, warm light and unhurried service, in the heart of the city.
            </p>
          </div>
        </div>

        {/* Booking bar */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-0 sm:px-6">
            <div className="grid grid-cols-2 bg-ivory text-foreground shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto]">
              {[["Check-in", dates[0]], ["Check-out", dates[1]], ["Guests", "2 Adults"]].map(([l, v], i) => (
                <button key={l} onClick={() => openBooking("room")}
                  className={`border-r px-6 py-5 text-left transition hover:bg-secondary ${i === 2 ? "col-span-2 border-t md:col-span-1 md:border-t-0" : ""}`}>
                  <div className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
                  <div className="num mt-1 text-lg">{v || "—"}</div>
                </button>
              ))}
              <button onClick={() => openBooking("room")} className="btn-gold col-span-2 !py-6 md:col-span-1 md:!px-12">Check availability</button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-12 px-6 py-24 md:py-36">
        <div className="col-span-12 md:col-span-5">
          <div className="eyebrow">Opp. Nai Sadak · Garh Road</div>
          <h2 className="mt-6 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">A grand house,<br /><em className="text-gold">quietly renewed.</em></h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            Carved jaali, warm marble and staff who remember your name. Since <span className="num">2024</span>, Hotel Harmony Inn has been fully renewed, with new rooms, Melting Pot, Barrel and four banquet halls.
          </p>
          <dl className="mt-12 grid max-w-md grid-cols-3 border-y">
            {[["4★", "Grand luxury"], ["500", "Banquet guests"], ["45 m", "Royal Casa"]].map(([n, l], i) => (
              <div key={l} className={`py-6 ${i ? "border-l pl-5" : ""}`}>
                <dt className="num text-3xl text-gold">{n}</dt>
                <dd className="mt-2 text-[0.58rem] uppercase tracking-[0.25em] text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative col-span-12 md:col-span-7">
          <div className="img-zoom aspect-[4/5] md:ml-16 md:aspect-[5/6]"><img src={img.reception} alt="Reception under the carved jaali ceiling" loading="lazy" className="h-full w-full object-cover" /></div>
          <div className="img-zoom absolute -bottom-10 left-0 hidden w-[42%] border-8 border-background md:block"><img src={img.lounge} alt="Lobby lounge" loading="lazy" className="aspect-square w-full object-cover" /></div>
          <figure className="mt-8 max-w-sm bg-ink p-7 text-ink-foreground md:absolute md:-right-2 md:-bottom-14 md:mt-0">
            <div className="eyebrow">Every stay includes</div>
            <p className="mt-3 font-display text-xl leading-snug">Buffet breakfast, free valet parking, round-the-clock power back-up and discreet security.</p>
          </figure>
        </div>
      </section>

      {/* ROOMS — editorial list */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Accommodation</div>
            <h2 className="mt-4 text-5xl md:text-6xl">Rooms &amp; Suites</h2>
          </div>
          <Link to="/rooms" className="text-[0.7rem] uppercase tracking-[0.3em] underline-offset-8 hover:text-gold hover:underline">All rooms →</Link>
        </div>
        <div className="mt-16 grid items-start gap-12 md:grid-cols-[1fr_1.1fr]">
          <ul>
            {rooms.map((r, i) => (
              <li key={r.name} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
                className={`group cursor-pointer border-t py-7 transition ${active === i ? "" : "opacity-50 hover:opacity-100"}`}>
                <div className="flex items-baseline gap-6">
                  <h3 className="flex-1 text-3xl sm:text-4xl">{r.name}</h3>
                  <span className="num hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">{r.size}</span>
                </div>
                <div className={`grid transition-all duration-500 ${active === i ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <img src={r.image} alt={r.name} loading="lazy" className="mb-5 aspect-[4/3] w-full object-cover md:hidden" />
                    <p className="text-muted-foreground">{r.text}</p>
                    <div className="mt-3 text-sm"><span className="num">{r.size}</span> · {r.bed} · <span className="num">{inr(r.price)}</span> + GST</div>
                    <div className="mt-5 flex flex-wrap gap-6 text-[0.65rem] uppercase tracking-[0.3em]">
                      <Link to="/rooms/$slug" params={{ slug: roomSlug(r.name) }} onClick={(e) => e.stopPropagation()} className="border-b border-foreground pb-1 hover:text-gold">View room</Link>
                      <button onClick={(e) => { e.stopPropagation(); openBooking("room", r.name); }} className="border-b border-gold pb-1 text-gold">Reserve</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="relative hidden aspect-[4/5] overflow-hidden md:sticky md:top-28 md:block">
            {rooms.map((r, i) => (
              <img key={r.name} src={r.image} alt={r.name} loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* DINING + EVENTS */}
      <section className="grid bg-ink md:grid-cols-2">
        {[
          { to: "/dining" as const, eyebrow: "Melting Pot · Barrel", title: "Dining & Bar", line: "Indian, Oriental and Continental, plus theme nights at Barrel.", image: img.dining },
          { to: "/banquets" as const, eyebrow: venues.map((v) => v.name.split(" ")[0]).join(" · "), title: "Celebrations", line: "Four halls, from a 30-guest salon to Royal Casa on the sixth floor.", image: img.banquet },
        ].map((b) => (
          <Link key={b.to} to={b.to} className="img-zoom group relative flex aspect-square items-end text-ink-foreground md:aspect-[4/5]">
            <img src={b.image} alt={b.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="veil absolute inset-0" />
            <div className="relative p-10 md:p-14">
              <div className="eyebrow">{b.eyebrow}</div>
              <h3 className="mt-4 text-5xl md:text-6xl">{b.title}</h3>
              <p className="mt-3 max-w-sm opacity-75">{b.line}</p>
              <span className="mt-6 inline-block border-b border-gold pb-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold">Discover</span>
            </div>
          </Link>
        ))}
      </section>

      {/* EVENINGS */}
      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pt-28 md:pt-40">
        <div className="col-span-12 md:col-span-4">
          <div className="eyebrow">After dark</div>
          <h2 className="mt-4 text-5xl leading-[1.05] md:text-6xl">Four evenings<br /><em>every week.</em></h2>
          <p className="mt-6 max-w-xs text-muted-foreground">Live music at Melting Pot midweek. Barrel takes over at the weekend.</p>
          <Link to="/dining" className="mt-8 inline-block border-b border-gold pb-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold">The full programme</Link>
        </div>
        <dl className="col-span-12 md:col-span-7 md:col-start-6">
          {weekly.map((w) => (
            <div key={w.day} className="grid grid-cols-[6.5rem_1fr] gap-6 border-t py-6 sm:grid-cols-[9rem_1fr_auto]">
              <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">{w.day}</dt>
              <dd><div className="font-display text-3xl">{w.name}</div><p className="mt-1 text-sm text-muted-foreground">{w.text}</p></dd>
              <dd className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">{w.where}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
        <div className="font-display text-7xl leading-none text-gold">“</div>
        <div className="relative min-h-[11rem] sm:min-h-[9rem]">
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`absolute inset-0 transition-opacity duration-1000 ${q === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <blockquote className="font-display text-3xl italic leading-snug sm:text-4xl">{t.text}</blockquote>
              <figcaption className="mt-6 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">{t.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button key={t.name} aria-label={`Review ${i + 1}`} onClick={() => setQ(i)} className={`h-px transition-all ${q === i ? "w-10 bg-gold" : "w-5 bg-border"}`} />
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><div className="eyebrow">The Journal</div><h2 className="mt-4 text-5xl md:text-6xl">Stories from Meerut</h2></div>
            <Link to="/journal" className="text-[0.7rem] uppercase tracking-[0.3em] underline-offset-8 hover:text-gold hover:underline">All stories →</Link>
          </div>
          <div className="mt-14 grid grid-cols-12 gap-6">
            {posts.slice(0, 3).map((p, i) => (
              <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }}
                className={`group col-span-12 block ${i === 0 ? "md:col-span-6 md:row-span-2" : "md:col-span-6 md:grid md:grid-cols-2 md:gap-6"}`}>
                <div className={`img-zoom ${i === 0 ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-square"}`}><img src={postImage(p)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <div className={i === 0 ? "mt-6" : "mt-5 self-center md:mt-0"}>
                  <div className="eyebrow">{p.category}</div>
                  <h3 className={`mt-3 leading-tight transition group-hover:text-gold ${i === 0 ? "text-4xl" : "text-2xl"}`}>{p.title}</h3>
                  {i === 0 && <p className="mt-3 max-w-md text-muted-foreground">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
        <img src={img.facadeTall} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="eyebrow">Reservations</div>
            <h2 className="mt-5 text-5xl sm:text-6xl">We'll keep a room<br />ready for you.</h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => openBooking("room")} className="btn-gold">Book your stay</button>
              <button onClick={() => openBooking("event")} className="btn-outline-light">Enquire for an event</button>
            </div>
          </div>
          <div className="space-y-2 border-l border-ink-foreground/20 pl-8 text-sm opacity-85">
            <p>Main Garh Road, Meerut (U.P) <span className="num">250002</span></p>
            <a href={contact.phoneHref} className="num block text-2xl text-gold">{contact.phones[0]}</a>
            <a href={`mailto:${contact.email}`} className="block hover:text-gold">{contact.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
