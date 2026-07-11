"use client";

import { useState } from "react";
import { loginAction } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await loginAction(password);
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Gagal login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-mono text-accent-blue">Akses_Terbatas</h1>
          <p className="text-gray-400 mt-2">Masukkan Master Password</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#151A22] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors font-mono"
              placeholder="••••••••••••"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-blue hover:bg-white text-black font-bold py-3 rounded-lg transition-all"
          >
            {loading ? "Memverifikasi..." : "Inisiasi Akses"}
          </button>
        </form>
      </div>
    </div>
  );
}
