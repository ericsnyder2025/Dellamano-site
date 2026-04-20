import Link from "next/link";
import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import MobileMenuToggle from "@/components/layout/MobileMenuToggle";
import NavDropdown from "@/components/layout/NavDropdown";
import { PHONE_NUMBER, PHONE_E164, NAV_PRIMARY, NAV_SIMPLE } from "@/../site.config";

export default function Header() {
  return (
    <header className="bg-brand-dark sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded"
          >
            <Logo size="sm" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_PRIMARY.map((menu) =>
              menu.items && menu.items.length > 0 ? (
                <NavDropdown
                  key={menu.href}
                  label={menu.label}
                  href={menu.href}
                  items={menu.items}
                />
              ) : (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
                >
                  {menu.label}
                </Link>
              )
            )}
            {NAV_SIMPLE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${PHONE_E164}`}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
            >
              <Phone size={15} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <Button href="#free-estimate" variant="primary" size="sm">
              Free Estimate
            </Button>
          </div>

          <MobileMenuToggle />
        </div>
      </div>
    </header>
  );
}
