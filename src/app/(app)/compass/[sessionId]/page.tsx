import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CompassEngine from "@/components/compass/CompassEngine";
import type { CompassAnswers } from "@/types/compass";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function CompassSessionPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { sessionId } = await params;

  const compassSession = await prisma.compassSession.findUnique({
    where: { id: sessionId, userId: session.user.id },
    include: { answers: true },
  });

  if (!compassSession) {
    redirect("/dashboard");
  }

  // Transform answers into nested record: { [screenId]: { [inputKey]: answer } }
  const answers: CompassAnswers = {};
  for (const a of compassSession.answers) {
    if (!answers[a.screenId]) answers[a.screenId] = {};
    answers[a.screenId][a.inputKey] = a.answer;
  }

  return (
    <CompassEngine
      sessionId={compassSession.id}
      initialScreen={compassSession.currentScreen}
      initialAnswers={answers}
    />
  );
}
