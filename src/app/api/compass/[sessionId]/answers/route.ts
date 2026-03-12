import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await params;

  // Verify ownership
  const compassSession = await prisma.compassSession.findUnique({
    where: { id: sessionId, userId: session.user.id },
  });

  if (!compassSession) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const { answers } = body as {
    answers: { screenId: string; inputKey: string; answer: string }[];
  };

  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: "Missing answers array" }, { status: 400 });
  }

  // Upsert each answer
  const ops = answers.map(({ screenId, inputKey, answer }) =>
    prisma.compassAnswer.upsert({
      where: {
        sessionId_screenId_inputKey: {
          sessionId,
          screenId,
          inputKey,
        },
      },
      update: { answer },
      create: { sessionId, screenId, inputKey, answer },
    })
  );

  await prisma.$transaction(ops);

  return NextResponse.json({ ok: true });
}
