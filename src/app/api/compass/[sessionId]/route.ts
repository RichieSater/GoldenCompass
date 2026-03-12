import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await params;

  const compassSession = await prisma.compassSession.findUnique({
    where: { id: sessionId, userId: session.user.id },
    include: { answers: true },
  });

  if (!compassSession) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Transform answers into a nested record: { [screenId]: { [inputKey]: answer } }
  const answers: Record<string, Record<string, string>> = {};
  for (const a of compassSession.answers) {
    if (!answers[a.screenId]) answers[a.screenId] = {};
    answers[a.screenId][a.inputKey] = a.answer;
  }

  return NextResponse.json({
    session: {
      id: compassSession.id,
      title: compassSession.title,
      status: compassSession.status,
      currentScreen: compassSession.currentScreen,
      createdAt: compassSession.startedAt.toISOString(),
      updatedAt: compassSession.updatedAt.toISOString(),
      completedAt: compassSession.completedAt?.toISOString() ?? null,
    },
    answers,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await params;
  const body = await req.json();

  const compassSession = await prisma.compassSession.findUnique({
    where: { id: sessionId, userId: session.user.id },
  });

  if (!compassSession) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.compassSession.update({
    where: { id: sessionId },
    data: {
      currentScreen: body.currentScreen ?? compassSession.currentScreen,
      currentStep: body.currentStep ?? compassSession.currentStep,
    },
  });

  return NextResponse.json({ session: updated });
}
