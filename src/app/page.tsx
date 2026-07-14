import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import GallerySection from "@/components/GallerySection";

import { getSiteConfig, getEducations, getServices, getPortfolios, getGalleries } from "@/app/admin/actions";
import { PROFILE, EDUCATIONS, SERVICES, PORTFOLIOS, GALLERIES } from "@/lib/dummy-data";

export const dynamic = "force-dynamic";

// Fallback logic so the page doesn't crash during 'next dev' when Cloudflare context is missing
export default async function Home() {
  let siteConfig: any = PROFILE;
  let educations: any = EDUCATIONS;
  let services: any = SERVICES;
  let portfolios: any = PORTFOLIOS;
  let galleries: any = GALLERIES;

  try {
    const dbConfig = await getSiteConfig();
    if (dbConfig) {
      siteConfig = {
        name: dbConfig.fullName,
        role: dbConfig.role,
        about: dbConfig.about,
        avatar: dbConfig.avatarUrl || PROFILE.avatarUrl,
        stats: JSON.parse(dbConfig.statsJson || "[]")
      };
    }
    
    const dbEducations = await getEducations();
    if (dbEducations.length > 0) educations = dbEducations;
    
    const dbServices = await getServices();
    if (dbServices.length > 0) services = dbServices;

    const dbPortfolios = await getPortfolios();
    if (dbPortfolios.length > 0) {
      portfolios = dbPortfolios.map(p => ({
        ...p,
        techStack: JSON.parse(p.techStackJson || "[]"),
        image: p.mediaUrl
      }));
    }

    const dbGalleries = await getGalleries();
    if (dbGalleries.length > 0) {
      galleries = dbGalleries.map(g => ({
        ...g,
        url: g.imageUrl
      }));
    }
  } catch (err) {
    console.log("Using dummy data because DB is not reachable in this runtime.");
  }

  return (
    <main>
      <HeroSection data={siteConfig} />
      <AboutSection data={siteConfig} />
      <ResumeSection data={educations} />
      <ServicesSection data={services} />
      <PortfolioSection data={portfolios} />
      <GallerySection data={galleries} />
    </main>
  );
}
