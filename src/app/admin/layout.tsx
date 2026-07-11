import { logoutAction } from "./actions";
import Link from "next/link";
import { User, Briefcase, LogOut, Code, Award, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#151A22] border-r border-gray-800 p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="mb-10 flex items-center gap-2 text-accent-blue">
          <LayoutDashboard size={24} />
          <h2 className="text-2xl font-bold font-mono">Control_Panel</h2>
        </div>
        
        <nav className="flex-1 space-y-2 font-mono">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <User size={18} /> Profil Utama
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Briefcase size={18} /> Arsip Proyek
          </Link>
          <div className="px-4 py-3 text-gray-600 text-sm flex items-center gap-3">
            <Code size={18} /> Keahlian (Akan Datang)
          </div>
          <div className="px-4 py-3 text-gray-600 text-sm flex items-center gap-3">
            <Award size={18} /> Pengalaman (Akan Datang)
          </div>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-800">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 transition-colors font-mono text-left">
              <LogOut size={18} /> Putus Koneksi
            </button>
          </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
