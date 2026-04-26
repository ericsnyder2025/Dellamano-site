import { SERVICE_GALLERIES } from "@/lib/galleries";
import { buildImageObjects } from "@/lib/schema";
import ServiceGalleryClient from "./ServiceGalleryClient";

/**
 * Server component wrapper. Returns null when the slug has no gallery photos
 * so it renders absolutely nothing on uncovered services. Hands the array to
 * the client component which owns lightbox state.
 *
 * Also emits ImageObject JSON-LD for each gallery photo so they pick up
 * Google Image Search rich results.
 *
 * Pass either the URL path (e.g. "/services/kitchen-remodeling") or the bare
 * slug (e.g. "kitchen-remodeling"). Last path segment is the lookup key.
 */
export default function ServiceGallery({ slug }: { slug: string }) {
  const key = slug.split("/").filter(Boolean).pop() ?? "";
  const photos = SERVICE_GALLERIES[key];
  if (!photos || photos.length === 0) return null;
  const imageObjects = buildImageObjects(photos);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageObjects),
        }}
      />
      <ServiceGalleryClient photos={photos} />
    </>
  );
}
