import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useBooking } from "@/components/site/Booking";
import { posts, postImage } from "@/lib/journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Hotel Harmony Inn` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Story not found — Hotel Harmony Inn" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-48 text-center">
      <h1 className="text-5xl text-ink">This story has moved.</h1>
      <Link to="/journal" className="btn btn-gold mt-10">Back to the blog</Link>
    </div>
  ),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();
  const { openBooking } = useBooking();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const cta = post.category === "Weddings" ? "event" : "room";
  return (
    <article>
      <header className="bg-ink pt-40 text-ink-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pb-16">
          <div className="col-span-12 md:col-span-9">
            <Link to="/journal" className="eyebrow hover:text-ink-foreground">Blog · {post.category}</Link>
            <h1 className="mt-6 text-4xl leading-[1.05] sm:text-6xl md:text-7xl">{post.title}</h1>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6"><img src={postImage(post)} alt="" className="aspect-[21/9] w-full translate-y-16 object-cover" /></div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pb-24 pt-36">
        <aside className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-32">
            <div className="eyebrow">Hotel Harmony Inn</div>
            <p className="mt-3 text-sm text-ink/65">Opp. Nai Sadak, Main Garh Road, Meerut</p>
            <button onClick={() => openBooking(cta)} className="btn btn-gold mt-6">{cta === "event" ? "Enquire" : "Book a stay"}</button>
          </div>
        </aside>
        <div className="col-span-12 max-w-2xl md:col-span-8 md:col-start-5">
          {post.body.map(([t, s], i) =>
            t === "h" ? <h2 key={i} className="mt-12 text-3xl text-ink">{s}</h2>
            : <p key={i} className={`mt-5 text-lg leading-relaxed ${i === 0 ? "font-display text-2xl leading-snug first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold text-ink" : "text-ink/80"}`}>{s}</p>,
          )}
        </div>
      </div>
      <section className="border-t border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2">
          {more.map((p) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group grid grid-cols-5 items-center gap-6">
              <div className="img-zoom col-span-2 aspect-square"><img src={postImage(p)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
              <div className="col-span-3"><div className="eyebrow">Next read</div><h3 className="mt-2 text-2xl group-hover:text-gold">{p.title}</h3></div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
