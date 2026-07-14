import { Code2, PenTool, MessageSquare, Layout, Monitor, Smartphone, Server, Database, Cloud, Search, TrendingUp, BarChart, Lightbulb, Shield, ShoppingCart, Terminal, Briefcase, Globe, Settings } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ServicesSection({ data }: { data: any[] }) {
  const getIcon = (iconName: string) => {
    const className = "w-8 h-8 md:w-10 md:h-10 text-accent";
    switch (iconName) {
      case "code": return <Code2 className={className} strokeWidth={1.5} />;
      case "layout": return <Layout className={className} strokeWidth={1.5} />;
      case "message-square": return <MessageSquare className={className} strokeWidth={1.5} />;
      case "monitor": return <Monitor className={className} strokeWidth={1.5} />;
      case "smartphone": return <Smartphone className={className} strokeWidth={1.5} />;
      case "server": return <Server className={className} strokeWidth={1.5} />;
      case "database": return <Database className={className} strokeWidth={1.5} />;
      case "cloud": return <Cloud className={className} strokeWidth={1.5} />;
      case "search": return <Search className={className} strokeWidth={1.5} />;
      case "trending-up": return <TrendingUp className={className} strokeWidth={1.5} />;
      case "bar-chart": return <BarChart className={className} strokeWidth={1.5} />;
      case "lightbulb": return <Lightbulb className={className} strokeWidth={1.5} />;
      case "shield": return <Shield className={className} strokeWidth={1.5} />;
      case "shopping-cart": return <ShoppingCart className={className} strokeWidth={1.5} />;
      case "terminal": return <Terminal className={className} strokeWidth={1.5} />;
      case "briefcase": return <Briefcase className={className} strokeWidth={1.5} />;
      case "globe": return <Globe className={className} strokeWidth={1.5} />;
      case "settings": return <Settings className={className} strokeWidth={1.5} />;
      case "pen-tool": return <PenTool className={className} strokeWidth={1.5} />;
      default: return <PenTool className={className} strokeWidth={1.5} />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold leading-tight text-primary max-w-2xl">
              Area Keahlian
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service, index) => (
            <ScrollReveal key={service.id} delay={0.1 * index} width="w-full">
              <div
                className="group bg-card rounded-none p-8 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Sharp icon container */}
                <div className="w-14 h-14 rounded-none bg-accent/10 flex items-center justify-center mb-6 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                  {/* We need to change icon color on hover using css group-hover */}
                  <div className="text-accent group-hover:text-white transition-colors duration-300 flex items-center justify-center w-full h-full">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                <h3 className="text-xl font-heading font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
