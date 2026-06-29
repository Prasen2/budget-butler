import { prisma } from "@/lib/prisma";
import SubscriptionsClient from "@/components/subscriptions-client";

export const dynamic = 'force-dynamic';

export default async function SubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: { priceHistory: { orderBy: { changedAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return <SubscriptionsClient initialSubscriptions={subscriptions} />;
}
