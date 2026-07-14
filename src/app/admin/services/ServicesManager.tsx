"use client";

import { useState } from "react";
import { addService, updateService, deleteService } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Layout, Code2, MessageSquare, PenTool, Pencil, Trash2, Plus, X, AlertTriangle, Monitor, Smartphone, Server, Database, Cloud, Search, TrendingUp, BarChart, Lightbulb, Shield, ShoppingCart, Terminal, Briefcase, Globe, Settings } from "lucide-react";

export default function ServicesManager({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("code");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const resetForm = () => {
    setTitle(""); setDescription(""); setIconName("code");
    setIsEditing(false); setCurrentId(null);
    setShowForm(false);
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setDescription(item.description);
    setIconName(item.iconName);
    setCurrentId(item.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    setLoading(true);
    try {
      await deleteService(deleteConfirmId);
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
        await updateService(currentId, { title, description, iconName });
        setMessage("Berhasil memperbarui layanan!");
      } else {
        await addService({ title, description, iconName, orderIndex: Date.now() });
        setMessage("Berhasil menambahkan layanan!");
      }
      
      router.refresh();
      setTimeout(() => { resetForm(); setMessage(""); }, 1500);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getIconPreview = (name: string, className = "w-5 h-5") => {
    switch(name) {
      case "code": return <Code2 className={className} />;
      case "layout": return <Layout className={className} />;
      case "message-square": return <MessageSquare className={className} />;
      case "monitor": return <Monitor className={className} />;
      case "smartphone": return <Smartphone className={className} />;
      case "server": return <Server className={className} />;
      case "database": return <Database className={className} />;
      case "cloud": return <Cloud className={className} />;
      case "search": return <Search className={className} />;
      case "trending-up": return <TrendingUp className={className} />;
      case "bar-chart": return <BarChart className={className} />;
      case "lightbulb": return <Lightbulb className={className} />;
      case "shield": return <Shield className={className} />;
      case "shopping-cart": return <ShoppingCart className={className} />;
      case "terminal": return <Terminal className={className} />;
      case "briefcase": return <Briefcase className={className} />;
      case "globe": return <Globe className={className} />;
      case "settings": return <Settings className={className} />;
      case "pen-tool": return <PenTool className={className} />;
      default: return <PenTool className={className} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Layanan & Keahlian</h1>
          <p className="text-muted-foreground text-sm">Kelola nilai jual dan layanan yang Anda tawarkan ke klien.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 hover:brightness-110 transition-all font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Layanan
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
            <p className="text-muted-foreground mb-6 text-sm">Apakah Anda yakin ingin menghapus data layanan ini secara permanen?</p>
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
                {isEditing ? "Edit Layanan" : "Tambah Layanan Baru"}
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

              <form id="serviceForm" onSubmit={handleSubmit} className="space-y-6 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Judul Layanan</label>
                    <input 
                      type="text" value={title} onChange={e => setTitle(e.target.value)} required
                      className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pilih Ikon</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-accent">
                        {getIconPreview(iconName)}
                      </div>
                      <select 
                        value={iconName} onChange={e => setIconName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <optgroup label="Desain & Kreatif">
                          <option value="layout">Layout (UI/UX Design)</option>
                          <option value="pen-tool">Pen Tool (Desain Grafis / Ilustrasi)</option>
                          <option value="lightbulb">Lightbulb (Ideasi / Kreatif)</option>
                        </optgroup>
                        <optgroup label="Pengembangan Website & Aplikasi">
                          <option value="code">Code (Pemrograman Umum)</option>
                          <option value="monitor">Monitor (Web App / Desktop)</option>
                          <option value="smartphone">Smartphone (Mobile App)</option>
                          <option value="globe">Globe (Web Development)</option>
                        </optgroup>
                        <optgroup label="Backend & Infrastruktur">
                          <option value="server">Server (Backend / Hosting)</option>
                          <option value="database">Database (Manajemen Data)</option>
                          <option value="cloud">Cloud (Cloud Computing / AWS)</option>
                          <option value="terminal">Terminal (DevOps / CLI)</option>
                        </optgroup>
                        <optgroup label="Bisnis & Analitik">
                          <option value="message-square">Message (Konsultasi)</option>
                          <option value="bar-chart">Bar Chart (Data Science / Analitik)</option>
                          <option value="trending-up">Trending Up (SEO / Digital Marketing)</option>
                          <option value="search">Search (Riset / SEO)</option>
                          <option value="shopping-cart">Shopping Cart (E-Commerce)</option>
                          <option value="briefcase">Briefcase (Manajemen Proyek / Bisnis)</option>
                        </optgroup>
                        <optgroup label="Lainnya">
                          <option value="shield">Shield (Cybersecurity)</option>
                          <option value="settings">Settings (Maintenance / Support)</option>
                        </optgroup>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deskripsi Singkat</label>
                  <textarea 
                    value={description} onChange={e => setDescription(e.target.value)} required rows={4}
                    className="w-full px-4 py-3 bg-background border border-border/60 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-primary resize-none leading-relaxed"
                  />
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
                type="submit" form="serviceForm" disabled={loading}
                className="group relative px-8 py-3 bg-accent text-white font-medium hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Layanan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialData.map((item) => (
          <div key={item.id} className="bg-card border border-border/40 p-6 flex flex-col justify-between group hover:border-accent/50 transition-colors">
            <div>
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center text-accent mb-4">
                {getIconPreview(item.iconName, "w-5 h-5")}
              </div>
              <h3 className="font-heading font-semibold text-lg text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-4">{item.description}</p>
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
