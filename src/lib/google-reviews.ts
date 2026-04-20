/**
 * Google Places API (New) — reviews fetcher.
 *
 * Fetches up to 5 most-relevant reviews for a single place server-side.
 * Revalidates every 24h (Google ToS forbids caching review data > 30 days).
 *
 * Requires:
 *   - GOOGLE_PLACES_API_KEY  (server-only; enable "Places API (New)" in GCP)
 *   - GOOGLE_PLACE_ID        (ChIJ... format, not hex)
 *
 * Returns `null` on missing config or API failure so the homepage can
 * conditionally skip the section without breaking the render.
 *
 * Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
 */

export type GoogleReview = {
  rating: number;
  relativePublishTimeDescription: string;
  publishTime: string;
  text: string;
  authorName: string;
  authorProfileUri?: string;
  authorPhotoUri?: string;
  googleMapsUri?: string;
};

export type GoogleReviewsData = {
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReview[];
};

// Shape of the slice we read from the Places API (New) response.
type PlacesApiResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    publishTime?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
    googleMapsUri?: string;
  }>;
};

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount,googleMapsUri,reviews";
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24h

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`${PLACES_ENDPOINT}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.warn(
        `[google-reviews] Places API returned ${res.status}: ${await res.text()}`
      );
      return null;
    }

    const data = (await res.json()) as PlacesApiResponse;

    if (!data.reviews || data.reviews.length === 0) return null;

    const reviews: GoogleReview[] = data.reviews
      .filter((r) => r.text?.text && r.authorAttribution?.displayName)
      .map((r) => ({
        rating: r.rating ?? 5,
        relativePublishTimeDescription: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        authorName: r.authorAttribution!.displayName!,
        authorProfileUri: r.authorAttribution!.uri,
        authorPhotoUri: r.authorAttribution!.photoUri,
        googleMapsUri: r.googleMapsUri,
      }));

    if (reviews.length === 0) return null;

    return {
      rating: data.rating ?? 0,
      userRatingCount: data.userRatingCount ?? 0,
      googleMapsUri: data.googleMapsUri ?? "",
      reviews,
    };
  } catch (err) {
    console.warn(`[google-reviews] fetch failed:`, err);
    return null;
  }
}
