import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Car,
  Coffee,
  Gem,
  Instagram,
  Landmark,
  MapPin,
  Music,
  Pause,
  Play,
  Plus,
  UserRound,
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
          "A newly renovated four-star grand luxury hotel on Garh Road, Meerut. Elegant rooms and suites, Melting Pot restaurant, Barrel bar and grand banquets.",
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
      <StaySection />
      <div className="mx-auto max-w-[1400px] px-5 text-royal-soft">
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

function Hero() {
  const { openBooking } = useBooking();
  const [ci, setCi] = useState("");
  const [co, setCo] = useState("");
  const [guests, setGuests] = useState(2);
  const [paused, setPaused] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCi(today());
    setCo(addDays(today(), 1));
  }, []);

  const toggle = () => {
    const v = wrap.current?.querySelector("video");
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const field = "flex min-w-0 flex-1 items-center gap-3 px-4 py-2.5 sm:px-5";
  const label = "block text-[0.66rem] font-semibold text-royal";
  const input = "num w-full min-w-0 bg-transparent text-[0.86rem] font-medium text-ink outline-none";

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      <div ref={wrap} className="absolute inset-0">
        <BgVideo src={videos.hero.src} poster={videos.hero.poster} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/45" />
      <h1 className="sr-only">Hotel Harmony Inn, a four-star luxury hotel in Meerut</h1>

      <button
        onClick={toggle}
        aria-label={paused ? "Play background video" : "Pause background video"}
        className="absolute bottom-12 left-6 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition hover:bg-white hover:text-ink md:flex"
      >
        {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>

      {/* Booking pill */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          openBooking("room", undefined, { checkIn: ci, checkOut: co, guests });
        }}
        className="animate-rise absolute inset-x-4 bottom-6 mx-auto flex max-w-[860px] flex-col rounded-3xl bg-white p-2 shadow-[0_20px_60px_-20px_rgb(10_16_38/0.55)] sm:bottom-10 md:flex-row md:items-center md:rounded-full"
      >
        <div className="grid grid-cols-2 md:contents">
          <label className={field}>
            <CalendarDays className="h-4 w-4 shrink-0 text-ink/60" strokeWidth={1.5} />
            <span className="min-w-0 flex-1">
              <span className={label}>Check-in Date</span>
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
            </span>
          </label>
          <Diamond />
          <label className={field}>
            <CalendarDays className="h-4 w-4 shrink-0 text-ink/60" strokeWidth={1.5} />
            <span className="min-w-0 flex-1">
              <span className={label}>Check-out Date</span>
              <input
                type="date"
                value={co}
                min={ci ? addDays(ci, 1) : undefined}
                onChange={(e) => setCo(e.target.value)}
                className={input}
                aria-label="Check-out date"
              />
            </span>
          </label>
        </div>
        <Diamond />
        <label className={`${field} border-t border-border md:border-0`}>
          <UserRound className="h-4 w-4 shrink-0 text-ink/60" strokeWidth={1.5} />
          <span className="min-w-0 flex-1">
            <span className={label}>Guests</span>
            <select value={guests} onChange={(e) => setGuests(+e.target.value)} className={input} aria-label="Guests">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Adult" : "Adults"}
                </option>
              ))}
            </select>
          </span>
        </label>
        <button type="submit" className="btn btn-royal m-1 !py-3.5 md:!px-7">
          Book Your Stay
        </button>
      </form>
    </section>
  );
}

