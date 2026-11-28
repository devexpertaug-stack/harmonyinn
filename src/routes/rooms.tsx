import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/site/Booking";
import { PageHero, EmblemDivider } from "@/components/site/SiteChrome";
import { img, rooms, policies, extraBed, inr, roomSlug } from "@/lib/hotel";
import { Amenities } from "@/components/site/Amenities";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — Hotel Harmony Inn, Meerut" },
      {
        name: "description",
        content:
          "Executive Twin, Deluxe, Harmony Suite and Presidential Suite from ₹4,499 + GST, with complimentary breakfast and free valet parking.",
      },
      { property: "og:title", content: "Rooms & Suites — Hotel Harmony Inn" },
      { property: "og:description", content: "Four refined room categories, from ₹4,499 + GST with breakfast included." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rooms,
});

/** Sticky jump bar: one pill per room, name above price, the room on screen highlighted. */
function RoomTabs() {
  const [active, setActive] = useState(roomSlug(rooms[0]!.name));
  useEffect(() => {
    const els = rooms.map((r) => document.getElementById(roomSlug(r.name))).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Jump to a room" className="sticky top-[60px] z-30 px-4 py-3">
      <div className="no-scrollbar mx-auto flex max-w-3xl gap-1.5 overflow-x-auto rounded-full border border-border bg-card/95 p-1.5 shadow-[0_10px_30px_-18px_rgb(20_15_10/0.45)] backdrop-blur md:grid md:grid-cols-4">
        {rooms.map((r) => {
          const id = roomSlug(r.name);
          const on = id === active;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={on ? "true" : undefined}
              className={`flex min-w-[8.5rem] shrink-0 flex-col items-center rounded-full px-4 py-2 text-center transition md:min-w-0 ${
                on ? "bg-ink text-ink-foreground" : "text-ink/80 hover:bg-sand"
              }`}
            >
              <span className="font-display text-[1.05rem] leading-tight">{r.name.replace(" Bed Room", "")}</span>
              <span
                className={`num mt-0.5 text-[0.6rem] uppercase tracking-[0.18em] ${on ? "text-gold" : "text-muted-foreground"}`}
              >
                From {inr(r.price)}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Rooms() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero eyebrow="Stay · Four categories" title="Rooms & Suites" image={img.suite}>
        <p className="mx-auto mt-5 max-w-lg text-ink-foreground/85">
          Every rate includes buffet breakfast, mineral water and free valet parking.
        </p>
      </PageHero>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center" data-reveal>
        <h2 className="text-3xl leading-snug text-ink sm:text-4xl">
          From a 280 sq ft twin room for the working traveller to a 560 sq ft suite with its own salon.
        </h2>
        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
          {[
            ["Check-in", "12:00"],
            ["Check-out", "12:00"],
            ["Extra bed", inr(extraBed)],
            ["From", inr(rooms[0]!.price)],
          ].map(([l, v]) => (
            <div key={l}>
              <dt className="eyebrow">{l}</dt>
              <dd className="num mt-2 font-display text-2xl text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RoomTabs />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-28">
          {rooms.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={r.name}
                id={roomSlug(r.name)}
                className="grid scroll-mt-36 items-center gap-10 md:grid-cols-[1.25fr_1fr]"
                data-reveal
              >
                <div className={`grid grid-cols-5 gap-4 ${flip ? "md:order-2" : ""}`}>
                  <div className="img-zoom col-span-3 aspect-[3/4]">
                    <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="img-zoom col-span-2 mt-16 aspect-[3/4]">
                    <img src={r.alt} alt={`${r.name} detail`} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className={flip ? "md:order-1" : ""}>
                  <div className="eyebrow">
                    <span className="num">{r.size}</span> · {r.bed}
                  </div>
                  <h2 className="mt-3 text-4xl text-ink">{r.name}</h2>
                  <p className="mt-5 leading-relaxed text-ink/75">{r.text}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.86rem] text-ink/80">
                    {r.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <span className="text-[0.55rem] text-gold">❖</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-t border-border pt-6">
                    <span className="num font-display text-3xl text-ink">{inr(r.price)}</span>{" "}
                    <span className="text-sm text-ink/60">+ GST, per night</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => openBooking("room", r.name)} className="btn btn-gold">
                      Book Your Stay
                    </button>
                    <Link to="/rooms/$slug" params={{ slug: roomSlug(r.name) }} className="btn btn-ghost">
                      Explore Room
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 text-gold">
        <EmblemDivider />
      </div>

      <div className="mt-20">
        <Amenities />
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.6fr]">
        <div data-reveal>
          <div className="eyebrow">Before you arrive</div>
          <h2 className="mt-3 text-4xl text-ink">Reservation policy</h2>
        </div>
        <div className="space-y-5 text-ink/75" data-reveal>
          {policies.map((p) => (
            <p key={p} className="border-t border-border pt-5 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
