import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaArrowRight, FaDesktop, FaChartLine, FaChartPie, FaBullhorn, FaUserTie, FaUsersViewfinder, FaMicrophone } from "react-icons/fa6";
import { getProfile, getProjects, getSkills, getExperiences, getServices, getCertifications, getGallery } from "@/../lib/data";
import Navbar from "@/components/Navbar";
import ScrollObserver from "@/components/ScrollObserver";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const profile = await getProfile() || {
    name: "Tino Lambut",
    profession: "Full Stack Developer",
    bio: "Saya adalah seorang Full Stack Web Developer yang bersemangat dalam membangun aplikasi web modern dan responsif. Dengan latar belakang pendidikan di bidang Teknologi Informasi, saya memiliki keahlian dalam pengembangan Front-End maupun Back-End menggunakan teknologi terkini.",
    email: "tino@example.com",
    github_url: "https://github.com",
    linkedin_url: "https://linkedin.com",
    instagram_url: "https://instagram.com",
    avatar_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  };

  const projects = await getProjects();
  const skills = await getSkills();
  const experiences = await getExperiences();
  const services = await getServices();
  const certifications = await getCertifications();
  const gallery = await getGallery();

  // Fallback data saat database kosong
  const fallbackHighlights = [
    { icon: "chart-line", title: "10+ Proyek Web Terselesaikan dengan Teknologi Modern", desc: "Menggunakan Next.js, React, Node.js dan infrastruktur cloud modern untuk membangun aplikasi skala enterprise." },
    { icon: "chart-pie", title: "Optimasi Performa & Keamanan pada Setiap Proyek", desc: "Implementasi best practices keamanan web, penetration testing, dan optimalisasi performa aplikasi." },
    { icon: "bullhorn", title: "Full Stack Development dari Konsep hingga Deployment", desc: "Membangun solusi end-to-end mulai dari desain database, backend API, frontend UI, hingga deployment di cloud." },
  ];

  const fallbackServices = [
    { order_num: 1, title: "Full Stack Web Development", description: "(Next.js, React, Node.js, Laravel)" },
    { order_num: 2, title: "Cyber Security & Penetration Testing", description: "(Web Security, Vulnerability Assessment)" },
    { order_num: 3, title: "Cloud Architecture & DevOps", description: "(AWS, Cloudflare, CI/CD Pipeline)" },
    { order_num: 4, title: "Database Design & Management", description: "(PostgreSQL, Supabase, MySQL, MongoDB)" },
    { order_num: 5, title: "API Development & Integration", description: "(RESTful API, GraphQL, Third-party APIs)" },
  ];

  const fallbackSkills = [
    { name: "Next.js & React", value: "Expert" },
    { name: "Node.js & Express", value: "Advanced" },
    { name: "Cyber Security & Pentesting", value: "Advanced" },
    { name: "TypeScript & JavaScript", value: "Expert" },
    { name: "Cloud & DevOps (AWS, CF)", value: "Advanced" },
    { name: "Database (PostgreSQL, MySQL)", value: "Advanced" },
  ];

  const fallbackExperiences = [
    { sub: "Full Stack Developer", title: "Tech Company | 2023 - Sekarang", desc: "Membangun dan mengelola aplikasi web skala enterprise menggunakan Next.js, React, dan Node.js. Bertanggung jawab atas arsitektur frontend-backend dan deployment cloud." },
    { sub: "Freelance Web Developer", title: "Self-Employed | 2021 - 2023", desc: "Mengerjakan berbagai proyek klien dari landing page, e-commerce, hingga sistem manajemen internal menggunakan teknologi modern." },
    { sub: "IT Security Analyst", title: "Cyber Security Firm | 2022", desc: "Melakukan vulnerability assessment dan penetration testing pada aplikasi web klien korporat. Menyusun laporan keamanan dan rekomendasi perbaikan." },
    { sub: "Junior Developer", title: "Software House | 2020 - 2021", desc: "Mengembangkan fitur-fitur pada aplikasi web menggunakan Laravel dan Vue.js. Berkolaborasi dalam tim agile untuk delivery proyek tepat waktu." },
  ];

  const fallbackCerts = [
    { org: "CompTIA", name: "CompTIA Security+ Certification", year: "2024" },
    { org: "AWS", name: "AWS Certified Developer – Associate", year: "2023" },
    { org: "Google", name: "Google IT Support Professional Certificate", year: "2023" },
    { org: "Meta", name: "Meta Front-End Developer Professional Certificate", year: "2022" },
    { org: "Coursera", name: "Full Stack Web Development Specialization", year: "2021" },
  ];

  const fallbackGallery = [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80",
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayCerts = certifications.length > 0 ? certifications : fallbackCerts;
  const displayGallery = gallery.length > 0 ? gallery : fallbackGallery.map((url, i) => ({ image_url: url, title: `Gallery ${i+1}` }));

  const avatarUrl = profile?.avatar_path?.startsWith('http')
    ? profile.avatar_path
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";

  const servicesImageUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
  const certsImageUrl = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";

  return (
    <main>
      <ScrollObserver />
      <Navbar profile={profile} />

      {/* ========================================
          1. HERO BANNER
          ======================================== */}
      <section id="home" className="banner">
        <div className="container">
          <div className="banner-wrapper">
            <div className="banner-row">
              {/* Left Column: Name + CTA */}
              <div className="banner-left">
                <span className="sub-title fade-up delay-1">Hello saya</span>
                <h1 className="title fade-up delay-2">{profile?.name}</h1>
                <div className="fade-up delay-3">
                  <Link href="#about" className="tmp-btn">
                    <span>Tentang Saya</span>
                    <FaArrowRight className="icon-arrow" />
                  </Link>
                </div>
              </div>

              {/* Right Column: About + Social */}
              <div className="banner-right">
                <div className="about-me fade-up delay-1">
                  <h3 className="title">About Me</h3>
                  <p className="para">{profile?.bio}</p>
                </div>
                <div className="find-me-on fade-up delay-2">
                  <h2 className="find-me-on-title">Find me on</h2>
                  <div className="social-link banner">
                    {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener"><FaGithub /></a>}
                    {profile?.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener"><FaInstagram /></a>}
                    {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener"><FaLinkedin /></a>}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Profile Image */}
            <div className="banner-bg-img zoom-in delay-2">
              <Image src={avatarUrl} alt={profile?.name || "Profile"} width={500} height={650} unoptimized priority />
            </div>

            {/* Background Text */}
            <div className="banner-bg-text">{profile?.profession || "Developer"}</div>
          </div>
        </div>
      </section>

      {/* ========================================
          STAT HIGHLIGHT CARDS (below hero)
          ======================================== */}
      <section className="section-gap-top">
        <div className="container">
          <div className="service-cards-row">
            {fallbackHighlights.map((item, idx) => (
              <div key={idx} className={`service-card-v1 fade-up delay-${idx + 1}`}>
                <div className="icon">
                  {idx === 0 && <FaChartLine />}
                  {idx === 1 && <FaChartPie />}
                  {idx === 2 && <FaBullhorn />}
                </div>
                <h4 className="card-title">{item.title}</h4>
                <p className="card-para">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          2. ABOUT SECTION
          ======================================== */}
      <section id="about" className="section-gap">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <div className="years-card fade-up delay-1">
                <div className="number">5+</div>
                <div className="label">years of experience</div>
              </div>
              <div className="info-card fade-up delay-2">
                <div className="icon-box"><FaDesktop /></div>
                <div className="card-info">
                  <div className="card-title">Projects Completed</div>
                  <div className="card-para">{projects.length > 0 ? `${projects.length}+` : "15+"}</div>
                </div>
              </div>
            </div>
            <div className="about-right">
              <div className="section-subtitle fade-up">About Me</div>
              <h2 className="section-title fade-up delay-1">
                {profile?.profession || "Full Stack Developer"} | Tech Enthusiast & Problem Solver
              </h2>
              <p className="section-description fade-up delay-2">{profile?.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          3. SERVICES SECTION
          ======================================== */}
      <section id="services" className="section-gap">
        <div className="container">
          <div className="text-center mb-60">
            <div className="section-subtitle fade-up">Layanan Tersedia</div>
            <h2 className="section-title fade-up delay-1">
              Saya terbuka untuk kolaborasi, freelance project,<br />maupun kerjasama profesional di bidang
            </h2>
          </div>
          <div className="services-layout">
            <div>
              {displayServices.map((svc: any, idx: number) => (
                <div key={idx} className={`service-list-item fade-up delay-${(idx % 5) + 1}`}>
                  <div>
                    <span className="num">{svc.order_num || idx + 1}.</span>
                    <span className="name">{svc.title}</span>
                  </div>
                  {svc.description && <p className="desc">{svc.description}</p>}
                </div>
              ))}
            </div>
            <div className="services-image zoom-in delay-1">
              <Image src={servicesImageUrl} alt="Services" width={600} height={700} unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          4. SKILLS / EXPERTISE SECTION
          ======================================== */}
      <section id="skills" className="section-gap">
        <div className="container">
          <div className="skills-grid">
            <div>
              <h2 className="custom-title fade-up">
                Keahlian Utama <span className="line"></span>
              </h2>
              {(skills.length > 0 ? skills.slice(0, Math.ceil(skills.length / 2)) : fallbackSkills.slice(0, 3)).map((s: any, idx: number) => (
                <div key={idx} className="progress-charts fade-up">
                  <h6 className="heading">{s.name}</h6>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${s.percentage || 100}%` }}>
                      <span className="label">{s.value || s.percentage ? `${s.percentage}%` : "Expert"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="custom-title fade-up">&nbsp;<span className="line"></span></h2>
              {(skills.length > 0 ? skills.slice(Math.ceil(skills.length / 2)) : fallbackSkills.slice(3)).map((s: any, idx: number) => (
                <div key={idx} className="progress-charts fade-up">
                  <h6 className="heading">{s.name}</h6>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${s.percentage || 100}%` }}>
                      <span className="label">{s.value || s.percentage ? `${s.percentage}%` : "Advanced"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          5. EXPERIENCE SECTION
          ======================================== */}
      <section id="experience" className="section-gap">
        <div className="container">
          <h2 className="custom-title mb-32 fade-up">
            Pengalaman Utama <span className="line"></span>
          </h2>
          <div className="experience-grid">
            {experiences.length > 0
              ? experiences.map((exp: any, idx: number) => (
                  <div key={idx} className={`experience-card fade-up delay-${(idx % 4) + 1}`}>
                    <h4 className="exp-sub-title">{exp.title || exp.role}</h4>
                    <h2 className="exp-title">{exp.company} | {exp.start_date ? new Date(exp.start_date).getFullYear() : ""}</h2>
                    <p className="exp-para">{exp.description}</p>
                  </div>
                ))
              : fallbackExperiences.map((exp, idx) => (
                  <div key={idx} className={`experience-card fade-up delay-${(idx % 4) + 1}`}>
                    <h4 className="exp-sub-title">{exp.sub}</h4>
                    <h2 className="exp-title">{exp.title}</h2>
                    <p className="exp-para">{exp.desc}</p>
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* ========================================
          6. CERTIFICATIONS / AWARDS SECTION
          ======================================== */}
      <section id="certifications" className="section-gap">
        <div className="container">
          <div className="certs-layout">
            <div className="cert-image zoom-in delay-1">
              <Image src={certsImageUrl} alt="Certifications" width={600} height={500} unoptimized />
            </div>
            <div>
              <h2 className="custom-title mb-32 fade-up">
                Sertifikasi & Penghargaan <span className="line"></span>
              </h2>
              {displayCerts.map((cert: any, idx: number) => (
                <div key={idx} className={`cert-item fade-up delay-${(idx % 5) + 1}`}>
                  <div className="cert-org">{cert.org || cert.organization}</div>
                  <h3 className="cert-name">{cert.name || cert.title}</h3>
                  <div className="cert-year">{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          7. PORTFOLIO / PROJECTS SECTION
          ======================================== */}
      <section id="portfolio" className="section-gap">
        <div className="container">
          <div className="portfolio-header fade-up">
            <h2 className="portfolio-title-main">
              <FaMicrophone /> Portofolio / Projects
            </h2>
          </div>
          <div className="portfolio-grid">
            {projects.length > 0 ? (
              <>
                <div className="resume-widget">
                  {projects.slice(0, Math.ceil(projects.length / 2)).map((proj: any, idx: number) => (
                    <div key={idx} className={`resume-single fade-up delay-${(idx % 3) + 1}`}>
                      <div className="time">
                        <span className="dot"></span>
                        {proj.technologies || "Web Development"}
                      </div>
                      <h3 className="resume-title">{proj.title}</h3>
                      <div className="institute">{proj.description}</div>
                    </div>
                  ))}
                </div>
                <div className="resume-widget">
                  {projects.slice(Math.ceil(projects.length / 2)).map((proj: any, idx: number) => (
                    <div key={idx} className={`resume-single fade-up delay-${(idx % 3) + 1}`}>
                      <div className="time">
                        <span className="dot"></span>
                        {proj.technologies || "Web Development"}
                      </div>
                      <h3 className="resume-title">{proj.title}</h3>
                      <div className="institute">{proj.description}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="resume-widget">
                  <div className="resume-single fade-up delay-1">
                    <div className="time"><span className="dot"></span> Full Stack</div>
                    <h3 className="resume-title">Enterprise Dashboard Application (2024)</h3>
                    <div className="institute">Membangun dashboard analitik real-time untuk perusahaan dengan Next.js, Supabase, dan Cloudflare Workers. Menghasilkan peningkatan efisiensi operasional 40%.</div>
                  </div>
                  <div className="resume-single fade-up delay-2">
                    <div className="time"><span className="dot"></span> Cyber Security</div>
                    <h3 className="resume-title">Web Application Penetration Testing</h3>
                    <div className="institute">Melakukan security audit pada 5+ aplikasi web korporat. Menemukan dan melaporkan 15+ kerentanan kritis sebelum dieksploitasi.</div>
                  </div>
                </div>
                <div className="resume-widget">
                  <div className="resume-single fade-up delay-1">
                    <div className="time"><span className="dot"></span> Cloud Architecture</div>
                    <h3 className="resume-title">Multi-Cloud Deployment Infrastructure</h3>
                    <div className="institute">Merancang arsitektur deployment multi-cloud (AWS + Cloudflare) dengan CI/CD pipeline otomatis, mengurangi downtime hingga 99.9% uptime.</div>
                  </div>
                  <div className="resume-single fade-up delay-2">
                    <div className="time"><span className="dot"></span> API Development</div>
                    <h3 className="resume-title">RESTful API Microservices Platform</h3>
                    <div className="institute">Membangun platform API microservices yang melayani 100k+ request per hari dengan Node.js dan PostgreSQL.</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ========================================
          8. GALLERY SECTION
          ======================================== */}
      <section id="gallery" className="section-gap">
        <div className="container">
          <div className="text-center mb-60">
            <div className="section-subtitle fade-up">Galeri Foto</div>
            <h2 className="section-title fade-up delay-1">Kumpulan Foto & Kegiatan</h2>
          </div>
          <div className="gallery-grid">
            {displayGallery.map((item: any, idx: number) => {
              const imgUrl = typeof item === 'string' ? item :
                (item.image_url?.startsWith('http') ? item.image_url : `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80`);
              return (
                <div key={idx} className={`gallery-item fade-up delay-${(idx % 3) + 1}`}>
                  <Image src={imgUrl} alt={item.title || `Gallery ${idx + 1}`} width={500} height={500} unoptimized />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="section-gap cta-section">
        <div className="container">
          <h2 className="section-title fade-up">Mari Terhubung dan Berkolaborasi! 🚀</h2>
          <p className="section-description fade-up delay-1" style={{ margin: '0 auto 32px', textAlign: 'center' }}>
            Apakah Anda memiliki proyek menarik atau butuh konsultasi IT? Jangan ragu untuk menghubungi saya.
          </p>
          <div className="fade-up delay-2" style={{ textAlign: 'center' }}>
            <a href="https://wa.me/628000000000" target="_blank" rel="noopener" className="tmp-btn">
              <FaWhatsapp style={{ fontSize: '18px' }} />
              <span>Hubungi Saya</span>
              <FaArrowRight className="icon-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
          ======================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="#home" className="logo">{profile?.name?.split(' ')[0] || "Tino"}.</Link>
              <p className="description">
                Personal portfolio website. Dibangun dengan Next.js & Supabase. Cepat, ringan, aman, dan modern.
              </p>
            </div>
            <div className="footer-col">
              <h5 className="ft-title">Quick Link</h5>
              <div className="ft-link">
                <Link href="#home">Home</Link>
                <Link href="#about">Tentang</Link>
                <Link href="#services">Layanan</Link>
                <Link href="#skills">Keahlian</Link>
                <Link href="#portfolio">Portofolio</Link>
              </div>
            </div>
            <div className="footer-col">
              <h5 className="ft-title">Find Me</h5>
              <div className="social-link" style={{ marginTop: '4px' }}>
                {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener"><FaGithub /></a>}
                {profile?.instagram_url && <a href={profile.instagram_url} target="_blank" rel="noopener"><FaInstagram /></a>}
                {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener"><FaLinkedin /></a>}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} {profile?.name || "Tino Lambut"}. All Rights Reserved.</div>
            <div>Built with Next.js & Supabase</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
