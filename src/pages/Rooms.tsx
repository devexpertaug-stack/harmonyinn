import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RoomDetail } from "@/components/rooms/RoomDetail";
import { BookingBar } from "@/components/layout/BookingBar";
import { ROOMS_DATA } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Rooms() {
  const location = useLocation();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to specific room if hash is present
    if (location.hash) {
      const roomSlug = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(roomSlug);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setSelectedRoom(roomSlug);
        }
      }, 100);
    }
  }, [location]);

  return (
    <main className="min-h-screen pt-24">
      {/* Sticky Booking Bar */}
      <BookingBar />

      {/* Page Header */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="hero-title text-white">
              Rooms & Suites
            </h1>
            <p className="hero-subtitle text-white/90">
              Experience luxury and comfort in our thoughtfully designed accommodations. From cozy
              executive rooms to our magnificent presidential suite, each space reflects our
              commitment to your perfect stay.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                onClick={() =>
                  document
                    .getElementById("rooms-list")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Browse All Rooms
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms List */}
      <section id="rooms-list" className="section-padding bg-background">
        <div className="section-container space-y-24">
          {ROOMS_DATA.map((room, index) => (
            <div key={room.id} id={room.slug}>
              <RoomDetail room={room} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-padding bg-gradient-to-br from-secondary to-accent text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-white/90">
              Book your perfect room today and discover why guests love staying at Harmony Inn.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 gap-2"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us to Book
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => (window.location.href = `tel:+91-121-XXXXXXX`)}
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
