import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { contact } from "@/lib/hotel";
import { useBooking } from "./Booking";

const nav = [
  { to: "/rooms", label: "Rooms & Suites" },
  { to: "/banquets", label: "Banquets" },
  { to: "/dining", label: "Dining & Bar" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open ? "bg-ink/95 py-3 backdrop-blur" : "bg-transparent py-6"
      } text-ink-foreground`}
    >
      <div className={`mx-auto hidden max-w-7xl items-center justify-between overflow-hidden px-6 text-[0.62rem] uppercase tracking-[0.3em] opacity-70 transition-all duration-500 lg:flex ${solid ? "h-0 opacity-0" : "mb-5 h-4"}`}>
        <span>Opp. Nai Sadak · Main Garh Road · Meerut</span>
        <span className="flex gap-8"><a href={contact.phoneHref} className="num hover:text-gold">{contact.phones[0]}</a><a href={`mailto:${contact.email}`} className="normal-case tracking-[0.15em] hover:text-gold">{contact.email}</a></span>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" className="flex min-w-0 flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="eyebrow text-[0.55rem]">Hotel</span>
          <span className="font-display text-xl tracking-[0.16em] sm:text-2xl">HARMONY INN</span>
          <span className="mt-1 text-[0.5rem] uppercase tracking-[0.45em] opacity-60">Meerut · ★★★★</span>
        </Link>
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-[0.72rem] uppercase tracking-[0.28em] opacity-80 transition hover:text-gold hover:opacity-100" activeProps={{ className: "text-gold opacity-100" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <button onClick={() => openBooking("room")} className="btn-gold hidden !px-5 !py-3 sm:inline-flex">Book Now</button>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden">
            <span className={`h-px w-6 bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-5 px-6 pb-8 pt-6 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-3xl">{n.label}</Link>
          ))}
          <button onClick={() => { setOpen(false); openBooking("room"); }} className="btn-gold mt-2">Book Now</button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-4xl tracking-[0.12em]">Hotel Harmony Inn</div>
          <div className="eyebrow mt-2">Hotel Harmony Inn · Meerut</div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">
            A newly renovated four-star grand luxury hotel on Main Garh Road — stays, fine dining, an elegant bar and the city's finest celebration venues under one roof.
          </p>
        </div>
        <div className="text-sm leading-loose opacity-80">
          <div className="eyebrow mb-4">Visit</div>
          <p>Opp. Nai Sadak, Main Garh Road<br />Meerut (U.P) <span className="num">250002</span></p>
          <a href={contact.maps} target="_blank" rel="noreferrer" className="text-gold hover:underline">Get directions →</a>
        </div>
        <div className="text-sm leading-loose opacity-80">
          <div className="eyebrow mb-4">Reach us</div>
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="num block hover:text-gold">{p}</a>
          ))}
          <a href={`mailto:${contact.email}`} className="block hover:text-gold">{contact.email}</a>
          <div className="mt-4 flex gap-5">{contact.social.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" className="text-[0.65rem] uppercase tracking-[0.25em] text-gold hover:underline">{n}</a>)}</div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 px-6 py-6 text-center text-[0.7rem] tracking-[0.15em] opacity-50">
        <span className="num">© 2019 – 2026</span> Hotel Harmony Inn · A unit of Durga Habitat and Motels LLP · All rights reserved
      </div>
      <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Hotel Harmony Inn on WhatsApp"
        className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 bg-ink text-gold shadow-[0_8px_24px_-8px_var(--ink)] transition duration-500 hover:bg-gold hover:text-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.2-4.24 9.44-9.45 9.44M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.79.58.7 5.67.7 11.93c0 2 .52 3.95 1.52 5.67L.6 23.5l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03"/></svg>
      </a>
    </footer>
  );
}

export function PageHero({ eyebrow, title, image, children }: { eyebrow: string; title: string; image: string; children?: React.ReactNode }) {
  return (
    <section className="relative flex h-[78vh] min-h-[520px] items-end overflow-hidden bg-ink text-ink-foreground">
      <img src={image} alt="" className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
      <div className="veil absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="animate-rise">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-7xl md:text-8xl">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">{title}</h2>
      <div className={`gold-rule mt-6 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
