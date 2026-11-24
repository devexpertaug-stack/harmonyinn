import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { contact, rooms, roomSlug, venues } from "@/lib/hotel";
import { useBooking } from "./Booking";

const nav = [
  { to: "/rooms", label: "Stay" },
  { to: "/dining", label: "Dine" },
  { to: "/banquets", label: "Celebrate" },
  { to: "/journal", label: "Journal" },
] as const;

const menu = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms & Suites" },
  { to: "/dining", label: "Dining & Bar" },
  { to: "/banquets", label: "Banquets & Events" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

/** Palace crest: a central dome between two chhatris over an arcade. */
export function Emblem({ className = "h-7 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 36" className={className} fill="currentColor" aria-hidden="true">
      <path d="M31.4 1h1.2v4h-1.2z" />
      <path d="M23 14.5C24 8.5 27.6 5 32 5s8 3.5 9 9.5z" />
      <path d="M9 14.5c.6-3.6 2.6-5.6 5-5.6s4.4 2 5 5.6zM45 14.5c.6-3.6 2.6-5.6 5-5.6s4.4 2 5 5.6z" />
      <path d="M6 15.5h52v2.6H6z" />
      <path
        fillRule="evenodd"
        d="M9 19h46v16H9zm4 16v-8.4c0-1.6.9-2.6 2-2.6s2 1 2 2.6V35zm8 0v-8.4c0-1.6.9-2.6 2-2.6s2 1 2 2.6V35zm7.5 0v-9c0-2.3 1.6-3.8 3.5-3.8s3.5 1.5 3.5 3.8v9zm10.5 0v-8.4c0-1.6.9-2.6 2-2.6s2 1 2 2.6V35zm8 0v-8.4c0-1.6.9-2.6 2-2.6s2 1 2 2.6V35z"
      />
    </svg>
  );
}

export function EmblemDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-25" />
      <Emblem className="h-7 w-12 opacity-60" />
      <span className="h-px flex-1 bg-current opacity-25" />
    </div>
  );
}

function Logo({ light }: { light: boolean }) {
  return (
    <span className={`flex flex-col items-center leading-none ${light ? "text-white" : "text-ink"}`}>
      {/* pl equal to the tracking cancels the trailing letter-space so the word sits truly centred */}
      <span className="whitespace-nowrap pl-[0.3em] font-display text-[0.8rem] tracking-[0.3em] min-[380px]:text-[0.88rem] sm:pl-[0.34em] sm:text-lg sm:tracking-[0.34em]">
        HARMONY INN
      </span>
      <Emblem className="mt-1.5 h-5 w-10 sm:h-7 sm:w-12" />
    </span>
  );
}

