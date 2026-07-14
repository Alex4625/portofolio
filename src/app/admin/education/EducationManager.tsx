"use client";

import { useState } from "react";
import { addEducation, updateEducation, deleteEducation } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, GraduationCap, Building, Calendar, Text, Pencil, Trash2, Plus, X, AlertTriangle } from "lucide-react";

export default function EducationManager({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const resetForm = () => {
    setDegree(""); setSchool(""); setYear(""); setDescription(""); setOrderIndex(0);
    setIsEditing(false); setCurrentId(null);
    setShowForm(false);
  };

  const handleEdit = (item: any) => {
    setDegree(item.degree);
    setSchool(item.school);
    setYear(item.year);
    setDescription(item.description);
    setOrderIndex(item.orderIndex || 0);
    setCurrentId(item.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    setLoading(true);
    try {
      await deleteEducation(deleteConfirmId);
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
    setLoading(true);
    setMessage("");

    try {
      if (isEditing && currentId) {
        await updateEducation(currentId, { degree, school, year, description, orderIndex: Number(orderIndex) });
        setMessage("Berhasil memperbarui data edukasi!");
      } else {
        await addEducation({ degree, school, year, description, orderIndex: Number(orderIndex) });
        setMessage("Berhasil menambahkan data edukasi!");
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
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Riwayat Edukasi</h1>
          <p className="text-muted-foreground text-sm">Kelola rekam jejak akademis atau sertifikasi profesional Anda.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 hover:brightness-110 transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Baru
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
            <p className="text-muted-foreground mb-6 text-sm">Apakah Anda yakin ingin menghapus data ini secara permanen?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirmId(null)} disabled={loading} className="px-4 py-2 bg-muted text-secondary hover:bg-muted/80 font-medium">Batal</button>
              <button onClick={executeDelete} disabled={loading} className="px-4 py-2 bg-destructive text-white hover:brightness-110 font-medium flex items-center">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Ya, Hapus Data"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 md:px-10 md:pt-8 md:pb-6 border-b border-border/20 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-heading font-bold text-primary">
                {isEditing ? "Edit Edukasi" : "Tambah Edukasi Baru"}
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

              <form id="educationForm" onSubmit={handleSubmit} className="space-y-6 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tingkat Pendidikan / Gelar</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <GraduationCap className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <input 
                        type="text" value={degree} onChange={e => setDegree(e.target.value)} required
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Institusi</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <input 
                        type="text" value={school} onChange={e => setSchool(e.target.value)} required
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Periode Waktu</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <input 
                        type="text" value={year} onChange={e => setYear(e.target.value)} required
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Urutan Tampil (Order Index)</label>
                    <div className="relative">
                      <input 
                        type="number" value={orderIndex} onChange={e => setOrderIndex(parseInt(e.target.value) || 0)} required
                        placeholder="1, 2, 3..."
                        className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deskripsi Pencapaian</label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <Text className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    <textarea 
                      value={description} onChange={e => setDescription(e.target.value)} required rows={4}
                      className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary resize-none leading-relaxed"
                    />
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
                type="submit" form="educationForm" disabled={loading}
                className="group relative px-8 py-3 bg-accent text-white font-medium hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Edukasi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialData.map((item) => (
          <div key={item.id} className="bg-card border border-border/40 p-6 flex flex-col justify-between group hover:border-accent/50 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-none bg-accent text-white flex items-center justify-center text-xs font-bold">{item.orderIndex}</span>
                  <h3 className="font-heading font-semibold text-lg text-primary">{item.degree}</h3>
                </div>
                <span className="text-xs font-medium bg-muted text-secondary px-2 py-1 uppercase tracking-wider">{item.year}</span>
              </div>
              <h4 className="text-sm font-medium text-accent mb-4 ml-8">{item.school}</h4>
              <p className="text-sm text-muted-foreground line-clamp-3 ml-8">{item.description}</p>
            </div>
            
            <div className="flex gap-2 mt-6 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => setDeleteConfirmId(item.id)} className="flex items-center gap-1.5 text-xs font-medium text-destructive hover:text-destructive/80 transition-colors ml-auto">
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
