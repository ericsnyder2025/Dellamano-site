import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
}

interface TestimonialsProps {
  heading: string;
  testimonials: Testimonial[];
  eyebrow?: string;
}

export default function Testimonials({
  heading,
  testimonials,
  eyebrow = "Reviews",
}: TestimonialsProps) {
  return (
    <section className="section-primary bg-brand-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(74,124,155,0.2) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow-dark mb-3">{eyebrow}</p>
          <h2 className="section-h2 text-white">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="bg-brand-navy rounded-[1.25rem] p-8 border border-white/8 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Quote size={20} className="text-brand-primary mb-4" aria-hidden="true" />

              <div
                className="flex gap-0.5 mb-4"
                role="img"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    aria-hidden="true"
                    className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}
                  />
                ))}
              </div>

              <blockquote className="text-gray-300 leading-[1.7] text-[14px] mb-5">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-primary-200 text-[12px] font-bold font-display">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-[13px] font-display">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-[11px]">{testimonial.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
