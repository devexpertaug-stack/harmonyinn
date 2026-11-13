import { useState } from "react";
import { Bed, Users, Maximize2, MapPin, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Room } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import { ImageGallery } from "@/components/shared/ImageGallery";

interface RoomDetailProps {
  room: Room;
  index: number;
}

export function RoomDetail({ room, index }: RoomDetailProps) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [expandedPolicies, setExpandedPolicies] = useState<string[]>([]);

  const togglePolicy = (policy: string) => {
    setExpandedPolicies((prev) =>
      prev.includes(policy) ? prev.filter((p) => p !== policy) : [...prev, policy]
    );
  };

  const policies = [
    {
      id: "cancellation",
      title: "Cancellation Policy",
      content:
        "Free cancellation up to 24 hours before check-in. Cancellations made within 24 hours of check-in will be charged one night's stay. No-shows will be charged the full booking amount.",
    },
    {
      id: "checkin-checkout",
      title: "Check-in / Check-out Times",
      content:
        "Check-in: 2:00 PM onwards. Early check-in subject to availability. Check-out: 12:00 PM. Late check-out available upon request with additional charges.",
    },
    {
      id: "extra-guest",
      title: "Extra Guest Charges",
      content:
        "Additional guest charges: ₹1,000 per person per night. Maximum occupancy strictly enforced. Children under 5 years stay free when sharing existing bedding.",
    },
    {
      id: "pet-policy",
      title: "Pet Policy",
      content:
        "Pets are not permitted in guest rooms. Service animals are welcome with prior notification and appropriate documentation.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
      {/* Room Header */}
      <div className="p-8 md:p-12 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {room.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5" />
                <span className="font-medium">{room.size} sq ft</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Up to {room.maxGuests} Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5" />
                <span>{room.bedType}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Starting from</p>
            <p className="font-serif text-4xl font-bold text-foreground">
              {formatCurrency(room.pricing.standard)}
            </p>
            <p className="text-sm text-muted-foreground">per night</p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="p-8 md:p-12">
        <ImageGallery images={room.images} roomName={room.name} />
      </div>

      {/* Room Highlights */}
      <div className="px-8 md:px-12 pb-8">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {room.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-secondary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                <span className="text-xl">{getIconForHighlight(highlight.icon)}</span>
              </div>
              <span className="text-xs font-medium text-foreground">{highlight.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-8 md:p-12 border-t border-border">
        {/* Left Column - Description & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">
              About This Room
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{room.description}</p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-semibold text-foreground">Room Size</p>
                  <p className="text-muted-foreground">{room.size} sq ft</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-semibold text-foreground">Bed Type</p>
                  <p className="text-muted-foreground">{room.bedType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-semibold text-foreground">Max Occupancy</p>
                  <p className="text-muted-foreground">
                    {room.maxGuests} Adults {room.maxGuests >= 3 ? "+ 1 Child" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-semibold text-foreground">View</p>
                  <p className="text-muted-foreground">{room.view}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-semibold text-foreground">Floor</p>
                  <p className="text-muted-foreground">{room.floor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">
              Room Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(showAllAmenities ? room.amenities : room.amenities.slice(0, 8)).map(
                (amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                )
              )}
            </div>
            {room.amenities.length > 8 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-4 text-secondary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                {showAllAmenities ? "Show Less" : `Show All ${room.amenities.length} Amenities`}
                {showAllAmenities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">
              Policies & Information
            </h3>
            <div className="space-y-2">
              {policies.map((policy) => (
                <div key={policy.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => togglePolicy(policy.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground text-left">{policy.title}</span>
                    {expandedPolicies.includes(policy.id) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedPolicies.includes(policy.id) && (
                    <div className="p-4 pt-0 text-muted-foreground">{policy.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 text-white shadow-premium">
            <h3 className="font-serif text-2xl font-bold mb-6">Book This Room</h3>

            {/* Pricing Options */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <span className="text-white/80">Standard Rate</span>
                <span className="font-bold text-2xl">{formatCurrency(room.pricing.standard)}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <span className="text-white/80">Weekend Rate</span>
                <span className="font-bold text-2xl">{formatCurrency(room.pricing.weekend)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Monthly Rate</span>
                <span className="font-bold text-2xl">{formatCurrency(room.pricing.monthly)}</span>
              </div>
            </div>

            <p className="text-sm text-white/70 mb-6">
              All rates include complimentary breakfast, free WiFi, and valet parking.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                variant="secondary"
                className="w-full"
                onClick={() => (window.location.href = "/contact")}
              >
                Book This Room
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-primary"
                onClick={() => (window.location.href = `tel:+91-121-XXXXXXX`)}
              >
                Call to Reserve
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-sm text-white/80">
              <p>✓ Instant Confirmation</p>
              <p>✓ Best Rate Guarantee</p>
              <p>✓ Free Cancellation (24hrs)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getIconForHighlight(icon: string): string {
  const iconMap: Record<string, string> = {
    bed: "🛏️",
    tv: "📺",
    coffee: "☕",
    bath: "🛁",
    snowflake: "❄️",
    droplet: "💧",
    wifi: "📶",
    utensils: "🍳",
    car: "🚗",
    home: "🏠",
    maximize: "↔️",
    sun: "☀️",
    sparkles: "✨",
    star: "⭐",
    crown: "👑",
  };
  return iconMap[icon] || "•";
}
