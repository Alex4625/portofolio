"use client";

import { useState } from "react";
import { upsertSiteConfig } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [about, setAbout] = useState(initialData?.about || "");
  const [contactEmail, setContactEmail] = useState(initialData?.contactEmail || "");
  const [whatsappNumber, setWhatsappNumber] = useState(initialData?.whatsappNumber || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [instagramUrl, setInstagramUrl] = useState(initialData?.instagramUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(initialData?.linkedinUrl || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");
  
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
        contactEmail,
        whatsappNumber,
        githubUrl,
        instagramUrl,
        linkedinUrl,
        youtubeUrl,
        statsJson: initialData?.statsJson || "[]"
      });
      
      setMessage(`Berhasil menyimpan data profil!`);
      setFile(null);
      router.refresh();
      setTimeout(() => { setMessage(""); }, 3000);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border/50 p-6 md:p-10 shadow-sm">
      <div className="flex items-center gap-6 mb-8 border-b border-border/20 pb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent/20 flex-shrink-0">
          <img src={initialData?.avatarUrl || "https://via.placeholder.com/150"} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-1">Pengaturan Profil Utama</h2>
          <p className="text-muted-foreground text-sm">Sesuaikan identitas, biografi, dan kontak yang akan tampil di seluruh website.</p>
        </div>
      </div>

      {message && (
        <div className="mb-8 p-4 bg-accent/10 border border-accent/20 text-accent flex items-center gap-3">
          {message.includes("Berhasil") ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <form id="profileForm" onSubmit={handleSubmit} className="space-y-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Kontak</label>
            <input 
              type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nomor WhatsApp (Cth: 6281...)</label>
            <input 
              type="text" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t border-border/20">
          <h3 className="text-sm font-bold text-primary mb-4">Tautan Sosial Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL GitHub</label>
              <input 
                type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="https://github.com/username"
                className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL LinkedIn</label>
              <input 
                type="url" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL Instagram</label>
              <input 
                type="url" value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/username"
                className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL YouTube</label>
              <input 
                type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/@username"
                className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/20">
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

        <div className="space-y-2 pt-4 border-t border-border/20">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Biografi Singkat</label>
          <textarea 
            value={about} onChange={e => setAbout(e.target.value)} required rows={5}
            className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary resize-none leading-relaxed"
          />
        </div>

        <div className="pt-6 flex justify-end">
          <button 
            type="submit" disabled={loading}
            className="group relative px-8 py-4 bg-accent text-white font-bold hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
