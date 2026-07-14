import { getSiteConfig } from "@/app/admin/actions";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const initialData = await getSiteConfig();

  return (
    <div className="max-w-4xl animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Profil Utama</h1>
        <p className="text-muted-foreground text-sm">Sesuaikan identitas yang akan ditampilkan pada halaman depan portofolio Anda.</p>
      </div>

      <ProfileForm initialData={initialData} />
    </div>
  );
}
