"use client";

import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  PHONE_NUMBER,
  PHONE_E164,
  NAV_PRIMARY,
  NAV_SIMPLE,
  type NavItem,
} from "@/../site.config";

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  // Set of section paths (by href) currently expanded. Using hrefs
  // makes nested sections addressable — the top "Services" menu and an
  // inner "Exterior Living" pillar can each be expanded independently.
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleSection(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function close() {
    setIsOpen(false);
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
        <div className="absolute top-[72px] left-0 right-0 bg-brand-dark border-t border-white/10 lg:hidden z-50 shadow-xl max-h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_PRIMARY.map((menu) => (
              <MobileNavSection
                key={menu.href}
                item={menu}
                depth={0}
                expanded={expanded}
                toggle={toggleSection}
                onNavigate={close}
              />
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

// Recursive nav row. Depth 0 is a pillar/top-level section; depth 1+
// is a nested sub-section (indented + slightly muted). Each level with
// children renders a chevron button that toggles expansion via the
// shared expanded set keyed on href.
function MobileNavSection({
  item,
  depth,
  expanded,
  toggle,
  onNavigate,
}: {
  item: NavItem;
  depth: number;
  expanded: Set<string>;
  toggle: (key: string) => void;
  onNavigate: () => void;
}) {
  const hasChildren = !!item.items && item.items.length > 0;
  const isOpen = expanded.has(item.href);
  const labelClass =
    depth === 0
      ? "text-gray-300 hover:text-white text-base py-3 font-medium"
      : depth === 1
      ? "text-white hover:text-brand-accent text-[15px] py-2.5 font-semibold"
      : "text-gray-400 hover:text-white text-[14px] py-1.5";
  const rowClass =
    depth === 0
      ? "flex items-center justify-between border-b border-white/5"
      : "flex items-center justify-between";
  const indent = depth === 0 ? "" : depth === 1 ? "pl-4" : "pl-8";

  return (
    <div className={indent}>
      <div className={rowClass}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`${labelClass} flex-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => toggle(item.href)}
            className="p-2 text-gray-300 hover:text-white transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label} submenu`}
            aria-expanded={isOpen}
          >
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="pb-2">
          {item.items!.map((child) => (
            <MobileNavSection
              key={child.href}
              item={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
