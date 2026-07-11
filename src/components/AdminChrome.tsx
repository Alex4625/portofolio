"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Award,
  Briefcase,
  Code,
  Film,
  FolderKanban,
  GalleryHorizontal,
  LayoutDashboard,
  ListChecks,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: ListChecks },
  { href: "/admin/skills", label: "Skills", icon: Code },
  { href: "/admin/experiences", label: "Experience", icon: Briefcase },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/videos", label: "Videos", icon: Film },
  { href: "/admin/galleries", label: "Gallery", icon: GalleryHorizontal },
];

export default function AdminChrome({
  children,
  logoutAction,
}: {
  children: ReactNode;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <User size={22} />
          Tino CMS
        </Link>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.href}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form action={logoutAction}>
          <button type="submit" className="admin-logout">
            <LogOut size={18} />
            Logout
          </button>
        </form>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
