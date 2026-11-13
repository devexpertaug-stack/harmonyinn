import { createContext, useContext, useState, type ReactNode } from "react";
import { z } from "zod";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { rooms, venues, inr, contact } from "@/lib/hotel";

type Kind = "room" | "event";
type Ctx = { openBooking: (kind?: Kind, item?: string) => void };
const BookingCtx = createContext<Ctx>({ openBooking: () => {} });
export const useBooking = () => useContext(BookingCtx);

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{7,20}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  check_in: z.string().min(1, "Choose a date"),
  check_out: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(1000),
  notes: z.string().max(1000).optional(),
});

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d: string, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<Kind>("room");
  const [item, setItem] = useState(rooms[1]!.name);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(addDays(today(), 1));

  const openBooking = (k: Kind = "room", i?: string) => {
    setKind(k);
    setItem(i ?? (k === "room" ? rooms[1]!.name : venues[0]!.name));
    setStatus("idle"); setError("");
    setOpen(true);
  };

  const nights = Math.max(1, Math.round((+new Date(checkOut) - +new Date(checkIn)) / 864e5) || 1);
  const room = rooms.find((r) => r.name === item);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(fd);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form"); return; }
    if (kind === "room" && parsed.data.check_out && parsed.data.check_out <= parsed.data.check_in) { setError("Check-out must be after check-in"); return; }
    setError(""); setStatus("sending");
    const { error } = await supabase.from("booking_requests").insert({
      kind, item,
      full_name: parsed.data.full_name, phone: parsed.data.phone,
      email: parsed.data.email || null, check_in: parsed.data.check_in,
      check_out: kind === "room" ? parsed.data.check_out || null : null,
      guests: parsed.data.guests, notes: parsed.data.notes || null,
    });
    if (error) { setStatus("idle"); setError("Something went wrong. Please call us instead."); return; }
    setStatus("done");
  }

  const options = kind === "room" ? rooms.map((r) => r.name) : venues.map((v) => v.name);

  return (
    <BookingCtx.Provider value={{ openBooking }}>
      {children}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-l-gold/30 bg-ivory p-0 sm:max-w-lg">
          <div className="bg-ink px-8 pb-8 pt-12 text-ink-foreground">
            <div className="eyebrow">Hotel Harmony Inn</div>
            <SheetTitle className="mt-3 font-display text-4xl font-normal text-ink-foreground">
              {kind === "room" ? "Reserve your stay" : "Plan your occasion"}
            </SheetTitle>
            <SheetDescription className="mt-2 text-sm text-ink-foreground/70">
              Best rates guaranteed when you book direct.
            </SheetDescription>
            <div className="mt-6 grid grid-cols-2 border border-ink-foreground/20">
              {(["room", "event"] as const).map((k) => (
                <button key={k} type="button" onClick={() => openBooking(k)}
                  className={`py-3 text-[0.65rem] uppercase tracking-[0.3em] transition ${kind === k ? "bg-gold text-accent-foreground" : "text-ink-foreground/70 hover:text-ink-foreground"}`}>
                  {k === "room" ? "Rooms" : "Events"}
                </button>
              ))}
            </div>
          </div>

          {status === "done" ? (
            <div className="px-8 py-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold font-display text-3xl text-gold">✓</div>
              <h3 className="mt-6 text-4xl">Thank you.</h3>
              <p className="mt-4 text-muted-foreground">Your request for <span className="text-foreground">{item}</span> has been received. Our reservations team will call you shortly to confirm.</p>
              <p className="mt-8 text-sm text-muted-foreground">Need us sooner? <a href={contact.phoneHref} className="num text-gold">{contact.phones[0]}</a></p>
              <button onClick={() => setOpen(false)} className="btn-outline-dark mt-10">Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6 px-8 py-8">
              <Field label={kind === "room" ? "Room" : "Venue"}>
                <select value={item} onChange={(e) => setItem(e.target.value)} className="lux-input">
                  {options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label={kind === "room" ? "Check-in" : "Event date"}>
                  <input type="date" name="check_in" min={today()} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1)); }} className="lux-input num" />
                </Field>
                {kind === "room" ? (
                  <Field label="Check-out">
                    <input type="date" name="check_out" min={addDays(checkIn, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="lux-input num" />
                  </Field>
                ) : (
                  <Field label="Guests"><input type="number" name="guests" min={1} max={1000} defaultValue={100} className="lux-input num" /></Field>
                )}
              </div>
              {kind === "room" && <Field label="Guests"><input type="number" name="guests" min={1} max={8} defaultValue={2} className="lux-input num" /></Field>}
              <Field label="Full name"><input name="full_name" maxLength={100} className="lux-input" placeholder="Your name" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone"><input name="phone" type="tel" maxLength={20} className="lux-input num" placeholder="+91" /></Field>
                <Field label="Email (optional)"><input name="email" type="email" maxLength={255} className="lux-input" /></Field>
              </div>
              <Field label={kind === "room" ? "Special requests" : "Event type & details"}>
                <textarea name="notes" rows={3} maxLength={1000} className="lux-input resize-none" placeholder={kind === "room" ? "Early check-in, airport pickup…" : "Wedding, birthday, conference…"} />
              </Field>

              {kind === "room" && room && (
                <div className="flex items-end justify-between border-y py-5">
                  <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground"><span className="num">{nights}</span> night{nights > 1 ? "s" : ""} · est.</div>
                  <div className="text-right"><span className="num text-3xl">{inr(room.price * nights)}</span><div className="text-xs text-muted-foreground">+ GST · breakfast included</div></div>
                </div>
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button disabled={status === "sending"} className="btn-gold w-full disabled:opacity-60">
                {status === "sending" ? "Sending…" : kind === "room" ? "Request reservation" : "Send enquiry"}
              </button>
              <p className="text-center text-xs text-muted-foreground">No payment now. We'll call to confirm availability.</p>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </BookingCtx.Provider>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
