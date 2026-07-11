import { getProfile } from "@/../lib/data";
import { updateProfileAction } from "./actions";

const R2_URL = "https://pub-bb3ad634e09444a1b3bcbe6d9cdef19e.r2.dev";

export const dynamic = 'force-dynamic';

export default async function AdminProfile() {
  const profile = await getProfile();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-mono text-accent-blue">Profil_Utama</h1>
        <p className="text-gray-400 mt-2">Perbarui informasi identitas yang tampil di halaman depan portofolio Anda.</p>
      </div>

      <form action={updateProfileAction} className="glass-panel p-8 space-y-6">
        <input type="hidden" name="old_avatar" value={profile?.avatar_path || ""} />
        <input type="hidden" name="old_cv" value={profile?.cv_pdf_path || ""} />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono">Nama Lengkap</label>
            <input type="text" name="name" defaultValue={profile?.name || ""} required className="w-full bg-[#0B0E14] border border-gray-700 rounded p-3 text-white focus:border-accent-blue focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono">Profesi (Pisahkan dengan koma)</label>
            <input type="text" name="profession" defaultValue={profile?.profession || ""} required className="w-full bg-[#0B0E14] border border-gray-700 rounded p-3 text-white focus:border-accent-blue focus:outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 font-mono">Bio Singkat</label>
          <textarea name="bio" defaultValue={profile?.bio || ""} required rows={4} className="w-full bg-[#0B0E14] border border-gray-700 rounded p-3 text-white focus:border-accent-blue focus:outline-none" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono">Email Utama</label>
            <input type="email" name="email" defaultValue={profile?.email || ""} required className="w-full bg-[#0B0E14] border border-gray-700 rounded p-3 text-white focus:border-accent-blue focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono">URL GitHub</label>
            <input type="url" name="github_url" defaultValue={profile?.github_url || ""} className="w-full bg-[#0B0E14] border border-gray-700 rounded p-3 text-white focus:border-accent-blue focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono">URL LinkedIn</label>
            <input type="url" name="linkedin_url" defaultValue={profile?.linkedin_url || ""} className="w-full bg-[#0B0E14] border border-gray-700 rounded p-3 text-white focus:border-accent-blue focus:outline-none" />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono block">Foto Profil Baru (Biarkan kosong jika tidak diubah)</label>
            <input type="file" name="avatar" accept="image/*" className="w-full bg-[#0B0E14] border border-gray-700 rounded p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
            {profile?.avatar_path && <p className="text-xs text-accent-blue mt-1">Saat ini: {profile.avatar_path}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-mono block">File CV Baru (PDF)</label>
            <input type="file" name="cv" accept=".pdf" className="w-full bg-[#0B0E14] border border-gray-700 rounded p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
            {profile?.cv_pdf_path && <p className="text-xs text-accent-blue mt-1">Saat ini: {profile.cv_pdf_path}</p>}
          </div>
        </div>

        <div className="pt-6 text-right">
          <button type="submit" className="bg-accent-blue text-black font-bold py-3 px-8 rounded hover:bg-white transition-colors">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
