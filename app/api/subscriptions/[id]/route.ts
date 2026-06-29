import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await prisma.subscription.delete({ where: { id: resolvedParams.id } });
  return NextResponse.json({ success: true });
}
