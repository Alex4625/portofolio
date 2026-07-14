"use client";

import { FaInstagram, FaYoutube, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer({ data }: { data?: any }) {
  const pathname = usePathname();

  // Hide on admin and login routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }
  
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "instagram": return <FaInstagram className="w-5 h-5" />;
      case "youtube": return <FaYoutube className="w-5 h-5" />;
      case "linkedin": return <FaLinkedin className="w-5 h-5" />;
      case "github": return <FaGithub className="w-5 h-5" />;
      case "whatsapp": return <FaWhatsapp className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <footer id="footer" className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Mari Ciptakan Sesuatu<br className="hidden md:block" /> Yang Luar Biasa.
          </h2>
          <p className="text-muted-foreground max-w-lg mb-10 text-base md:text-lg">
            Terbuka untuk peluang kerja sama, diskusi proyek, atau sekadar bertukar pikiran seputar teknologi dan pengembangan web.
          </p>
          <a
            href={data?.contactEmail ? `mailto:${data.contactEmail}` : "#contact"}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-primary bg-white rounded-none shadow-sm hover:bg-accent hover:text-white transition-colors duration-300 min-h-[44px]"
          >
            Hubungi via Email
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-10">
          <p className="text-sm text-white/60 mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} Alexander Noventino Lambut. All rights reserved.
          </p>

          <div className="flex items-center flex-wrap justify-center gap-4">
            <a href={data?.githubUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 min-h-[44px] min-w-[44px]">
              {getSocialIcon("github")}
            </a>
            <a href={data?.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 min-h-[44px] min-w-[44px]">
              {getSocialIcon("linkedin")}
            </a>
            <a href={data?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 min-h-[44px] min-w-[44px]">
              {getSocialIcon("instagram")}
            </a>
            <a href={data?.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 min-h-[44px] min-w-[44px]">
              {getSocialIcon("youtube")}
            </a>
            <a href={data?.whatsappNumber ? `https://wa.me/${data.whatsappNumber}` : "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 min-h-[44px] min-w-[44px]">
              {getSocialIcon("whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
