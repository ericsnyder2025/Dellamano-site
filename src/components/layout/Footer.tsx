import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import {
  BUSINESS_NAME,
  BUSINESS_SHORT_DESCRIPTION,
  PHONE_NUMBER,
  PHONE_E164,
  EMAIL,
  ADDRESS,
  NAV_PRIMARY,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
  PARENT_COMPANY,
} from "@/../site.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark relative overflow-hidden">
      {/* Decorative accent lines */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-20 lg:pt-24 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 mb-16">
          {/* Brand block */}
          <div className="md:col-span-2 lg:col-span-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Logo size="sm" showTagline />
            </div>
            <p className="text-gray-300 text-[14px] leading-[1.7] mt-5 max-w-sm mx-auto md:mx-0">
              {BUSINESS_SHORT_DESCRIPTION}
            </p>
            <div className="flex flex-col gap-3 mt-6 items-start">
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:border-brand-primary/30 transition-colors">
                  <Phone size={14} aria-hidden="true" />
                </span>
                {PHONE_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:border-brand-primary/30 transition-colors">
                  <Mail size={14} aria-hidden="true" />
                </span>
                {EMAIL}
              </a>
              {ADDRESS.hasStorefront && (
                <div className="inline-flex items-start gap-3 text-gray-300 text-[14px]">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
                    <MapPin size={14} aria-hidden="true" />
                  </span>
                  <span className="leading-[1.5] text-left">
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="md:col-span-2 lg:col-span-8 grid grid-cols-2 lg:grid-cols-8 gap-10 lg:gap-12">
            {/* Service categories from NAV_PRIMARY (shows up to 2 with items) */}
            {NAV_PRIMARY.filter((m) => m.items && m.items.length > 0)
              .slice(0, 2)
              .map((menu) => (
                <div key={menu.href} className="lg:col-span-3 text-center md:text-left">
                  <p className="text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                    {menu.label}
                  </p>
                  <ul className="space-y-3">
                    {menu.items!.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-gray-300 hover:text-white transition-colors text-[14px] inline-flex items-center gap-1 group"
                        >
                          <span className="text-brand-primary/60 group-hover:text-brand-primary transition-colors">
                            ›
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            {/* Company column */}
            <div className="lg:col-span-2 text-center md:text-left">
              <p className="text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                Company
              </p>
              <ul className="space-y-3">
                {FOOTER_COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-[14px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social column — right of sitemap on desktop, full row on mobile */}
            <div className="col-span-2 lg:col-span-3 text-center md:text-left">
              <p className="text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-8">
                Follow Us
              </p>
              <div className="pb-8">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>

        {/* Google Business Profile map embed — glowing card with gradient frame */}
        <div className="relative mb-16">
          {/* Ambient blue glow behind the card — soft accent, not surface */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 -inset-y-10 opacity-60 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(37,87,191,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)",
            }}
          />

          <div className="relative rounded-[1.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-sm shadow-[var(--shadow-2xl)]">
            {/* Top hairline accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr]">
              {/* Left column — NAP block */}
              <div className="relative p-10 lg:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5">
                  <MapPin size={13} className="text-brand-primary" aria-hidden="true" />
                  <span className="text-white text-[11px] font-bold uppercase tracking-[0.14em]">
                    Find Us
                  </span>
                </span>

                <h3 className="font-display text-white text-[22px] font-bold leading-tight mb-3 tracking-tight">
                  {BUSINESS_NAME}
                </h3>

                <address className="not-italic text-gray-300 text-[15px] leading-[1.7] mb-6">
                  {ADDRESS.street}
                  <br />
                  {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                </address>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Dellamano+Construction+Inc,+Parkland,+FL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-[13px] tracking-[0.04em] uppercase h-[2.75rem] px-5 rounded-[0.625rem] hover:bg-brand-primary-700 transition-colors shadow-[0_4px_16px_rgba(139,30,34,0.35)]"
                  >
                    <MapPin size={14} aria-hidden="true" />
                    Get Directions
                  </a>
                  <a
                    href="https://share.google/IuFPaZFHhN0vhNxZb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-gray-300 hover:text-white text-[13px] font-semibold transition-colors px-3"
                  >
                    View on Google
                  </a>
                </div>
              </div>

              {/* Right column — map iframe */}
              <div className="relative min-h-[280px] lg:border-l border-t lg:border-t-0 border-white/10">
                {/* Gradient fade from left edge into map — softens the seam */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-black/30 to-transparent pointer-events-none hidden lg:block"
                />
                <iframe
                  src="https://maps.google.com/maps?q=Dellamano+Construction+Inc,+Parkland,+FL&t=m&z=12&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", minHeight: 280 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${BUSINESS_NAME} on Google Maps`}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-gray-400 text-[12px] space-y-1">
            <p>
              &copy; {currentYear} {BUSINESS_NAME}. All rights reserved.
            </p>
            {PARENT_COMPANY.isDba && (
              <p>
                {BUSINESS_NAME} is a DBA of{" "}
                <a
                  href={PARENT_COMPANY.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors underline"
                >
                  {PARENT_COMPANY.legalName}
                </a>
                .
              </p>
            )}
          </div>
          <div className="flex items-center gap-5">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-[12px]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
