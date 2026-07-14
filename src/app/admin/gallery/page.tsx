import { getGalleries } from "@/app/admin/actions";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const initialData = await getGalleries();

  return (
    <div className="max-w-5xl mx-auto">
      <GalleryManager initialData={initialData} />
    </div>
  );
}
