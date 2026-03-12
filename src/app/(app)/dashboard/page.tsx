"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SessionItem {
  id: string;
  title: string;
  status: string;
  currentScreen: number;
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
  _count: { answers: number };
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/compass/sessions")
      .then((r) => r.json())
      .then((d) => {
        setSessions(d.sessions || []);
        setLoading(false);
      });
  }, []);

  async function createSession() {
    setCreating(true);
    const res = await fetch("/api/compass/sessions", { method: "POST" });
    const data = await res.json();
    if (data.session) {
      router.push(`/compass/${data.session.id}`);
    }
    setCreating(false);
  }

  const inProgress = sessions.filter((s) => s.status === "in_progress");
  const completed = sessions.filter((s) => s.status === "completed");

  return (
    <div className="min-h-screen bg-deep-black px-4 py-8">
      <header className="mx-auto flex max-w-4xl items-center justify-between">
        <Link href="/dashboard">
          <h1 className="font-serif text-lg font-bold text-cream">
            THE GOLDEN <span className="text-gold">COMPASS</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-cream-muted">
            {session?.user?.name || session?.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-cream-muted transition-colors hover:text-cream"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto mt-12 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl text-cream">Your Compasses</h2>
          <button
            onClick={createSession}
            disabled={creating}
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-deep-black transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] disabled:opacity-50"
          >
            {creating ? "Creating..." : "New Compass"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-charcoal/30 py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30">
              <div className="h-8 w-8 rounded-full border-2 border-gold/50" />
            </div>
            <p className="mb-6 text-cream-muted">
              You haven&apos;t started a compass yet.
            </p>
            <button
              onClick={createSession}
              disabled={creating}
              className="rounded-full bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-wider text-deep-black transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] disabled:opacity-50"
            >
              Begin Your Golden Compass
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {inProgress.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-cream-muted">
                  In Progress
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {inProgress.map((s) => (
                    <SessionCard key={s.id} session={s} />
                  ))}
                </div>
              </div>
            )}
            {completed.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-cream-muted">
                  Completed
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {completed.map((s) => (
                    <SessionCard key={s.id} session={s} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function SessionCard({ session: s }: { session: SessionItem }) {
  const isCompleted = s.status === "completed";
  const date = new Date(s.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group rounded-xl border border-white/5 bg-charcoal/30 p-6 transition-all hover:border-gold/20 hover:bg-charcoal/50">
      <Link href={`/compass/${s.id}`}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-serif text-lg text-cream">{s.title}</h4>
            <p className="mt-1 text-sm text-cream-muted">Last updated {date}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isCompleted
                ? "bg-gold/10 text-gold"
                : "bg-white/5 text-cream-muted"
            }`}
          >
            {isCompleted ? "Completed" : "In Progress"}
          </span>
        </div>

        {!isCompleted && (
          <div className="mt-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gold/60 transition-all"
                style={{ width: `${Math.max(2, (s._count.answers / 84) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-cream-muted">
              {s._count.answers} answers saved
            </p>
          </div>
        )}

        <div className="mt-4 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
          {isCompleted ? "View Compass →" : "Continue →"}
        </div>
      </Link>

      {isCompleted && (
        <a
          href={`/api/compass/${s.id}/pdf`}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gold/20 px-4 py-2 text-xs font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/5"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download PDF
        </a>
      )}
    </div>
  );
}
