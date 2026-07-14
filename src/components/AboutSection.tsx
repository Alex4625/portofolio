import ScrollReveal from "./ScrollReveal";

export default function AboutSection({ data }: { data: any }) {
  return (
    <section id="about" className="min-h-screen flex items-center py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold leading-tight text-primary max-w-2xl">
              Mengenal Lebih Dekat
            </h2>
          </div>
        </ScrollReveal>

        {/* Bio row — text + secondary photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-20">
          <ScrollReveal direction="left">
            <div>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                {data.about}
              </p>
              <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-muted-foreground">
                Saat ini saya aktif mengerjakan berbagai proyek web development, 
                mulai dari website portofolio hingga aplikasi full-stack. 
                Saya percaya bahwa belajar terbaik adalah dengan membangun sesuatu yang nyata.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute -inset-3 rounded-none bg-accent/5 blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop"
                alt="Coding workspace"
                className="relative w-full h-64 md:h-80 object-cover rounded-none shadow-sm"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Symmetric Grid — 2 cols desktop, 2 cols mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Stat tiles */}
          {data.stats && data.stats.map((stat: any, index: number) => (
            <ScrollReveal key={index} delay={0.1 * index} width="w-full">
              <div
                className="bg-card rounded-none p-6 md:p-8 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 flex flex-col justify-center h-full"
              >
                <p className="text-4xl sm:text-5xl font-heading font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* Pull-quote tile — personal value statement */}
          <ScrollReveal delay={0.3} width="w-full">
            <div className="bg-accent/5 rounded-none p-6 md:p-8 shadow-sm border border-accent/10 hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-full">
              <p className="text-sm sm:text-base font-medium leading-relaxed text-secondary italic text-center">
                &ldquo;Belajar terbaik adalah dengan membangun sesuatu yang nyata.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
