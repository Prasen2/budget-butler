import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findFirst();
  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const user = await prisma.user.update({
    where: { id: body.id },
    data: {
      budget: body.budget ? parseFloat(body.budget) : undefined,
      name: body.name,
    },
  });
  return NextResponse.json(user);
}
