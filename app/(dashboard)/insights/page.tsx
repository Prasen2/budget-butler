import { prisma } from "@/lib/prisma";
import InsightsClient from "@/components/insights-client";

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: { priceHistory: { orderBy: { changedAt: "desc" }, take: 1 } },
  });

  const categoryData = subscriptions.reduce((acc: any, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + sub.price;
    return acc;
  }, {});

  const totalBurn = subscriptions.reduce((sum, s) => sum + s.price, 0);

  const opportunities = subscriptions
    .filter(s => s.usageScore <= 4 && s.price > 20)
    .map(s => ({
      ...s,
      annualSavings: s.billingCycle === "yearly" ? s.price : s.price * 12,
    }))
    .sort((a, b) => b.annualSavings - a.annualSavings);

  const priceTrends = subscriptions
    .filter(s => s.priceHistory.length > 0)
    .map(s => ({
      name: s.name,
      oldPrice: s.priceHistory[0].oldPrice,
      newPrice: s.price,
      increase: s.price - s.priceHistory[0].oldPrice,
    }));

  return (
    <InsightsClient 
      categoryData={categoryData} 
      totalBurn={totalBurn}
      opportunities={opportunities}
      priceTrends={priceTrends}
      subscriptionCount={subscriptions.length}
    />
  );
}
