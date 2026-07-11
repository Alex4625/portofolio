import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Portofolio | Cyber & Cloud Engineer",
  description: "Portofolio profesional dengan Next.js dan Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${firaCode.variable} antialiased selection:bg-accent-blue selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
