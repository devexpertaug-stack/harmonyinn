import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SiteChrome";
import { img } from "@/lib/hotel";
import { posts, postImage } from "@/lib/journal";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Blog — Hotel Harmony Inn, Meerut" },
      { name: "description", content: "Stories from Hotel Harmony Inn: staycations, weddings, dining and cocktail bars in Meerut." },
      { property: "og:title", content: "The Hotel Harmony Inn Blog" },
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
      <PageHero eyebrow="The Blog" title="Notes from Garh Road" image={img.reception} />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Link
          to="/journal/$slug"
          params={{ slug: lead!.slug }}
          className="group grid items-end gap-10 border-b border-border pb-20 md:grid-cols-[1.6fr_1fr]"
          data-reveal
        >
          <div className="img-zoom aspect-[16/10]">
            <img src={postImage(lead!)} alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="eyebrow">{lead!.category}</div>
            <h2 className="mt-3 text-4xl leading-tight text-ink transition group-hover:text-gold">{lead!.title}</h2>
            <p className="mt-5 text-ink/70">{lead!.excerpt}</p>
            <span className="btn btn-gold mt-8">Read the Story</span>
          </div>
        </Link>
        <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {rest.map((p) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block" data-reveal>
              <div className="img-zoom aspect-[4/3]">
                <img src={postImage(p)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="eyebrow mt-6">{p.category}</div>
              <h3 className="mt-2 text-3xl leading-tight text-ink transition group-hover:text-gold">{p.title}</h3>
              <p className="mt-3 text-[0.9rem] text-ink/65">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
