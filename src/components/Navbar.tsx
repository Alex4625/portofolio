"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaGithub, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";
import { text, type DbRow } from "@/../lib/data";

interface NavbarProps {
  profile: DbRow | null;
}

const menuLinks = [
  { label: "Home", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Keahlian", href: "#skills" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Prestasi", href: "#certifications" },
  { label: "Portofolio", href: "#portfolio" },
  { label: "Video", href: "#videos" },
  { label: "Galeri", href: "#gallery" },
];

export default function Navbar({ profile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstName = text(profile, ["name", "full_name"], "Tino").split(" ")[0];
  const githubUrl = text(profile, ["github_url"]);
  const instagramUrl = text(profile, ["instagram_url"]);
  const linkedinUrl = text(profile, ["linkedin_url"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link href="#home">{firstName}.</Link>
            </div>

            <nav className="main-menu">
              {menuLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="header-right">
              <div className="social-link">
                {githubUrl && <a href={githubUrl} target="_blank" rel="noopener" aria-label="GitHub"><FaGithub /></a>}
                {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener" aria-label="Instagram"><FaInstagram /></a>}
                {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener" aria-label="LinkedIn"><FaLinkedin /></a>}
              </div>
              <button className="menu-bars mobile-only" type="button" onClick={() => setMobileOpen(true)} aria-label="Buka menu">
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button className="mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Tutup menu">
          <FaTimes />
        </button>
        <ul>
          {menuLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "36px" }}>
          <div className="sidebar-social-title">find with me</div>
          <div className="social-link">
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener" aria-label="GitHub"><FaGithub /></a>}
            {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener" aria-label="Instagram"><FaInstagram /></a>}
            {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener" aria-label="LinkedIn"><FaLinkedin /></a>}
          </div>
        </div>
      </div>
    </>
  );
}
