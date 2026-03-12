"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-center">
      <Link href="/" className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-cream">
          THE GOLDEN <span className="text-gold">COMPASS</span>
        </h1>
      </Link>

      <div className="w-full rounded-2xl border border-white/5 bg-charcoal/50 p-8 backdrop-blur-sm">
        <h2 className="mb-1 text-center font-serif text-xl text-cream">
          Welcome Back
        </h2>
        <p className="mb-8 text-center text-sm text-cream-muted">
          Continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-deep-black px-4 py-3 text-cream placeholder-cream-muted/40 outline-none transition-colors focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-deep-black px-4 py-3 text-cream placeholder-cream-muted/40 outline-none transition-colors focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold py-3 text-sm font-semibold uppercase tracking-wider text-deep-black transition-all hover:bg-gold-light disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true" && (
          <>
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-cream-muted">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full rounded-lg border border-white/10 py-3 text-sm font-medium text-cream transition-colors hover:border-white/20 hover:bg-white/5"
            >
              Continue with Google
            </button>
          </>
        )}
      </div>

      <p className="mt-6 text-sm text-cream-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-gold hover:text-gold-light transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}
