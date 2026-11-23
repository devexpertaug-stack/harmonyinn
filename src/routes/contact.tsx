import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SiteChrome";
import { heroes, img, contact } from "@/lib/hotel";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Hotel Harmony Inn, Meerut" },
      { name: "description", content: "Hotel Harmony Inn, Main Garh Road, Meerut 250002. Call +91 93687 03112 or email info@hotelharmonyinn.com." },
      { property: "og:title", content: "Contact Hotel Harmony Inn" },
      { property: "og:description", content: "Find us on Main Garh Road, Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We look forward to welcoming you." image={heroes.contact} />
      <section className="mx-auto grid max-w-7xl gap-px bg-border px-0 md:my-28 md:grid-cols-3">
        <div className="bg-background p-12">
          <div className="eyebrow">Address</div>
          <p className="mt-5 font-display text-3xl leading-snug">Main Garh Road, Meerut (U.P) <span className="num text-2xl">250002</span></p>
          <a href={contact.maps} target="_blank" rel="noreferrer" className="btn-outline-dark mt-8">Directions</a>
        </div>
        <div className="bg-background p-12">
          <div className="eyebrow">Telephone</div>
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="num mt-4 block text-2xl hover:text-gold">{p}</a>
          ))}
        </div>
        <div className="bg-background p-12">
          <div className="eyebrow">Email & chat</div>
          <a href={`mailto:${contact.email}`} className="mt-5 block break-all font-display text-2xl hover:text-gold">{contact.email}</a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-gold mt-8">WhatsApp</a>
        </div>
      </section>
      <iframe title="Map" className="h-[420px] w-full grayscale" loading="lazy"
        src="https://www.google.com/maps?q=Hotel+Harmony+Inn+Garh+Road+Meerut&output=embed" />
    </>
  );
}
