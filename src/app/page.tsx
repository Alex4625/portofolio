import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import ScrollObserver from "@/components/ScrollObserver";
import MediaShowcase from "@/components/MediaShowcase";
import { getSiteData, imageUrl, number, techList, text, type DbRow } from "@/../lib/data";

export const dynamic = "force-dynamic";

const fallbackProfile: DbRow = {
  name: "Tino Lambut",
  profession: "Full Stack Developer",
  hero_badge: "Full Stack Developer",
  bio: "Saya membangun aplikasi web modern, aman, dan siap deploy dengan Next.js, React, Node.js, Supabase, dan Cloudflare.",
  about_text:
    "Saya adalah developer yang senang menyatukan desain antarmuka, arsitektur backend, keamanan aplikasi, dan deployment cloud menjadi produk yang rapi. Fokus saya adalah membangun sistem yang enak dipakai, mudah dirawat, dan cukup tangguh untuk tumbuh bersama kebutuhan bisnis.",
  email: "tino@example.com",
  phone: "+62 800 0000 0000",
  location: "Indonesia",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  instagram_url: "https://instagram.com",
  whatsapp_url: "https://wa.me/628000000000",
  avatar_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  about_image_path: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
};

const fallbackStats = [
  {
    value: "10+",
    label: "Proyek Web",
    title: "10+ Proyek Web Diselesaikan",
    desc: "Next.js, React, Node.js, dan infrastruktur cloud modern untuk landing page sampai sistem operasional.",
  },
  {
    value: "99.9%",
    label: "Uptime",
    title: "Deployment Multi-Cloud Stabil",
    desc: "Arsitektur AWS + Cloudflare dengan CI/CD pipeline otomatis untuk menjaga layanan tetap tersedia.",
  },
  {
    value: "15+",
    label: "Security Finding",
    title: "Kerentanan Kritis Ditemukan",
    desc: "Security audit dan penetration testing untuk mengurangi risiko sebelum sistem masuk produksi.",
  },
  {
    value: "100K+",
    label: "Request / Hari",
    title: "API Trafik Tinggi",
    desc: "Microservices Node.js dan PostgreSQL untuk menangani trafik besar dengan latensi konsisten.",
  },
];

const fallbackServices = [
  { title: "Full Stack Web Development", description: "(Next.js, React, Node.js, Laravel)", order_num: 1 },
  { title: "Cyber Security & Penetration Testing", description: "(Audit keamanan, vulnerability assessment)", order_num: 2 },
  { title: "Cloud Architecture & DevOps", description: "(Cloudflare, AWS, CI/CD pipeline)", order_num: 3 },
  { title: "Database Design & API Integration", description: "(PostgreSQL, Supabase, REST API)", order_num: 4 },
];

const fallbackSkills = [
  { name: "Next.js & React", category: "Frontend", percentage: 92 },
  { name: "TypeScript & JavaScript", category: "Frontend", percentage: 90 },
  { name: "Node.js & REST API", category: "Backend", percentage: 88 },
  { name: "Supabase & PostgreSQL", category: "Backend", percentage: 84 },
  { name: "Cloudflare & R2", category: "Tools", percentage: 82 },
  { name: "Security Testing", category: "Tools", percentage: 86 },
];

const fallbackExperiences = [
  {
    role: "Full Stack Developer",
    company: "Tech Company",
    start_date: "2023-01-01",
    description: "Membangun aplikasi web skala enterprise menggunakan Next.js, React, Node.js, dan cloud deployment.",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    start_date: "2021-01-01",
    description: "Mengerjakan landing page, dashboard internal, e-commerce, dan integrasi API untuk berbagai klien.",
  },
  {
    role: "IT Security Analyst",
    company: "Cyber Security Firm",
    start_date: "2022-01-01",
    description: "Melakukan vulnerability assessment, penetration testing, dan laporan rekomendasi perbaikan.",
  },
];

