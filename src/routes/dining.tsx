import { createFileRoute } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { PageHero } from "@/components/site/SiteChrome";
import { img, contact, pdas, weekly, seasonal } from "@/lib/hotel";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Melting Pot Restaurant & Barrel Bar — Hotel Harmony Inn" },
      { name: "description", content: "Fine dining at Melting Pot — Indian, Chinese, Oriental and Continental — with private lounges, plus theme nights and Ladies Night at Barrel bar." },
      { property: "og:title", content: "Dining & Bar — Hotel Harmony Inn" },
      { property: "og:description", content: "Melting Pot fine dining and Barrel, the bar, in Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dining,
});


function Dining() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero eyebrow="Dining & Nightlife" title="Savour. Linger. Celebrate." image={img.dining} />
      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24 md:py-32">
        <div className="col-span-12 md:col-span-5">
          <div className="eyebrow">Melting Pot · Restaurant</div>
          <h2 className="mt-4 text-5xl md:text-6xl">Indian, Oriental, Continental.</h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Fine dining with room to spread out. The kitchen is known across Meerut for its dal makhani, paneer lababdar and butter chicken, and each dish is cooked to order.
          </p>
          <div className="mt-12 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Private dining</div>
          <ul className="mt-3">
            {pdas.map(([n, c]) => (
              <li key={n} className="flex items-baseline justify-between border-b py-4"><span className="font-display text-2xl">{n}</span><span className="num text-sm text-muted-foreground">{c}</span></li>
            ))}
          </ul>
          <button onClick={() => openBooking("event", "Melting Pot private dining")} className="btn-outline-dark mt-10">Book a lounge</button>
        </div>
        <div className="col-span-12 grid grid-cols-6 gap-4 md:col-span-6 md:col-start-7">
          <div className="img-zoom col-span-4 aspect-[3/4]"><img src={img.meltingpot} alt="Melting Pot entrance" loading="lazy" className="h-full w-full object-cover" /></div>
          <div className="img-zoom col-span-2 mt-24 aspect-[2/3]"><img src={img.dining3} alt="Melting Pot dining room" loading="lazy" className="h-full w-full object-cover" /></div>
          <div className="img-zoom col-span-6 aspect-[16/9]"><img src={img.dining2} alt="Melting Pot main hall" loading="lazy" className="h-full w-full object-cover" /></div>
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="img-zoom aspect-[16/9] md:aspect-[21/8]"><img src={img.bar} alt="The bar counter at Barrel" loading="lazy" className="h-full w-full object-cover" /></div>
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24">
          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow">Barrel · The Bar</div>
            <h2 className="mt-4 text-5xl md:text-6xl">Low light, good music, an honest pour.</h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="leading-relaxed opacity-80">
              Barrel is a bar and lounge built on friendly, quick service and fair prices. It seats up to 75, has two private areas for 10 guests each, and a neon-lit smoking lounge.
            </p>
            <dl className="mt-10 grid grid-cols-3 border-t border-ink-foreground/15 pt-6">
              {[["75", "Guests"], ["2 × 10", "Private areas"], ["4", "Theme nights"]].map(([n, l]) => (
                <div key={l}><dt className="num text-3xl text-gold">{n}</dt><dd className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] opacity-60">{l}</dd></div>
              ))}
            </dl>
            <a href={contact.phoneHref} className="btn-gold mt-10">Call to reserve a table</a>
          </div>
          <div className="col-span-12 mt-10 grid grid-cols-12 gap-4">
            <div className="img-zoom col-span-7 aspect-[3/2]"><img src={img.bar2} alt="Barrel lounge seating" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="img-zoom col-span-5 aspect-[3/4]"><img src={img.bar3} alt="Signature bottle display" loading="lazy" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-24 md:py-32">
        <div className="col-span-12 md:col-span-4">
          <div className="eyebrow">The weekly programme</div>
          <h2 className="mt-4 text-5xl">Evenings at Harmony</h2>
          <p className="mt-6 text-muted-foreground">We also host {seasonal.join(", ")} parties each year. Call to hear about the next one.</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          {weekly.map((w) => (
            <div key={w.day} className="grid grid-cols-[7rem_1fr] gap-6 border-t py-7">
              <div><div className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">{w.day}</div><div className="mt-1 text-xs text-muted-foreground">{w.where}</div></div>
              <div><h3 className="text-3xl">{w.name}</h3><p className="mt-2 text-muted-foreground">{w.text}</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
