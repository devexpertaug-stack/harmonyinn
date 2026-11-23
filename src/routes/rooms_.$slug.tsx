import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { useEffect, useState } from "react";
import { rooms, roomSlug, findRoom, roomGallery, inr, policies, silentFeatures, extraBed } from "@/lib/hotel";

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
  const photos = roomGallery(r.name);
  const [open, setOpen] = useState<number | null>(null);
  const others = rooms.filter((x) => x.name !== r.name);
  const idx = rooms.findIndex((x) => x.name === r.name);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o! + 1) % photos.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o! - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, photos.length]);
  useEffect(() => setOpen(null), [slug]);

  return (
    <>
      {/* Split hero */}
      <section className="grid bg-ink text-ink-foreground md:min-h-[92svh] md:grid-cols-12">
        <div className="relative order-2 flex flex-col justify-end px-6 pb-12 pt-10 md:order-1 md:col-span-5 md:px-12 md:pb-16 md:pt-36">
          <Link to="/rooms" className="text-[0.65rem] uppercase tracking-[0.3em] opacity-70 hover:text-gold">← Rooms &amp; Suites</Link>
          <div className="eyebrow mt-10">{["First", "Second", "Third", "Fourth"][idx]} of four categories</div>
          <h1 className="mt-5 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{r.name}</h1>
          <p className="mt-6 max-w-md font-display text-xl italic leading-snug opacity-80">{r.text}</p>
          <dl className="mt-10 grid grid-cols-3 border-y border-ink-foreground/20 text-sm">
            <div className="py-5"><dt className="text-[0.55rem] uppercase tracking-[0.3em] opacity-60">Size</dt><dd className="num mt-1 text-lg">{r.size}</dd></div>
            <div className="border-l border-ink-foreground/20 py-5 pl-4"><dt className="text-[0.55rem] uppercase tracking-[0.3em] opacity-60">Bed</dt><dd className="mt-1 text-lg">{r.bed.split(" · ")[0]}</dd></div>
            <div className="border-l border-ink-foreground/20 py-5 pl-4"><dt className="text-[0.55rem] uppercase tracking-[0.3em] opacity-60">From</dt><dd className="num mt-1 text-lg text-gold">{inr(r.price)}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button onClick={() => openBooking("room", r.name)} className="btn-gold">Reserve this room</button>
            <button onClick={() => setOpen(0)} className="border-b border-ink-foreground/40 pb-1 text-[0.65rem] uppercase tracking-[0.3em] hover:border-gold hover:text-gold">View <span className="num">{photos.length}</span> photos</button>
          </div>
        </div>
        <button onClick={() => setOpen(0)} className="img-zoom relative order-1 block h-[58svh] overflow-hidden md:order-2 md:col-span-7 md:h-auto" aria-label="Open photo gallery">
          <img src={photos[0]} alt={r.name} className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
        </button>
      </section>

      {/* Gallery mosaic */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><div className="eyebrow">Inside the room</div><h2 className="mt-3 text-4xl md:text-5xl">A closer look</h2></div>
          <span className="num text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">{photos.length} photographs</span>
        </div>
        <div className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-12 md:gap-4">
          {photos.slice(1).map((src, i) => {
            const span = ["md:col-span-7 md:row-span-3 row-span-2", "md:col-span-5 md:row-span-2", "md:col-span-5 md:row-span-1", "md:col-span-4 md:row-span-2", "md:col-span-4 md:row-span-2", "md:col-span-4 md:row-span-2"][i % 6];
            return (
              <button key={src} onClick={() => setOpen(i + 1)} className={`img-zoom relative col-span-1 overflow-hidden ${span} ${i === 0 ? "col-span-2" : ""}`} aria-label={`Open photo ${i + 2}`}>
                <img src={src} alt={`${r.name}, photo ${i + 2}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Details + sticky reserve */}
      <section className="border-t">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-20">
          <div className="col-span-12 md:col-span-7">
            <div className="eyebrow">In the room</div>
            <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {r.amenities.map((a) => <li key={a} className="border-b py-4 font-display text-2xl">{a}</li>)}
            </ul>
            <div className="eyebrow mt-16">With every stay</div>
            <ul className="mt-6 grid gap-x-10 text-muted-foreground sm:grid-cols-2">
              {silentFeatures.map((f) => <li key={f} className="border-b py-3 text-sm">{f}</li>)}
            </ul>
            <div className="eyebrow mt-16">Before you arrive</div>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {policies.map((p) => <p key={p} className="border-l border-gold pl-4">{p}</p>)}
            </div>
          </div>
          <aside className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="bg-ink p-8 text-ink-foreground md:sticky md:top-28">
              <div className="eyebrow">Your stay</div>
              <div className="mt-4"><span className="num text-5xl">{inr(r.price)}</span> <span className="text-sm opacity-70">+ GST / night</span></div>
              <dl className="mt-8 space-y-3 border-t border-ink-foreground/20 pt-6 text-sm">
                <div className="flex justify-between"><dt className="opacity-70">Check-in</dt><dd className="num">12:00 noon</dd></div>
                <div className="flex justify-between"><dt className="opacity-70">Check-out</dt><dd className="num">12:00 noon</dd></div>
                <div className="flex justify-between"><dt className="opacity-70">Extra bed</dt><dd className="num">{inr(extraBed)}</dd></div>
                <div className="flex justify-between"><dt className="opacity-70">Breakfast</dt><dd>Included</dd></div>
              </dl>
              <button onClick={() => openBooking("room", r.name)} className="btn-gold mt-8 w-full">Reserve this room</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Other rooms */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="eyebrow">Continue exploring</div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.name} to="/rooms/$slug" params={{ slug: roomSlug(o.name) }} className="group block">
                <div className="img-zoom aspect-[4/5]"><img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-b pb-4">
                  <h3 className="text-2xl transition group-hover:text-gold">{o.name}</h3>
                  <span className="num text-sm text-muted-foreground">{inr(o.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${r.name} photos`} className="fixed inset-0 z-[80] flex flex-col bg-ink text-ink-foreground">
          <div className="flex items-center justify-between px-6 py-4 text-[0.65rem] uppercase tracking-[0.3em]">
            <span>{r.name} · <span className="num">{open + 1} / {photos.length}</span></span>
            <button onClick={() => setOpen(null)} className="hover:text-gold">Close ✕</button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4">
            <img src={photos[open]} alt={`${r.name}, photo ${open + 1}`} className="max-h-[78svh] max-w-full object-contain" />
            <button onClick={() => setOpen((open - 1 + photos.length) % photos.length)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 px-4 py-6 font-display text-4xl hover:text-gold">‹</button>
            <button onClick={() => setOpen((open + 1) % photos.length)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-6 font-display text-4xl hover:text-gold">›</button>
          </div>
          <div className="flex gap-2 overflow-x-auto px-6 py-4">
            {photos.map((p, i) => (
              <button key={p} onClick={() => setOpen(i)} aria-label={`Photo ${i + 1}`} className={`h-14 w-20 shrink-0 overflow-hidden border ${i === open ? "border-gold" : "border-transparent opacity-50"}`}>
                <img src={p} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
