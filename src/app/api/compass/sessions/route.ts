import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = await prisma.compassSession.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { answers: true } },
    },
  });

  return NextResponse.json({ sessions });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const title = `Golden Compass — ${now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  const compassSession = await prisma.compassSession.create({
    data: {
      userId: session.user.id,
      title,
    },
  });

  return NextResponse.json({ session: compassSession }, { status: 201 });
}
