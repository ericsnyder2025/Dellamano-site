"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/../site.config";

interface NavDropdownProps {
  label: string;
  href: string;
  items: NavItem[];
}

export default function NavDropdown({ label, href, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function enter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }
  function leave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Mega menu when any top-level item has its own nested items.
  const hasNested = items.some((it) => it.items && it.items.length > 0);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Link
        href={href}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute top-full ${
          hasNested ? "left-1/2 -translate-x-1/2" : "left-1/2 -translate-x-1/2"
        } pt-2 z-50 transition-all duration-150 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none"
        }`}
      >
        {hasNested ? (
          <MegaMenuPanel items={items} onSelect={() => setOpen(false)} open={open} />
        ) : (
          <SimpleDropdownPanel items={items} onSelect={() => setOpen(false)} open={open} />
        )}
      </div>
    </div>
  );
}

function SimpleDropdownPanel({
  items,
  onSelect,
  open,
}: {
  items: NavItem[];
  onSelect: () => void;
  open: boolean;
}) {
  return (
    <div className="bg-brand-dark border border-white/10 rounded-lg shadow-xl py-2 min-w-[220px]">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          tabIndex={open ? 0 : -1}
          onClick={onSelect}
          className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MegaMenuPanel({
  items,
  onSelect,
  open,
}: {
  items: NavItem[];
  onSelect: () => void;
  open: boolean;
}) {
  return (
    <div className="bg-brand-dark border border-white/10 rounded-lg shadow-xl p-6">
      <div
        className="grid gap-x-8 gap-y-2"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(180px, 1fr))`,
        }}
      >
        {items.map((col) => (
          <div key={col.href}>
            <Link
              href={col.href}
              tabIndex={open ? 0 : -1}
              onClick={onSelect}
              className="block text-white text-[12px] font-bold uppercase tracking-[0.12em] pb-2 mb-2 border-b border-white/15 hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              {col.label}
            </Link>
            {col.items && col.items.length > 0 && (
              <ul className="space-y-0.5">
                {col.items.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      tabIndex={open ? 0 : -1}
                      onClick={onSelect}
                      className="block text-gray-300 hover:text-white text-[13px] py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1 -mx-1"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
