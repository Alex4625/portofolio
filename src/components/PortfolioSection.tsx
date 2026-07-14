"use client";

import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { recordPortfolioClick } from "@/app/admin/actions";

export default function PortfolioSection({ data }: { data: any[] }) {
  return (
    <section id="portfolio" className="min-h-screen flex items-center py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16 text-center">
            <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold leading-tight text-primary">
              Bukti Kerja & Karya
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Proyek nyata yang telah saya kerjakan. Mengutamakan performa, desain responsif, dan pengalaman pengguna yang luar biasa.
            </p>
          </div>
        </ScrollReveal>

        {/* Portfolio Grid — 2 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {data.map((portfolio, index) => (
            <ScrollReveal key={portfolio.id} delay={0.1 * index} width="w-full">
              <div
                className="group bg-card shadow-sm border border-border hover:shadow-lg transition-shadow duration-300 rounded-none overflow-hidden cursor-pointer h-full"
                onClick={() => {
                  // Only track if it doesn't have a specific projectUrl, or track anyway
                  recordPortfolioClick(portfolio.id).catch(console.error);
                }}
              >
                {/* Media Container — Fixed aspect ratio, sharp corners */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {portfolio.isVideo ? (
                    // If it's a video, we'd render a video thumbnail or iframe
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors z-10">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-none flex items-center justify-center text-accent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  ) : null}
                  <img
                    src={portfolio.mediaUrl}
                    alt={portfolio.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Box */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {portfolio.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
                    {portfolio.description}
                  </p>

                  {/* Tech Stack Pills — Sharp corners */}
                  <div className="flex flex-wrap gap-2">
                    {portfolio.techStack && portfolio.techStack.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-muted text-xs font-medium text-secondary rounded-none uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Optional Project URL Link */}
                  {portfolio.projectUrl && (
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <a 
                        href={portfolio.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors group-hover:underline"
                        onClick={(e) => {
                          // Allow the link to open naturally, but fire tracking in background
                          recordPortfolioClick(portfolio.id).catch(console.error);
                          // Stop propagation so the parent div onClick doesn't fire twice
                          e.stopPropagation();
                        }}
                      >
                        Kunjungi Proyek
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* End of section CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-accent rounded-none shadow-sm hover:shadow-md hover:brightness-110 transition min-h-[44px]"
            >
              Mari Berkolaborasi
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
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
