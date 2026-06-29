import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/dashboard-client";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await prisma.user.findFirst({
    include: { subscriptions: { include: { priceHistory: { orderBy: { changedAt: 'desc' }, take: 1 } } } },
  });

  if (!user) return <div className="p-8 text-muted-foreground">Loading...</div>;

  const activeSubs = user.subscriptions.filter(s => s.status === "active");
  const monthlyBurn = activeSubs.reduce((sum, s) => sum + s.price, 0);
  const remaining = user.budget - monthlyBurn;
  const percentUsed = (monthlyBurn / user.budget) * 100;

  // Jeeves logic
  const recommendations = activeSubs
    .map(sub => {
      const hasPriceIncrease = sub.priceHistory.length > 0 && sub.priceHistory[0].newPrice > sub.priceHistory[0].oldPrice;
      const isLowUsage = sub.usageScore <= 4;
      const annualCost = sub.billingCycle === "yearly" ? sub.price : sub.price * 12;
      
      let message = "";
      let priority = 0;
      
      if (hasPriceIncrease && isLowUsage) {
        const increase = sub.priceHistory[0].newPrice - sub.priceHistory[0].oldPrice;
        message = `Price increased by $${increase.toFixed(2)} while utilization remains at ${sub.usageScore}/10.`;
        priority = 3;
      } else if (isLowUsage) {
        message = `Low utilization score of ${sub.usageScore}/10 given the premium cost.`;
        priority = 2;
      } else if (hasPriceIncrease) {
        message = `Price has recently increased. Your utilization is satisfactory, however.`;
        priority = 1;
      }
      
      if (!message) return null;
      return { id: sub.id, subscriptionName: sub.name, issue: message, savings: annualCost, priority };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.priority - a.priority)
    .slice(0, 3);

  return (
    <DashboardClient 
      user={user}
      subscriptions={activeSubs}
      monthlyBurn={monthlyBurn}
      remaining={remaining}
      totalBudget={user.budget}
      percentUsed={percentUsed}
      recommendations={recommendations}
    />
  );
}
