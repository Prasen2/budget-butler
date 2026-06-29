import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) return NextResponse.json([]);
    
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json([]);
  }
}
