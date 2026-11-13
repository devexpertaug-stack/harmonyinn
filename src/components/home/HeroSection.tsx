import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOTEL_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  {
    url: "/placeholder.svg?height=1080&width=1920&text=Luxury+Hotel+Exterior",
    alt: "Hotel Harmony Inn Exterior",
    title: "Welcome to Luxury",
  },
  {
    url: "/placeholder.svg?height=1080&width=1920&text=Grand+Lobby",
    alt: "Grand Hotel Lobby",
    title: "Elegant Interiors",
  },
  {
    url: "/placeholder.svg?height=1080&width=1920&text=Rooftop+Terrace",
    alt: "Royal Casa Rooftop Terrace",
    title: "Breathtaking Views",
  },
  {
    url: "/placeholder.svg?height=1080&width=1920&text=Fine+Dining",
    alt: "Melting Pot Restaurant",
    title: "Culinary Excellence",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="section-container w-full">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 text-white/90 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-sans text-sm">
                  {HOTEL_INFO.rating}/5 • {HOTEL_INFO.reviewCount}+ Reviews
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-sans text-sm">{HOTEL_INFO.address}</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="hero-title text-white leading-tight">
                Experience Luxury on
                <br />
                <span className="text-secondary">Garh Road</span>
              </h1>
              <p className="hero-subtitle text-white/90 max-w-2xl mx-auto">
                Meerut's Premier 4-Star Destination • 280-560 sq ft Rooms • Fine Dining •
                Grand Banquets • Live Entertainment
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-lg px-10"
                onClick={() => (window.location.href = "/rooms")}
              >
                <Calendar className="w-5 h-5" />
                Check Availability
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-lg px-10 border-white text-white hover:bg-white hover:text-primary"
                onClick={() =>
                  document.getElementById("rooms-preview")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Rooms
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-3xl mx-auto">
              {[
                { label: "4-Star", sublabel: "Luxury" },
                { label: "500+", sublabel: "Events Hosted" },
                { label: "45m", sublabel: "Rooftop Terrace" },
                { label: "Est. 2019", sublabel: "Renewed 2024" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                >
                  <div className="font-serif text-2xl md:text-3xl font-bold text-white">
                    {stat.label}
                  </div>
                  <div className="font-sans text-sm text-white/80">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="section-container">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
