import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, HOTEL_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex flex-col">
              <span
                className={cn(
                  "font-serif text-2xl md:text-3xl font-bold transition-colors",
                  isScrolled ? "text-primary" : "text-white"
                )}
              >
                {HOTEL_INFO.name}
              </span>
              <span
                className={cn(
                  "font-decorative text-sm md:text-base transition-colors",
                  isScrolled ? "text-muted-foreground" : "text-white/90"
                )}
              >
                {HOTEL_INFO.tagline}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "font-sans text-sm font-medium transition-all duration-300 hover:text-secondary relative",
                    location.pathname === item.href
                      ? "text-secondary"
                      : isScrolled
                      ? "text-foreground"
                      : "text-white",
                    location.pathname === item.href &&
                      "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-2",
                  !isScrolled && "border-white text-white hover:bg-white hover:text-primary"
                )}
                onClick={() => (window.location.href = `tel:${HOTEL_INFO.phone}`)}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2"
                onClick={() => (window.location.href = "/rooms")}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-black/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
              ) : (
                <Menu className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 transition-transform duration-300",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-8"
          )}
        >
          <div className="flex flex-col gap-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "font-sans text-base font-medium py-3 px-4 rounded-lg transition-all duration-300",
                  location.pathname === item.href
                    ? "bg-secondary text-white"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full"
              onClick={() => (window.location.href = `tel:${HOTEL_INFO.phone}`)}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 w-full"
              onClick={() => (window.location.href = "/rooms")}
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
