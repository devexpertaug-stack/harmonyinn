import { Link } from "react-router-dom";
import { ArrowRight, Bed, Users, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROOMS_DATA } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export function RoomsPreview() {
  return (
    <section id="rooms-preview" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Choose Your Perfect Stay</h2>
          <p className="section-subtitle">
            From cozy executive rooms to our magnificent presidential suite, each space is
            thoughtfully designed for your comfort and style.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ROOMS_DATA.map((room, index) => (
            <div
              key={room.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Room Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {room.size} sq ft
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {room.name}
                </h3>

                {/* Room Features */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{room.bedType.split(" ")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.maxGuests} Guests</span>
                  </div>
                </div>

                {/* Key Amenities */}
                <div className="flex flex-wrap gap-2">
                  {room.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-foreground"
                    >
                      {highlight.label}
                    </span>
                  ))}
                </div>

                {/* Pricing */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="font-serif text-2xl font-bold text-foreground">
                        {formatCurrency(room.pricing.standard)}
                        <span className="text-sm text-muted-foreground font-sans">/night</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link to={`/rooms#${room.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Link to="/rooms" className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/rooms">
            <Button size="lg" variant="outline" className="gap-2">
              View All Rooms & Suites
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
