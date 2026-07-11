"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Navbar({ profile }: { profile: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Layanan", href: "#services" },
    { name: "Keahlian", href: "#skills" },
    { name: "Pengalaman", href: "#experience" },
    { name: "Prestasi", href: "#certifications" },
    { name: "Portofolio", href: "#portfolio" },
    { name: "Galeri", href: "#gallery" },
  ];

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link href="#home" className="logo-text">
            {profile?.name?.split(' ')[0] || "Tino"}<span>.</span>
          </Link>

          <nav className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="social-header">
            {profile?.github_url && <Link href={profile.github_url} target="_blank"><FaGithub /></Link>}
            {profile?.linkedin_url && <Link href={profile.linkedin_url} target="_blank"><FaLinkedin /></Link>}
            {profile?.instagram_url && <Link href={profile.instagram_url} target="_blank"><FaInstagram /></Link>}
          </div>

          <button className="menu-toggle" onClick={() => setMobileOpen(true)}>
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-overlay ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)}></div>
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} onClick={() => setMobileOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
