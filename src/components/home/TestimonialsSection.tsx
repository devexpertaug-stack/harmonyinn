import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-white">What Our Guests Say</h2>
          <p className="section-subtitle text-white/90">
            Real experiences from travelers who've made Harmony Inn their home away from home.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 p-3 rounded-full bg-white text-primary hover:bg-secondary hover:text-white transition-all shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 p-3 rounded-full bg-white text-primary hover:bg-secondary hover:text-white transition-all shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white text-foreground rounded-2xl p-8 md:p-12 shadow-premium">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="font-sans text-lg md:text-xl leading-relaxed text-foreground mb-6">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <p className="font-serif text-lg font-bold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                      </div>
                      {testimonial.verified && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-medium">Verified Guest</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/90 mb-4">Join hundreds of satisfied guests</p>
          <a
            href="https://www.google.com/search?q=Hotel+Harmony+Inn+Meerut+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors font-semibold underline"
          >
            Read More Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
