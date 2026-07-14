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

export const metadata: Metadata = {
  title: "Alexander Noventino Lambut — Mahasiswa Informatika & Aspiring Developer",
  description: "Portofolio Alexander Noventino Lambut. Mahasiswa Informatika yang antusias membangun aplikasi web modern dan responsif.",
  keywords: ["portofolio", "mahasiswa", "informatika", "web developer", "next.js"],
  openGraph: {
    title: "Alexander Noventino Lambut — Mahasiswa Informatika",
    description: "Portofolio Alexander Noventino Lambut.",
    type: "website",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
