import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOTEL_INFO } from "@/lib/constants";

export function LocationSection() {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Visit Us</h2>
          <p className="section-subtitle">
            Conveniently located on Main Garh Road in the heart of Meerut. Easy access from all
            major landmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-premium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.234567890123!2d77.7045!3d29.0149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDAwJzUzLjYiTiA3N8KwNDInMTYuMiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Harmony Inn Location"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Our Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {HOTEL_INFO.address}
                    <br />
                    {HOTEL_INFO.city}
                  </p>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full gap-2"
                onClick={() => window.open(HOTEL_INFO.googleMapsUrl, "_blank")}
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </Button>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4 hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                  <a
                    href={`tel:${HOTEL_INFO.phone}`}
                    className="text-muted-foreground hover:text-secondary transition-colors"
                  >
                    {HOTEL_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4 hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <a
                    href={`mailto:${HOTEL_INFO.email}`}
                    className="text-muted-foreground hover:text-secondary transition-colors break-all"
                  >
                    {HOTEL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-xl p-8 space-y-4">
              <h3 className="font-serif text-xl font-bold">Reception Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Check-in</span>
                  <span className="font-semibold">2:00 PM onwards</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Check-out</span>
                  <span className="font-semibold">12:00 PM</span>
                </div>
                <div className="pt-2 mt-2 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    24/7 front desk assistance available for all your needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
