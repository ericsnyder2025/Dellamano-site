"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { AllPhoto } from "@/lib/galleryAll";

/**
 * Filterable masonry gallery with click-to-zoom lightbox.
 *
 * Design priorities (per request — speed deprioritized vs. visual impact):
 *  - CSS columns for true masonry (varied aspect ratios shine)
 *  - Hover lift + caption fade
 *  - Lightbox with arrow/Esc keyboard nav
 *  - Filter chips re-arrange the grid client-side (no SSR cost)
 */
export default function GalleryFiltered({
  photos,
  categories,
}: {
  photos: AllPhoto[];
  categories: { slug: string; label: string }[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const visible = useMemo(() => {
    if (activeFilter === "all") return photos;
    return photos.filter((p) => p.category === activeFilter);
  }, [photos, activeFilter]);

  // Close lightbox if filter change shrinks the visible set under current idx
  useEffect(() => {
    setOpenIdx(null);
  }, [activeFilter]);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () =>
      setOpenIdx((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () =>
      setOpenIdx((i) =>
        i === null ? null : (i - 1 + visible.length) % visible.length
      ),
    [visible.length]
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

  const tabs = [{ slug: "all", label: "All" }, ...categories];

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filter chips */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {tabs.map((t) => {
            const count =
              t.slug === "all"
                ? photos.length
                : photos.filter((p) => p.category === t.slug).length;
            const active = activeFilter === t.slug;
            return (
              <button
                key={t.slug}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(t.slug)}
                className={`inline-flex items-center gap-2 h-10 px-4 sm:px-5 rounded-full border text-[14px] font-semibold transition-all ${
                  active
                    ? "bg-brand-dark text-white border-brand-dark shadow-[var(--shadow-card)]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-brand-link hover:text-brand-link"
                }`}
              >
                {t.label}
                <span
                  className={`inline-flex items-center justify-center text-[11px] font-bold rounded-full px-1.5 min-w-[1.25rem] h-5 ${
                    active ? "bg-white/15 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
          {visible.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group block w-full mb-3 sm:mb-4 break-inside-avoid relative overflow-hidden rounded-[0.875rem] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-link focus-visible:ring-offset-2 transition-shadow"
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL={p.blur}
                quality={80}
                loading="lazy"
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 p-4 text-white text-[13px] font-medium leading-snug opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                {p.alt}
              </div>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            No photos in this category yet.
          </p>
        )}
      </div>

      {openIdx !== null && (
        <Lightbox
          photos={visible}
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
  photos: AllPhoto[];
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
          quality={88}
          placeholder="blur"
          blurDataURL={p.blur}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium pointer-events-none">
        <span className="hidden sm:inline">{p.alt} · </span>
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}
