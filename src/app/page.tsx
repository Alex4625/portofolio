import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaArrowRight, FaDesktop, FaUsers, FaChartLine, FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { getProfile, getProjects, getSkills, getExperiences, getServices, getCertifications, getGallery } from "@/../lib/data";
import Navbar from "@/components/Navbar";
import ScrollObserver from "@/components/ScrollObserver";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const profile = await getProfile() || {
    name: "Tino Lambut",
    profession: "Full Stack Developer",
    bio: "Saya adalah seorang Full Stack Web Developer yang bersemangat dalam membangun aplikasi web modern dan responsif.",
    email: "tino@example.com",
    avatar_path: "https://files.ituaku.site/assets/sites/content/6e13472f1c4b43c3a7a9646e141db7bbe8fad1ebc90a00f962478faa050c218d.webp"
  };
  const projects = await getProjects();
  const skills = await getSkills();
  const experiences = await getExperiences();
  
  // New tables for full redesign matching napa.ituaku.com (using fallbacks if empty to show the layout)
  const services = await getServices();
  const certifications = await getCertifications();
  const gallery = await getGallery();

  const dummyServices = [
    { order_num: 1, title: "Web Development", description: "(Frontend, Backend, Fullstack, API)" },
    { order_num: 2, title: "Cyber Security & Pentesting", description: "(Vulnerability Assessment, Web Security)" },
    { order_num: 3, title: "Cloud Architecture", description: "(AWS, Cloudflare, Deployment, CI/CD)" },
    { order_num: 4, title: "Database Management", description: "(PostgreSQL, Supabase, MySQL)" }
  ];

  const dummyCerts = [
    { year: 2024, organization: "CompTIA", title: "CompTIA Security+ Certification" },
    { year: 2023, organization: "AWS", title: "AWS Certified Developer – Associate" },
    { year: 2022, organization: "Google", title: "Google IT Support Professional Certificate" }
  ];

  const displayServices = services.length > 0 ? services : dummyServices;
  const displayCerts = certifications.length > 0 ? certifications : dummyCerts;
  const avatarUrl = profile?.avatar_path?.startsWith('http') ? profile.avatar_path : (profile?.avatar_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portofolio/${profile.avatar_path}` : "https://files.ituaku.site/assets/sites/content/6e13472f1c4b43c3a7a9646e141db7bbe8fad1ebc90a00f962478faa050c218d.webp");

  return (
    <main>
      <ScrollObserver />
      <Navbar profile={profile} />

      {/* 1. HERO SECTION */}
      <section id="home" className="hero">
        <div className="hero-bg-text">{profile?.profession || 'Developer'}</div>
        <div className="section-container">
          <div className="hero-content">
            <div className="hero-info">
              <span className="hero-greeting fade-in">Hello saya</span>
              <h1 className="hero-name fade-in fade-in-delay-1">{profile?.name}</h1>
              <div className="hero-actions fade-in fade-in-delay-2">
                <Link href="#about" className="btn-primary">
                  Tentang Saya <FaArrowRight />
                </Link>
              </div>
              <div className="hero-social fade-in fade-in-delay-3">
                {profile?.github_url && <a href={profile.github_url} target="_blank"><FaGithub /></a>}
                {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank"><FaLinkedin /></a>}
                {profile?.instagram_url && <a href={profile.instagram_url} target="_blank"><FaInstagram /></a>}
              </div>
            </div>
            <div className="hero-image-wrapper fade-in fade-in-delay-1">
              <div className="hero-image-ring"></div>
              <div className="hero-image-frame">
                <Image src={avatarUrl} alt={profile?.name || "Profile"} width={400} height={500} unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="section bg-white/5">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-left">
              <div className="stat-card fade-in">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-card fade-in fade-in-delay-1">
                <div style={{fontSize: '2rem', color: 'var(--cream)', marginBottom: '8px'}}><FaDesktop /></div>
                <div className="stat-label">Projects Completed</div>
                <div className="stat-number" style={{fontSize: '2rem', marginTop: '10px'}}>{projects.length || 15}+</div>
              </div>
            </div>
            <div className="about-right">
              <div className="section-header" style={{marginBottom: '24px'}}>
                <span className="section-subtitle fade-in">About Me</span>
                <h2 className="section-title fade-in fade-in-delay-1">
                  {profile?.profession} | <span>Tech Enthusiast</span>
                </h2>
              </div>
              <p className="about-description fade-in fade-in-delay-2">
                {profile?.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-subtitle fade-in">Layanan Tersedia</span>
            <h2 className="section-title fade-in fade-in-delay-1">
              Saya terbuka untuk kolaborasi, freelance project, <br/>maupun kerjasama profesional
            </h2>
          </div>
          <div className="services-grid">
            <div className="services-list">
              {displayServices.map((svc: any, idx: number) => (
                <div key={idx} className={`service-item fade-in fade-in-delay-${idx % 4}`}>
                  <div className="d-flex align-items-center">
                    <span className="service-num">{svc.order_num}.</span>
                    <span className="service-name">{svc.title}</span>
                  </div>
                  {svc.description && <p className="service-desc">{svc.description}</p>}
                </div>
              ))}
            </div>
            <div className="services-image fade-in fade-in-delay-1">
              <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Services" width={600} height={500} unoptimized className="rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section id="skills" className="section bg-white/5">
        <div className="section-container">
          <div className="skills-grid">
            <div className="skills-col">
              <h3 className="skill-group-title fade-in">Keahlian Utama</h3>
              {skills.slice(0, Math.ceil(skills.length / 2) || 3).map((skill: any, idx: number) => (
                <div key={idx} className="skill-item fade-in">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-value">{skill.percentage || 90}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{width: `${skill.percentage || 90}%`}}></div>
                  </div>
                </div>
              ))}
              {skills.length === 0 && (
                <div className="skill-item fade-in">
                  <div className="skill-header"><span className="skill-name">Next.js & React</span><span className="skill-value">95%</span></div>
                  <div className="skill-bar"><div className="skill-fill" style={{width: '95%'}}></div></div>
                </div>
              )}
            </div>
            <div className="skills-col">
              <h3 className="skill-group-title fade-in">&nbsp;</h3>
              {skills.slice(Math.ceil(skills.length / 2) || 3).map((skill: any, idx: number) => (
                <div key={idx} className="skill-item fade-in">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-value">{skill.percentage || 85}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{width: `${skill.percentage || 85}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION */}
      <section id="experience" className="section">
        <div className="section-container">
          <h2 className="skill-group-title fade-in" style={{marginBottom: '40px'}}>Pengalaman Utama</h2>
          <div className="experience-grid">
            {experiences.map((exp: any, idx: number) => (
              <div key={idx} className={`experience-card fade-in fade-in-delay-${idx % 4}`}>
                <div className="exp-role">{exp.company} | {new Date(exp.start_date).getFullYear()}</div>
                <h3 className="exp-title">{exp.title}</h3>
                <p className="exp-description">{exp.description}</p>
              </div>
            ))}
            {experiences.length === 0 && (
              <>
                <div className="experience-card fade-in">
                  <div className="exp-role">Tech Company | 2023 - Present</div>
                  <h3 className="exp-title">Senior Full Stack Developer</h3>
                  <p className="exp-description">Membangun aplikasi web skala enterprise menggunakan Next.js dan Supabase. Mengoptimalkan performa dan keamanan sistem.</p>
                </div>
                <div className="experience-card fade-in fade-in-delay-1">
                  <div className="exp-role">Freelance | 2021 - 2023</div>
                  <h3 className="exp-title">Web Developer</h3>
                  <p className="exp-description">Mengerjakan berbagai proyek klien dari e-commerce hingga sistem manajemen internal menggunakan stack modern.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATIONS SECTION */}
      <section id="certifications" className="section bg-white/5">
        <div className="section-container">
          <div className="certs-layout">
            <div className="cert-image fade-in">
              <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Certifications" width={600} height={500} unoptimized className="rounded-xl" />
            </div>
            <div className="cert-content">
              <h2 className="skill-group-title fade-in" style={{marginBottom: '32px'}}>Sertifikasi & Penghargaan</h2>
              <div className="cert-list">
                {displayCerts.map((cert: any, idx: number) => (
                  <div key={idx} className="cert-item fade-in">
                    <div className="cert-org">{cert.organization}</div>
                    <h3 className="cert-name">{cert.title}</h3>
                    <div className="cert-year">{cert.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO SECTION */}
      <section id="portfolio" className="section">
        <div className="section-container">
          <div className="section-header fade-in">
            <h2 className="section-title"><FaDesktop className="inline text-cream mr-3" /> Portofolio / Projects</h2>
          </div>
          <div className="portfolio-grid">
            {projects.map((proj: any, idx: number) => (
              <div key={idx} className={`portfolio-card fade-in fade-in-delay-${idx % 2}`}>
                <div className="portfolio-category">{proj.is_published ? 'Published' : 'In Development'}</div>
                <h3 className="portfolio-title">{proj.title}</h3>
                <p className="portfolio-desc mb-4">{proj.description}</p>
                <div className="text-sm font-mono text-gray-400 mb-4">{proj.technologies}</div>
                {proj.url && (
                  <a href={proj.url} target="_blank" className="text-cream font-semibold hover:text-white flex items-center gap-2">
                    View Project <FaChevronRight className="text-xs" />
                  </a>
                )}
              </div>
            ))}
            {projects.length === 0 && (
              <div className="portfolio-card fade-in">
                <div className="portfolio-category">Web App</div>
                <h3 className="portfolio-title">Sistem Manajemen Kampus</h3>
                <p className="portfolio-desc">Aplikasi berbasis web untuk manajemen data mahasiswa dan dosen.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. GALLERY SECTION */}
      <section id="gallery" className="section bg-white/5">
        <div className="section-container">
          <div className="section-header text-center fade-in">
            <span className="section-subtitle">Galeri Foto</span>
            <h2 className="section-title">Kumpulan Foto & Kegiatan</h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((item: any, idx: number) => (
              <div key={idx} className={`gallery-item fade-in fade-in-delay-${idx % 3}`}>
                <Image src={item.image_url.startsWith('http') ? item.image_url : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portofolio/${item.image_url}`} alt={item.title || "Gallery"} width={400} height={400} unoptimized />
              </div>
            ))}
            {gallery.length === 0 && (
              <>
                <div className="gallery-item fade-in"><Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80" alt="Gal" width={400} height={400} unoptimized /></div>
                <div className="gallery-item fade-in fade-in-delay-1"><Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80" alt="Gal" width={400} height={400} unoptimized /></div>
                <div className="gallery-item fade-in fade-in-delay-2"><Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80" alt="Gal" width={400} height={400} unoptimized /></div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section section">
        <div className="section-container">
          <h2 className="fade-in">Mari Terhubung dan Berkolaborasi!</h2>
          <p className="fade-in fade-in-delay-1">Apakah Anda memiliki proyek menarik atau butuh konsultasi IT? Jangan ragu untuk menghubungi saya melalui WhatsApp.</p>
          <div className="fade-in fade-in-delay-2">
            <a href="https://wa.me/628000000000" target="_blank" className="btn-primary">
              <FaWhatsapp className="text-xl" /> Hubungi Saya di WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand fade-in">
              <Link href="#home" className="logo-text">
                {profile?.name?.split(' ')[0] || "Tino"}<span>.</span>
              </Link>
              <p>Personal branding, website, cepat, ringan, aman, nyaman, konsultasi gratis.</p>
            </div>
            <div className="footer-links-wrap fade-in fade-in-delay-1">
              <h4 className="footer-title">Quick Link</h4>
              <ul className="footer-links">
                <li><Link href="#home">Home</Link></li>
                <li><Link href="#about">Tentang</Link></li>
                <li><Link href="#services">Layanan</Link></li>
                <li><Link href="#portfolio">Portofolio</Link></li>
              </ul>
            </div>
            <div className="footer-social-wrap fade-in fade-in-delay-2">
              <h4 className="footer-title">Find Me</h4>
              <div className="footer-social">
                {profile?.github_url && <a href={profile.github_url} target="_blank"><FaGithub /></a>}
                {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank"><FaLinkedin /></a>}
                {profile?.instagram_url && <a href={profile.instagram_url} target="_blank"><FaInstagram /></a>}
              </div>
            </div>
          </div>
          <div className="footer-bottom fade-in">
            <div>&copy; {new Date().getFullYear()} {profile?.name || "Tino Lambut"}. All Rights Reserved.</div>
            <div>Built with Next.js & Supabase</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
