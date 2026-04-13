"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSession } from "@/lib/storage";
import CompassEngine from "@/components/compass/CompassEngine";
import type { CompassSessionData } from "@/types/compass";

export default function CompassSessionPage() {
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<CompassSessionData | null | undefined>(
    undefined
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const data = getSession(params.sessionId);
      if (!data) {
        router.replace("/dashboard");
        setSession(null);
        return;
      }

      setSession(data);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [params.sessionId, router]);

  if (session === undefined || session === null) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center bg-deep-black">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          <p className="font-serif text-lg text-cream-muted">
            Loading your compass...
          </p>
        </div>
      </div>
    );
  }

  return (
    <CompassEngine
      sessionId={session.id}
      initialScreen={session.currentScreen}
      initialAnswers={session.answers}
    />
  );
}
