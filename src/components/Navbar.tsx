"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaBars, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface NavbarProps {
  profile: any;
}

export default function Navbar({ profile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (sidebarOpen || mobileOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen, mobileOpen]);

  const menuLinks = [
    { label: "Home", href: "#home" },
    { label: "Tentang", href: "#about" },
    { label: "Layanan", href: "#services" },
    { label: "Keahlian", href: "#skills" },
    { label: "Pengalaman", href: "#experience" },
    { label: "Prestasi", href: "#certifications" },
    { label: "Portofolio", href: "#portfolio" },
    { label: "Galeri", href: "#gallery" },
  ];

  const avatarUrl = profile?.avatar_path?.startsWith('http') 
    ? profile.avatar_path 
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link href="#home">{profile?.name?.split(' ')[0] || "Tino"}.</Link>
            </div>

            <nav className="main-menu">
              {menuLinks.map(l => (
                <Link key={l.label} href={l.href}>{l.label}</Link>
              ))}
            </nav>

            <div className="header-right">
              <div className="social-link" style={{ display: 'var(--show-desktop, flex)' }}>
                {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener"><FaGithub /></a>}
                {profile?.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener"><FaInstagram /></a>}
                {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener"><FaLinkedin /></a>}
              </div>

              {/* Desktop sidebar toggle */}
              <button className="menu-bars" onClick={() => setSidebarOpen(true)} style={{ display: 'none' }} id="desktop-sidebar-btn">
                <FaBars />
              </button>

              {/* Mobile hamburger */}
              <button className="menu-bars mobile-only" onClick={() => setMobileOpen(true)}>
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SIDEBAR (Desktop) ===== */}
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <Link href="#home" className="logo" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)' }}>
            {profile?.name?.split(' ')[0] || "Tino"}.
          </Link>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-image">
          <Image src={avatarUrl} alt={profile?.name || "Profile"} width={400} height={300} unoptimized />
        </div>

        <h5>{profile?.profession || "Full Stack Developer"} 🚀</h5>
        <p className="disc">{profile?.bio || "Saya adalah seorang Full Stack Web Developer yang bersemangat dalam membangun aplikasi web modern dan responsif."}</p>

        <div className="sidebar-contact">
          {profile?.email && (
            <div className="single-contact">
              <FaEnvelope />
              <div className="info">
                <span>Mail me</span>
                <a href={`mailto:${profile.email}`} className="value">{profile.email}</a>
              </div>
            </div>
          )}
          <div className="single-contact">
            <FaMapMarkerAlt />
            <div className="info">
              <span>My Address</span>
              <span className="value">Indonesia</span>
            </div>
          </div>
        </div>

        <div className="sidebar-social-title">find with me</div>
        <div className="social-link">
          {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener"><FaGithub /></a>}
          {profile?.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener"><FaInstagram /></a>}
          {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener"><FaLinkedin /></a>}
        </div>
      </aside>

      {/* ===== MOBILE MENU ===== */}
      <div className={`sidebar-overlay ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>
          <FaTimes />
        </button>
        <ul>
          {menuLinks.map(l => (
            <li key={l.label}>
              <Link href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '40px' }}>
          <div className="sidebar-social-title">find with me</div>
          <div className="social-link">
            {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener"><FaGithub /></a>}
            {profile?.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener"><FaInstagram /></a>}
            {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener"><FaLinkedin /></a>}
          </div>
        </div>
      </div>
    </>
  );
}
