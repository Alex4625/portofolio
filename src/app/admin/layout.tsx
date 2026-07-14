"use client";

import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { name: "Profil (Hero/About)", path: "/admin/profile" },
    { name: "Edukasi (Resume)", path: "/admin/education" },
    { name: "Layanan (Services)", path: "/admin/services" },
    { name: "Portofolio", path: "/admin/portfolio" },
    { name: "Galeri Foto", path: "/admin/gallery" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-primary">Admin CMS</h2>
          <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">Manajemen Konten</p>
        </div>
        
        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`px-4 py-3 whitespace-nowrap md:whitespace-normal rounded-none text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "bg-accent/10 text-accent border-b-2 md:border-b-0 md:border-l-2 border-accent"
                  : "text-secondary hover:bg-muted hover:text-primary"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-border hidden md:block">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-sm font-medium text-destructive bg-destructive/5 hover:bg-destructive/10 transition-colors rounded-none"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/30">
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
