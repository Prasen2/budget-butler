"use client";

import { BudgetGauge } from "@/components/budget-gauge";
import { JeevesPanel } from "@/components/jeeves-panel";
import { SubscriptionCard } from "@/components/subscription-card";
import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface DashboardClientProps {
  user: any;
  subscriptions: any[];
  monthlyBurn: number;
  remaining: number;
  totalBudget: number;
  percentUsed: number;
  recommendations: any[];
}

export default function DashboardClient({
  user,
  subscriptions,
  monthlyBurn,
  remaining,
  totalBudget,
  percentUsed,
  recommendations
}: DashboardClientProps) {
  // MOCK Last month burn to show trend (in real app, calculate from historical DB data)
  const lastMonthBurn = monthlyBurn * 0.95; 
  const percentageChange = lastMonthBurn > 0 ? ((monthlyBurn - lastMonthBurn) / lastMonthBurn) * 100 : 0;
  const isIncrease = percentageChange > 0;

  const formattedSubs = subscriptions.slice(0, 3).map(s => ({
    ...s,
    priceIncreased: s.priceHistory && s.priceHistory.length > 0 && s.priceHistory[0].newPrice > s.priceHistory[0].oldPrice 
      ? { oldPrice: s.priceHistory[0].oldPrice, newPrice: s.priceHistory[0].newPrice } 
      : undefined
  }));

  return (
    <div className="space-y-12 pb-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats */}
        <div className="space-y-6 flex flex-col justify-center">
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Monthly Burn</p>
                <div className="font-mono text-3xl text-foreground">
                  ${monthlyBurn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm ${isIncrease ? "text-warning" : "text-success"}`}>
                {isIncrease ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="font-mono">{Math.abs(percentageChange).toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Active Subs</p>
                <div className="font-display text-4xl text-foreground">
                  {subscriptions.length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CreditCard className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center: Budget Gauge */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <BudgetGauge totalBudget={totalBudget} spentAmount={monthlyBurn} percentUsed={percentUsed} />
        </div>

        {/* Right Column: Jeeves Panel */}
        <div className="lg:col-span-1">
          <JeevesPanel recommendations={recommendations} />
        </div>
      </div>

      {/* Subscriptions Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-primary">Recent Subscriptions</h2>
          <Link href="/subscriptions" className="text-sm text-muted-foreground uppercase tracking-widest hover:text-primary cursor-pointer transition-colors">
            View All
          </Link>
        </div>
        
        {formattedSubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {formattedSubs.map((sub, idx) => (
              <SubscriptionCard key={sub.id} sub={sub} index={idx} />
            ))}
          </div>
        ) : (
          <Card className="bg-secondary/20 border-dashed border-muted-foreground/30">
            <CardContent className="p-12 text-center text-muted-foreground">
              <p className="font-display text-xl text-foreground mb-2">Your ledger is empty.</p>
              <p className="text-sm">Please add subscriptions to see them here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
