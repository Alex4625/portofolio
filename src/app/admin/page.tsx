import { getSiteData, text } from "@/../lib/data";
import { toPublicUrl } from "@/../lib/r2";
import { requireAdmin } from "@/../lib/auth";
import { updateProfileAction } from "./actions";

function fileHint(path?: string) {
  if (!path) return null;
  return <a href={toPublicUrl(path)} target="_blank" rel="noopener" className="text-sm text-[var(--accent-blue)]">File saat ini</a>;
}

export default async function AdminDashboard() {
  await requireAdmin();
  const data = await getSiteData();
  const profile = data.profile;
  const statsJson = JSON.stringify(profile?.stats_json || [], null, 2);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p>Kelola identitas utama, kontak, statistik, dan ringkasan konten public.</p>
        </div>
        <a href="/" target="_blank" rel="noopener" className="ghost-btn">Lihat Website</a>
      </div>

      <section className="admin-grid">
        {[
          ["Services", data.services.length],
          ["Skills", data.skills.length],
          ["Projects", data.projects.length],
          ["Media", data.videos.length + data.galleries.length],
        ].map(([label, value]) => (
          <div className="glass-panel admin-card admin-stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <form action={updateProfileAction} className="glass-panel admin-card admin-form">
        <div className="admin-header">
          <div>
            <h1>Profil & Kontak</h1>
            <p>Data singleton yang dipakai hero, about, CTA, navbar, dan footer.</p>
          </div>
          <button type="submit" className="primary-btn">Simpan Profil</button>
        </div>

        {["avatar_path", "hero_image_path", "about_image_path", "cv_pdf_path"].map((key) => (
          <input key={key} type="hidden" name={`old_${key}`} value={text(profile, [key])} />
        ))}

        <div className="admin-form-grid">
          {[
            ["name", "Nama"],
            ["full_name", "Nama Lengkap"],
            ["profession", "Profesi"],
            ["hero_badge", "Badge Hero"],
            ["email", "Email"],
            ["phone", "Telepon"],
            ["whatsapp_url", "WhatsApp URL"],
            ["location", "Lokasi"],
            ["github_url", "GitHub URL"],
            ["linkedin_url", "LinkedIn URL"],
            ["instagram_url", "Instagram URL"],
          ].map(([name, label]) => (
            <label className="field" key={name}>
              <span>{label}</span>
              <input name={name} defaultValue={text(profile, [name])} />
            </label>
          ))}

          <label className="field full">
            <span>Bio Singkat</span>
            <textarea name="bio" defaultValue={text(profile, ["bio"])} />
          </label>
          <label className="field full">
            <span>About Text</span>
            <textarea name="about_text" defaultValue={text(profile, ["about_text"])} />
          </label>
          <label className="field full">
            <span>Stats JSON</span>
            <textarea name="stats_json" defaultValue={statsJson} />
          </label>

          {[
            ["avatar_path", "Avatar"],
            ["hero_image_path", "Hero Image"],
            ["about_image_path", "About Image"],
            ["cv_pdf_path", "CV PDF"],
          ].map(([name, label]) => (
            <label className="field" key={name}>
              <span>{label}</span>
              <input name={name} type="file" accept={name === "cv_pdf_path" ? ".pdf" : "image/*"} />
              {fileHint(text(profile, [name]))}
            </label>
          ))}
        </div>
      </form>
    </div>
  );
}
