"use client";

import { useState } from "react";
import { addPortfolio, updatePortfolio, deletePortfolio } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Image as ImageIcon, Link as LinkIcon, Code2, Text, Pencil, Trash2, Plus, ExternalLink, X, AlertTriangle } from "lucide-react";

export default function PortfolioManager({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmMediaUrl, setDeleteConfirmMediaUrl] = useState<string | null>(null);

  const resetForm = () => {
    setTitle(""); setDescription(""); setTechStack(""); setProjectUrl(""); setMediaUrl(""); setFile(null);
    setIsEditing(false); setCurrentId(null);
    setShowForm(false);
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setDescription(item.description);
    try {
      const parsedTech = JSON.parse(item.techStackJson);
      setTechStack(Array.isArray(parsedTech) ? parsedTech.join(", ") : "");
    } catch (e) { setTechStack(""); }
    
    setProjectUrl(item.projectUrl || "");
    setMediaUrl(item.mediaUrl);
    setCurrentId(item.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    setLoading(true);
    try {
      // Delete image from R2 first
      if (deleteConfirmMediaUrl) {
        await fetch(`/api/upload?url=${encodeURIComponent(deleteConfirmMediaUrl)}`, { method: "DELETE" });
      }
      // Delete from D1
      await deletePortfolio(deleteConfirmId);
      router.refresh();
      setDeleteConfirmId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !isEditing) {
      setMessage("Harap pilih gambar terlebih dahulu.");
      return;
    }

    setLoading(true);
    setMessage(file ? "Mengunggah gambar baru..." : "Menyimpan data...");

    try {
      let finalMediaUrl = mediaUrl;

      if (file) {
        // Delete old image if updating
        if (isEditing && mediaUrl) {
          setMessage("Membersihkan gambar lama dari storage...");
          await fetch(`/api/upload?url=${encodeURIComponent(mediaUrl)}`, { method: "DELETE" });
        }

        setMessage("Mengunggah gambar ke R2...");
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) throw new Error(uploadData.error || "Gagal mengunggah file");
        finalMediaUrl = uploadData.url;
      }

      const payload = {
        title, description, mediaUrl: finalMediaUrl, projectUrl: projectUrl.trim() || undefined,
        isVideo: false, techStackJson: JSON.stringify(techStack.split(",").map(t => t.trim())), orderIndex: Date.now()
      };

      if (isEditing && currentId) {
        await updatePortfolio(currentId, payload);
        setMessage("Berhasil memperbarui proyek!");
      } else {
        await addPortfolio(payload);
        setMessage("Berhasil menyimpan proyek!");
      }
      
      router.refresh();
      setTimeout(() => { resetForm(); setMessage(""); }, 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Manajemen Portfolio</h1>
          <p className="text-muted-foreground text-sm">Kelola mahakarya yang tampil di galeri portofolio Anda.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 hover:brightness-110 transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Proyek
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 shadow-2xl p-6 max-w-md w-full animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 text-destructive mb-4">
              <div className="p-3 bg-destructive/10 rounded-full"><AlertTriangle className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-primary">Konfirmasi Hapus</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">Apakah Anda yakin ingin menghapus proyek ini? Gambar terkait juga akan dihapus secara permanen dari Storage (R2).</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirmId(null)} disabled={loading} className="px-4 py-2 bg-muted text-secondary hover:bg-muted/80 font-medium">Batal</button>
              <button onClick={executeDelete} disabled={loading} className="px-4 py-2 bg-destructive text-white hover:brightness-110 font-medium flex items-center">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Ya, Hapus Permanen"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 md:px-10 md:pt-8 md:pb-6 border-b border-border/20 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-heading font-bold text-primary">
                {isEditing ? "Edit Proyek Portfolio" : "Tambah Proyek Baru"}
              </h2>
              <button 
                onClick={resetForm}
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

              <form id="portfolioForm" onSubmit={handleSubmit} className="space-y-6 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Judul Proyek</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Text className="w-4 h-4 text-muted-foreground/50" />
                        </div>
                        <input 
                          type="text" value={title} onChange={e => setTitle(e.target.value)} required
                          className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tech Stack (Koma)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Code2 className="w-4 h-4 text-muted-foreground/50" />
                        </div>
                        <input 
                          type="text" value={techStack} onChange={e => setTechStack(e.target.value)} required
                          className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL Proyek</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <LinkIcon className="w-4 h-4 text-muted-foreground/50" />
                        </div>
                        <input 
                          type="url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 flex flex-col">
                    <div className="space-y-2 flex-grow flex flex-col">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deskripsi</label>
                      <textarea 
                        value={description} onChange={e => setDescription(e.target.value)} required
                        className="w-full flex-grow min-h-[140px] px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Thumbnail</label>
                      {isEditing && mediaUrl && (
                        <div className="mb-3">
                          <img src={mediaUrl} alt="Thumbnail Saat ini" className="w-full h-24 object-cover border border-border/50" />
                        </div>
                      )}
                      <div className="relative border border-border/60 bg-background focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all p-1 flex items-center">
                        <div className="pl-3 pr-2">
                          <ImageIcon className="w-4 h-4 text-muted-foreground/50" />
                        </div>
                        <input 
                          type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required={!isEditing}
                          className="w-full text-sm text-primary file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-white file:cursor-pointer hover:file:brightness-110 outline-none cursor-pointer"
                        />
                      </div>
                      {isEditing && <p className="text-[11px] text-muted-foreground mt-1">Mengunggah gambar baru otomatis menghapus gambar lama di storage.</p>}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 md:px-10 border-t border-border/20 bg-muted/10 shrink-0 flex justify-end gap-3">
              <button 
                type="button" onClick={resetForm} disabled={loading}
                className="px-6 py-3 bg-background text-secondary font-medium hover:bg-muted transition-all border border-border/50 disabled:opacity-70"
              >
                Batal
              </button>
              <button 
                type="submit" form="portfolioForm" disabled={loading}
                className="group relative px-8 py-3 bg-accent text-white font-medium hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Proyek"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialData.map((item) => (
          <div key={item.id} className="bg-card border border-border/40 overflow-hidden group hover:border-accent/50 transition-colors flex flex-col">
            <div className="h-48 w-full bg-muted relative overflow-hidden border-b border-border/40">
              <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-heading font-semibold text-xl text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.description}</p>
              
              <div className="mt-auto pt-4 border-t border-border/30 flex justify-between items-center">
                {item.projectUrl && (
                  <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> Link Proyek
                  </a>
                )}
                
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => { setDeleteConfirmId(item.id); setDeleteConfirmMediaUrl(item.mediaUrl); }} className="flex items-center gap-1.5 text-xs font-medium text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
