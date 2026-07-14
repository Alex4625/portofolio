import { getSiteConfig } from "@/app/admin/actions";
import Footer from "./Footer";
import { PROFILE } from "@/lib/dummy-data";

export default async function FooterWrapper() {
  let siteConfig: any = PROFILE;
  
  try {
    const dbConfig = await getSiteConfig();
    if (dbConfig) {
      siteConfig = {
        ...dbConfig,
        contactEmail: dbConfig.contactEmail || "hello@example.com",
        whatsappNumber: dbConfig.whatsappNumber || "",
        githubUrl: dbConfig.githubUrl || ""
      };
    }
  } catch (err) {
    // Falback during build if DB is unavailable
  }

  return <Footer data={siteConfig} />;
}
