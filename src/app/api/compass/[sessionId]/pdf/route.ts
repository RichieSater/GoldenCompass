import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import CompassPDF from "@/components/pdf/CompassPDF";
import type { CompassAnswers } from "@/types/compass";
import { createElement, type ReactElement } from "react";

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
    include: { answers: true, user: true },
  });

  if (!compassSession) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Transform answers
  const answers: CompassAnswers = {};
  for (const a of compassSession.answers) {
    if (!answers[a.screenId]) answers[a.screenId] = {};
    answers[a.screenId][a.inputKey] = a.answer;
  }

  const userName = compassSession.user.name || "Golden Compass User";
  const completedDate = (
    compassSession.completedAt || new Date()
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = createElement(CompassPDF, { userName, completedDate, answers }) as ReactElement<any>;
  const buffer = await renderToBuffer(element);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="golden-compass-${sessionId.slice(0, 8)}.pdf"`,
    },
  });
}
