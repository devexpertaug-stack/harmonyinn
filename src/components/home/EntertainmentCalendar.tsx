import { Music, Mic, Disc, Sparkles } from "lucide-react";
import { ENTERTAINMENT_SCHEDULE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, any> = {
  music: Music,
  mic: Mic,
  disc: Disc,
  sparkles: Sparkles,
};

export function EntertainmentCalendar() {
  return (
    <section className="section-padding bg-gradient-to-br from-accent to-accent/90 text-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-white">After Dark</h2>
          <p className="section-subtitle text-white/90">
            Four evenings every week featuring live music, ghazals, retro classics, and DJ nights.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENTERTAINMENT_SCHEDULE.map((event, index) => {
            const Icon = iconMap[event.icon];
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Day Badge */}
                <div className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                  {event.day}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Event Details */}
                <h3 className="font-serif text-2xl font-bold mb-2">{event.event}</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">{event.description}</p>

                {/* Venue & Time */}
                <div className="pt-4 border-t border-white/20 space-y-1 text-sm">
                  <p className="text-white/90">
                    <span className="font-semibold">Venue:</span> {event.venue}
                  </p>
                  <p className="text-white/90">
                    <span className="font-semibold">Time:</span> {event.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={() => (window.location.href = "/dining#events")}
          >
            View Full Programme
          </Button>
        </div>
      </div>
    </section>
  );
}
