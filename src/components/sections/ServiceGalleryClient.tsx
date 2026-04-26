"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/lib/galleries";

/**
 * Client component — grid of photos + lightbox.
 *
 * Speed-conscious choices:
 * - First 3 thumbs use priority + eager loading (above-the-fold; preloaded
 *   via <link rel="preload">).
 * - Rest use loading="lazy" + decoding="async" — browser-native.
 * - blurDataURL placeholder per image (no layout shift, nice fade-in).
 * - Next.js generates a srcset; sizes attribute drives the right pick.
 * - Lightbox image is rendered only while open (no hidden full-size load).
 * - Body scroll locked + Esc/arrow keys wired while lightbox open.
 */
export default function ServiceGalleryClient({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () =>
      setOpenIdx((i) =>
        i === null ? null : (i + 1) % photos.length
      ),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setOpenIdx((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (openIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, close, next, prev]);

  return (
    <section className="section-primary bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="eyebrow">Recent Work</p>
          <h2 className="section-h2">Project Gallery</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group relative aspect-[3/2] overflow-hidden rounded-[0.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-link focus-visible:ring-offset-2"
              aria-label={`Open photo ${i + 1} of ${photos.length}: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={p.blur}
                quality={82}
                priority={i < 3}
                loading={i < 3 ? "eager" : "lazy"}
                className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <Lightbox
          photos={photos}
          index={openIdx}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </section>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const p = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}: ${p.alt}`}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X size={28} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-6 z-10 text-white/80 hover:text-white p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors"
      >
        <ChevronLeft size={36} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 sm:right-6 z-10 text-white/80 hover:text-white p-2 sm:p-3 rounded-full hover:bg-white/10 transition-colors"
      >
        <ChevronRight size={36} aria-hidden="true" />
      </button>
      <div
        className="relative w-full h-full max-w-6xl max-h-[88vh] mx-auto px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={p.src}
          src={p.src}
          alt={p.alt}
          fill
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL={p.blur}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}
