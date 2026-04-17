"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Admin</p>
        <h1 className="mb-6 text-2xl font-black text-gray-900" style={{ letterSpacing: "-0.03em" }}>
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-1.5 block text-xs font-semibold text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400"
            placeholder="Enter admin password"
          />
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#0a1f14,#22764a)" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
