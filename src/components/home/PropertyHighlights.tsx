import { Star, MapPin, Users } from "lucide-react";
import { PROPERTY_HIGHLIGHTS } from "@/lib/constants";

const iconMap: Record<string, any> = {
  star: Star,
  "map-pin": MapPin,
  users: Users,
};

export function PropertyHighlights() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTY_HIGHLIGHTS.map((highlight, index) => {
            const Icon = iconMap[highlight.icon];
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-premium transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                  {highlight.title}
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
