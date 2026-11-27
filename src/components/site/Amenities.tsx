import { amenityGroups } from "@/lib/hotel";

/** Hotel-wide amenities, grouped by theme. Used on the rooms page and every room page. */
export function Amenities() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center" data-reveal>
          <div className="eyebrow">Amenities &amp; services</div>
          <h2 className="mt-3 text-4xl text-ink md:text-5xl">Everything for a comfortable stay</h2>
          <p className="mt-4 text-muted-foreground">
            Every room at Hotel Harmony Inn comes with these amenities and services.
          </p>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {amenityGroups.map((g) => (
            <div key={g.title} data-reveal>
              <h3 className="border-b border-gold pb-3 font-display text-2xl text-ink">{g.title}</h3>
              <ul className="mt-5 space-y-3">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink/80">
                    <span className="mt-[0.45rem] text-[0.5rem] text-gold" aria-hidden="true">
                      ❖
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
