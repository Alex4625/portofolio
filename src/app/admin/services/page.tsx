import { getServices } from "@/app/admin/actions";
import ServicesManager from "./ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const initialData = await getServices();

  return (
    <div className="max-w-5xl mx-auto">
      <ServicesManager initialData={initialData} />
    </div>
  );
}
