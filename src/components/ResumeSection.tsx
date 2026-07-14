import { EDUCATIONS } from "@/lib/dummy-data";

export default function ResumeSection({ data }: { data: any[] }) {
  return (
    <section id="resume" className="min-h-screen flex flex-col justify-center py-16 bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
            Resume
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold leading-tight text-primary">
            Riwayat Pendidikan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Perjalanan akademik saya dari tingkat dasar hingga pendidikan tinggi yang membentuk fondasi pengetahuan saya saat ini.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto relative border-l-2 border-border ml-3 md:mx-auto">
          {data.map((edu, index) => (
            <div key={edu.id} className="mb-10 ml-8 relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 bg-card border-2 border-accent rounded-none group-hover:bg-accent transition-colors duration-300" />
              
              {/* Card */}
              <div className="bg-background p-6 shadow-sm border border-border rounded-none hover:shadow-md transition-shadow duration-300">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-accent bg-accent/10 rounded-none tracking-widest">
                  {edu.year}
                </span>
                <h3 className="text-xl font-heading font-bold text-primary mb-1">
                  {edu.degree}
                </h3>
                <h4 className="text-base font-medium text-secondary mb-3">
                  {edu.school}
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Full CV Button */}
        <div className="mt-16 text-center">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-primary border-2 border-primary bg-transparent rounded-none hover:bg-primary hover:text-white transition-all duration-300 min-h-[44px]"
          >
            Lihat CV Lengkap
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
