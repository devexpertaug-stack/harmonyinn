import { useState } from "react";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BookingBar() {
  const [isSticky, setIsSticky] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // Sticky behavior on scroll
  useState(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSearch = () => {
    // Navigate to contact or booking system
    alert(`Searching for rooms:\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
  };

  return (
    <div
      className={cn(
        "sticky top-20 z-40 transition-all duration-300",
        isSticky
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white border-b border-border"
      )}
    >
      <div className="section-container py-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Check-in */}
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-11 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 w-full lg:w-auto">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-11 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 w-full lg:w-auto lg:max-w-[200px]">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto lg:pt-6">
            <Button
              size="lg"
              variant="secondary"
              className="w-full lg:w-auto gap-2"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5" />
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
