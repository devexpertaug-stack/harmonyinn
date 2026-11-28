import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Car,
  Coffee,
  Gem,
  Instagram,
  Landmark,
  MapPin,
  Music,
  Plus,
  Users,
} from "lucide-react";
import { useBooking, today, addDays } from "@/components/site/Booking";
import { BgVideo, EmblemDivider, Emblem } from "@/components/site/SiteChrome";
import { posts, postImage } from "@/lib/journal";
import {
  img,
  rooms,
  testimonials,
  inr,
  contact,
  weekly,
  roomSlug,
  videos,
  highlights,
  spaces,
  offers,
  faqs,
  gallery,
} from "@/lib/hotel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotel Harmony Inn — 4-Star Luxury Hotel in Meerut" },
      {
        name: "description",
        content:
          "A newly renovated four-star grand luxury hotel on Garh Road, Meerut. Elegant rooms and suites, Melting Pot restaurant and grand banquets.",
      },
      { property: "og:title", content: "Hotel Harmony Inn — 4-Star Luxury in Meerut" },
      { property: "og:description", content: "Elegant suites, fine dining and Meerut's finest banquet venues." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const icons = { landmark: Landmark, gem: Gem, coffee: Coffee, car: Car, music: Music, users: Users, "map-pin": MapPin };
const readTime = (p: (typeof posts)[number]) =>
  Math.max(2, Math.round(p.body.reduce((n, [, s]) => n + s.split(/\s+/).length, 0) / 220));

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <RateBand />
      <Pillars />
      <RoomsSection />
      <div className="mx-auto max-w-[1400px] px-5 text-gold">
        <EmblemDivider />
      </div>
      <Trio />
      <Reviews />
      <Evenings />
      <Explore />
      <Offers />
      <Journal />
      <Faq />
      <Gallery />
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
/* The original Lovable hero: façade photo, gold rule + eyebrow, large serif name,
   italic line, and the ivory booking bar along the bottom edge. */

function Hero() {
  const { openBooking } = useBooking();
  const [ci, setCi] = useState("");
  const [co, setCo] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    setCi(today());
    setCo(addDays(today(), 1));
  }, []);

  const cell = "block border-r border-border px-4 py-4 text-left transition hover:bg-secondary sm:px-6 sm:py-5";
  const label = "block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground";
  const input = "num mt-1 w-full min-w-0 bg-transparent text-base text-foreground outline-none sm:text-lg";

  return (
    <section className="grain relative h-[100svh] min-h-[680px] overflow-hidden bg-ink text-ink-foreground">
      {videos.hero.src ? (
        <div className="absolute inset-0">
          <BgVideo src={videos.hero.src} poster={videos.hero.poster} />
        </div>
      ) : (
        <img
          src={videos.hero.poster}
          alt="Hotel Harmony Inn façade lit at dusk"
          className="animate-slowzoom absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="veil absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-56 md:pb-48">
        <div className="animate-rise max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="gold-rule !w-10" />
            <span className="eyebrow">Main Garh Road · Meerut</span>
          </div>
          <h1 className="mt-6 text-5xl leading-[1] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Hotel Harmony Inn
          </h1>
          <p className="animate-rise-late mt-6 max-w-lg font-display text-xl italic opacity-85 sm:text-2xl">
            Carved stone, warm light and unhurried service, in the heart of the city.
          </p>
        </div>
      </div>

      {/* Booking bar */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 sm:pb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openBooking("room", undefined, { checkIn: ci, checkOut: co, guests });
            }}
            className="grid grid-cols-2 overflow-hidden rounded-t-2xl bg-ivory text-foreground shadow-2xl sm:rounded-2xl md:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <label className={cell}>
              <span className={label}>Check-in</span>
              <input
                type="date"
                value={ci}
                min={today()}
                onChange={(e) => {
                  setCi(e.target.value);
                  if (co <= e.target.value) setCo(addDays(e.target.value, 1));
                }}
                className={input}
                aria-label="Check-in date"
              />
            </label>
            <label className={`${cell} border-r-0 md:border-r`}>
              <span className={label}>Check-out</span>
              <input
                type="date"
                value={co}
                min={ci ? addDays(ci, 1) : undefined}
                onChange={(e) => setCo(e.target.value)}
                className={input}
                aria-label="Check-out date"
              />
            </label>
            <label className={`${cell} col-span-2 border-t md:col-span-1 md:border-t-0`}>
              <span className={label}>Guests</span>
              <select value={guests} onChange={(e) => setGuests(+e.target.value)} className={input} aria-label="Guests">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Adult" : "Adults"}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-gold col-span-2 m-3 !py-4 md:col-span-1 md:!px-10">
              Check availability
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Intro --------------------------------- */

function Intro() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center md:py-28">
      <div data-reveal>
        <div className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink/70">
          Hotel Harmony Inn, Garh Road, Meerut
        </div>
        <h2 className="mt-4 text-4xl text-ink sm:text-5xl">A royal welcome in the heart of the city</h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink/75">
          Step in from Main Garh Road and the city falls quiet. Carved jaali glows overhead, marble
          cools underfoot, and someone at the desk already knows your name. Since 2024 the house has
          been fully renewed, with new rooms, the Melting Pot restaurant and four celebration halls.
        </p>
        <p className="mt-5 text-sm text-ink/75">Carved stone, warm light, unhurried service.</p>
      </div>
      <ul className="mt-16 grid grid-cols-3 gap-y-10 sm:grid-cols-4 md:grid-cols-7" data-reveal>
        {highlights.map((h) => {
          const Icon = icons[h.icon];
          return (
            <li key={h.label} className="flex flex-col items-center gap-4 px-2">
              <Icon className="h-11 w-11 text-gold" strokeWidth={0.9} />
              <span className="max-w-[7rem] text-[0.78rem] leading-snug text-ink/80">{h.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function RateBand() {
  const { openBooking } = useBooking();
  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 text-center md:grid-cols-[1fr_auto_1fr] md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display text-2xl text-ink">★★★★</span>
          <span className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-ink/60">
            Grand luxury · Meerut
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <span className="font-display text-2xl text-ink sm:text-3xl">Best Available Rate</span>
          <button onClick={() => openBooking("room")} className="btn btn-gold !py-2.5">
            Book Direct
          </button>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[0.86rem] font-medium text-ink">Breakfast & valet parking</span>
          <span className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-ink/60">
            Included with every stay
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Stay / Dine / Celebrate / Meet ------------------ */
/* Four panels in the normal page flow: they scroll with the page, nothing slides or auto-plays. */

function Pillars() {
  const { openBooking } = useBooking();
  const small = "!px-5 !py-3 !text-[0.62rem] !tracking-[0.22em]";
  const panels: {
    word: string;
    line: string;
    text: string;
    image: string;
    primary: ReactNode;
    secondary: ReactNode;
  }[] = [
    {
      word: "Stay",
      line: "Your quiet residence in the city",
      text: "Four room categories, from a twin room for the working traveller to a suite with its own salon.",
      image: img.suite,
      primary: (
        <button onClick={() => openBooking("room")} className={`btn btn-gold ${small}`}>
          Book Your Stay
        </button>
      ),
      secondary: (
        <Link to="/rooms" className={`btn btn-light ${small}`}>
          Explore Rooms
        </Link>
      ),
    },
    {
      word: "Dine",
      line: "Food is how we say welcome",
      text: "Melting Pot cooks Indian, Oriental and Continental to order, with a music night every week.",
      image: img.dining,
      primary: (
        <a href={contact.phoneHref} className={`btn btn-gold ${small}`}>
          Book Your Table
        </a>
      ),
      secondary: (
        <Link to="/dining" className={`btn btn-light ${small}`}>
          Explore Dining
        </Link>
      ),
    },
    {
      word: "Celebrate",
      line: "Occasions dressed for royalty",
      text: "Four halls, from Bluebell for thirty to Royal Casa beneath gold drapes on the sixth floor.",
      image: img.banquet,
      primary: (
        <button onClick={() => openBooking("event")} className={`btn btn-gold ${small}`}>
          Plan Your Event
        </button>
      ),
      secondary: (
        <Link to="/banquets" className={`btn btn-light ${small}`}>
          Explore Venues
        </Link>
      ),
    },
    {
      word: "Meet",
      line: "A boardroom in the heart of Meerut",
      text: "A fully equipped conference room, catering from Melting Pot and rooms upstairs for delegates.",
      image: img.conference,
      primary: (
        <button onClick={() => openBooking("event")} className={`btn btn-gold ${small}`}>
          Enquire Now
        </button>
      ),
      secondary: (
        <Link to="/banquets" hash="conference" className={`btn btn-light ${small}`}>
          Our Spaces
        </Link>
      ),
    },
  ];

  return (
    <section className="grid bg-ink text-ink-foreground sm:grid-cols-2 lg:grid-cols-4" aria-label="Stay, dine, celebrate and meet">
      {panels.map((s) => (
        <div key={s.word} className="img-zoom group relative flex min-h-[26rem] flex-col justify-end lg:min-h-[32rem]">
          <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/15" />
          <div className="relative p-7 sm:p-8">
            <h3 className="font-display text-5xl">{s.word}</h3>
            <p className="mt-2 font-display text-lg italic text-ink-foreground/90">{s.line}</p>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-foreground/80">{s.text}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {s.primary}
              {s.secondary}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------------------------------- Rooms --------------------------------- */
/* The original Lovable "Rooms & Suites" list: hover or tap a room to open it,
   with a sticky photo that cross-fades on desktop. */

function RoomsSection() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <div className="text-center" data-reveal>
        <div className="eyebrow">Accommodation</div>
        <h2 className="mt-3 text-5xl md:text-6xl">Rooms &amp; Suites</h2>
        <Link
          to="/rooms"
          className="mt-5 inline-block text-[0.65rem] uppercase tracking-[0.3em] underline-offset-8 hover:text-gold hover:underline"
        >
          All rooms →
        </Link>
      </div>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1fr]">
        <ul>
          {rooms.map((r, i) => (
            <li
              key={r.name}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group cursor-pointer border-t py-6 transition ${active === i ? "" : "opacity-50 hover:opacity-100"}`}
            >
              <div className="flex items-baseline gap-6">
                <h3 className="flex-1 text-3xl sm:text-4xl">{r.name}</h3>
                <span className="num hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
                  {r.size}
                </span>
              </div>
              <div
                className={`grid transition-all duration-500 ${active === i ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <img src={r.image} alt={r.name} loading="lazy" className="mb-5 aspect-[4/3] w-full object-cover md:hidden" />
                  <p className="text-muted-foreground">{r.text}</p>
                  <div className="mt-3 text-sm">
                    <span className="num">{r.size}</span> · {r.bed} · <span className="num">{inr(r.price)}</span> + GST
                  </div>
                  <div className="mt-5 flex flex-wrap gap-6 text-[0.65rem] uppercase tracking-[0.3em]">
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: roomSlug(r.name) }}
                      onClick={(e) => e.stopPropagation()}
                      className="border-b border-foreground pb-1 hover:text-gold"
                    >
                      View room
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBooking("room", r.name);
                      }}
                      className="border-b border-gold pb-1 text-gold"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="relative hidden aspect-[4/5] overflow-hidden md:sticky md:top-24 md:block">
          {rooms.map((r, i) => (
            <img
              key={r.name}
              src={r.image}
              alt={r.name}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Trio() {
  return (
    <section className="mx-auto grid max-w-[1400px] grid-cols-3 items-center gap-3 px-3 py-20 sm:gap-5 sm:px-5 md:py-24">
      <div className="img-zoom aspect-[4/3]" data-reveal>
        <img src={img.lounge} alt="The lobby lounge beneath the jaali ceiling" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="img-zoom aspect-[4/5]" data-reveal>
        <img src={img.facade} alt="Hotel Harmony Inn façade lit at dusk" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="img-zoom aspect-[4/3]" data-reveal>
        <img src={img.dining2} alt="Melting Pot restaurant" loading="lazy" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}

/* --------------------------------- Reviews -------------------------------- */

function Reviews() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <h2 className="text-center text-4xl text-ink sm:text-[2.6rem]" data-reveal>
          What Our Guests Say
        </h2>
        <div className="no-scrollbar -mx-6 mt-14 flex snap-x gap-8 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {testimonials.slice(0, 4).map((t) => (
            <figure key={t.name} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-auto" data-reveal>
              <blockquote className="text-[0.86rem] leading-[1.75] text-ink/85">{t.text}</blockquote>
              <figcaption className="mt-5 text-[0.8rem] font-semibold text-ink">{t.name} | Guest review</figcaption>
              <div className="mt-1.5 text-[0.7rem] tracking-[0.2em] text-gold">★★★★★</div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Evenings video ---------------------------- */

function Evenings() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0">
        <BgVideo src={videos.evenings.src} poster={videos.evenings.poster} />
      </div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24 text-center">
        <div data-reveal>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink-foreground/85">After Dark</div>
          <h2 className="mx-auto mt-4 max-w-md text-4xl leading-[1.15] sm:text-5xl">Evenings worth dressing up for</h2>
          <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-relaxed text-ink-foreground/85">
            Ladies Night and a candlelight Ghazal dinner on Tuesday, Retro Night on Thursday and Bollywood Night on Saturday, all at the Melting Pot restaurant.
          </p>
          <Link to="/dining" className="btn btn-gold mt-10">
            See the Programme
          </Link>
        </div>
        <dl className="mt-20 grid grid-cols-2 gap-6 border-t border-ink-foreground/20 pt-8 text-left md:grid-cols-4" data-reveal>
          {weekly.map((w) => (
            <div key={w.name}>
              <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-gold">{w.day}</dt>
              <dd className="mt-1 font-display text-xl">{w.name}</dd>
              <dd className="text-xs text-ink-foreground/65">{w.where}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------- Rails --------------------------------- */

function useRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const go = (d: 1 | -1) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return { ref, edge, go, update };
}

function RailArrows({ rail, className = "" }: { rail: ReturnType<typeof useRail>; className?: string }) {
  const b =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/70 text-ink transition hover:bg-ink hover:text-ink-foreground disabled:pointer-events-none disabled:opacity-30";
  return (
    <div className={`flex gap-3 ${className}`}>
      <button aria-label="Previous" onClick={() => rail.go(-1)} disabled={rail.edge.start} className={b}>
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <button aria-label="Next" onClick={() => rail.go(1)} disabled={rail.edge.end} className={b}>
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function ExploreCard({ s }: { s: (typeof spaces)[number] }) {
  const cls = "group w-[78vw] shrink-0 snap-start sm:w-[22rem]";
  const body = (
    <>
      <div className="img-zoom aspect-[4/5]">
        <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-5 text-2xl text-ink">{s.name}</h3>
      <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/70">{s.text}</p>
      <span className="link-line mt-4">
        Discover <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  );
  return "room" in s ? (
    <Link to="/rooms/$slug" params={{ slug: roomSlug(s.room) }} className={cls}>
      {body}
    </Link>
  ) : (
    <Link to={s.to} className={cls}>
      {body}
    </Link>
  );
}

function Explore() {
  const rail = useRail();
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6" data-reveal>
        <h2 className="text-4xl text-ink sm:text-[2.6rem]">Explore Hotel Harmony Inn</h2>
        <RailArrows rail={rail} />
      </div>
      <div
        ref={rail.ref}
        onScroll={rail.update}
        className="no-scrollbar rail mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
      >
        {spaces.map((s) => (
          <ExploreCard key={s.name} s={s} />
        ))}
      </div>
    </section>
  );
}

function Offers() {
  const rail = useRail();
  const { openBooking } = useBooking();
  return (
    <section className="border-t border-border/70 py-24 md:py-28">
      <div className="grid gap-10 md:grid-cols-[calc(var(--gutter)+19rem)_1fr]">
        <div className="gutter-l flex flex-col pr-6 md:pr-4" data-reveal>
          <h2 className="text-4xl leading-[1.15] text-ink sm:text-[2.6rem]">Special Invitations and Offers</h2>
          <p className="mt-5 text-[0.88rem] leading-relaxed text-ink/75">
            Stay for less, linger for more. Our standing invitations help you slow down and make the
            most of your time at Harmony Inn.
          </p>
          <Link to="/contact" className="btn btn-ghost mt-8 self-start !py-2.5">
            Ask About Offers
          </Link>
          <RailArrows rail={rail} className="mt-auto hidden pt-12 md:flex" />
        </div>
        <div
          ref={rail.ref}
          onScroll={rail.update}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 [scroll-padding-inline:1.5rem] md:pl-0 md:[scroll-padding-inline:0]"
        >
          {offers.map((o) => (
            <article key={o.title} className="flex w-[78vw] shrink-0 snap-start flex-col sm:w-[20rem]">
              <h3 className="text-xl text-ink">{o.title}</h3>
              <div className="img-zoom mt-4 aspect-square">
                <img src={o.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 flex-1 text-[0.86rem] leading-relaxed text-ink/75">{o.text}</p>
              {"to" in o ? (
                <Link to={o.to} className="btn btn-gold mt-6 self-start !px-5 !py-2.5">
                  {o.cta}
                </Link>
              ) : (
                <button
                  onClick={() => openBooking(o.kind)}
                  className="btn btn-gold mt-6 self-start !px-5 !py-2.5"
                >
                  {o.cta}
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Journal -------------------------------- */

function Journal() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="text-center" data-reveal>
          <BookOpen className="mx-auto h-12 w-12 text-gold" strokeWidth={0.8} />
          <h2 className="mt-4 text-4xl text-ink sm:text-[2.6rem]">Diaries &amp; Discoveries</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block" data-reveal>
              <div className="img-zoom aspect-[4/3]">
                <img src={postImage(p)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-lg leading-snug text-ink transition group-hover:text-gold">{p.title}</h3>
              <div className="mt-2 text-xs text-ink/60">
                {p.category} <span className="mx-1.5">•</span> <span className="num">{readTime(p)}</span> min read
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/journal" className="btn btn-gold">
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 md:py-28">
      <h2 className="text-center text-4xl text-ink sm:text-[2.6rem]" data-reveal>
        Useful Information
      </h2>
      <div className="mt-12 border-t border-border" data-reveal>
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-border">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-[1.05rem] text-ink/85 transition hover:text-ink">
              {f.q}
              <Plus className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} />
            </summary>
            <p className="pb-6 pr-10 text-[0.88rem] leading-relaxed text-ink/70">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const ig = contact.social.find(([n]) => n === "Instagram")?.[1] ?? "#";
  const strip = [...gallery, ...gallery];
  return (
    <section className="overflow-hidden pb-24">
      <div className="group flex w-max gap-4 [animation:marquee_80s_linear_infinite] hover:[animation-play-state:paused]">
        {strip.map((src, i) => (
          <div key={i} className="h-64 w-48 shrink-0 overflow-hidden sm:h-80 sm:w-60" aria-hidden={i >= gallery.length}>
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center gap-6">
        <Emblem className="h-7 w-12 text-gold" />
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/gallery" className="btn btn-gold">
            View Full Gallery
          </Link>
          <a href={ig} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Instagram className="h-4 w-4" strokeWidth={1.5} /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
