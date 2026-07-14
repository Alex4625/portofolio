import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

import { getSiteConfig } from "@/app/admin/actions";
import { PROFILE } from "@/lib/dummy-data";

export async function generateMetadata(): Promise<Metadata> {
  let config = null;
  try {
    config = await getSiteConfig();
  } catch (e) {
    // getSiteConfig will fail during prerendering because getCloudflareContext is not available
    console.warn("Failed to load site config for metadata", e);
  }
  const name = config?.fullName || PROFILE.fullName;
  const role = config?.role || PROFILE.role;
  const about = config?.about || PROFILE.about;
  const avatar = config?.avatarUrl || PROFILE.avatarUrl;

  return {
    title: `${name} — ${role}`,
    description: about,
    keywords: ["portofolio", "developer", "freelancer", "software engineer", name],
    openGraph: {
      title: `${name} — ${role}`,
      description: about,
      url: "https://portofolio.tinolambut.workers.dev",
      siteName: `${name} Portfolio`,
      images: [
        {
          url: avatar,
          width: 800,
          height: 600,
          alt: `${name} Profile`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${role}`,
      description: about,
      images: [avatar],
    },
  };
}

import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${openSans.variable}`}>
        <Navbar />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
