import AdminChrome from "@/components/AdminChrome";
import { logoutAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminChrome logoutAction={logoutAction}>{children}</AdminChrome>;
}