/** Pages whose first section is a dark full-bleed image, so the header can start transparent. */
const darkTop = (path: string) =>
  path === "/" ||
  ["/rooms", "/dining", "/banquets", "/contact", "/journal"].some(
    (p) => path === p || path.startsWith(p + "/"),
  );

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || !darkTop(path);
  const light = !solid;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "bg-white/95 py-2.5 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur" : "veil-top py-4"
        }`}
      >
        {/* minmax(0,1fr) keeps both side columns equal, so the logo is always dead centre */}
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:gap-4 sm:px-8">
          <div className={`flex items-center gap-7 ${light ? "text-white" : "text-ink"}`}>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="-ml-3 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            >
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-5 bg-current" />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-[0.85rem] font-medium opacity-90 transition hover:opacity-100"
                  activeProps={{ className: "underline decoration-1 underline-offset-8" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link to="/" aria-label="Hotel Harmony Inn, home">
            <Logo light={light} />
          </Link>
          <div className="flex items-center justify-end gap-5">
            <a
              href={contact.phoneHref}
              className={`num hidden text-[0.8rem] font-medium xl:inline ${light ? "text-white/90" : "text-ink/80"}`}
            >
              {contact.phones[0]}
            </a>
            <button
              onClick={() => openBooking("room")}
              className="btn btn-royal !px-3.5 !py-2.5 text-[0.72rem] sm:!px-5 sm:text-[0.78rem]"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ink text-white transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-5 py-5 sm:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="-ml-2 flex h-10 w-10 items-center justify-center text-2xl font-light"
            >
              ✕
            </button>
            <Link to="/" onClick={() => setOpen(false)}>
              <Logo light />
            </Link>
            <span />
          </div>
          <div className="grid flex-1 content-center gap-12 md:grid-cols-[1.3fr_1fr]">
            <nav className="flex flex-col gap-2">
              {menu.map((m, i) => (
                <Link
                  key={m.to}
                  to={m.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl leading-tight text-white/85 transition hover:translate-x-2 hover:text-white sm:text-6xl"
                  style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                >
                  {m.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-8 self-end text-sm text-white/70 md:self-center">
              <div>
                <div className="eyebrow !text-powder">Visit</div>
                <p className="mt-3">{contact.address}</p>
              </div>
              <div>
                <div className="eyebrow !text-powder">Reservations</div>
                <a href={contact.phoneHref} className="num mt-3 block text-2xl text-white">
                  {contact.phones[0]}
                </a>
                <a href={`mailto:${contact.email}`} className="mt-1 block hover:text-white">
                  {contact.email}
                </a>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  openBooking("room");
                }}
                className="btn btn-white"
              >
                Book your stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const { openBooking } = useBooking();
  const col = "text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-powder";
  const item = "block py-0.5 text-[0.86rem] text-white/80 transition hover:text-white";
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <EmblemDivider className="text-powder" />
        <p className="mt-6 text-center font-display text-lg text-white/75">
          Royal hospitality on Main Garh Road, in the heart of Meerut
        </p>
        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2.6fr_1.1fr]">
          <div className="md:border-r md:border-white/10 md:pr-8">
            <div className={col}>Discover Harmony</div>
            <div className="mt-6 flex flex-col gap-1">
              {(
                [
                ["/rooms", "Stay"],
                ["/dining", "Dine"],
                ["/banquets", "Celebrate"],
                ["/journal", "Read"],
                ] as const
              ).map(([to, l]) => (
                <Link key={to} to={to} className="font-display text-4xl leading-snug hover:text-powder">
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <div className={col}>Stay</div>
              <div className="mt-4">
                {rooms.map((r) => (
                  <Link key={r.name} to="/rooms/$slug" params={{ slug: roomSlug(r.name) }} className={item}>
                    {r.name}
                  </Link>
                ))}
              </div>
              <div className={`${col} mt-8`}>Dine</div>
              <div className="mt-4">
                <Link to="/dining" className={item}>Melting Pot</Link>
                <Link to="/dining" className={item}>Barrel</Link>
                <Link to="/dining" className={item}>Private dining</Link>
              </div>
            </div>
            <div>
              <div className={col}>Celebrate</div>
              <div className="mt-4">
                {venues.map((v) => (
                  <Link key={v.name} to="/banquets" className={item}>
                    {v.name}
                  </Link>
                ))}
                <Link to="/banquets" className={item}>Conference room</Link>
              </div>
            </div>
            <div>
              <div className={col}>Resources</div>
              <div className="mt-4">
                <Link to="/journal" className={item}>Journal</Link>
                <Link to="/contact" className={item}>Contact & directions</Link>
                <button onClick={() => openBooking("event")} className={`${item} text-left`}>
                  Event enquiry
                </button>
              </div>
            </div>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-8">
            <div className={col}>Find us</div>
            <p className="mt-4 text-[0.86rem] leading-relaxed text-white/80">
              Opp. Nai Sadak, Main Garh Road
              <br />
              Meerut (U.P) <span className="num">250002</span>
            </p>
            <div className="mt-5 space-y-1 text-[0.86rem] text-white/80">
              <a href={`mailto:${contact.email}`} className="block hover:text-white">
                {contact.email}
              </a>
              {contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="num block hover:text-white">
                  t: {p}
                </a>
              ))}
            </div>
            <Link to="/contact" className="btn btn-light mt-6 !py-2.5">
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-7 text-xs text-white/60">
        <div className="flex flex-wrap items-center gap-5">
          <span>★★★★ Grand luxury</span>
          {contact.social.map(([n, u]) => (
            <a key={n} href={u} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">
              {n}
            </a>
          ))}
        </div>
        <span>
          <span className="num">© 2019 – 2026</span> Hotel Harmony Inn · A unit of Durga Habitat and
          Motels LLP
        </span>
      </div>
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Hotel Harmony Inn on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-royal text-white shadow-[0_10px_30px_-8px_rgb(24_43_107/0.6)] transition duration-500 hover:bg-royal-deep"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.2-4.24 9.44-9.45 9.44M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.79.58.7 5.67.7 11.93c0 2 .52 3.95 1.52 5.67L.6 23.5l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
        </svg>
      </a>
    </footer>
  );
}

/** Muted, looping background video with a poster fallback. */
export function BgVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, [src]);
  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Fades sections in as they scroll into view. Elements opt in with `data-reveal`. */
export function useReveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const t = setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    }, 50);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [path]);
}

export function PageHero({
  eyebrow,
  title,
  image,
  video,
  children,
}: {
  eyebrow: string;
  title: string;
  image: string;
  video?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex h-[82svh] min-h-[540px] items-center justify-center overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        {video ? (
          <BgVideo src={video} poster={image} />
        ) : (
          <img src={image} alt="" className="animate-kenburns h-full w-full object-cover" />
        )}
      </div>
      <div className="veil absolute inset-0" />
      <div className="animate-rise relative mx-auto max-w-4xl px-6 pt-16 text-center">
        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/85">{eyebrow}</div>
        <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl md:text-7xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  center,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"} data-reveal>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="mt-3 text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h2>
      {children && <div className="mt-5 leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}
