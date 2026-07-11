"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginAction(password);
    if (result.success) {
      router.push("/admin");
      router.refresh();
      return;
    }

    setError(result.error || "Gagal login");
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="glass-panel login-card admin-form">
        <div>
          <Lock size={28} color="var(--accent-red)" />
          <h1>Akses Admin</h1>
          <p>Masukkan master password untuk mengelola konten portofolio.</p>
        </div>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Master password"
            required
          />
        </label>

        {error && <p style={{ color: "#ff9aa3", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={loading} className="primary-btn">
          {loading ? "Memverifikasi..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
