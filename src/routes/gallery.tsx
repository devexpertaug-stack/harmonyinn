import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PageHero } from "@/components/site/SiteChrome";
import { img } from "@/lib/hotel";
import { galleryCategories, galleryPhotos, type GalleryCategory } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — Hotel Harmony Inn, Meerut" },
      {
        name: "description",
        content: "Photos of Hotel Harmony Inn, Meerut: the hotel, rooms and suites, Melting Pot restaurant, banquet halls and conference room.",
      },
      { property: "og:title", content: "Gallery — Hotel Harmony Inn" },
      { property: "og:description", content: "A look inside Hotel Harmony Inn, Meerut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = cat === "All" ? galleryPhotos : galleryPhotos.filter((p) => p.category === cat);

  return (
    <>
      <PageHero eyebrow="Gallery" title="A look inside" image={img.reception}>
        <p className="mx-auto mt-5 max-w-lg text-ink-foreground/85">
          The hotel, our rooms, the restaurant and the halls, in photographs.
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter photos">
          {(["All", ...galleryCategories] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => {
                setCat(c);
                setOpen(null);
              }}
              className={`btn !px-5 !py-3 !text-[0.65rem] ${cat === c ? "btn-gold" : "btn-ghost"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {shown.map((p, i) => (
            <li key={p.key} className="mb-3 break-inside-avoid md:mb-4">
              <button
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${p.caption}`}
                className="img-zoom group relative block w-full overflow-hidden"
                style={{ aspectRatio: p.ratio }}
              >
                <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-2.5 pt-8 text-left text-[0.72rem] text-ink-foreground opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {open !== null && shown[open] && (
        <Lightbox photos={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: typeof galleryPhotos;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const n = photos.length;
  const p = photos[index]!;
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [go, onClose]);

  const round =
    "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink-foreground/40 text-ink-foreground transition hover:bg-ink-foreground/15";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink/95 p-4"
      onClick={onClose}
    >
      <button ref={closeRef} onClick={onClose} aria-label="Close" className={`${round} right-4 top-4`}>
        <X className="h-6 w-6" />
      </button>
      {n > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
            className={`${round} left-3 top-1/2 -translate-y-1/2 sm:left-6`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next photo"
            className={`${round} right-3 top-1/2 -translate-y-1/2 sm:right-6`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <img
        key={p.key}
        src={p.src}
        alt={p.caption}
        onClick={(e) => e.stopPropagation()}
        className="animate-rise max-h-[80vh] max-w-[92vw] object-contain"
      />
      <p className="mt-4 text-center text-sm text-ink-foreground/85" onClick={(e) => e.stopPropagation()}>
        {p.caption} <span className="num ml-2 text-ink-foreground/50">{index + 1} / {n}</span>
      </p>
    </div>
  );
}
