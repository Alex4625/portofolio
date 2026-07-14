import { PROFILE } from "@/lib/dummy-data";
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

export default function HeroSection({ data }: { data: any }) {
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20"
    >
      {/* Subtle decorative glow behind portrait */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-0">
          {/* Left content — 55% text block */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow label */}
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.15em] uppercase text-accent bg-accent/10 rounded-full animate-fade-in-up">
              Mahasiswa Informatika
            </span>

            {/* H1 Headline — Poppins Bold, 40-64px */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-primary leading-tight">
              Hello, saya <br />
              {data.name}
            </h1>

            {/* Supporting subtext */}
            <p className="mt-4 text-lg sm:text-xl font-medium text-accent/80 animate-fade-in-up animation-delay-200">
              {data.role}
            </p>

            {/* One-sentence description — 16-18px, muted */}
            <p className="mt-6 max-w-xl text-base sm:text-[17px] leading-relaxed text-muted-foreground animate-fade-in-up animation-delay-300 mx-auto lg:mx-0">
              {PROFILE.about}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
              {/* Primary CTA — accent, rounded-full, min 44px height */}
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-accent rounded-full shadow-sm hover:shadow-md hover:brightness-110 transition min-h-[44px]"
              >
                Lihat Karya Saya
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
              {/* Secondary/Outline CTA */}
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition min-h-[44px]"
              >
                Tentang Saya
              </a>
            </div>

            {/* Social Icons row in Hero */}
            <div className="mt-8 flex items-center justify-center lg:justify-start flex-wrap gap-4 animate-fade-in-up animation-delay-500">
              <a href={data?.githubUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-none bg-accent/5 border border-accent/10 text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                {getSocialIcon("github")}
              </a>
              <a href={data?.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-none bg-accent/5 border border-accent/10 text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                {getSocialIcon("linkedin")}
              </a>
              <a href={data?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-none bg-accent/5 border border-accent/10 text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                {getSocialIcon("instagram")}
              </a>
              <a href={data?.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-none bg-accent/5 border border-accent/10 text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                {getSocialIcon("youtube")}
              </a>
              <a href={data?.whatsappNumber ? `https://wa.me/${data.whatsappNumber}` : "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-none bg-accent/5 border border-accent/10 text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                {getSocialIcon("whatsapp")}
              </a>
            </div>
          </div>

          {/* Right content — 45% portrait */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
            <div className="relative">
              {/* Soft colored glow behind portrait */}
              <div className="absolute -inset-6 rounded-none bg-accent/10 blur-2xl animate-pulse-slow" />

              {/* Portrait — rounded-none, high quality */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[480px] rounded-none overflow-hidden shadow-sm">
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge — stat card */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-card px-5 py-3 rounded-none shadow-md border border-border animate-float">
                <p className="text-2xl font-heading font-bold text-accent">{PROFILE.stats[0].value}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{PROFILE.stats[0].label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
