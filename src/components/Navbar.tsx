"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/dummy-data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on admin and login routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Resume", href: "#resume" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <a href="#" className="text-xl font-heading font-bold text-primary tracking-tight">
          {PROFILE.fullName.split(" ")[0]}<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#footer"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-accent rounded-none shadow-sm hover:brightness-110 transition min-h-[44px]"
          >
            Hubungi Saya
          </a>
          <button
            className="md:hidden p-2 text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-border">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-4 text-base font-medium text-secondary border-b border-border/50 hover:text-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#footer"
              className="mt-6 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-accent rounded-none shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hubungi Saya
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