function Diamond() {
  return (
    <span className="hidden text-[0.7rem] text-ink/40 md:block" aria-hidden="true">
      ❖
    </span>
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
          been fully renewed, with new rooms, Melting Pot, Barrel and four celebration halls.
        </p>
        <p className="mt-5 text-sm text-ink/75">Carved stone, warm light, unhurried service.</p>
      </div>
      <ul className="mt-16 grid grid-cols-3 gap-y-10 sm:grid-cols-4 md:grid-cols-7" data-reveal>
        {highlights.map((h) => {
          const Icon = icons[h.icon];
          return (
            <li key={h.label} className="flex flex-col items-center gap-4 px-2">
              <Icon className="h-11 w-11 text-royal-soft" strokeWidth={0.9} />
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
    <section className="bg-mist">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 text-center md:grid-cols-[1fr_auto_1fr] md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display text-2xl text-ink">★★★★</span>
          <span className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-ink/60">
            Grand luxury · Meerut
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <span className="font-display text-2xl text-ink sm:text-3xl">Best Available Rate</span>
          <button onClick={() => openBooking("room")} className="btn btn-royal !py-2.5">
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

function Pillars() {
  const { openBooking } = useBooking();
  const slides: {
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
        <button onClick={() => openBooking("room")} className="btn btn-royal">
          Book Your Stay
        </button>
      ),
      secondary: (
        <Link to="/rooms" className="btn btn-light">
          Explore Rooms
        </Link>
      ),
    },
    {
      word: "Dine",
      line: "Food is how we say welcome",
      text: "Melting Pot cooks Indian, Oriental and Continental to order. Barrel pours until late.",
      image: img.dining,
      primary: (
        <a href={contact.phoneHref} className="btn btn-royal">
          Book Your Table
        </a>
      ),
      secondary: (
        <Link to="/dining" className="btn btn-light">
          Discover Our Restaurants
        </Link>
      ),
    },
    {
      word: "Celebrate",
      line: "Occasions dressed for royalty",
      text: "Four halls, from Bluebell for thirty to Royal Casa beneath gold drapes on the sixth floor.",
      image: img.banquet,
      primary: (
        <button onClick={() => openBooking("event")} className="btn btn-royal">
          Plan Your Event
        </button>
      ),
      secondary: (
        <Link to="/banquets" className="btn btn-light">
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
        <button onClick={() => openBooking("event")} className="btn btn-royal">
          Enquire Now
        </button>
      ),
      secondary: (
        <Link to="/banquets" className="btn btn-light">
          Our Spaces
        </Link>
      ),
    },
  ];
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const DURATION = 7000;

  useEffect(() => {
    if (hold) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), DURATION);
    return () => clearTimeout(t);
  }, [active, hold, n]);

  return (
    <section
      className="relative overflow-hidden bg-ink text-white"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      {slides.map((s, i) => (
        <img
          key={s.word}
          src={s.image}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
            i === active ? "opacity-25" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/60" />

      <div className="relative py-24 md:py-32">
        <div className="relative h-[4.5rem] sm:h-[9rem] md:h-[11rem]">
          {slides.map((s, i) => {
            const off = (i - active + n) % n;
            const pos = off === 0 ? "50%" : off === 1 ? "100%" : off === n - 1 ? "0%" : off < n / 2 ? "150%" : "-50%";
            return (
              <button
                key={s.word}
                onClick={() => setActive(i)}
                tabIndex={off === 0 ? -1 : 0}
                aria-label={`Show ${s.word}`}
                className={`absolute top-0 -translate-x-1/2 whitespace-nowrap font-display text-[3.6rem] leading-none transition-all duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] sm:text-[7.5rem] md:text-[9.5rem] ${
                  off === 0 ? "text-white" : "text-white/35 hover:text-white/60"
                }`}
                style={{ left: pos }}
              >
                {s.word}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-md px-6 text-center" aria-live="polite">
          <div key={active} className="animate-rise">
            <h3 className="font-display text-xl text-white">{slides[active]!.line}</h3>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-white/80">{slides[active]!.text}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {slides[active]!.primary}
              {slides[active]!.secondary}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 flex max-w-xs gap-1.5 px-6">
          {slides.map((s, i) => (
            <button
              key={s.word}
              onClick={() => setActive(i)}
              aria-label={`Go to ${s.word}`}
              className="relative h-[2px] flex-1 overflow-hidden bg-white/25"
            >
              {i === active && (
                <span
                  key={`${active}-${hold}`}
                  className={`absolute inset-0 bg-powder ${hold ? "" : "animate-progress"}`}
                  style={{ animationDuration: `${DURATION}ms` }}
                />
              )}
              {i < active && <span className="absolute inset-0 bg-white/60" />}
            </button>
          ))}
        </div>
        <div className="num mt-4 text-center text-xs text-white/80">
          <span className="font-semibold text-white">{active + 1}</span> / {n}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Stay ---------------------------------- */

function StaySection() {
  const { openBooking } = useBooking();
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-[0.8fr_1.6fr] md:py-28">
      <div className="md:sticky md:top-28 md:self-start" data-reveal>
        <div className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink/70">Stay</div>
        <h2 className="mt-3 text-3xl leading-[1.2] text-ink sm:text-4xl">Unplug, unwind and rest like royalty</h2>
        <p className="mt-6 text-[0.9rem] leading-relaxed text-ink/75">
          Wake to soft light through heavy drapes, a breakfast that takes its time, and staff who
          remember how you take your tea.
        </p>
        <p className="mt-4 text-[0.9rem] leading-relaxed text-ink/75">
          Every room is centrally air-conditioned, with a marble bath and the quiet of a house far
          from the road.
        </p>
        <Link to="/rooms" className="btn btn-ghost mt-8 !py-2.5">
          Learn More
        </Link>
      </div>
      <div className="space-y-10">
        {rooms.map((r) => (
          <article key={r.name} className="grid items-center gap-6 sm:grid-cols-[1fr_1.05fr]" data-reveal>
            <Link
              to="/rooms/$slug"
              params={{ slug: roomSlug(r.name) }}
              className="img-zoom block aspect-[4/3] overflow-hidden rounded-sm"
            >
              <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover" />
            </Link>
            <div>
              <h3 className="text-2xl text-ink">{r.name}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/75">{r.short}</p>
              <p className="num mt-3 text-[0.8rem] text-ink/60">
                {r.size} · {r.bed} · from {inr(r.price)} + GST
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={() => openBooking("room", r.name)} className="btn btn-royal !px-4 !py-2.5 text-[0.76rem]">
                  Book Your Stay
                </button>
                <Link
                  to="/rooms/$slug"
                  params={{ slug: roomSlug(r.name) }}
                  className="btn btn-ghost !px-4 !py-2.5 text-[0.76rem]"
                >
                  Explore Room
                </Link>
              </div>
            </div>
          </article>
        ))}
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
    <section className="bg-powder/70">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <h2 className="text-center text-4xl text-ink sm:text-[2.6rem]" data-reveal>
          What Our Guests Say
        </h2>
        <div className="no-scrollbar -mx-6 mt-14 flex snap-x gap-8 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {testimonials.slice(0, 4).map((t) => (
            <figure key={t.name} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-auto" data-reveal>
              <blockquote className="text-[0.86rem] leading-[1.75] text-ink/85">{t.text}</blockquote>
              <figcaption className="mt-5 text-[0.8rem] font-semibold text-ink">{t.name} | Guest review</figcaption>
              <div className="mt-1.5 text-[0.7rem] tracking-[0.2em] text-royal">★★★★★</div>
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
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <BgVideo src={videos.evenings.src} poster={videos.evenings.poster} />
      </div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24 text-center">
        <div data-reveal>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/85">After Dark</div>
          <h2 className="mx-auto mt-4 max-w-md text-4xl leading-[1.15] sm:text-5xl">Evenings worth dressing up for</h2>
          <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-relaxed text-white/85">
            Live ghazals and retro Bollywood at Melting Pot midweek. At the weekend, Barrel turns up
            the music with live DJs and Ladies Night.
          </p>
          <Link to="/dining" className="btn btn-royal mt-10">
            See the Programme
          </Link>
        </div>
        <dl className="mt-20 grid grid-cols-2 gap-6 border-t border-white/20 pt-8 text-left md:grid-cols-4" data-reveal>
          {weekly.map((w) => (
            <div key={w.day}>
              <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-powder">{w.day}</dt>
              <dd className="mt-1 font-display text-xl">{w.name}</dd>
              <dd className="text-xs text-white/65">{w.where}</dd>
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
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/70 text-ink transition hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30";
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
          <Link key={s.name} to={s.to} className="group w-[78vw] shrink-0 snap-start sm:w-[22rem]">
            <div className="img-zoom aspect-[4/5]">
              <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-5 text-2xl text-ink">{s.name}</h3>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/70">{s.text}</p>
            <span className="link-line mt-4">
              Discover <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
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
                <Link to={o.to} className="btn btn-royal mt-6 self-start !px-5 !py-2.5 text-[0.76rem]">
                  {o.cta}
                </Link>
              ) : (
                <button
                  onClick={() => openBooking(o.kind)}
                  className="btn btn-royal mt-6 self-start !px-5 !py-2.5 text-[0.76rem]"
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
          <BookOpen className="mx-auto h-12 w-12 text-royal-soft" strokeWidth={0.8} />
          <h2 className="mt-4 text-4xl text-ink sm:text-[2.6rem]">Diaries &amp; Discoveries</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block" data-reveal>
              <div className="img-zoom aspect-[4/3]">
                <img src={postImage(p)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-lg leading-snug text-ink transition group-hover:text-royal">{p.title}</h3>
              <div className="mt-2 text-xs text-ink/60">
                {p.category} <span className="mx-1.5">•</span> <span className="num">{readTime(p)}</span> min read
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/journal" className="btn btn-royal">
            View All Our Stories
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
        <Emblem className="h-7 w-12 text-royal-soft" />
        <a href={ig} target="_blank" rel="noreferrer" className="btn btn-royal">
          <Instagram className="h-4 w-4" strokeWidth={1.5} /> View Our Instagram
        </a>
      </div>
    </section>
  );
}
