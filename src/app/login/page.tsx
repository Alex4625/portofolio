"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh(); // Force refresh to apply middleware changes
      } else {
        setError(data.error || "Password salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border shadow-sm rounded-none">
        <h1 className="text-2xl font-heading font-bold text-primary mb-2 text-center">
          Area Terlarang
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Masukkan kata sandi admin untuk mengakses dasbor.
        </p>

        {error && (
          <div className="mb-6 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 text-center rounded-none">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors rounded-none pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-accent text-white font-medium hover:brightness-110 transition-all rounded-none disabled:opacity-70 flex justify-center min-h-[44px]"
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
            &larr; Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}
