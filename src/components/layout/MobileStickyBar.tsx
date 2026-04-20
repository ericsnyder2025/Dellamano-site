"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { PHONE_E164 } from "@/../site.config";

/**
 * Mobile-only sticky call/CTA bar. Hidden on lg+.
 *
 * Delayed appearance: shows after 10s OR after user scrolls past ~600px,
 * whichever fires first. Keeps it out of the initial render window so
 * it doesn't impact LCP/TBT on mobile.
 */
export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);
    const onScroll = () => {
      if (window.scrollY > 600) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
        clearTimeout(timer);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark border-t border-white/10 shadow-[0_-6px_24px_rgba(0,0,0,0.35)]">
      <div className="grid grid-cols-2">
        <a
          href={`tel:${PHONE_E164}`}
          className="flex items-center justify-center gap-2.5 py-5 text-white font-bold text-[16px] tracking-[0.04em] uppercase border-r border-white/10 active:bg-white/5 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
          aria-label="Call now"
        >
          <Phone size={20} aria-hidden="true" />
          Call Now
        </a>
        <a
          href="#free-estimate"
          className="flex items-center justify-center gap-2.5 py-5 bg-brand-primary text-white font-bold text-[16px] tracking-[0.04em] uppercase active:bg-brand-primary-700 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
        >
          Free Estimate
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
