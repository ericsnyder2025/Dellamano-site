"use client";

import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PHONE_NUMBER, PHONE_E164, NAV_PRIMARY, NAV_SIMPLE } from "@/../site.config";

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSection(label: string) {
    setExpanded(expanded === label ? null : label);
  }

  return (
    <>
      <button
        className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-brand-dark border-t border-white/10 lg:hidden z-50 shadow-xl">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_PRIMARY.map((menu) => (
              <div key={menu.href}>
                <div className="flex items-center justify-between border-b border-white/5">
                  <Link
                    href={menu.href}
                    className="text-gray-300 hover:text-white text-base py-3 transition-colors flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {menu.label}
                  </Link>
                  {menu.items && menu.items.length > 0 && (
                    <button
                      onClick={() => toggleSection(menu.label)}
                      className="p-2 text-gray-300 hover:text-white transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                      aria-label={`${expanded === menu.label ? "Collapse" : "Expand"} ${menu.label} submenu`}
                    >
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${expanded === menu.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {expanded === menu.label && menu.items && (
                  <div className="pl-4 pb-2">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-gray-500 hover:text-white text-sm py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {NAV_SIMPLE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-base py-3 border-b border-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href={`tel:${PHONE_E164}`}
                className="flex items-center gap-2 text-brand-primary font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                <Phone size={16} aria-hidden="true" />
                {PHONE_NUMBER}
              </a>
              <Button href="#free-estimate" variant="primary" size="md">
                Get a Free Estimate
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
