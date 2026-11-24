import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useBooking } from "@/components/site/Booking";
import { rooms, roomSlug, findRoom, inr, policies, silentFeatures, extraBed } from "@/lib/hotel";

export const Route = createFileRoute("/rooms_/$slug")({
  loader: ({ params }) => {
    const room = findRoom(params.slug);
    if (!room) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const r = loaderData ? findRoom(loaderData.slug) : undefined;
    const title = r ? `${r.name} — Hotel Harmony Inn, Meerut` : "Room — Hotel Harmony Inn";
    const desc = r
      ? `${r.name}: ${r.size}, ${r.bed}. From ${inr(r.price)} + GST per night with buffet breakfast at Hotel Harmony Inn.`
      : "Rooms at Hotel Harmony Inn, Meerut.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(r ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-48 text-center">
      <h1 className="text-5xl text-ink">Room not found</h1>
      <Link to="/rooms" className="btn btn-royal mt-8">
        All rooms
      </Link>
    </div>
  ),
  component: RoomPage,
});

function RoomPage() {
  const { slug } = Route.useLoaderData();
  const r = findRoom(slug)!;
  const { openBooking } = useBooking();
  const [shown, setShown] = useState(0);
  const others = rooms.filter((x) => x.name !== r.name);
  const pic = r.gallery[shown] ?? r.image;

  return (
    <>
      <section className="relative flex h-[82svh] min-h-[540px] items-end overflow-hidden bg-ink text-white">
        <img src={r.image} alt={r.name} className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="animate-rise relative mx-auto w-full max-w-6xl px-6 pb-16">
          <Link to="/rooms" className="text-[0.8rem] font-medium text-white/85 hover:text-white">
            ← Rooms &amp; Suites
          </Link>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] sm:text-7xl">{r.name}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem] font-medium text-white/85">
            <span className="num">{r.size}</span>
            <span>{r.bed}</span>
            <span>Breakfast included</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.7fr_1fr]">
        <div>
          <div className="eyebrow">The room</div>
          <p className="mt-4 font-display text-3xl leading-snug text-ink">{r.text}</p>

          <div className="mt-12" data-reveal>
            <div className="aspect-[4/3] overflow-hidden bg-mist">
              <img key={pic} src={pic} alt={`${r.name}, photo ${shown + 1}`} className="animate-rise h-full w-full object-cover" />
            </div>
            <div className="mt-3 flex gap-3">
              {r.gallery.map((g, i) => (
                <button
                  key={g}
                  onClick={() => setShown(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-16 min-w-0 flex-1 overflow-hidden transition sm:h-20 sm:w-24 sm:flex-none ${i === shown ? "ring-2 ring-royal ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                >
                  <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14" data-reveal>
            <div className="eyebrow">In the room</div>
            <ul className="mt-5 grid gap-3 text-[0.9rem] text-ink/80 sm:grid-cols-2">
              {r.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 border-b border-border pb-3">
                  <span className="text-[0.55rem] text-royal-soft">❖</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside>
          <div className="rounded-2xl border border-border bg-white p-8 shadow-[0_20px_50px_-30px_rgb(15_26_58/0.35)] md:sticky md:top-28">
            <div className="eyebrow">Per night, from</div>
            <div className="mt-3">
              <span className="num font-display text-5xl text-ink">{inr(r.price)}</span>{" "}
              <span className="text-sm text-ink/60">+ GST</span>
            </div>
            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              {[
                ["Check-in", "12:00"],
                ["Check-out", "12:00"],
                ["Extra bed", inr(extraBed)],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <dt className="text-ink/60">{l}</dt>
                  <dd className="num text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <button onClick={() => openBooking("room", r.name)} className="btn btn-royal mt-8 w-full !py-4">
              Book Your Stay
            </button>
            <p className="mt-4 text-center text-xs text-ink/55">No payment now. We call to confirm.</p>
          </div>
        </aside>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.6fr]">
          <div>
            <div className="eyebrow">With every stay</div>
            <h2 className="mt-3 text-4xl text-ink">Included, without asking.</h2>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {silentFeatures.map((f) => (
              <li key={f} className="border-b border-ink/10 py-4 font-display text-lg text-ink">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.6fr]">
        <div>
          <div className="eyebrow">Before you arrive</div>
          <h2 className="mt-3 text-4xl text-ink">Policy</h2>
        </div>
        <div className="space-y-4 text-ink/75">
          {policies.map((p) => (
            <p key={p} className="border-t border-border pt-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-4xl text-ink">Other rooms</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.name} to="/rooms/$slug" params={{ slug: roomSlug(o.name) }} className="group block">
                <div className="img-zoom aspect-[4/3]">
                  <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl text-ink transition group-hover:text-royal">{o.name}</h3>
                  <span className="num text-sm text-ink/60">{inr(o.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
