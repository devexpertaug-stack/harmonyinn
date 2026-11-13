import { HeroSection } from "@/components/home/HeroSection";
import { PropertyHighlights } from "@/components/home/PropertyHighlights";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { DiningSection } from "@/components/home/DiningSection";
import { EventsSection } from "@/components/home/EventsSection";
import { EntertainmentCalendar } from "@/components/home/EntertainmentCalendar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationSection } from "@/components/home/LocationSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PropertyHighlights />
      <RoomsPreview />
      <DiningSection />
      <EventsSection />
      <EntertainmentCalendar />
      <TestimonialsSection />
      <LocationSection />
    </main>
  );
}
