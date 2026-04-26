import { SERVICE_GALLERIES } from "@/lib/galleries";
import ServiceGalleryClient from "./ServiceGalleryClient";

/**
 * Server component wrapper. Returns null when the slug has no gallery photos
 * so it renders absolutely nothing on uncovered services. Hands the array to
 * the client component which owns lightbox state.
 *
 * Pass either the URL path (e.g. "/services/kitchen-remodeling") or the bare
 * slug (e.g. "kitchen-remodeling"). Last path segment is the lookup key.
 */
export default function ServiceGallery({ slug }: { slug: string }) {
  const key = slug.split("/").filter(Boolean).pop() ?? "";
  const photos = SERVICE_GALLERIES[key];
  if (!photos || photos.length === 0) return null;
  return <ServiceGalleryClient photos={photos} />;
}
