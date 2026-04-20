import Link from "next/link";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";
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
            "radial-gradient(ellipse, rgba(196,30,36,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-8 pt-16 pb-8">
        {/* Top CTA strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 mb-12 border-b border-white/10">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-[22px] sm:text-[26px] font-bold text-white leading-tight tracking-tight mb-1">
              Ready to start your project?
            </h3>
            <p className="text-gray-300 text-[14px]">
              Free estimates · Licensed &amp; Insured
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={`tel:${PHONE_E164}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold text-[14px] tracking-[0.04em] uppercase h-[3rem] px-6 rounded-[0.625rem] hover:bg-white/15 transition-colors border border-white/10"
            >
              <Phone size={16} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <Link
              href="#free-estimate"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-[14px] tracking-[0.04em] uppercase h-[3rem] px-6 rounded-[0.625rem] hover:bg-brand-primary-700 transition-colors shadow-[0_4px_16px_rgba(196,30,36,0.35)]"
            >
              Free Estimate
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand block */}
          <div className="md:col-span-2 lg:col-span-4">
            <Logo size="sm" showTagline />
            <p className="text-gray-300 text-[14px] leading-[1.7] mt-5 max-w-sm">
              {BUSINESS_SHORT_DESCRIPTION}
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <a
                href={`tel:${PHONE_E164}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:border-brand-primary/30 transition-colors">
                  <Phone size={14} aria-hidden="true" />
                </span>
                {PHONE_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:border-brand-primary/30 transition-colors">
                  <Mail size={14} aria-hidden="true" />
                </span>
                {EMAIL}
              </a>
              {ADDRESS.hasStorefront && (
                <div className="flex items-start gap-3 text-gray-300 text-[14px]">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
                    <MapPin size={14} aria-hidden="true" />
                  </span>
                  <span className="leading-[1.5]">
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="md:col-span-2 lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-2 lg:grid-cols-8 gap-8">
              {/* Service categories from NAV_PRIMARY (shows up to 2 with items) */}
              {NAV_PRIMARY.filter((m) => m.items && m.items.length > 0)
                .slice(0, 2)
                .map((menu) => (
                  <div key={menu.href} className="lg:col-span-3">
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
              <div className="lg:col-span-2">
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

              {/* Mobile-only social cell */}
              <div className="lg:hidden flex items-start justify-end">
                <SocialLinks />
              </div>
            </div>

            {/* Desktop social row */}
            <div className="hidden lg:flex justify-center pt-4 border-t border-white/5">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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
