import { getEducations } from "@/app/admin/actions";
import EducationManager from "./EducationManager";

export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const initialData = await getEducations();

  return (
    <div className="max-w-5xl mx-auto">
      <EducationManager initialData={initialData} />
    </div>
  );
}
