import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useBooking } from "@/components/site/Booking";
import { PageHero } from "@/components/site/SiteChrome";
import { img, contact } from "@/lib/hotel";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Hotel Harmony Inn, Meerut" },
      {
        name: "description",
        content: "Hotel Harmony Inn, Main Garh Road, Meerut 250002. Call +91 93687 03112 or email info@hotelharmonyinn.com.",
      },
      { property: "og:title", content: "Contact Hotel Harmony Inn" },
      { property: "og:description", content: "Find us on Main Garh Road, Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { openBooking } = useBooking();
  const card = "rounded-2xl border border-border bg-card p-10";
  return (
    <>
      <PageHero eyebrow="Contact" title="We look forward to welcoming you." image={img.porch} />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 md:grid-cols-3">
        <div className={card} data-reveal>
          <MapPin className="h-8 w-8 text-gold" strokeWidth={1} />
          <div className="eyebrow mt-6">Address</div>
          <p className="mt-3 font-display text-2xl leading-snug text-ink">
            Opp. Nai Sadak, Main Garh Road, Meerut (U.P) <span className="num">250002</span>
          </p>
          <a href={contact.maps} target="_blank" rel="noreferrer" className="btn btn-ghost mt-8 !py-2.5">
            Get Directions
          </a>
        </div>
        <div className={card} data-reveal>
          <Phone className="h-8 w-8 text-gold" strokeWidth={1} />
          <div className="eyebrow mt-6">Telephone</div>
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="num mt-3 block font-display text-2xl text-ink hover:text-gold">
              {p}
            </a>
          ))}
        </div>
        <div className={card} data-reveal>
          <Mail className="h-8 w-8 text-gold" strokeWidth={1} />
          <div className="eyebrow mt-6">Email & chat</div>
          <a href={`mailto:${contact.email}`} className="mt-3 block break-all font-display text-2xl text-ink hover:text-gold">
            {contact.email}
          </a>
          <a href={`mailto:${contact.enquiryEmail}`} className="mt-1 block break-all text-sm text-ink/65 hover:text-gold">
            Events: {contact.enquiryEmail}
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn-gold mt-8 !py-2.5">
            WhatsApp Us
          </a>
        </div>
      </section>
      <section className="bg-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10">
          <h2 className="text-3xl text-ink">Ready to stay with us?</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => openBooking("room")} className="btn btn-gold">
              Book Your Stay
            </button>
            <button onClick={() => openBooking("event")} className="btn btn-ghost">
              Plan an Event
            </button>
          </div>
        </div>
      </section>
      <iframe
        title="Map showing Hotel Harmony Inn on Garh Road, Meerut"
        className="h-[460px] w-full saturate-[0.6]"
        loading="lazy"
        src="https://www.google.com/maps?q=Hotel+Harmony+Inn+Garh+Road+Meerut&output=embed"
      />
    </>
  );
}
