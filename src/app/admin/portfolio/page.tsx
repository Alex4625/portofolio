import { getPortfolios } from "@/app/admin/actions";
import PortfolioManager from "./PortfolioManager";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const initialData = await getPortfolios();

  return (
    <div className="max-w-5xl mx-auto">
      <PortfolioManager initialData={initialData} />
    </div>
  );
}
