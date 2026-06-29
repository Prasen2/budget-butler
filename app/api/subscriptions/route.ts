import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const subs = await prisma.subscription.findMany({
    include: { priceHistory: { orderBy: { changedAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(subs);
}

export async function POST(req: Request) {
  const body = await req.json();
  
  const user = await prisma.user.findFirst();
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const sub = await prisma.subscription.create({
    data: {
      name: body.name,
      provider: body.provider,
      category: body.category,
      price: parseFloat(body.price),
      billingCycle: body.billingCycle || "monthly",
      nextBilling: new Date(body.nextBilling),
      usageScore: parseInt(body.usageScore),
      userId: body.userId || user.id,
    },
  });
  
  return NextResponse.json(sub, { status: 201 });
}