const fallbackCerts = [
  { organization: "CompTIA", title: "CompTIA Security+ Certification", year: "2024" },
  { organization: "AWS", title: "AWS Certified Developer Associate", year: "2023" },
  { organization: "Meta", title: "Front-End Developer Professional Certificate", year: "2022" },
  { organization: "Coursera", title: "Full Stack Web Development Specialization", year: "2021" },
];

const fallbackProjects = [
  {
    title: "Enterprise Dashboard Application",
    category: "Full Stack",
    year: "2024",
    strategy: "Membangun dashboard analitik real-time dengan Next.js, Supabase, dan Cloudflare.",
    result: "Workflow operasional lebih cepat dan laporan internal lebih mudah dipantau.",
    technologies: "Next.js, Supabase, Cloudflare",
    image_path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Web Application Security Audit",
    category: "Cyber Security",
    year: "2024",
    strategy: "Melakukan audit keamanan dan validasi celah pada aplikasi web korporat.",
    result: "15+ temuan kritis terdokumentasi sebelum sistem dieksploitasi.",
    technologies: "OWASP, Burp Suite, Reporting",
    image_path: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
  },
];

const fallbackVideos = [
  {
    title: "Project Demo",
    thumbnail_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=420&q=80",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const fallbackGallery = [
  { title: "Workshop", image_path: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80" },
  { title: "Team Session", image_path: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80" },
  { title: "Development", image_path: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80" },
];

function parseStats(profile: DbRow) {
  const stats = profile.stats_json;
  if (Array.isArray(stats) && stats.length > 0) return stats as typeof fallbackStats;
  return fallbackStats;
}

function formatYearRange(row: DbRow) {
  const start = text(row, ["start_date"]);
  const end = text(row, ["end_date"], "Sekarang");
  const startYear = start ? new Date(start).getFullYear().toString() : "";
  const endYear = end === "Sekarang" ? end : new Date(end).getFullYear().toString();
  return [startYear, endYear].filter(Boolean).join(" - ");
}

export default async function Home() {
  const data = await getSiteData();
  const profile = data.profile || fallbackProfile;
  const services = data.services.length ? data.services : fallbackServices;
  const skills = data.skills.length ? data.skills : fallbackSkills;
  const experiences = data.experiences.length ? data.experiences : fallbackExperiences;
  const certifications = data.certifications.length ? data.certifications : fallbackCerts;
  const projects = data.projects.length ? data.projects : fallbackProjects;
  const videos = data.videos.length ? data.videos : fallbackVideos;
  const galleries = data.galleries.length ? data.galleries : fallbackGallery;
  const stats = parseStats(profile);

  const name = text(profile, ["name", "full_name"], "Tino Lambut");
  const profession = text(profile, ["profession"], "Full Stack Developer");
  const heroBadge = text(profile, ["hero_badge"], profession);
  const bio = text(profile, ["bio"], text(fallbackProfile, ["bio"]));
  const aboutText = text(profile, ["about_text"], text(profile, ["bio"], text(fallbackProfile, ["about_text"])));
  const avatarUrl = imageUrl(profile, ["hero_image_path", "avatar_path"], text(fallbackProfile, ["avatar_path"]));
  const aboutImageUrl = imageUrl(profile, ["about_image_path", "avatar_path"], text(fallbackProfile, ["about_image_path"]));
  const whatsappUrl = text(profile, ["whatsapp_url"], "https://wa.me/628000000000");

  const groupedSkills = skills.reduce<Record<string, DbRow[]>>((groups, skill) => {
    const category = text(skill, ["category"], "Tools");
    groups[category] = [...(groups[category] || []), skill];
    return groups;
  }, {});

  return (
    <main>
      <ScrollObserver />
      <Navbar profile={profile} />

      <section id="home" className="hero-section">
        <div className="hero-watermark">{profession}</div>
        <div className="container hero-grid">
          <aside className="hero-rail">
            <span>01</span>
            <div />
            <a href={text(profile, ["github_url"], "#")} aria-label="GitHub"><FaGithub size={18} /></a>
            <a href={text(profile, ["instagram_url"], "#")} aria-label="Instagram"><FaInstagram size={18} /></a>
            <a href={text(profile, ["linkedin_url"], "#")} aria-label="LinkedIn"><FaLinkedin size={18} /></a>
          </aside>

          <div className="hero-copy reveal">
            <span className="role-badge">{heroBadge}</span>
            <h1>{name}</h1>
            <p>{bio}</p>
            <div className="hero-contact">
              <a href={`mailto:${text(profile, ["email"], "tino@example.com")}`}><Mail size={16} />{text(profile, ["email"], "tino@example.com")}</a>
              <span><Phone size={16} />{text(profile, ["phone"], "+62 800 0000 0000")}</span>
              <span><MapPin size={16} />{text(profile, ["location"], "Indonesia")}</span>
            </div>
            <div className="hero-actions">
              <Link href="#about" className="primary-btn">Tentang Saya <ArrowRight size={18} /></Link>
              {text(profile, ["cv_pdf_path"]) && <a className="ghost-btn" href={imageUrl(profile, ["cv_pdf_path"])}>Unduh CV</a>}
            </div>
          </div>

          <div className="hero-image reveal">
            <Image src={avatarUrl} alt={name} width={620} height={760} priority unoptimized />
          </div>
        </div>
      </section>

      <section id="about" className="section-block section-alt">
        <div className="container about-layout">
          <div className="about-photo reveal">
            <Image src={aboutImageUrl} alt={`${name} working`} width={680} height={760} unoptimized />
          </div>
          <div className="about-content">
            <span className="section-kicker">About Me</span>
            <h2>{profession}</h2>
            <p>{aboutText}</p>
            <div className="stat-number-row">
              <div><strong>{stats[0]?.value || "10+"}</strong><span>{stats[0]?.label || "Projects"}</span></div>
              <div><strong>{stats[1]?.value || "5+"}</strong><span>{stats[1]?.label || "Years"}</span></div>
            </div>
            <div className="stat-callouts">
              {stats.map((item, index) => (
                <article className="stat-callout reveal" key={`${item.title}-${index}`}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-block">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Layanan</span>
            <h2>Saya terbuka untuk kolaborasi, freelance project, maupun kerjasama profesional di bidang</h2>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row reveal" key={text(service, ["id"], String(index))}>
                <span>{String(number(service, ["order_num", "order_column"], index + 1)).padStart(2, "0")}</span>
                <div>
                  <h3>{text(service, ["title"], "Layanan")}</h3>
                  <p>{text(service, ["description"], "(Konsultasi dan implementasi)")}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-block section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Keahlian</span>
            <h2>Stack Teknis</h2>
          </div>
          <div className="skills-layout">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div className="skill-group reveal" key={category}>
                <h3>{category}</h3>
                {items.map((skill) => {
                  const pct = number(skill, ["percentage"], 0);
                  return (
                    <div className="skill-line" key={text(skill, ["id", "name"])}>
                      <div><span>{text(skill, ["name"], "Skill")}</span><em>{pct}%</em></div>
                      <div className="skill-track"><span className="skill-fill" style={{ "--target-width": `${pct}%` } as CSSProperties} /></div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-block">
        <div className="container timeline-layout">
          <div className="section-heading compact">
            <span className="section-kicker">Experience</span>
            <h2>Pengalaman Utama</h2>
          </div>
          <div className="timeline-list">
            {experiences.map((exp, index) => (
              <article className="timeline-item reveal" key={text(exp, ["id"], String(index))}>
                <h3>{text(exp, ["role", "title"], "Developer")}</h3>
                <div>{text(exp, ["company", "company_name"], "Company")} | {formatYearRange(exp)}</div>
                <p>{text(exp, ["description"])}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section-block section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Credentials</span>
            <h2>Sertifikasi & Penghargaan</h2>
          </div>
          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <article className="cert-card reveal" key={text(cert, ["id"], String(index))}>
                <span>{text(cert, ["organization", "org"], "Institution")}</span>
                <h3>{text(cert, ["title", "name"], "Certification")}</h3>
                <em>{text(cert, ["year"], "2026")}</em>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-block">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Portfolio</span>
            <h2>Projects Terpilih</h2>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card reveal" key={text(project, ["id"], String(index))}>
                <Image
                  src={imageUrl(project, ["image_path"], text(fallbackProjects[index % fallbackProjects.length], ["image_path"]))}
                  alt={text(project, ["title"], "Project")}
                  width={760}
                  height={430}
                  unoptimized
                />
                <div className="project-body">
                  <span>{text(project, ["category", "technologies"], "Web Development")}</span>
                  <h3>{text(project, ["title"], "Project")} <em>{text(project, ["year"])}</em></h3>
                  <p><strong>Strategi:</strong> {text(project, ["strategy", "description"], "Membangun solusi web sesuai kebutuhan produk.")}</p>
                  <p><strong>Hasil:</strong> {text(project, ["result"], "Produk lebih mudah dipakai, dipantau, dan dikembangkan.")}</p>
                  <div className="project-tags">{techList(project).slice(0, 4).map((tag) => <small key={tag}>{tag}</small>)}</div>
                  <div className="project-links">
                    {text(project, ["demo_url", "url"]) && <a href={text(project, ["demo_url", "url"])} target="_blank" rel="noopener">Demo <ExternalLink size={14} /></a>}
                    {text(project, ["github_url"]) && <a href={text(project, ["github_url"])} target="_blank" rel="noopener">GitHub <FaGithub size={14} /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MediaShowcase
        videos={videos.map((video, index) => ({
          id: text(video, ["id"], String(index)),
          title: text(video, ["title"], "Project Demo"),
          thumbnail: imageUrl(video, ["thumbnail_image"], text(fallbackVideos[0], ["thumbnail_image"])),
          embedUrl: text(video, ["embed_url"], "https://www.youtube.com/embed/dQw4w9WgXcQ"),
        }))}
        galleries={galleries.map((item, index) => ({
          id: text(item, ["id"], String(index)),
          title: text(item, ["caption", "title"], `Gallery ${index + 1}`),
          image: imageUrl(item, ["image_path", "image_url"], text(fallbackGallery[index % fallbackGallery.length], ["image_path"])),
        }))}
      />

      <section className="section-block cta-section">
        <div className="container">
          <h2>Mari Terhubung dan Berkolaborasi</h2>
          <p>Punya proyek menarik atau butuh konsultasi IT? Saya siap membantu dari ide sampai deployment.</p>
          <a href={whatsappUrl} className="primary-btn" target="_blank" rel="noopener">Hubungi Saya via WhatsApp <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link href="#home" className="footer-brand">{name.split(" ")[0]}.</Link>
            <p>Personal portfolio berbasis Next.js, Supabase, dan Cloudflare R2.</p>
            <div className="footer-social">
              <a href={text(profile, ["github_url"], "#")}><FaGithub size={18} /></a>
              <a href={text(profile, ["instagram_url"], "#")}><FaInstagram size={18} /></a>
              <a href={text(profile, ["linkedin_url"], "#")}><FaLinkedin size={18} /></a>
            </div>
          </div>
          <div>
            <h3>Quick Link</h3>
            <Link href="#about">Tentang</Link>
            <Link href="#services">Layanan</Link>
            <Link href="#skills">Keahlian</Link>
            <Link href="#portfolio">Portofolio</Link>
          </div>
          <div>
            <h3>Find Me</h3>
            <a href={`mailto:${text(profile, ["email"], "tino@example.com")}`}>{text(profile, ["email"], "tino@example.com")}</a>
            <span>{text(profile, ["phone"], "+62 800 0000 0000")}</span>
            <span>{text(profile, ["location"], "Indonesia")}</span>
          </div>
        </div>
        <div className="footer-bottom">&copy; 2026 {name}. All Rights Reserved.</div>
      </footer>
    </main>
  );
}
