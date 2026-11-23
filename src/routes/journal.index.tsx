import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SiteChrome";
import { heroes, img } from "@/lib/hotel";
import { posts, postImage } from "@/lib/journal";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Hotel Harmony Inn, Meerut" },
      { name: "description", content: "Stories from Hotel Harmony Inn: staycations, weddings, dining and cocktail bars in Meerut." },
      { property: "og:title", content: "The Hotel Harmony Inn Journal" },
      { property: "og:description", content: "Notes on staying, dining and celebrating in Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="The Journal" title="Notes from Garh Road" image={heroes.journal} />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Link to="/journal/$slug" params={{ slug: lead!.slug }} className="group grid grid-cols-12 gap-6 border-b pb-20">
          <div className="img-zoom col-span-12 aspect-[16/10] md:col-span-8"><img src={postImage(lead!)} alt="" className="h-full w-full object-cover" /></div>
          <div className="col-span-12 self-end md:col-span-4">
            <div className="eyebrow">{lead!.category}</div>
            <h2 className="mt-4 text-4xl leading-tight transition group-hover:text-gold md:text-5xl">{lead!.title}</h2>
            <p className="mt-5 text-muted-foreground">{lead!.excerpt}</p>
            <span className="mt-6 inline-block border-b border-gold pb-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold">Read the story</span>
          </div>
        </Link>
        <div className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-2">
          {rest.map((p, i) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className={`group block ${i % 2 ? "md:mt-24" : ""}`}>
              <div className="img-zoom aspect-[4/3]"><img src={postImage(p)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
              <div className="eyebrow mt-6">{p.category}</div>
              <h3 className="mt-3 text-3xl leading-tight transition group-hover:text-gold">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
