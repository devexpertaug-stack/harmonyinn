import { Link } from "react-router-dom";
import { ArrowRight, Users, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT_HALLS } from "@/lib/constants";

export function EventsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Host Your Special Moments</h2>
          <p className="section-subtitle">
            From intimate gatherings to grand celebrations, our versatile event spaces accommodate
            30 to 700 guests with impeccable service.
          </p>
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENT_HALLS.map((hall, index) => (
            <div
              key={hall.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover:-translate-y-2 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`grid ${index === 0 ? "md:grid-cols-2" : "grid-cols-1"} gap-0`}>
                {/* Hall Image */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Capacity Badge */}
                  <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-2xl font-bold">{hall.capacity.banquet}</p>
                    <p className="text-xs">Banquet Style</p>
                  </div>
                </div>

                {/* Hall Details */}
                <div className="p-8 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                      {hall.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{hall.location}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {hall.description}
                  </p>

                  {/* Capacity Grid */}
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">{hall.capacity.banquet}</p>
                      <p className="text-xs text-muted-foreground">Banquet</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">{hall.capacity.theater}</p>
                      <p className="text-xs text-muted-foreground">Theater</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">{hall.capacity.cocktail}</p>
                      <p className="text-xs text-muted-foreground">Cocktail</p>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="flex items-center gap-2 text-sm">
                    <Maximize className="w-5 h-5 text-secondary" />
                    <span className="font-medium text-foreground">{hall.size}</span>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {hall.features.slice(0, 4).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to="/events" className="block pt-2">
                    <Button variant="outline" className="w-full gap-2">
                      View Hall Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/events">
            <Button size="lg" variant="secondary" className="gap-2">
              Explore All Event Spaces
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
