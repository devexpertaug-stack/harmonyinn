import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DINING_VENUES } from "@/lib/constants";

export function DiningSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Indulge in Fine Experiences</h2>
          <p className="section-subtitle">
            From authentic Indian cuisine to contemporary continental dishes, our dining venues
            offer an unforgettable culinary journey.
          </p>
        </div>

        {/* Dining Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DINING_VENUES.map((venue, index) => (
            <div
              key={venue.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover:-translate-y-2"
            >
              {/* Venue Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">{venue.name}</h3>
                  <p className="font-decorative text-lg text-white/90">{venue.type}</p>
                </div>
              </div>

              {/* Venue Details */}
              <div className="p-8 space-y-6">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{venue.description}</p>

                {/* Cuisine Tags */}
                <div className="flex flex-wrap gap-2">
                  {venue.cuisine.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium text-foreground">Operating Hours</p>
                      <p className="text-muted-foreground">{venue.timings}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium text-foreground">Seating Capacity</p>
                      <p className="text-muted-foreground">{venue.capacity} Guests</p>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link to="/dining" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    View Full Menu
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/dining">
            <Button size="lg" variant="secondary" className="gap-2">
              Explore All Dining Options
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
