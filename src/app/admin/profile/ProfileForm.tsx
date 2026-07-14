"use client";

import { useState } from "react";
import { upsertSiteConfig } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Image as ImageIcon, Pencil, X } from "lucide-react";

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [about, setAbout] = useState(initialData?.about || "");
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let finalAvatarUrl = initialData?.avatarUrl || "";

      if (file) {
        // 1. Delete old avatar if exists
        if (initialData?.avatarUrl) {
          setMessage("Menghapus foto lama...");
          await fetch(`/api/upload?url=${encodeURIComponent(initialData.avatarUrl)}`, { method: "DELETE" });
        }

        // 2. Upload new avatar
        setMessage("Mengunggah foto profil baru...");
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || "Gagal mengunggah file");
        }
        finalAvatarUrl = uploadData.url;
      }

      setMessage("Menyimpan profil...");
      await upsertSiteConfig({
        fullName, 
        role, 
        about, 
        avatarUrl: finalAvatarUrl, 
        statsJson: initialData?.statsJson || "[]"
      });
      
      setMessage(`Berhasil menyimpan data profil!`);
      setFile(null);
      router.refresh();
      setTimeout(() => { setShowForm(false); setMessage(""); }, 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Profil Preview Card */}
      <div className="bg-card border border-border/50 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent/20 flex-shrink-0">
          <img src={initialData?.avatarUrl || "https://via.placeholder.com/150"} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold text-primary mb-1">{initialData?.fullName || "Belum ada nama"}</h2>
          <p className="text-accent font-medium mb-4">{initialData?.role || "Belum ada profesi"}</p>
          <p className="text-muted-foreground text-sm max-w-2xl">{initialData?.about || "Belum ada biografi"}</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-white hover:brightness-110 transition-all text-sm font-medium whitespace-nowrap"
        >
          <Pencil className="w-4 h-4" /> Edit Profil
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 md:px-10 md:pt-8 md:pb-6 border-b border-border/20 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-heading font-bold text-primary">Edit Profil</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors bg-muted/50 rounded-full shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 overflow-y-auto">
              {message && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/20 text-accent flex items-center gap-3">
                  {message.includes("Berhasil") ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}

              <form id="profileForm" onSubmit={handleSubmit} className="space-y-6 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nama Lengkap</label>
                    <input 
                      type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                      className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profesi / Peran</label>
                    <input 
                      type="text" value={role} onChange={e => setRole(e.target.value)} required
                      className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ganti Foto Profil</label>
                  <div className="relative border border-border/60 bg-background focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all p-2 flex items-center">
                    <div className="pl-2 pr-3">
                      <ImageIcon className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                    <input 
                      type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)}
                      className="w-full text-sm text-primary file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-white file:cursor-pointer hover:file:brightness-110 outline-none cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Foto lama akan otomatis dihapus dari database untuk menghemat storage saat Anda mengunggah yang baru.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Biografi Singkat</label>
                  <textarea 
                    value={about} onChange={e => setAbout(e.target.value)} required rows={4}
                    className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary resize-none leading-relaxed"
                  />
                </div>
              </form>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 md:px-10 border-t border-border/20 bg-muted/10 shrink-0 flex justify-end gap-3">
              <button 
                type="button" onClick={() => setShowForm(false)} disabled={loading}
                className="px-6 py-3 bg-background text-secondary font-medium hover:bg-muted transition-all border border-border/50 disabled:opacity-70"
              >
                Batal
              </button>
              <button 
                type="submit" form="profileForm" disabled={loading}
                className="group relative px-8 py-3 bg-accent text-white font-medium hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
