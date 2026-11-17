import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
    const desc = r ? `${r.name}: ${r.size}, ${r.bed}. From ${inr(r.price)} + GST per night with buffet breakfast at Hotel Harmony Inn.` : "Rooms at Hotel Harmony Inn, Meerut.";
    return { meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      ...(r ? [] : [{ name: "robots", content: "noindex" }]),
    ] };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-40 text-center">
      <h1 className="text-5xl">Room not found</h1>
      <Link to="/rooms" className="btn-outline-dark mt-8 inline-block">All rooms</Link>
    </div>
  ),
  component: RoomPage,
});

function RoomPage() {
  const { slug } = Route.useLoaderData();
  const r = findRoom(slug)!;
  const { openBooking } = useBooking();
  const others = rooms.filter((x) => x.name !== r.name);
  return (
    <>
      <section className="grain relative h-[78svh] min-h-[520px] overflow-hidden bg-ink text-ink-foreground">
        <img src={r.image} alt={r.name} className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16">
          <Link to="/rooms" className="text-[0.65rem] uppercase tracking-[0.3em] opacity-80 hover:text-gold">← Rooms &amp; Suites</Link>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1] sm:text-7xl">{r.name}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] uppercase tracking-[0.25em] opacity-85">
            <span className="num">{r.size}</span><span>{r.bed}</span><span>Breakfast included</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24">
        <div className="col-span-12 md:col-span-7">
          <div className="eyebrow">The room</div>
          <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">{r.text}</p>
          <div className="mt-14 grid grid-cols-5 gap-4">
            <div className="img-zoom col-span-3 aspect-[4/5]"><img src={r.alt} alt={`${r.name} detail`} loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="col-span-2 self-end">
              <div className="eyebrow">In the room</div>
              <ul className="mt-4 space-y-3 text-sm">
                {r.amenities.map((a) => <li key={a} className="border-l border-gold pl-3">{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <aside className="col-span-12 md:col-span-4 md:col-start-9">
          <div className="border bg-secondary/50 p-8 md:sticky md:top-28">
            <div className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Per night, from</div>
            <div className="mt-2"><span className="num text-5xl">{inr(r.price)}</span> <span className="text-sm text-muted-foreground">+ GST</span></div>
            <dl className="mt-8 space-y-3 border-t pt-6 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Check-in</dt><dd className="num">12:00</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Check-out</dt><dd className="num">12:00</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Extra bed</dt><dd className="num">{inr(extraBed)}</dd></div>
            </dl>
            <button onClick={() => openBooking("room", r.name)} className="btn-gold mt-8 w-full">Reserve this room</button>
          </div>
        </aside>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-20">
          <div className="col-span-12 md:col-span-4"><div className="eyebrow">With every stay</div><h2 className="mt-4 text-4xl">Included, without asking.</h2></div>
          <ul className="col-span-12 columns-1 gap-10 sm:columns-2 md:col-span-7 md:col-start-6">
            {silentFeatures.map((f) => <li key={f} className="break-inside-avoid border-b border-ink-foreground/15 py-4 font-display text-xl">{f}</li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-20">
        <div className="col-span-12 md:col-span-4"><div className="eyebrow">Before you arrive</div><h2 className="mt-4 text-4xl">Policy</h2></div>
        <div className="col-span-12 space-y-4 text-muted-foreground md:col-span-7 md:col-start-6">
          {policies.map((p) => <p key={p} className="border-t pt-4">{p}</p>)}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="eyebrow">Other rooms</div>
          <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
            {others.map((o) => (
              <Link key={o.name} to="/rooms/$slug" params={{ slug: roomSlug(o.name) }} className="group block">
                <div className="img-zoom aspect-[4/3]"><img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl transition group-hover:text-gold">{o.name}</h3>
                  <span className="num text-sm text-muted-foreground">{inr(o.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
