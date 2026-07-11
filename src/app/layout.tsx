import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Tino Lambut — Full Stack Developer & Cyber Security",
  description: "Portofolio profesional Tino Lambut. Full Stack Web Developer yang bersemangat dalam membangun aplikasi web modern dan responsif.",
  keywords: ["portofolio", "developer", "full stack", "cyber security", "web developer"],
  openGraph: {
    title: "Tino Lambut — Full Stack Developer",
    description: "Portofolio profesional Tino Lambut.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} ${inter.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
