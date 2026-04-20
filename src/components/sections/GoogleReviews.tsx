import Image from "next/image";
import { Star, Quote, ExternalLink } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/google-reviews";

/**
 * GoogleReviews — client testimonial section populated by the Places API (New).
 *
 * ToS-compliant display:
 *   - Reviews shown verbatim (never edited)
 *   - Author name + optional link to their Google profile
 *   - "Reviews on Google" attribution with link back to the GBP listing
 *   - Relative publish time ("2 weeks ago") rendered as provided by the API
 *
 * IMPORTANT: Google's structured-data guidance prohibits AggregateRating /
 * Review schema for self-serving reviews (a business's own GBP reviews on its
 * own site). This component renders visibly for users + AI crawlers — it does
 * NOT emit Review/AggregateRating schema, because doing so would violate
 * Google's guidelines and will not yield SERP star snippets.
 */

interface GoogleReviewsProps {
  data: GoogleReviewsData;
  eyebrow?: string;
  heading?: string;
  maxReviews?: number;
}

export default function GoogleReviews({
  data,
  eyebrow = "Reviews",
  heading = "What homeowners say on Google",
  maxReviews = 6,
}: GoogleReviewsProps) {
  const reviews = data.reviews.slice(0, maxReviews);
  if (reviews.length === 0) return null;

  const ratingLabel = data.rating > 0 ? data.rating.toFixed(1) : "";

  return (
    <section className="section-primary bg-brand-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow-dark mb-3">{eyebrow}</p>
          <h2 className="section-h2 text-white">{heading}</h2>

          {ratingLabel && (
            <div className="mt-5 inline-flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-full pl-4 pr-5 py-2">
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(data.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-[14px] font-display">
                {ratingLabel}
              </span>
              <span className="text-gray-400 text-[13px]">
                · {data.userRatingCount}{" "}
                {data.userRatingCount === 1 ? "review" : "reviews"} on Google
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <article
              key={`${review.authorName}-${idx}`}
              className="bg-white/[0.02] rounded-[1.25rem] p-7 border border-white/8 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              <Quote
                size={20}
                className="text-brand-primary-400 mb-4"
                aria-hidden="true"
              />

              <div
                className="flex gap-0.5 mb-4"
                role="img"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    aria-hidden="true"
                    className={
                      i < review.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              <blockquote className="text-gray-300 leading-[1.7] text-[14px] mb-6 flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                {review.authorPhotoUri ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.authorPhotoUri}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full flex-shrink-0 bg-white/10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary-400 text-[12px] font-bold font-display">
                      {review.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold text-[13px] font-display truncate">
                    {review.authorProfileUri ? (
                      <a
                        href={review.authorProfileUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {review.authorName}
                      </a>
                    ) : (
                      review.authorName
                    )}
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    {review.relativePublishTimeDescription} · Google
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {data.googleMapsUri && (
          <div className="text-center mt-10">
            <a
              href={data.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-[14px] font-semibold"
            >
              Read all reviews on Google
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
