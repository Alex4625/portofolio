import Image from 'next/image';
import { getProfile, getProjects, getSkills, getExperiences } from '@/../lib/data';
import { Mail, ExternalLink, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const R2_URL = "https://pub-bb3ad634e09444a1b3bcbe6d9cdef19e.r2.dev";

export default async function Home() {
  const profile = await getProfile();
  const projects = await getProjects();
  const skills = await getSkills();
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen bg-[var(--background)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2333] via-[#0B0E14] to-[#0B0E14] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/30 to-transparent blur-3xl rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10 space-y-32">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-accent-blue font-mono text-sm">
              <Terminal size={16} />
              <span>System.out.println("Hello, World!");</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {profile ? profile.name : "Tino Lambut"} <br />
              <span className="text-gradient font-mono text-3xl md:text-5xl mt-2 block">
                {profile ? profile.profession : "Cyber Security & Developer"}
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              {profile ? profile.bio : "Membangun sistem yang aman, scalable, dan modern. Berpengalaman dalam menembus keamanan siber dan merajut arsitektur cloud."}
            </p>
            
            <div className="flex gap-4 pt-4">
              <a href="#contact" className="px-6 py-3 rounded-lg bg-accent-blue text-black font-semibold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                Hubungi Saya
              </a>
              <a href={profile?.cv_pdf_path ? `${R2_URL}/${profile.cv_pdf_path}` : "#"} target="_blank" className="px-6 py-3 rounded-lg border border-gray-700 hover:border-accent-blue hover:text-accent-blue transition-all font-mono">
                [Unduh_CV.pdf]
              </a>
            </div>
            
            <div className="flex gap-6 pt-6 text-gray-500">
              <a href={profile?.github_url || "#"} target="_blank" className="hover:text-accent-blue transition-colors"><FaGithub size={24} /></a>
              <a href={profile?.linkedin_url || "#"} target="_blank" className="hover:text-accent-blue transition-colors"><FaLinkedin size={24} /></a>
            </div>
          </div>
          
          {profile?.avatar_path && (
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
              <div className="absolute inset-0 rounded-full border-2 border-accent-blue/30 animate-[spin_10s_linear_infinite]" border-dashed="true" />
              <div className="absolute inset-2 rounded-full border border-accent-purple/50 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-4 rounded-full overflow-hidden glass-panel p-2">
                <Image 
                  src={`${R2_URL}/${profile.avatar_path}`} 
                  alt="Avatar" 
                  fill 
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          )}
        </section>

        {/* SKILLS SECTION */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-mono">
              <span className="text-accent-blue">01.</span> Keahlian_Teknis
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="glass-panel p-4 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform group">
                <div className="w-12 h-12 relative">
                  {skill.icon_path ? (
                    <Image src={`${R2_URL}/${skill.icon_path}`} alt={skill.name} fill className="object-contain group-hover:scale-110 transition-transform" />
                  ) : (
                    <Terminal className="w-full h-full text-gray-500" />
                  )}
                </div>
                <span className="font-mono text-sm text-gray-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-mono">
              <span className="text-accent-blue">02.</span> Pengalaman_Kerja
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-transparent" />
          </div>
          
          <div className="space-y-6 tech-border pl-6 relative">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_10px_#00F0FF]" />
                <div className="glass-panel p-6 space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="font-mono text-sm text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                      {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Sekarang'}
                    </span>
                  </div>
                  <h4 className="text-accent-purple font-medium">{exp.company}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-mono">
              <span className="text-accent-blue">03.</span> Arsip_Proyek
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="glass-panel group overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  {project.image_path ? (
                    <Image 
                      src={`${R2_URL}/${project.image_path}`} 
                      alt={project.title} 
                      fill 
                      className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-mono">No_Image_Found</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151A22] to-transparent opacity-80" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between">
                    {project.title}
                    {project.url && <a href={project.url} target="_blank" className="text-gray-500 hover:text-white"><ExternalLink size={20} /></a>}
                  </h3>
                  <p className="text-gray-400 text-sm mt-3 flex-1">{project.description}</p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.technologies.split(',').map((tech: string, i: number) => (
                        <span key={i} className="text-xs font-mono text-accent-purple bg-accent-purple/10 px-2 py-1 rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="pt-20 pb-10 text-center space-y-6">
          <h2 className="text-4xl font-bold">Tertarik Berkolaborasi?</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Sistem saya selalu terbuka untuk koneksi baru. Jika Anda memiliki proyek menantang atau sekadar ingin bertegur sapa, silakan hubungi saya.
          </p>
          <a href={`mailto:${profile?.email || 'hello@example.com'}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-black font-bold hover:bg-accent-blue transition-all">
            <Mail size={20} /> Inisiasi Koneksi
          </a>
          
          <div className="pt-20 border-t border-gray-800 text-sm font-mono text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} {profile?.name || 'Tino Lambut'}. All rights reserved.</p>
            <p>Built with <span className="text-white">Next.js</span> & <span className="text-accent-blue">Supabase</span></p>
          </div>
        </footer>
        
      </div>
    </main>
  );
}
