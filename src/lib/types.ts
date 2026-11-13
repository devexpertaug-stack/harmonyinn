// TypeScript Types for HarmonyInn

export interface Room {
  id: string;
  name: string;
  slug: string;
  size: number;
  maxGuests: number;
  bedType: string;
  view: string;
  floor: string;
  description: string;
  images: string[];
  amenities: string[];
  highlights: Array<{
    icon: string;
    label: string;
  }>;
  pricing: {
    standard: number;
    weekend: number;
    monthly: number;
  };
}

export interface DiningVenue {
  id: string;
  name: string;
  type: string;
  cuisine: string[];
  description: string;
  timings: string;
  capacity: number;
  specialties: string[];
  image: string;
}

export interface EntertainmentEvent {
  day: string;
  event: string;
  description: string;
  venue: string;
  time: string;
  icon: string;
}

export interface EventHall {
  id: string;
  name: string;
  location: string;
  capacity: {
    banquet: number;
    theater: number;
    cocktail: number;
  };
  size: string;
  description: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  verified: boolean;
  date: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface BookingForm {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  roomType?: string;
}
