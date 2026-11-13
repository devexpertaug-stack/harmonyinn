import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { HOTEL_INFO, NAVIGATION_ITEMS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">{HOTEL_INFO.name}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              A newly renovated four-star grand luxury hotel on Main Garh Road. Meerut's finest
              destination for stays, dining, celebrations, and entertainment.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-white/80 hover:text-secondary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Accommodation</li>
              <li>Restaurant & Bar</li>
              <li>Event Venues</li>
              <li>Banquet Halls</li>
              <li>Wedding Planning</li>
              <li>Corporate Events</li>
              <li>Valet Parking</li>
              <li>24/7 Room Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {HOTEL_INFO.address}
                    <br />
                    {HOTEL_INFO.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="text-white/80 hover:text-secondary transition-colors text-sm"
                >
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="text-white/80 hover:text-secondary transition-colors text-sm"
                >
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              © {HOTEL_INFO.establishedYear} – {currentYear} {HOTEL_INFO.name} · A unit of Durga
              Habitat and Motels LLP · All rights reserved
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
