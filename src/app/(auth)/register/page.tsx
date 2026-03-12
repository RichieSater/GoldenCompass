"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    // Auto-sign in after registration
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created but could not sign in. Please try logging in.");
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
          Begin Your Journey
        </h2>
        <p className="mb-8 text-center text-sm text-cream-muted">
          Create your Golden Compass account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream-muted">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-deep-black px-4 py-3 text-cream placeholder-cream-muted/40 outline-none transition-colors focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
              placeholder="Your name"
            />
          </div>

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
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream-muted">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-cream-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:text-gold-light transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
