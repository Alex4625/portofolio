import { getAnalyticsData, getPortfolios } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const analyticsData = await getAnalyticsData();
  const portfoliosData = await getPortfolios();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Dasbor Analitik</h1>
        <p className="text-muted-foreground">Pantau lalu lintas dan interaksi pengunjung di portofolio Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Pengunjung</h3>
          <p className="text-4xl font-heading font-bold text-accent">{analyticsData.pageViews}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">Proyek Terpopuler</h2>
        <div className="bg-card border border-border shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-secondary uppercase tracking-wider font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Nama Proyek</th>
                <th className="px-6 py-4 text-center">Jumlah Klik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {analyticsData.portfolioClicks.length > 0 ? (
                analyticsData.portfolioClicks.map((stat, idx) => {
                  const p = portfoliosData.find(x => x.id === stat.portfolioId);
                  return (
                    <tr key={idx} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary">{p?.title || "Proyek Dihapus"}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-bold">
                          {stat.count}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                    Belum ada data klik portofolio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
