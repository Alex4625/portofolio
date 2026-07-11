import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

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
      <body className={`${plusJakarta.variable} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
